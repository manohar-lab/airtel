import React from 'react';
import { ChevronRight } from 'lucide-react';

const HelpDeskCard = ({ icon: Icon, title, description, onClick, isSelected }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      id={`helpdesk-card-${title.toLowerCase().replace(/[\s/]+/g, '-')}`}
      className={`neo-card p-6 text-left transition-all duration-300 group relative overflow-hidden w-full focus:outline-none focus:ring-2 focus:ring-airtel-red/30 ${
        isSelected
          ? 'neo-active ring-2 ring-airtel-red/30 scale-[0.98]'
          : 'neo-card-hover hover:scale-[1.02]'
      }`}
      aria-pressed={isSelected}
      aria-label={`Select support option: ${title}`}
    >
      {/* Left accent bar when selected */}
      {isSelected && (
        <div className="absolute top-0 left-0 w-1.5 h-full gradient-red rounded-r" />
      )}

      {/* Hover glow effect */}
      <div className="absolute inset-0 bg-airtel-red/0 group-hover:bg-airtel-red/[0.02] transition-colors duration-300 rounded-2xl pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div
            className={`p-3.5 rounded-xl transition-all duration-300 ${
              isSelected
                ? 'gradient-red text-white shadow-lg shadow-airtel-red/20'
                : 'neo-inset text-airtel-red group-hover:shadow-none group-hover:bg-airtel-red/10'
            }`}
          >
            <Icon size={22} strokeWidth={2} />
          </div>
          <div
            className={`flex items-center gap-1 transition-all duration-300 ${
              isSelected
                ? 'text-airtel-red'
                : 'text-gray-400 translate-x-0 group-hover:text-airtel-red group-hover:translate-x-1'
            }`}
          >
            <span className="text-[10px] font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
              {isSelected ? 'Selected' : 'Select'}
            </span>
            <ChevronRight size={18} />
          </div>
        </div>

        <h4
          className={`font-bold text-base mb-1.5 transition-colors duration-300 ${
            isSelected ? 'text-airtel-red' : 'text-gray-800 group-hover:text-airtel-red'
          }`}
        >
          {title}
        </h4>
        <p className="text-sm text-gray-500 leading-relaxed">{description}</p>

        {/* Bottom action hint */}
        <div
          className={`mt-4 pt-3 border-t transition-all duration-300 flex items-center gap-2 ${
            isSelected
              ? 'border-airtel-red/20 opacity-100'
              : 'border-neuro-dark/10 opacity-0 group-hover:opacity-100'
          }`}
        >
          <div className={`w-2 h-2 rounded-full ${isSelected ? 'bg-airtel-red animate-pulse' : 'bg-gray-400'}`} />
          <span className="text-[11px] font-semibold text-gray-500">
            {isSelected ? 'Form auto-filled below ↓' : 'Click to raise request'}
          </span>
        </div>
      </div>
    </button>
  );
};

export default HelpDeskCard;
