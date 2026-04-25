import React, { useState } from 'react';
import { faqs } from '../data/mockData';
import { MessageCircle, MapPin, ChevronDown, ChevronUp } from 'lucide-react';

const FAQAccordion = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="neo-card overflow-hidden">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full p-6 text-left flex justify-between items-center font-bold text-gray-800">
        {faq.question}
        {isOpen ? <ChevronUp className="text-airtel-red" /> : <ChevronDown className="text-gray-400" />}
      </button>
      {isOpen && <div className="px-6 pb-6 text-gray-600 border-t border-gray-300/30 pt-4">{faq.answer}</div>}
    </div>
  );
}

const Contact = () => {
  return (
    <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div className="space-y-8">
        <h1 className="text-4xl font-extrabold text-gray-800">Contact & <span className="text-airtel-red">FAQs</span></h1>
        
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-700">Frequently Asked Questions</h2>
          {faqs.map((faq, idx) => <FAQAccordion key={idx} faq={faq} />)}
        </div>
      </div>

      <div className="space-y-8">
        {/* Live Chat Mockup */}
        <div className="neo-card p-8 flex flex-col items-center justify-center text-center gap-4 h-64 neo-card-hover">
          <div className="p-4 neo-inset rounded-full text-airtel-red">
            <MessageCircle size={36} />
          </div>
          <h3 className="font-bold text-xl text-gray-800">Live Chat Support</h3>
          <p className="text-gray-500 text-sm">Chat with our AI assistant or connect to an agent instantly.</p>
          <button className="neo-btn-red px-6 py-2 mt-2">Start Chat</button>
        </div>

        {/* Service Center Locator */}
        <div className="neo-inset p-8 flex items-center gap-6">
          <MapPin size={40} className="text-airtel-red" />
          <div>
            <h3 className="font-bold text-lg text-gray-800">Locate a Store</h3>
            <p className="text-gray-500 text-sm">Find your nearest Airtel gallery.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Contact;