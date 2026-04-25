import React from 'react';

const Footer = () => {
  return (
    <footer className="neo-card rounded-none rounded-t-3xl mt-auto py-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} Airtel Clone Portal. Frontend Only.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="#" className="hover:text-airtel-red transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-airtel-red transition-colors">Terms of Service</a>
          <a href="/contact" className="hover:text-airtel-red transition-colors">Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;