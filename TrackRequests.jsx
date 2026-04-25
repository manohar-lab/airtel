import React from 'react';
import { mockRequests } from '../data/mockData';
import { Search, Clock, CheckCircle, Activity } from 'lucide-react';

const getStatusStyle = (status) => {
  switch(status) {
    case 'Resolved': return { color: 'text-green-600', icon: CheckCircle };
    case 'In Progress': return { color: 'text-blue-600', icon: Activity };
    default: return { color: 'text-orange-500', icon: Clock };
  }
}

const TrackRequests = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800">Track <span className="text-airtel-red">Requests</span></h1>
      </div>

      <div className="neo-card p-6 flex items-center gap-4">
        <input type="text" placeholder="Enter SR Number (e.g., SR-8823910)" className="neo-inset w-full p-4" />
        <button className="neo-btn-red p-4 flex-shrink-0"><Search size={24} /></button>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-bold text-gray-800 px-2">Recent Service Requests</h2>
        {mockRequests.map((req, idx) => {
          const StatusIcon = getStatusStyle(req.status).icon;
          return (
            <div key={idx} className="neo-card p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h4 className="font-bold text-lg text-gray-800">{req.id}</h4>
                <p className="text-gray-500 text-sm">{req.type} • Raised on {req.date}</p>
              </div>
              <div className={`neo-inset px-4 py-2 rounded-full flex items-center gap-2 font-bold text-sm ${getStatusStyle(req.status).color}`}>
                <StatusIcon size={16} />
                {req.status}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default TrackRequests;