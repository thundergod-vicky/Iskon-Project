'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrash, FaCheck, FaAddressCard, FaEnvelope, FaPhone, FaCalendarAlt, FaStar, FaFilter, FaSearch, FaCreditCard, FaUserCheck } from 'react-icons/fa';

export default function AdminMembershipRequests() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await fetch('/api/membership-requests');
      const data = await res.json();
      if (Array.isArray(data)) setRequests(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, updates: any) => {
    try {
      const res = await fetch(`/api/membership-requests/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      if (res.ok) fetchRequests();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteRequest = async (id: string) => {
    if (!confirm('Are you sure you want to delete this membership request?')) return;
    try {
      const res = await fetch(`/api/membership-requests/${id}`, { method: 'DELETE' });
      if (res.ok) fetchRequests();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredRequests = requests.filter(r => {
    const matchesFilter = filter === 'All' || r.status === filter;
    const matchesSearch = r.name.toLowerCase().includes(search.toLowerCase()) || 
                          r.email.toLowerCase().includes(search.toLowerCase()) ||
                          r.membershipLevelName?.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-gray-50 pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-black text-gray-900 mb-2">Membership Requests</h1>
            <p className="text-gray-500">Approve and track new members of the ISKCON family.</p>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search requests..." 
                className="pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none w-64 shadow-sm font-medium"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <select 
              className="px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none shadow-sm focus:ring-2 focus:ring-orange-500 font-bold text-gray-700"
              value={filter}
              onChange={e => setFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-400 font-medium">Fetching member requests...</div>
        ) : filteredRequests.length === 0 ? (
          <div className="text-center py-20 bg-white border border-gray-100 rounded-3xl font-bold text-gray-400">
             No applications found at the moment.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredRequests.map((r) => (
                <motion.div 
                  key={r._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-3xl p-8 shadow-md border border-gray-100 hover:shadow-xl transition-all flex flex-col"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div>
                        <h3 className="text-2xl font-black text-gray-900">{r.name}</h3>
                        <div className="flex items-center gap-2 mt-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest ${
                                r.status === 'Pending' ? 'bg-orange-100 text-orange-600' :
                                r.status === 'Approved' ? 'bg-teal-100 text-teal-600' :
                                'bg-gray-100 text-gray-400'
                            }`}>
                                {r.status}
                            </span>
                            {r.isPaid && (
                                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-1">
                                    <FaCheck className="text-[10px]" /> Paid
                                </span>
                            )}
                        </div>
                    </div>
                    <button onClick={() => deleteRequest(r._id)} className="p-3 text-red-200 hover:text-red-500 transition-colors"><FaTrash /></button>
                  </div>

                  <div className="bg-orange-50/50 rounded-2xl p-4 mb-6 border border-orange-50">
                     <p className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-1">Applying for</p>
                     <p className="text-lg font-black text-orange-700 flex items-center gap-2">
                        <FaStar className="text-orange-500" /> {r.membershipLevelName}
                     </p>
                  </div>

                  <div className="space-y-4 mb-10 flex-1">
                    <div className="flex items-center gap-4 text-gray-600">
                       <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center shrink-0"><FaEnvelope /></div>
                       <span className="text-sm font-bold truncate">{r.email}</span>
                    </div>
                    <div className="flex items-center gap-4 text-gray-600">
                       <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center shrink-0"><FaPhone /></div>
                       <span className="text-sm font-bold">{r.phone}</span>
                    </div>
                    <div className="flex items-center gap-4 text-gray-600">
                       <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center shrink-0"><FaCalendarAlt /></div>
                       <span className="text-sm font-medium">{new Date(r.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    {!r.isPaid && r.status === 'Pending' && (
                        <button 
                            onClick={() => updateStatus(r._id, { isPaid: true })}
                            className="w-full py-4 bg-orange-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-orange-600 shadow-lg shadow-orange-500/20"
                        >
                            <FaCreditCard /> Mark as Paid
                        </button>
                    )}
                    {r.status === 'Pending' && (
                        <button 
                            onClick={() => updateStatus(r._id, { status: 'Approved' })}
                            className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-black"
                        >
                            <FaUserCheck /> Approve Member
                        </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </main>
  );
}
