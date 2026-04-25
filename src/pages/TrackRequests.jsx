import React, { useState } from 'react';
import { mockRequests } from '../data/mockData';
import { Search, Clock, CheckCircle, Activity, AlertTriangle, Filter } from 'lucide-react';

const getStatusConfig = (status) => {
  switch (status) {
    case 'Resolved':
      return { color: 'text-green-600', bg: 'bg-green-50', icon: CheckCircle };
    case 'In Progress':
      return { color: 'text-blue-600', bg: 'bg-blue-50', icon: Activity };
    default:
      return { color: 'text-orange-500', bg: 'bg-orange-50', icon: Clock };
  }
};

const TrackRequests = () => {
  const [searchId, setSearchId] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = mockRequests.filter((req) => {
    const matchesSearch = !searchId || req.id.toLowerCase().includes(searchId.toLowerCase());
    const matchesFilter = filter === 'all' || req.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-black text-gray-800">
          Track <span className="text-airtel-red">Requests</span>
        </h1>
        <p className="text-gray-500">Monitor the status of your service requests</p>
      </div>

      {/* Search */}
      <div className="neo-card p-5 flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            id="track-search-input"
            type="text"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="Enter SR Number (e.g., SR-8823910)"
            className="neo-inset w-full p-4 pl-12 text-sm"
          />
        </div>
        <button className="neo-btn-red px-6 py-4 flex-shrink-0 text-sm font-bold">
          <Search size={18} />
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap px-1">
        <Filter size={16} className="text-gray-400" />
        {['all', 'Pending', 'In Progress', 'Resolved'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`tab-pill text-xs ${filter === f ? 'tab-pill-active' : 'tab-pill-inactive'}`}
          >
            {f === 'all' ? 'All' : f}
          </button>
        ))}
      </div>

      {/* Request List */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-gray-800 px-1">
          Service Requests ({filtered.length})
        </h2>

        {filtered.length === 0 ? (
          <div className="neo-inset p-10 text-center text-gray-500 rounded-2xl space-y-2">
            <AlertTriangle size={32} className="mx-auto text-gray-400" />
            <p className="font-semibold">No requests found</p>
            <p className="text-sm">Try a different search or filter</p>
          </div>
        ) : (
          filtered.map((req) => {
            const status = getStatusConfig(req.status);
            const StatusIcon = status.icon;
            return (
              <div
                key={req.id}
                className="neo-card p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all hover:shadow-neo-lg"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="font-black text-gray-800">{req.id}</h4>
                    <span className="neo-badge text-gray-500 text-[10px]">{req.type}</span>
                  </div>
                  <p className="text-sm text-gray-500 truncate">{req.description}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Raised: {req.date} • Last Update: {req.lastUpdate}
                  </p>
                </div>
                <div className={`neo-inset-sm px-4 py-2 rounded-full flex items-center gap-2 font-bold text-xs ${status.color} flex-shrink-0`}>
                  <StatusIcon size={14} />
                  {req.status}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default TrackRequests;
