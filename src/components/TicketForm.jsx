import React, { useState, useRef, useEffect } from 'react';
import { issueTypes } from '../data/mockData';
import { Send, Loader2, CheckCircle, ChevronDown } from 'lucide-react';

// ============================================================
// MOCK API ENDPOINT — Replace with real API when ready
// ============================================================
const SUPPORT_API_ENDPOINT = '/api/v1/support/tickets';

/**
 * Simulates a POST request to the support API.
 * Replace this entire function with a real fetch/axios call
 * when connecting to your backend.
 *
 * Expected payload:
 * {
 *   name: string,
 *   mobile: string,
 *   issueType: string,
 *   message: string,
 *   supportOptionId: string | null,
 *   timestamp: string (ISO 8601)
 * }
 *
 * Expected response:
 * {
 *   success: boolean,
 *   ticketId: string,
 *   message: string
 * }
 */
async function submitSupportRequest(payload) {
  // TODO: Connect to your actual support API endpoint
  // Example with real API:
  //
  // const response = await fetch(SUPPORT_API_ENDPOINT, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(payload),
  // });
  //
  // if (!response.ok) {
  //   throw new Error(`API error: ${response.status}`);
  // }
  //
  // return await response.json();

  // --- MOCK RESPONSE (remove when connecting real API) ---
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        ticketId: `SR-${Math.floor(1000000 + Math.random() * 9000000)}`,
        message: 'Your Airtel support request has been raised.',
      });
    }, 1800);
  });
}
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

    const payload = {
      ...formData,
      supportOptionId: selectedOption?.id || null,
      timestamp: new Date().toISOString(),
    };

    try {
      const result = await submitSupportRequest(payload);
      if (result.success) {
        setTicketId(result.ticketId);
        setStatus('success');
        if (onSuccess) onSuccess();
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
    }
  };

  const reset = () => {
    setFormData({ name: '', mobile: '', issueType: '', message: '' });
    setStatus('idle');
    setTicketId('');
    setErrorMsg('');
  };

  // ---- SUCCESS STATE ----
  if (status === 'success') {
    return (
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

      {/* Error message */}
      {status === 'error' && (
        <div className="neo-inset p-4 rounded-xl border-l-4 border-red-500 text-sm text-red-600 animate-slide-up">
          ⚠️ {errorMsg}
        </div>
      )}

      {/* API endpoint info (for developer reference) */}
      <div className="neo-card-flat p-3 rounded-xl">
        <p className="text-[10px] text-gray-400 font-mono">
          API Endpoint: <span className="text-gray-500">{SUPPORT_API_ENDPOINT}</span> (mock — not connected)
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
            <Loader2 size={20} className="animate-spin" /> Submitting Request...
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
