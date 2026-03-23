'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaTrash, FaEdit, FaSave, FaTimes, FaGripLines, FaCrown, FaCheckCircle, FaStar, FaHandsHelping } from 'react-icons/fa';

export default function AdminMembershipLevels() {
  const [levels, setLevels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    title: '', price: 0, subtitle: '', benefits: [''], featured: false, order: 0
  });

  const iconOptions = [
    { name: 'FaStar', icon: <FaStar /> },
    { name: 'FaCrown', icon: <FaCrown /> },
    { name: 'FaHandsHelping', icon: <FaHandsHelping /> }
  ];

  useEffect(() => {
    fetchLevels();
  }, []);

  const fetchLevels = async () => {
    try {
      const res = await fetch('/api/membership-levels');
      const data = await res.json();
      if (Array.isArray(data)) setLevels(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingId ? `/api/membership-levels/${editingId}` : '/api/membership-levels';
      const method = editingId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        fetchLevels();
        setIsAdding(false);
        setEditingId(null);
        setFormData({
          title: '', price: 0, subtitle: '', benefits: [''], featured: false, order: 0
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (level: any) => {
    setEditingId(level._id);
    setIsAdding(true);
    setFormData({
      title: level.title,
      price: level.price,
      subtitle: level.subtitle,
      benefits: level.benefits.length > 0 ? level.benefits : [''],
      featured: level.featured,
      order: level.order
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this membership level?')) return;
    try {
      const res = await fetch(`/api/membership-levels/${id}`, { method: 'DELETE' });
      if (res.ok) fetchLevels();
    } catch (err) {
      console.error(err);
    }
  };

  const handleBenefitChange = (index: number, val: string) => {
    const newBenefits = [...formData.benefits];
    newBenefits[index] = val;
    setFormData({ ...formData, benefits: newBenefits });
  };

  const addBenefit = () => setFormData({ ...formData, benefits: [...formData.benefits, ''] });
  const removeBenefit = (i: number) => {
    const newBenefits = formData.benefits.filter((_, idx) => idx !== i);
    setFormData({ ...formData, benefits: newBenefits.length > 0 ? newBenefits : [''] });
  };

  return (
    <main className="min-h-screen bg-gray-50 pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-black text-gray-900 mb-2">Membership Levels</h1>
            <p className="text-gray-500">Customize the tiers and benefits of temple memberships.</p>
          </div>
          {!isAdding && (
            <button 
              onClick={() => setIsAdding(true)} 
              className="px-6 py-4 bg-gray-900 text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-black transition-all shadow-lg"
            >
              <FaPlus /> Add New Level
            </button>
          )}
        </div>

        <AnimatePresence>
          {isAdding && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="mb-10 overflow-hidden">
               <div className="bg-white border border-gray-100 rounded-[2rem] p-8 md:p-12 shadow-2xl relative">
                  <button onClick={() => { setIsAdding(false); setEditingId(null); }} className="absolute top-8 right-8 text-gray-400 hover:text-red-500 transition-colors">
                    <FaTimes className="text-2xl" />
                  </button>

                  <h2 className="text-3xl font-black text-gray-900 mb-8">{editingId ? 'Edit Membership Level' : 'New Membership Level'}</h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                       <div className="space-y-4">
                          <div>
                            <label className="text-xs font-bold text-gray-500 uppercase ml-1 mb-1 block">Level Title</label>
                            <input 
                              type="text" required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })}
                              className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 focus:bg-white focus:ring-2 focus:ring-orange-500 outline-none transition-all font-bold"
                              placeholder="e.g. Patron Member"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-bold text-gray-500 uppercase ml-1 mb-1 block">Price (₹)</label>
                            <input 
                              type="number" required value={formData.price} onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
                              className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 focus:bg-white focus:ring-2 focus:ring-orange-500 outline-none transition-all font-bold"
                              placeholder="Amount"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-bold text-gray-500 uppercase ml-1 mb-1 block">Subtitle / Duration</label>
                            <input 
                              type="text" value={formData.subtitle} onChange={e => setFormData({ ...formData, subtitle: e.target.value })}
                              className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 focus:bg-white focus:ring-2 focus:ring-orange-500 outline-none transition-all font-medium"
                              placeholder="e.g. Per Year"
                            />
                          </div>
                          <div className="flex items-center gap-3 pt-4">
                             <input 
                               type="checkbox" checked={formData.featured} onChange={e => setFormData({ ...formData, featured: e.target.checked })}
                               className="w-5 h-5 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                             />
                             <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Featured (Popular)</label>
                          </div>
                       </div>

                       <div className="md:col-span-2 space-y-4">
                          <label className="text-xs font-bold text-gray-500 uppercase ml-1 mb-1 block">Level Benefits</label>
                          <div className="space-y-3">
                             {formData.benefits.map((benefit, i) => (
                               <div key={i} className="flex gap-2">
                                  <input 
                                    type="text" required value={benefit} onChange={e => handleBenefitChange(i, e.target.value)}
                                    className="flex-1 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 focus:bg-white focus:ring-2 focus:ring-orange-500 outline-none transition-all font-medium"
                                    placeholder="Add a benefit..."
                                  />
                                  <button type="button" onClick={() => removeBenefit(i)} className="p-3 text-red-300 hover:text-red-500"><FaTrash /></button>
                               </div>
                             ))}
                          </div>
                          <button type="button" onClick={addBenefit} className="text-sm font-bold text-orange-500 hover:text-orange-600 flex items-center gap-2 px-2 py-4">
                             <FaPlus className="text-xs" /> Add Another Benefit
                          </button>
                       </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-6 border-t border-gray-50">
                       <button type="button" onClick={() => { setIsAdding(false); setEditingId(null); }} className="px-8 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition-all">Cancel</button>
                       <button type="submit" className="px-10 py-3 bg-orange-500 text-white rounded-xl font-black shadow-lg hover:shadow-xl hover:bg-orange-600 transition-all flex items-center gap-2">
                          <FaSave /> {editingId ? 'Update Level' : 'Save Membership Level'}
                       </button>
                    </div>
                  </form>
               </div>
            </motion.div>
          )}
        </AnimatePresence>

        {loading ? (
          <div className="text-center py-20 text-gray-400 font-medium">Loading memberships...</div>
        ) : levels.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm font-bold text-gray-400">
            No membership levels defined yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {levels.map((level) => (
                <motion.div 
                   key={level._id} 
                   layout 
                   initial={{ opacity: 0, scale: 0.95 }}
                   animate={{ opacity: 1, scale: 1 }}
                   className={`bg-white rounded-3xl shadow-xl overflow-hidden border-2 flex flex-col ${level.featured ? 'border-orange-500' : 'border-transparent'}`}
                >
                    <div className="bg-orange-50 p-8 text-center border-b border-orange-100 relative">
                        <div className="flex gap-2 absolute top-6 right-6">
                            <button onClick={() => handleEdit(level)} className="p-2 text-gray-400 hover:text-orange-500 shadow-sm bg-white rounded-lg transition-all"><FaEdit /></button>
                            <button onClick={() => handleDelete(level._id)} className="p-2 text-gray-400 hover:text-red-500 shadow-sm bg-white rounded-lg transition-all"><FaTrash /></button>
                        </div>
                        <h3 className="text-2xl font-black text-gray-800 mb-2">{level.title}</h3>
                        <div className="text-4xl font-extrabold text-gray-900 mb-1">₹{level.price}</div>
                        <div className="text-sm font-bold text-gray-500 uppercase tracking-widest leading-6">{level.subtitle}</div>
                    </div>
                    <div className="p-8 flex-1 flex flex-col">
                        <ul className="space-y-3 mb-8 flex-1">
                            {level.benefits.map((b: string, i: number) => (
                                <li key={i} className="flex items-start text-sm text-gray-600 font-medium">
                                    <FaCheckCircle className="mt-0.5 mr-2 text-orange-500 shrink-0" /> {b}
                                </li>
                            ))}
                        </ul>
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
