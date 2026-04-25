import React, { useState } from 'react';
import { faqs } from '../data/mockData';
import FAQAccordion from '../components/FAQAccordion';
import { MessageCircle, MapPin, Phone, Send, Bot, User } from 'lucide-react';

const mockChatMessages = [
  { from: 'bot', text: 'Hi! Welcome to Airtel Support. How can I help you today?' },
  { from: 'user', text: 'I need help with my broadband connection.' },
  { from: 'bot', text: 'I\'d be happy to help! Could you please share your broadband account number or registered mobile number?' },
];

const Contact = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState(mockChatMessages);

  const sendMessage = () => {
    if (!chatInput.trim()) return;
    setMessages([...messages, { from: 'user', text: chatInput }]);
    setChatInput('');
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { from: 'bot', text: 'Thank you for your message. A support agent will connect with you shortly. (Demo mode)' },
      ]);
    }, 1000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-black text-gray-800">
          Support <span className="text-airtel-red">Center</span>
        </h1>
        <p className="text-gray-500 max-w-lg mx-auto">
          Find answers, chat with us, or locate your nearest Airtel store.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* FAQs */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-800">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <FAQAccordion key={idx} faq={faq} index={idx} />
            ))}
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Live Chat */}
          <div className="neo-card rounded-3xl overflow-hidden">
            <div className="gradient-red p-4 flex items-center justify-between">
              <div className="flex items-center gap-3 text-white">
                <MessageCircle size={20} />
                <div>
                  <h3 className="font-bold text-sm">Live Chat Support</h3>
                  <p className="text-xs text-white/70">AI Assistant • Online</p>
                </div>
              </div>
              <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse" />
            </div>

            {/* Chat body */}
            <div className="h-64 overflow-y-auto p-4 space-y-3 bg-neuro-surface/30">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-2 ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.from === 'bot' && (
                    <div className="w-7 h-7 rounded-full gradient-red flex items-center justify-center flex-shrink-0 mt-1">
                      <Bot size={14} className="text-white" />
                    </div>
                  )}
                  <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm ${
                    msg.from === 'user'
                      ? 'gradient-red text-white rounded-br-md'
                      : 'neo-card-flat text-gray-700 rounded-bl-md'
                  }`}>
                    {msg.text}
                  </div>
                  {msg.from === 'user' && (
                    <div className="w-7 h-7 rounded-full neo-inset-sm flex items-center justify-center flex-shrink-0 mt-1">
                      <User size={14} className="text-gray-500" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Chat input */}
            <div className="p-3 flex gap-2 border-t border-neuro-dark/10">
              <input
                id="chat-input"
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type a message..."
                className="neo-inset-sm flex-1 px-4 py-2.5 text-sm"
              />
              <button onClick={sendMessage} className="neo-btn-red p-2.5 rounded-xl">
                <Send size={16} />
              </button>
            </div>
          </div>

          {/* Contact info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="neo-card neo-card-hover p-6 flex items-center gap-4">
              <div className="p-3 neo-inset rounded-xl text-airtel-red">
                <Phone size={22} />
              </div>
              <div>
                <h4 className="font-bold text-gray-800 text-sm">Call Us</h4>
                <p className="text-xs text-gray-500">121 (Toll Free) • 24/7</p>
              </div>
            </div>
            <div className="neo-card neo-card-hover p-6 flex items-center gap-4">
              <div className="p-3 neo-inset rounded-xl text-airtel-red">
                <MapPin size={22} />
              </div>
              <div>
                <h4 className="font-bold text-gray-800 text-sm">Locate Store</h4>
                <p className="text-xs text-gray-500">Find nearest Airtel gallery</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
