'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrash, FaCheck, FaAddressCard, FaEnvelope, FaPhone, FaCalendarAlt, FaUserEdit, FaFilter, FaSearch } from 'react-icons/fa';

export default function AdminVolunteers() {
  const [volunteers, setVolunteers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  useEffect(() => {
    fetchVolunteers();
  }, []);

  const fetchVolunteers = async () => {
    try {
      const res = await fetch('/api/volunteers');
      const data = await res.json();
      if (Array.isArray(data)) setVolunteers(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/volunteers/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) fetchVolunteers();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteVolunteer = async () => {
    if (!deleteConfirmId) return;
    try {
      const res = await fetch(`/api/volunteers/${deleteConfirmId}`, { method: 'DELETE' });
      if (res.ok) fetchVolunteers();
      setDeleteConfirmId(null);
    } catch (err) {
      console.error(err);
    }
  };

  const filteredVolunteers = volunteers.filter(v => {
    const matchesFilter = filter === 'All' || v.status === filter;
    const matchesSearch = v.name.toLowerCase().includes(search.toLowerCase()) || 
                          v.email.toLowerCase().includes(search.toLowerCase()) ||
                          v.areaOfInterest.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-gray-50 pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-black text-gray-900 mb-2">Volunteer Applications</h1>
            <p className="text-gray-500">Manage people who want to serve at ISKCON Durgapur.</p>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none w-64 shadow-sm"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <select 
              className="px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none shadow-sm focus:ring-2 focus:ring-teal-500 font-bold text-gray-700"
              value={filter}
              onChange={e => setFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Contacted">Contacted</option>
              <option value="Active">Active</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-400 font-medium">Fetching volunteer list...</div>
        ) : filteredVolunteers.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-100">
             <div className="text-4xl text-gray-200 mb-4 inline-block"><FaAddressCard /></div>
             <h3 className="text-xl font-bold text-gray-400">No volunteers found.</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredVolunteers.map((v) => (
                <motion.div 
                  key={v._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white rounded-3xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-xl font-black text-gray-900">{v.name}</h3>
                      <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest ${
                        v.status === 'Pending' ? 'bg-orange-100 text-orange-600' :
                        v.status === 'Contacted' ? 'bg-blue-100 text-blue-600' :
                        'bg-teal-100 text-teal-600'
                      }`}>
                        {v.status}
                      </span>
                    </div>
                    <button 
                      onClick={() => setDeleteConfirmId(v._id)}
                      className="p-3 bg-red-50 text-red-400 hover:bg-red-500 hover:text-white rounded-xl transition-all"
                    >
                      <FaTrash />
                    </button>
                  </div>

                  <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-3 text-gray-600">
                       <FaEnvelope className="text-teal-500" /> 
                       <span className="text-sm font-medium truncate">{v.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                       <FaPhone className="text-teal-500" /> 
                       <span className="text-sm font-medium">{v.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                       <FaCalendarAlt className="text-teal-500" /> 
                       <span className="text-sm font-medium">{v.availability || 'Flexible'}</span>
                    </div>
                    <div className="flex items-start gap-3 text-gray-600">
                       <FaUserEdit className="text-teal-500 mt-1" /> 
                       <span className="text-sm font-bold text-gray-800">{v.areaOfInterest}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {v.status === 'Pending' && (
                      <button 
                         onClick={() => updateStatus(v._id, 'Contacted')}
                         className="flex-1 py-3 bg-teal-50 text-teal-600 rounded-xl font-bold hover:bg-teal-600 hover:text-white transition-all text-sm"
                      >
                         Mark Contacted
                      </button>
                    )}
                    {(v.status === 'Pending' || v.status === 'Contacted') && (
                      <button 
                        onClick={() => updateStatus(v._id, 'Active')}
                        className="flex-1 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-all text-sm flex items-center justify-center gap-2"
                      >
                         <FaCheck className="text-xs" /> Approve
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirmId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm"
            onClick={() => setDeleteConfirmId(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-black text-center text-gray-900 mb-2">Delete Record?</h3>
              <p className="text-center text-gray-500 text-sm mb-8">
                 Are you sure you want to remove this volunteer application?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteConfirmId(null)}
                  className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={deleteVolunteer}
                  className="flex-1 px-4 py-3 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition-all shadow-lg shadow-red-500/30"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
