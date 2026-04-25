import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQAccordion = ({ faq, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div id={`faq-${index}`} className="neo-card overflow-hidden transition-all duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-5 text-left flex justify-between items-center gap-4 group"
      >
        <span className={`font-bold text-sm transition-colors ${isOpen ? 'text-airtel-red' : 'text-gray-800 group-hover:text-airtel-red'}`}>
          {faq.question}
        </span>
        <div className={`neo-inset-sm p-1.5 rounded-lg transition-all duration-300 flex-shrink-0 ${isOpen ? 'bg-airtel-red text-white shadow-none' : ''}`}>
          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </button>
      <div className={`transition-all duration-400 ease-in-out overflow-hidden ${isOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-5 pb-5 text-sm text-gray-500 leading-relaxed border-t border-neuro-dark/15 pt-4">
          {faq.answer}
        </div>
      </div>
    </div>
  );
};

export default FAQAccordion;
