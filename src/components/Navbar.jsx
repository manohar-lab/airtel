import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PhoneCall, Menu, X, Headphones } from 'lucide-react';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/recharge', label: 'Recharge' },
  { path: '/plans', label: 'Plans' },
  { path: '/bundles', label: 'Airtel Black' },
  { path: '/helpdesk', label: 'Help Desk' },
  { path: '/track-request', label: 'Track' },
  { path: '/contact', label: 'Support' },
];

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      <nav
        id="main-navbar"
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? 'glass shadow-neo-sm py-2'
            : 'bg-neuro-bg/70 backdrop-blur-sm py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
          {/* Logo */}
          <Link
            to="/"
            id="logo-link"
            className="flex items-center gap-3 text-airtel-red font-black text-2xl tracking-tight group"
          >
            <div className="neo-card p-2.5 rounded-full group-hover:shadow-neo-lg transition-shadow duration-300">
              <PhoneCall size={22} strokeWidth={2.5} />
            </div>
            <span className="hidden sm:inline">airtel</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  id={`nav-${link.path.replace('/', '') || 'home'}`}
                  className={`px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 ${
                    isActive
                      ? 'neo-active text-airtel-red font-bold'
                      : 'text-gray-600 hover:text-airtel-red hover:bg-neuro-bg/50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              to="/helpdesk"
              id="nav-support-btn"
              className="ml-3 neo-btn-red px-5 py-2 text-sm flex items-center gap-2"
            >
              <Headphones size={16} />
              Get Help
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden neo-card p-2.5 rounded-xl text-gray-700 hover:text-airtel-red transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Nav */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            mobileOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-4 pb-4 pt-2 space-y-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                    isActive
                      ? 'neo-active text-airtel-red font-bold'
                      : 'text-gray-600 hover:text-airtel-red'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              to="/helpdesk"
              className="block neo-btn-red px-4 py-3 text-center mt-3"
            >
              Get Help
            </Link>
          </div>
        </div>
      </nav>

      {/* Spacer */}
      <div className="h-[68px] lg:h-[72px]" />
    </>
  );
};

export default Navbar;
