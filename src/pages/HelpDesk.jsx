import React, { useState, useRef, useEffect } from 'react';
import { supportOptions } from '../data/mockData';
import HelpDeskCard from '../components/HelpDeskCard';
import TicketForm from '../components/TicketForm';
import {
  CreditCard, Smartphone, RefreshCw, ArrowRightLeft, LifeBuoy,
  Search, AlertCircle, Clock, FileText, ArrowDown
} from 'lucide-react';

const iconMap = { CreditCard, Smartphone, RefreshCw, ArrowRightLeft, LifeBuoy };

const recentQueries = [
  { query: 'How to check data balance?', time: '2 hours ago' },
  { query: 'Port number to Airtel', time: '5 hours ago' },
  { query: 'Broadband speed issue', time: '1 day ago' },
];

const HelpDesk = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formKey, setFormKey] = useState(0);
  const formRef = useRef(null);

  const handleCardClick = (option) => {
    setSelectedOption(option);
    setFormKey((k) => k + 1);
  };

  // Auto-scroll to ticket form when a card is selected
  useEffect(() => {
    if (selectedOption && formRef.current) {
      setTimeout(() => {
        formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [selectedOption, formKey]);

  const filteredOptions = searchTerm
    ? supportOptions.filter(
        (opt) =>
          opt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          opt.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : supportOptions;

  return (
    <div className="space-y-10 max-w-6xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-black text-gray-800">
          Airtel <span className="text-airtel-red">Help Desk</span>
        </h1>
        <p className="text-gray-500 max-w-lg mx-auto">
          How can we assist you today? Click a support card below to raise a request.
        </p>
      </div>

      {/* Search */}
      <div className="max-w-xl mx-auto relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          id="helpdesk-search"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for help topics..."
          className="neo-inset w-full py-4 pl-12 pr-4 text-sm text-gray-700"
        />
      </div>

      {/* Recent Queries */}
      <div className="max-w-xl mx-auto">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-1">
          Recent Queries
        </p>
        <div className="flex flex-wrap gap-2">
          {recentQueries.map((q, i) => (
            <button
              key={i}
              onClick={() => setSearchTerm(q.query)}
              className="neo-card-flat px-4 py-2 rounded-xl text-xs text-gray-600 hover:text-airtel-red transition-colors flex items-center gap-2"
            >
              <Clock size={12} className="text-gray-400" />
              {q.query}
            </button>
          ))}
        </div>
      </div>

      {/* Support Cards */}
      <div>
        <h2 className="text-lg font-bold text-gray-800 mb-2 px-1 flex items-center gap-2">
          <FileText size={18} className="text-airtel-red" />
          Select Support Type
        </h2>
        <p className="text-sm text-gray-400 mb-5 px-1 flex items-center gap-2">
          <ArrowDown size={14} />
          Click any card to auto-fill and raise a support request
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredOptions.map((opt) => (
            <HelpDeskCard
              key={opt.id}
              title={opt.title}
              description={opt.description}
              icon={iconMap[opt.icon]}
              isSelected={selectedOption?.id === opt.id}
              onClick={() => handleCardClick(opt)}
            />
          ))}
        </div>
        {filteredOptions.length === 0 && (
          <div className="neo-inset p-8 text-center text-gray-500 rounded-2xl">
            No support options match your search.
          </div>
        )}
      </div>

      {/* Selected card confirmation banner */}
      {selectedOption && (
        <div className="neo-card p-4 rounded-2xl flex items-center gap-4 border-l-4 border-airtel-red animate-slide-up">
          <div className="p-2 gradient-red rounded-lg text-white flex-shrink-0">
            {React.createElement(iconMap[supportOptions.find(o => o.id === selectedOption.id)?.icon] || LifeBuoy, { size: 20 })}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-gray-800 text-sm">Selected: {selectedOption.title}</p>
            <p className="text-xs text-gray-500 truncate">{selectedOption.description}</p>
          </div>
          <button
            onClick={() => setSelectedOption(null)}
            className="text-xs text-gray-400 hover:text-airtel-red transition-colors flex-shrink-0 font-bold"
          >
            Clear
          </button>
        </div>
      )}

      {/* Ticket Form */}
      <div ref={formRef} className="neo-card p-8 rounded-3xl scroll-mt-24">
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
          <div className="p-2 gradient-red rounded-lg text-white">
            <AlertCircle size={18} />
          </div>
          Raise a Support Ticket
        </h2>
        <TicketForm
          key={formKey}
          selectedOption={selectedOption}
          onSuccess={() => setSelectedOption(null)}
        />
      </div>
    </div>
  );
};

export default HelpDesk;
