import React from 'react';
import { Link } from 'react-router-dom';
import { Smartphone, Wifi, Tv, ShieldCheck } from 'lucide-react';

const Home = () => {
  const services = [
    { title: 'Mobile', icon: Smartphone, path: '/recharge' },
    { title: 'Broadband', icon: Wifi, path: '/plans' },
    { title: 'DTH', icon: Tv, path: '/plans' },
    { title: 'Airtel Black', icon: ShieldCheck, path: '/bundles' },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="neo-card p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center gap-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-airtel-red/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        
        <div className="flex-1 space-y-6 z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 leading-tight">
            Experience the <span className="text-airtel-red">Future</span> of Connectivity.
          </h1>
          <p className="text-gray-600 text-lg max-w-md">
            Lightning fast 5G, unlimited broadband, and premium entertainment all in one place.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Link to="/recharge" className="neo-btn-red px-8 py-3">Recharge Now</Link>
            <Link to="/helpdesk" className="neo-card px-8 py-3 font-semibold text-gray-700 hover:text-airtel-red transition-colors">Get Support</Link>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6 px-2">Our Services</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {services.map((svc, i) => (
            <Link key={i} to={svc.path} className="neo-card neo-card-hover p-6 flex flex-col items-center justify-center gap-4 text-center">
              <div className="p-4 rounded-full neo-inset text-airtel-red">
                <svc.icon size={32} />
              </div>
              <span className="font-semibold text-gray-700">{svc.title}</span>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Home;