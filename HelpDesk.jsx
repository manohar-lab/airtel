import React, { useState } from 'react';
import { supportOptions } from '../data/mockData';
import { SupportOptionCard } from '../components/Cards';
import { CreditCard, Smartphone, RefreshCw, ArrowRightLeft, LifeBuoy, Search, AlertCircle } from 'lucide-react';

// Map string identifiers to actual Lucide icons for the mock data
const iconMap = { CreditCard, Smartphone, RefreshCw, ArrowRightLeft, LifeBuoy };

const HelpDesk = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [formData, setFormData] = useState({ name: '', mobile: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, submitting, success

  const handleCardClick = (option) => {
    setSelectedOption(option);
    setFormData({
      ...formData,
      message: `I would like to raise a request regarding: ${option.title}.\n\nAdditional details: `
    });
    setStatus('idle');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('submitting');
    
    // TODO: connect client-specific support API endpoint here
    // Mock API Call
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', mobile: '', message: '' });
      setSelectedOption(null);
    }, 1500);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="text-center space-y-4 mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800">Airtel <span className="text-airtel-red">Help Desk</span></h1>
        <p className="text-gray-600">How can we assist you today? Select an issue type below.</p>
        
        <div className="max-w-md mx-auto relative mt-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search for help topics..." 
            className="neo-inset w-full py-4 pl-12 pr-4 text-gray-700"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {supportOptions.map((opt) => (
          <SupportOptionCard 
            key={opt.id}
            title={opt.title}
            description={opt.description}
            icon={iconMap[opt.icon]}
            isSelected={selectedOption?.id === opt.id}
            onClick={() => handleCardClick(opt)}
          />
        ))}
      </div>

      {/* Ticket Form Area */}
      <div className="neo-card p-8 mt-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
          <AlertCircle className="text-airtel-red" />
          Raise a Support Ticket
        </h2>

        {status === 'success' ? (
          <div className="neo-inset p-8 text-center space-y-4 border-l-4 border-green-500">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <LifeBuoy size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-800">Request Submitted!</h3>
            <p className="text-gray-600">Your Airtel support request has been raised successfully. We will get back to you shortly.</p>
            <button onClick={() => setStatus('idle')} className="neo-btn-red px-6 py-2 mt-4">Raise Another</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-600 ml-1">Full Name</label>
                <input required type="text" value={formData.name} onChange={e=>setFormData({...formData, name: e.target.value})} className="neo-inset w-full p-4" placeholder="Enter your name" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-600 ml-1">Airtel Mobile Number</label>
                <input required type="tel" value={formData.mobile} onChange={e=>setFormData({...formData, mobile: e.target.value})} className="neo-inset w-full p-4" placeholder="10-digit number" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-600 ml-1">Issue Description</label>
              <textarea 
                required 
                rows="4" 
                value={formData.message}
                onChange={e=>setFormData({...formData, message: e.target.value})}
                className="neo-inset w-full p-4 resize-none" 
                placeholder="Please describe your issue in detail..."
              ></textarea>
            </div>
            
            <button disabled={status === 'submitting'} type="submit" className={`neo-btn-red w-full py-4 text-lg ${status === 'submitting' ? 'opacity-70 cursor-wait' : ''}`}>
              {status === 'submitting' ? 'Submitting...' : 'Submit Support Request'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
export default HelpDesk;