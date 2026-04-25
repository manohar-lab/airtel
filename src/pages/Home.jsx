import React from 'react';
import { Link } from 'react-router-dom';
import { Smartphone, Wifi, Tv, ShieldCheck, Headphones, Zap, Gift, Star } from 'lucide-react';
import HeroBanner from '../components/HeroBanner';
import ServiceCard from '../components/ServiceCard';
import { promoBanners } from '../data/mockData';

const services = [
  { title: 'Mobile', icon: Smartphone, path: '/recharge', description: 'Prepaid & Postpaid' },
  { title: 'Broadband', icon: Wifi, path: '/plans', description: 'Fiber Internet' },
  { title: 'DTH', icon: Tv, path: '/plans', description: 'Digital TV' },
  { title: 'Airtel Black', icon: ShieldCheck, path: '/bundles', description: 'All-in-One' },
  { title: 'Help Desk', icon: Headphones, path: '/helpdesk', description: '24/7 Support' },
  { title: 'Xstream', icon: Zap, path: '/plans', description: 'Entertainment' },
];

const Home = () => {
  return (
    <div className="space-y-14 animate-fade-in">
      {/* Hero */}
      <HeroBanner />

      {/* Services */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-black text-gray-800">Our Services</h2>
            <p className="text-sm text-gray-500 mt-1">Everything you need, in one place</p>
          </div>
          <Link to="/plans" className="text-sm font-bold text-airtel-red hover:underline">View All →</Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {services.map((svc, i) => (
            <ServiceCard key={i} {...svc} />
          ))}
        </div>
      </section>

      {/* Promo Banners */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-black text-gray-800">Special Offers</h2>
            <p className="text-sm text-gray-500 mt-1">Don't miss out on these deals</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {promoBanners.map((banner) => (
            <div key={banner.id} className="neo-card neo-card-hover p-6 relative overflow-hidden group">
              <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-airtel-red/5 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />
              <div className="relative z-10">
                <div className="neo-badge text-airtel-red mb-3">
                  <Gift size={12} />
                  {banner.tag}
                </div>
                <h3 className="text-xl font-black text-gray-800 mb-2">{banner.title}</h3>
                <p className="text-sm text-gray-500">{banner.description}</p>
                <button className="neo-btn-outline px-5 py-2 text-xs mt-4">Learn More</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Actions Strip */}
      <section className="neo-card p-6 md:p-8 rounded-3xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 gradient-red rounded-xl text-white">
              <Star size={24} />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Need help with your connection?</h3>
              <p className="text-sm text-gray-500">Our support team is available 24/7</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link to="/helpdesk" className="neo-btn-red px-6 py-2.5 text-sm">Get Support</Link>
            <Link to="/track-request" className="neo-btn-ghost px-6 py-2.5 text-sm">Track Request</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
