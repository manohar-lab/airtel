import React from 'react';
import { CheckCircle2, ChevronRight } from 'lucide-react';

export const PlanCard = ({ plan }) => {
  return (
    <div className="neo-card neo-card-hover p-6 flex flex-col gap-4">
      <div className="flex justify-between items-start">
        <h3 className="text-3xl font-bold text-gray-800">₹{plan.price}</h3>
        {plan.validity && <span className="neo-inset px-3 py-1 text-xs font-semibold text-gray-500">{plan.validity}</span>}
      </div>
      
      <div className="space-y-2 text-gray-600">
        <p className="flex items-center gap-2"><CheckCircle2 size={16} className="text-airtel-red" /> {plan.data}</p>
        <p className="flex items-center gap-2"><CheckCircle2 size={16} className="text-airtel-red" /> {plan.calls} Calls</p>
        {plan.benefits?.map((b, i) => (
          <p key={i} className="flex items-center gap-2"><CheckCircle2 size={16} className="text-airtel-red" /> {b}</p>
        ))}
      </div>
      
      <button className="neo-btn-red py-3 mt-4 w-full">Buy Plan</button>
    </div>
  );
};

export const SupportOptionCard = ({ icon: Icon, title, description, onClick, isSelected }) => {
  return (
    <div 
      onClick={onClick}
      className={`neo-card p-6 cursor-pointer transition-all duration-300 ${isSelected ? 'neo-active border-2 border-airtel-red/20' : 'neo-card-hover'}`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-full ${isSelected ? 'text-white bg-airtel-red' : 'text-airtel-red neo-inset'}`}>
          <Icon size={24} />
        </div>
        <ChevronRight className={isSelected ? 'text-airtel-red' : 'text-gray-400'} />
      </div>
      <h4 className="font-bold text-lg text-gray-800 mb-2">{title}</h4>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
}