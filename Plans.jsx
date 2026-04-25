import React, { useState } from 'react';
import { mockPlans } from '../data/mockData';
import { PlanCard } from '../components/Cards';

const Plans = () => {
  const [activeTab, setActiveTab] = useState('prepaid');
  
  const tabs = ['prepaid', 'postpaid', 'broadband', 'dth'];

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4 mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800">Explore <span className="text-airtel-red">Plans</span></h1>
        <p className="text-gray-600">Find the perfect plan that fits your digital lifestyle.</p>
      </div>

      <div className="flex justify-center mb-8">
        <div className="neo-card p-2 inline-flex gap-2 flex-wrap justify-center">
          {tabs.map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-xl font-bold capitalize transition-all ${activeTab === tab ? 'neo-active text-airtel-red' : 'text-gray-500 hover:text-gray-800'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {mockPlans[activeTab] ? mockPlans[activeTab].map(plan => <PlanCard key={plan.id} plan={plan} />) : <div className="col-span-3 text-center text-gray-500 py-12 neo-inset">No mock data for this category.</div>}
      </div>
    </div>
  );
};

export default Plans;