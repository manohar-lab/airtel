import React from 'react';
import { Link } from 'react-router-dom';
import { PhoneCall, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const footerLinks = {
  Services: [
    { label: 'Prepaid', path: '/plans' },
    { label: 'Postpaid', path: '/plans' },
    { label: 'Broadband', path: '/plans' },
    { label: 'DTH', path: '/plans' },
    { label: 'Airtel Black', path: '/bundles' },
  ],
  Support: [
    { label: 'Help Desk', path: '/helpdesk' },
    { label: 'Track Request', path: '/track-request' },
    { label: 'FAQs', path: '/contact' },
    { label: 'Contact Us', path: '/contact' },
  ],
  Company: [
    { label: 'About Us', path: '#' },
    { label: 'Careers', path: '#' },
    { label: 'Press', path: '#' },
    { label: 'Investors', path: '#' },
  ],
};

const Footer = () => {
  return (
    <footer id="main-footer" className="neo-card rounded-none rounded-t-3xl mt-auto">
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-12 pb-8">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-10">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3 text-airtel-red font-black text-2xl">
              <div className="neo-inset-sm p-2 rounded-full">
                <PhoneCall size={20} strokeWidth={2.5} />
              </div>
              airtel
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
              India's leading telecommunications company. Connecting millions with lightning-fast 5G, broadband, and entertainment services.
            </p>
            <div className="flex gap-3 pt-2">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="neo-card-flat p-2.5 rounded-xl text-gray-500 hover:text-airtel-red transition-all duration-300 hover:-translate-y-1"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-bold text-gray-800 mb-4 text-sm uppercase tracking-wider">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-gray-500 text-sm hover:text-airtel-red transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact strip */}
        <div className="neo-inset-sm rounded-xl p-4 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2">
            <PhoneCall size={14} className="text-airtel-red" /> 121 (Toll Free)
          </span>
          <span className="flex items-center gap-2">
            <Mail size={14} className="text-airtel-red" /> care@airtel.com
          </span>
          <span className="flex items-center gap-2">
            <MapPin size={14} className="text-airtel-red" /> Bharti Airtel Ltd, New Delhi
          </span>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-neuro-dark/20 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 gap-3">
          <p>© {new Date().getFullYear()} Airtel Customer Portal — Frontend Demo. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-airtel-red transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-airtel-red transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-airtel-red transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
