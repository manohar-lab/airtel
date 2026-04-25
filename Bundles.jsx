import React from 'react';
import { ShieldCheck, Plus } from 'lucide-react';

const Bundles = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-10">
      <div className="neo-card p-10 bg-gradient-to-br from-[#e0e5ec] to-[#d1d8e6] relative overflow-hidden">
        <div className="absolute -right-20 -bottom-20 text-airtel-red opacity-5">
          <ShieldCheck size={400} />
        </div>
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Airtel <span className="text-gray-900 bg-gray-200 px-2 py-1 rounded">Black</span></h1>
        <p className="text-lg text-gray-600 max-w-xl">Combine your Postpaid, DTH, and Fiber into one single bill. Enjoy premium priority support and free installations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="neo-card neo-card-hover p-8 border-t-4 border-gray-800">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">₹1099 <span className="text-sm font-normal text-gray-500">/ month</span></h3>
          <div className="flex items-center gap-4 py-6 text-gray-600 font-semibold">
            <span>Fiber (Unlimited)</span> <Plus size={16} className="text-airtel-red" /> <span>Landline</span> <Plus size={16} className="text-airtel-red" /> <span>Postpaid</span>
          </div>
          <button className="neo-btn-red w-full py-3">Explore Plan</button>
        </div>

        <div className="neo-card neo-card-hover p-8 border-t-4 border-airtel-red">
          <div className="inline-block bg-airtel-red text-white text-xs font-bold px-2 py-1 rounded-md mb-2">Bestseller</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">₹1599 <span className="text-sm font-normal text-gray-500">/ month</span></h3>
          <div className="flex items-center gap-4 py-4 text-gray-600 font-semibold flex-wrap">
            <span>Fiber</span> <Plus size={16} className="text-airtel-red" /> <span>DTH</span> <Plus size={16} className="text-airtel-red" /> <span>2 Postpaid</span>
          </div>
          <button className="neo-btn-red w-full py-3">Explore Plan</button>
        </div>
      </div>
    </div>
  );
};

export default Bundles;