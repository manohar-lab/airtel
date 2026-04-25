import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingHelpButton from './components/FloatingHelpButton';
import Home from './pages/Home';
import Recharge from './pages/Recharge';
import Bundles from './pages/Bundles';
import Plans from './pages/Plans';
import HelpDesk from './pages/HelpDesk';
import TrackRequests from './pages/TrackRequests';
import Contact from './pages/Contact';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-neuro-bg">
      <Navbar />
      <main className="flex-grow px-4 md:px-8 pb-16 max-w-7xl mx-auto w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recharge" element={<Recharge />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/bundles" element={<Bundles />} />
          <Route path="/helpdesk" element={<HelpDesk />} />
          <Route path="/track-request" element={<TrackRequests />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
      <FloatingHelpButton />
    </div>
  );
}

export default App;
