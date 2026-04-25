import React, { useState } from 'react';
import { Smartphone, ToggleLeft, ToggleRight } from 'lucide-react';
import { mockPlans } from '../data/mockData';
import PlanCard from '../components/PlanCard';

const Recharge = () => {
  const [mobile, setMobile] = useState('');
  const [planType, setPlanType] = useState('prepaid');
  const [rechargeMsg, setRechargeMsg] = useState('');

  const handleRecharge = (plan) => {
    if (!mobile || mobile.length < 10) {
      setRechargeMsg('Please enter a valid 10-digit mobile number first.');
      setTimeout(() => setRechargeMsg(''), 3000);
      return;
    }
    setRechargeMsg(`Mock recharge of ₹${plan.price} initiated for +91 ${mobile}. (Demo only)`);
    setTimeout(() => setRechargeMsg(''), 4000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-fade-in">
      {/* Input Section */}
      <div className="neo-card p-8 md:p-10 text-center space-y-6 relative overflow-hidden">
        <div className="absolute -right-16 -top-16 w-48 h-48 bg-airtel-red/5 rounded-full blur-3xl" />
        <div className="relative z-10 space-y-6">
          <div className="w-16 h-16 neo-inset rounded-2xl flex items-center justify-center mx-auto text-airtel-red">
            <Smartphone size={30} />
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-800">
            Recharge <span className="text-airtel-red">or</span> Pay Bills
          </h1>

          <div className="max-w-md mx-auto space-y-4">
            {/* Plan type toggle */}
            <div className="flex justify-center">
              <div className="neo-card-flat p-1 inline-flex rounded-xl">
                {['prepaid', 'postpaid'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setPlanType(type)}
                    className={`px-6 py-2 rounded-lg text-sm font-bold capitalize transition-all duration-300 ${
                      planType === type ? 'gradient-red text-white shadow-md' : 'text-gray-500'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile input */}
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">+91</span>
              <input
                id="recharge-mobile-input"
                type="tel" maxLength="10" value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                placeholder="Enter Mobile Number"
                className="neo-inset w-full py-4 pl-14 pr-4 text-lg font-semibold text-gray-800 tracking-wider"
              />
            </div>

            <button
              id="browse-plans-btn"
              className="neo-btn-red py-4 text-base w-full font-bold"
            >
              Browse Plans
            </button>
          </div>

          {/* Flash message */}
          {rechargeMsg && (
            <div className="neo-inset p-4 rounded-xl text-sm text-gray-700 animate-slide-up max-w-md mx-auto">
              {rechargeMsg}
            </div>
          )}
        </div>
      </div>

      {/* Plans */}
      <div>
        <h2 className="text-2xl font-black text-gray-800 mb-2 px-1">
          {planType === 'prepaid' ? 'Prepaid' : 'Postpaid'} Plans
        </h2>
        <p className="text-sm text-gray-500 mb-6 px-1">Select a plan to recharge</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockPlans[planType].map((plan) => (
            <PlanCard key={plan.id} plan={plan} onSelect={handleRecharge} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recharge;
