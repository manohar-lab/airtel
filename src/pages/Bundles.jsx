import React from 'react';
import { ShieldCheck, Plus, Check, Crown, ArrowRight } from 'lucide-react';
import { bundlePlans } from '../data/mockData';
import { Link } from 'react-router-dom';

const Bundles = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-fade-in">
      {/* Hero */}
      <div className="neo-card p-10 md:p-14 relative overflow-hidden rounded-3xl">
        <div className="absolute -right-20 -bottom-20 text-airtel-red/5">
          <ShieldCheck size={350} strokeWidth={0.5} />
        </div>
        <div className="absolute -left-10 -top-10 w-40 h-40 bg-airtel-red/5 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-xl space-y-4">
          <div className="neo-badge text-airtel-red mb-2">
            <Crown size={12} /> Premium Bundle
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-800 leading-tight">
            Airtel <span className="bg-gray-800 text-white px-3 py-1 rounded-lg">Black</span>
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed">
            Combine your Postpaid, DTH, and Fiber into one single bill. Enjoy premium priority support, free installations, and exclusive benefits.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Check size={16} className="text-airtel-red" /> One Bill
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Check size={16} className="text-airtel-red" /> Priority Support
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Check size={16} className="text-airtel-red" /> Free Installation
            </div>
          </div>
        </div>
      </div>

      {/* Bundle Cards */}
      <div>
        <h2 className="text-2xl font-black text-gray-800 mb-2 px-1">Choose Your Bundle</h2>
        <p className="text-sm text-gray-500 mb-8 px-1">Save more when you combine services</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bundlePlans.map((bundle) => (
            <div
              key={bundle.id}
              className={`neo-card neo-card-hover p-8 relative overflow-hidden ${
                bundle.tag ? 'border-t-4 border-airtel-red' : 'border-t-4 border-gray-300'
              }`}
            >
              {bundle.tag && (
                <div className="absolute top-0 right-0 gradient-red text-white text-[10px] font-bold uppercase px-4 py-1.5 rounded-bl-xl">
                  {bundle.tag}
                </div>
              )}

              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">
                {bundle.name}
              </h3>
              <div className="flex items-baseline gap-1 mb-5">
                <span className="text-sm text-gray-500">₹</span>
                <span className="text-4xl font-black text-gray-800">{bundle.price}</span>
                <span className="text-sm text-gray-500 font-medium">/ month</span>
              </div>

              <div className="flex items-center gap-3 flex-wrap mb-6">
                {bundle.services.map((svc, i) => (
                  <React.Fragment key={i}>
                    <span className="neo-inset-sm px-3 py-1.5 text-xs font-bold text-gray-700 rounded-lg">
                      {svc}
                    </span>
                    {i < bundle.services.length - 1 && (
                      <Plus size={14} className="text-airtel-red" />
                    )}
                  </React.Fragment>
                ))}
              </div>

              <button className="neo-btn-red w-full py-3.5 font-bold text-sm flex items-center justify-center gap-2">
                Explore Plan <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Upgrade CTA */}
      <div className="neo-card p-8 rounded-3xl text-center space-y-4">
        <h3 className="text-xl font-bold text-gray-800">Already an Airtel customer?</h3>
        <p className="text-sm text-gray-500 max-w-md mx-auto">
          Upgrade to Airtel Black and save up to ₹1200/month on your combined services.
        </p>
        <Link to="/helpdesk" className="neo-btn-red px-8 py-3 text-sm inline-block">
          Upgrade Now
        </Link>
      </div>
    </div>
  );
};

export default Bundles;
