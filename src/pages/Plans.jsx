import React, { useState } from 'react';
import { mockPlans } from '../data/mockData';
import PlanCard from '../components/PlanCard';

const tabs = ['prepaid', 'postpaid', 'broadband', 'dth'];

const Plans = () => {
  const [activeTab, setActiveTab] = useState('prepaid');

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-black text-gray-800">
          Explore <span className="text-airtel-red">Plans</span>
        </h1>
        <p className="text-gray-500 max-w-md mx-auto">
          Find the perfect plan that fits your digital lifestyle.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center">
        <div className="neo-card p-1.5 inline-flex gap-1 flex-wrap justify-center rounded-2xl">
          {tabs.map((tab) => (
            <button
              key={tab}
              id={`tab-${tab}`}
              onClick={() => setActiveTab(tab)}
              className={`tab-pill ${activeTab === tab ? 'tab-pill-active' : 'tab-pill-inactive'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Plan grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockPlans[activeTab] ? (
          mockPlans[activeTab].map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))
        ) : (
          <div className="col-span-3 neo-inset p-12 text-center text-gray-500 rounded-2xl">
            <p className="text-lg font-semibold">No plans available for this category yet.</p>
            <p className="text-sm mt-1">Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Plans;
