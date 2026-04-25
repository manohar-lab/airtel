import React, { useState, useRef, useEffect } from 'react';
import { issueTypes } from '../data/mockData';
import {
  Send, Loader2, CheckCircle, ChevronDown,
  ShieldCheck, ShieldAlert, ShieldX, Bot, ArrowRight,
  Eye, Database, Cpu,
} from 'lucide-react';

// ============================================================
// AGENT API ENDPOINT — wired to the Airtel Orchestrator Agent
// Vite proxy forwards /api/* → http://localhost:5000
// ============================================================
const AGENT_API_ENDPOINT = '/api/orchestrator/ticket';

/**
 * Sends the ticket to the Airtel Orchestrator Agent.
 * The agent extracts identity attributes, calls the Vault Agent
 * for verification via fetch, and returns the combined result.
 */
async function submitSupportRequest(payload) {
  const response = await fetch(AGENT_API_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || `API error: ${response.status}`);
  }

  return await response.json();
}

// ============================================================
// Agent Activity Log Component — shows the AI pipeline steps
// ============================================================
const AgentActivityLog = ({ steps }) => (
  <div className="space-y-3 animate-fade-in">
    {steps.map((step, i) => (
      <div
        key={i}
        className={`flex items-start gap-3 animate-slide-up`}
        style={{ animationDelay: `${i * 150}ms` }}
      >
        <div
          className={`p-2 rounded-lg flex-shrink-0 ${
            step.type === 'agent'
              ? 'gradient-red text-white'
              : step.type === 'vault'
              ? 'bg-indigo-500 text-white'
              : 'neo-inset text-gray-500'
          }`}
        >
          {step.type === 'agent' ? (
            <Bot size={14} />
          ) : step.type === 'vault' ? (
            <Database size={14} />
          ) : (
            <Cpu size={14} />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-gray-700">{step.label}</p>
          <p className="text-[11px] text-gray-500 leading-relaxed">{step.detail}</p>
        </div>
        {i < steps.length - 1 && (
          <ArrowRight size={12} className="text-gray-300 flex-shrink-0 mt-1.5" />
        )}
      </div>
    ))}
  </div>
);

// ============================================================
// Vault Verification Banner — shows verified / unverified status
// ============================================================
const VaultVerificationBanner = ({ verification, attributes }) => {
  if (!verification) return null;

  const isVerified = verification.status === 'verified';
  const Icon = isVerified ? ShieldCheck : ShieldAlert;
  const borderColor = isVerified ? 'border-green-500' : 'border-amber-500';
  const bgColor = isVerified ? 'bg-green-50' : 'bg-amber-50';
  const iconColor = isVerified ? 'text-green-600' : 'text-amber-600';
  const labelColor = isVerified ? 'text-green-800' : 'text-amber-800';

  return (
    <div className={`neo-inset p-5 rounded-2xl border-l-4 ${borderColor} ${bgColor} animate-slide-up space-y-4`}>
      <div className="flex items-center gap-3">
        <div className={`p-2.5 rounded-xl ${isVerified ? 'bg-green-100' : 'bg-amber-100'}`}>
          <Icon size={24} className={iconColor} />
        </div>
        <div>
          <p className={`font-black text-sm ${labelColor}`}>
            {isVerified ? 'Identity Verified by Vault Agent ✓' : 'Identity Could Not Be Verified'}
          </p>
          <p className="text-[11px] text-gray-500">
            {verification.message}
          </p>
        </div>
      </div>

      {/* Show extracted attributes */}
      {attributes && Object.keys(attributes).length > 0 && (
        <div className="space-y-2 pt-2">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
            <Eye size={10} /> Extracted Attributes
          </p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(attributes).map(([key, val]) => {
              const isFieldVerified = verification.verifiedFields?.includes(key);
              const isFieldFailed = verification.unverifiedFields?.includes(key);
              return (
                <div
                  key={key}
                  className={`neo-card-flat px-3 py-2 rounded-xl flex items-center gap-2 text-xs ${
                    isFieldVerified
                      ? 'ring-1 ring-green-300'
                      : isFieldFailed
                      ? 'ring-1 ring-red-300'
                      : ''
                  }`}
                >
                  {isFieldVerified ? (
                    <ShieldCheck size={12} className="text-green-500" />
                  ) : isFieldFailed ? (
                    <ShieldX size={12} className="text-red-500" />
                  ) : (
                    <ShieldAlert size={12} className="text-gray-400" />
                  )}
                  <span className="font-bold text-gray-600">{key}:</span>
                  <span className="text-gray-500 truncate max-w-[120px]">{String(val)}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};


// ============================================================
// TICKET FORM COMPONENT
// ============================================================
const TicketForm = ({ selectedOption, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    issueType: selectedOption?.issueType || '',
    message: selectedOption
      ? `I would like to raise a request regarding: ${selectedOption.title}.\n\nAdditional details: `
      : '',
  });
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [ticketId, setTicketId] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [vaultVerification, setVaultVerification] = useState(null);
  const [extractedAttributes, setExtractedAttributes] = useState(null);
  const [agentSteps, setAgentSteps] = useState([]);
  const nameInputRef = useRef(null);

  // Focus the name input when form mounts (after card click)
  useEffect(() => {
    if (selectedOption && nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [selectedOption]);

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');
    setVaultVerification(null);
    setExtractedAttributes(null);

    // Build the agent activity log as we progress
    setAgentSteps([
      {
        type: 'system',
        label: 'Ticket Received',
        detail: `Processing ticket for ${formData.name} (${formData.mobile})...`,
      },
    ]);

    const payload = {
      ...formData,
      supportOptionId: selectedOption?.id || null,
      timestamp: new Date().toISOString(),
    };

    // Small delay so user sees the "submitting" UI before the fetch
    await new Promise((r) => setTimeout(r, 300));

    setAgentSteps((prev) => [
      ...prev,
      {
        type: 'agent',
        label: 'Airtel Agent — Extracting Attributes',
        detail: 'The AI agent is reading your ticket and extracting identity attributes...',
      },
    ]);

    try {
      const result = await submitSupportRequest(payload);

      if (result.success) {
        // Show vault interaction step
        setAgentSteps((prev) => [
          ...prev,
          {
            type: 'vault',
            label: 'Vault Agent — Verifying Identity',
            detail: result.vaultVerification?.status === 'verified'
              ? 'All extracted attributes matched Vault records. Identity confirmed.'
              : `Vault responded: ${result.vaultVerification?.message || 'Verification complete.'}`,
          },
          {
            type: 'system',
            label: `Ticket ${result.ticketId} Created`,
            detail: 'Your support request has been successfully filed.',
          },
        ]);

        setTicketId(result.ticketId);
        setVaultVerification(result.vaultVerification || null);
        setExtractedAttributes(result.extractedAttributes || null);
        setStatus('success');
        if (onSuccess) onSuccess();
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (err) {
      setAgentSteps((prev) => [
        ...prev,
        {
          type: 'system',
          label: 'Error',
          detail: err.message || 'Something went wrong.',
        },
      ]);
      setStatus('error');
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
    }
  };

  const reset = () => {
    setFormData({ name: '', mobile: '', issueType: '', message: '' });
    setStatus('idle');
    setTicketId('');
    setErrorMsg('');
    setVaultVerification(null);
    setExtractedAttributes(null);
    setAgentSteps([]);
  };

  // ---- SUCCESS STATE ----
  if (status === 'success') {
    return (
      <div className="space-y-6 animate-fade-in">
        {/* Agent Activity Timeline */}
        <div className="neo-inset p-5 rounded-2xl space-y-4">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
            <Bot size={12} className="text-airtel-red" /> Agent Activity Log
          </p>
          <AgentActivityLog steps={agentSteps} />
        </div>

        {/* Vault Verification Result */}
        <VaultVerificationBanner
          verification={vaultVerification}
          attributes={extractedAttributes}
        />

        {/* Ticket confirmation */}
        <div className="neo-inset p-8 md:p-10 text-center space-y-5 rounded-2xl border-l-4 border-green-500 animate-slide-up">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle size={40} strokeWidth={1.5} />
          </div>
          <h3 className="text-2xl font-black text-gray-800">Request Submitted!</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            Your Airtel support request has been raised successfully. Our team will get back to you within 24 hours.
          </p>
          {ticketId && (
            <div className="neo-card-flat inline-block px-6 py-3 rounded-xl">
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Ticket ID</p>
              <p className="text-lg font-black text-airtel-red tracking-wider">{ticketId}</p>
            </div>
          )}
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button onClick={reset} className="neo-btn-red px-6 py-3 text-sm font-bold">
              Raise Another Request
            </button>
            <a href="/track-request" className="neo-btn-outline px-6 py-3 text-sm font-bold text-center">
              Track Your Request
            </a>
          </div>
        </div>
      </div>
    );
  }

  // ---- FORM STATE ----
  return (
    <form onSubmit={handleSubmit} id="ticket-form" className="space-y-6">
      {/* Selected option indicator */}
      {selectedOption && (
        <div className="neo-inset-sm p-3 rounded-xl flex items-center gap-3 animate-fade-in">
          <div className="w-2 h-2 rounded-full bg-airtel-red animate-pulse flex-shrink-0" />
          <span className="text-sm text-gray-600">
            Auto-filled for: <span className="font-bold text-airtel-red">{selectedOption.title}</span>
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Full Name */}
        <div className="space-y-1.5">
          <label htmlFor="ticket-name" className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
            Full Name <span className="text-airtel-red">*</span>
          </label>
          <input
            ref={nameInputRef}
            id="ticket-name"
            required
            type="text"
            value={formData.name}
            onChange={handleChange('name')}
            className="neo-inset w-full p-4 text-sm text-gray-800"
            placeholder="Enter your full name"
          />
        </div>

        {/* Mobile Number */}
        <div className="space-y-1.5">
          <label htmlFor="ticket-mobile" className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
            Mobile Number <span className="text-airtel-red">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-bold">+91</span>
            <input
              id="ticket-mobile"
              required
              type="tel"
              maxLength="10"
              value={formData.mobile}
              onChange={(e) =>
                setFormData({ ...formData, mobile: e.target.value.replace(/\D/g, '') })
              }
              className="neo-inset w-full p-4 pl-14 text-sm text-gray-800"
              placeholder="10-digit number"
            />
          </div>
        </div>
      </div>

      {/* Issue Type Dropdown */}
      <div className="space-y-1.5">
        <label htmlFor="ticket-issue-type" className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
          Issue Type <span className="text-airtel-red">*</span>
        </label>
        <div className="relative">
          <select
            id="ticket-issue-type"
            required
            value={formData.issueType}
            onChange={handleChange('issueType')}
            className="neo-inset w-full p-4 text-sm text-gray-800 appearance-none cursor-pointer pr-12"
          >
            <option value="">Select issue type...</option>
            {issueTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <ChevronDown
            size={18}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
        </div>
      </div>

      {/* Description */}
      <div className="space-y-1.5">
        <label htmlFor="ticket-message" className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
          Description <span className="text-airtel-red">*</span>
        </label>
        <textarea
          id="ticket-message"
          required
          rows="5"
          value={formData.message}
          onChange={handleChange('message')}
          className="neo-inset w-full p-4 resize-none text-sm text-gray-800"
          placeholder="Please describe your issue in detail..."
        />
      </div>

      {/* Submitting — Agent Activity */}
      {status === 'submitting' && agentSteps.length > 0 && (
        <div className="neo-inset p-5 rounded-2xl space-y-4 animate-fade-in">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
            <Bot size={12} className="text-airtel-red animate-pulse" /> Agent Processing...
          </p>
          <AgentActivityLog steps={agentSteps} />
        </div>
      )}

      {/* Error message */}
      {status === 'error' && (
        <div className="neo-inset p-4 rounded-xl border-l-4 border-red-500 text-sm text-red-600 animate-slide-up">
          ⚠️ {errorMsg}
        </div>
      )}

      {/* Agent pipeline info */}
      <div className="neo-card-flat p-3 rounded-xl">
        <p className="text-[10px] text-gray-400 font-mono flex items-center gap-2">
          <Bot size={10} />
          Pipeline: <span className="text-gray-500">Help Desk → Airtel Agent → Vault Agent → Verified Ticket</span>
        </p>
      </div>

      {/* Submit */}
      <button
        disabled={status === 'submitting'}
        type="submit"
        id="submit-ticket-btn"
        className={`neo-btn-red w-full py-4 text-base font-bold flex items-center justify-center gap-2 ${
          status === 'submitting' ? 'opacity-70 cursor-wait' : ''
        }`}
      >
        {status === 'submitting' ? (
          <>
            <Loader2 size={20} className="animate-spin" /> Agent Processing...
          </>
        ) : (
          <>
            <Send size={18} /> Submit Support Request
          </>
        )}
      </button>
    </form>
  );
};

export default TicketForm;
