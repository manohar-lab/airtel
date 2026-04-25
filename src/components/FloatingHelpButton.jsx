import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Headphones, X, MessageCircle, HelpCircle, FileText } from 'lucide-react';

const FloatingHelpButton = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Don't show on helpdesk page
  if (location.pathname === '/helpdesk') return null;

  const quickLinks = [
    { icon: HelpCircle, label: 'Help Desk', path: '/helpdesk' },
    { icon: FileText, label: 'Track Request', path: '/track-request' },
    { icon: MessageCircle, label: 'Contact Us', path: '/contact' },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Quick links popup */}
      <div className={`transition-all duration-300 ${open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        <div className="neo-card p-3 rounded-2xl space-y-1.5 mb-2 shadow-neo-lg">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider px-3 pt-1">Quick Support</p>
          {quickLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:text-airtel-red hover:bg-neuro-bg/50 transition-all"
            >
              <link.icon size={16} />
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* FAB button */}
      <button
        id="floating-help-btn"
        onClick={() => setOpen(!open)}
        className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-neo-red ${
          open ? 'bg-gray-700 rotate-90' : 'gradient-red animate-bounce-subtle'
        } text-white`}
        aria-label="Get support"
      >
        {open ? <X size={22} /> : <Headphones size={22} />}
      </button>
    </div>
  );
};

export default FloatingHelpButton;
