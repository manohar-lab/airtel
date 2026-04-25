import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const PlanCard = ({ plan, onSelect }) => {
  return (
    <div
      id={`plan-card-${plan.id}`}
      className="neo-card neo-card-hover p-6 flex flex-col gap-4 relative overflow-hidden group"
    >
      {/* Tag badge */}
      {plan.tag && (
        <div className="absolute top-0 right-0">
          <div className="gradient-red text-white text-[10px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-bl-xl">
            {plan.tag}
          </div>
        </div>
      )}

      {/* Price */}
      <div className="flex justify-between items-start pt-1">
        <div>
          <div className="flex items-baseline gap-1">
            <span className="text-sm text-gray-500 font-semibold">₹</span>
            <h3 className="text-4xl font-black text-gray-800 tracking-tight">{plan.price}</h3>
          </div>
          {plan.validity && (
            <span className="text-xs text-gray-500 font-medium">{plan.validity}</span>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-neuro-dark/30 to-transparent" />

      {/* Details */}
      <div className="space-y-2.5 flex-1">
        {plan.data && (
          <p className="flex items-center gap-2.5 text-sm text-gray-600">
            <CheckCircle2 size={15} className="text-airtel-red flex-shrink-0" />
            <span>{plan.data}</span>
          </p>
        )}
        {plan.speed && (
          <p className="flex items-center gap-2.5 text-sm text-gray-600">
            <CheckCircle2 size={15} className="text-airtel-red flex-shrink-0" />
            <span>{plan.speed}</span>
          </p>
        )}
        {plan.calls && (
          <p className="flex items-center gap-2.5 text-sm text-gray-600">
            <CheckCircle2 size={15} className="text-airtel-red flex-shrink-0" />
            <span>{plan.calls}</span>
          </p>
        )}
        {plan.channels && (
          <p className="flex items-center gap-2.5 text-sm text-gray-600">
            <CheckCircle2 size={15} className="text-airtel-red flex-shrink-0" />
            <span>{plan.channels}</span>
          </p>
        )}
        {plan.sms && (
          <p className="flex items-center gap-2.5 text-sm text-gray-600">
            <CheckCircle2 size={15} className="text-airtel-red flex-shrink-0" />
            <span>{plan.sms}</span>
          </p>
        )}
        {plan.benefits?.map((b, i) => (
          <p key={i} className="flex items-center gap-2.5 text-sm text-gray-600">
            <CheckCircle2 size={15} className="text-airtel-red flex-shrink-0" />
            <span className="font-medium">{b}</span>
          </p>
        ))}
      </div>

      {/* CTA */}
      <button
        onClick={() => onSelect && onSelect(plan)}
        className="neo-btn-red py-3 w-full mt-2 text-sm font-bold group-hover:shadow-neo-red-lg transition-shadow"
      >
        {plan.channels ? 'Subscribe' : 'Buy Plan'}
      </button>
    </div>
  );
};

export default PlanCard;
