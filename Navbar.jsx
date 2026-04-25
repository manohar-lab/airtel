import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PhoneCall } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  
  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/recharge', label: 'Recharge' },
    { path: '/plans', label: 'Plans' },
    { path: '/bundles', label: 'Airtel Black' },
    { path: '/helpdesk', label: 'Help Desk' },
    { path: '/track-request', label: 'Track' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#e0e5ec] bg-opacity-90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-airtel-red font-bold text-2xl tracking-tighter">
          <div className="neo-card p-2 rounded-full"><PhoneCall size={24} /></div>
          AIRTEL
        </Link>
        
        <div className="hidden md:flex gap-2">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path}
              className={`px-4 py-2 rounded-xl font-medium transition-all ${location.pathname === link.path ? 'neo-active text-airtel-red' : 'text-gray-600 hover:text-airtel-red'}`}
            >{link.label}</Link>
          ))}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;