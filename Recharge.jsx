import React, { useState } from 'react';
import { Smartphone } from 'lucide-react';
import { mockPlans } from '../data/mockData';
import { PlanCard } from '../components/Cards';

const Recharge = () => {
  const [mobile, setMobile] = useState('');

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Recharge input section */}
      <div className="neo-card p-8 text-center space-y-6">
        <div className="w-16 h-16 bg-airtel-red/10 text-airtel-red rounded-full flex items-center justify-center mx-auto neo-inset">
          <Smartphone size={32} />
        </div>
        <h1 className="text-3xl font-extrabold text-gray-800">Recharge or Pay Bills</h1>
        
        <div className="max-w-md mx-auto flex flex-col gap-4">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">+91</span>
            <input 
              type="tel" 
              maxLength="10"
              value={mobile}
              onChange={e => setMobile(e.target.value.replace(/\D/g, ''))}
              placeholder="Enter Mobile Number" 
              className="neo-inset w-full py-4 pl-14 pr-4 text-lg font-semibold text-gray-800 tracking-wider"
            />
          </div>
          <button className="neo-btn-red py-4 text-lg w-full">Browse Plans</button>
        </div>
      </div>

      {/* Recommended Plans */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6 px-2">Recommended for you</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Showing a mix of prepaid mock plans */}
          {mockPlans.prepaid.map(plan => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recharge;