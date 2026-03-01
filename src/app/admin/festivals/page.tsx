'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaTrash, FaEdit, FaSave, FaTimes, FaCalendar, FaMapMarkerAlt, FaStar, FaInfoCircle, FaImage } from 'react-icons/fa';
import Image from 'next/image';

interface Festival {
  _id: string;
  name: string;
  date: string;
  description: string;
  image: string;
  location: string;
  significance: string[];
  preparations: string[];
  isMajor: boolean;
}

export default function AdminFestivalsPage() {
  const [festivals, setFestivals] = useState<Festival[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    description: '',
    image: '/images/events-and-festival.jpg',
    location: 'ISKCON Durgapur',
    significance: [] as string[],
    preparations: [] as string[],
    isMajor: false,
  });

  const [newSignificance, setNewSignificance] = useState('');
  const [newPreparation, setNewPreparation] = useState('');

  useEffect(() => {
    fetchFestivals();
  }, []);

  const fetchFestivals = async () => {
    try {
      const res = await fetch('/api/festivals');
      const data = await res.json();
      setFestivals(data);
    } catch (err) {
      console.error('Failed to fetch festivals:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (festival: Festival) => {
    setEditingId(festival._id);
    setFormData({
      name: festival.name,
      date: new Date(festival.date).toISOString().split('T')[0],
      description: festival.description,
      image: festival.image,
      location: festival.location,
      significance: festival.significance,
      preparations: festival.preparations,
      isMajor: festival.isMajor,
    });
    setIsAdding(false);
  };

  const handleSave = async () => {
    const url = editingId ? `/api/festivals/${editingId}` : '/api/festivals';
    const method = editingId ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        fetchFestivals();
        setEditingId(null);
        setIsAdding(false);
        resetForm();
      } else {
        const error = await res.json();
        alert(error.error || 'Failed to save festival');
      }
    } catch (err) {
      console.error('Save error:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this festival?')) return;

    try {
      const res = await fetch(`/api/festivals/${id}`, { method: 'DELETE' });
      if (res.ok) fetchFestivals();
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      date: '',
      description: '',
      image: '/images/events-and-festival.jpg',
      location: 'ISKCON Durgapur',
      significance: [],
      preparations: [],
      isMajor: false,
    });
    setNewSignificance('');
    setNewPreparation('');
    setEditingId(null);
    setIsAdding(false);
  };

  const addSignificance = () => {
    if (!newSignificance.trim()) return;
    setFormData({ ...formData, significance: [...formData.significance, newSignificance.trim()] });
    setNewSignificance('');
  };

  const removeSignificance = (idx: number) => {
    setFormData({ ...formData, significance: formData.significance.filter((_, i) => i !== idx) });
  };

  const addPreparation = () => {
    if (!newPreparation.trim()) return;
    setFormData({ ...formData, preparations: [...formData.preparations, newPreparation.trim()] });
    setNewPreparation('');
  };

  const removePreparation = (idx: number) => {
    setFormData({ ...formData, preparations: formData.preparations.filter((_, i) => i !== idx) });
  };

  return (
    <main className="min-h-screen bg-pink-50 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-black text-gray-900">Festival Management</h1>
            <p className="text-gray-500">Add and manage upcoming ISKCON festivals</p>
          </div>
          <button 
            onClick={() => { resetForm(); setIsAdding(true); }}
            className="bg-iskcon-orange text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-orange-600 transition-all shadow-lg"
          >
            <FaPlus /> Add Festival
          </button>
        </header>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* List Section */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Upcoming Festivals</h2>
            {loading ? (
              <div className="text-center py-12 text-gray-400">Loading festivals...</div>
            ) : festivals.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl border-2 border-dashed border-gray-200 text-gray-400">
                No festivals found. Add your first one!
              </div>
            ) : (
              festivals.map((festival) => (
                <motion.div 
                  key={festival._id}
                  layout
                  className={`bg-white p-4 rounded-2xl shadow-sm border-2 transition-all ${editingId === festival._id ? 'border-iskcon-orange ring-2 ring-orange-100' : 'border-transparent'}`}
                >
                  <div className="flex gap-4">
                    <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0">
                      <Image src={festival.image} alt={festival.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-gray-900">{festival.name}</h3>
                        <div className="flex gap-2">
                          <button onClick={() => handleEdit(festival)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"><FaEdit /></button>
                          <button onClick={() => handleDelete(festival._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><FaTrash /></button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                        <FaCalendar className="text-iskcon-orange text-xs" /> 
                        {new Date(festival.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </p>
                      <p className="text-xs text-gray-400 mt-2 line-clamp-2">{festival.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </section>

          {/* Form Section */}
          <section className="sticky top-24 h-fit">
            <AnimatePresence mode="wait">
              {(editingId || isAdding) && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white p-6 rounded-3xl shadow-xl border border-pink-100"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-900">
                      {editingId ? 'Edit Festival' : 'New Festival'}
                    </h2>
                    <button onClick={resetForm} className="text-gray-400 hover:text-gray-600 p-2"><FaTimes /></button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1 mb-1"><FaStar className="text-iskcon-orange" /> Name</label>
                      <input 
                        type="text" 
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-iskcon-orange"
                        placeholder="e.g., Sri Krishna Janmashtami"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1 mb-1"><FaCalendar className="text-iskcon-orange" /> Date</label>
                        <input 
                          type="date" 
                          value={formData.date}
                          onChange={e => setFormData({ ...formData, date: e.target.value })}
                          className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-iskcon-orange"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1 mb-1"><FaMapMarkerAlt className="text-iskcon-orange" /> Location</label>
                        <input 
                          type="text" 
                          value={formData.location}
                          onChange={e => setFormData({ ...formData, location: e.target.value })}
                          className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-iskcon-orange"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Description</label>
                      <textarea 
                        rows={3}
                        value={formData.description}
                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-iskcon-orange"
                        placeholder="Briefly describe the festival..."
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1 mb-1"><FaImage className="text-iskcon-orange" /> Image URL</label>
                      <input 
                        type="text" 
                        value={formData.image}
                        onChange={e => setFormData({ ...formData, image: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-iskcon-orange"
                        placeholder="/images/events-and-festival.jpg"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1 mb-1"><FaInfoCircle className="text-iskcon-orange" /> Significance</label>
                      <div className="flex gap-2 mb-2">
                        <input 
                          type="text"
                          value={newSignificance}
                          onChange={e => setNewSignificance(e.target.value)}
                          onKeyPress={e => e.key === 'Enter' && addSignificance()}
                          className="flex-1 bg-gray-50 border border-gray-100 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-iskcon-orange"
                          placeholder="Add a spiritual significance..."
                        />
                        <button onClick={addSignificance} className="bg-gray-100 text-gray-600 px-4 rounded-xl hover:bg-gray-200 transition-colors"><FaPlus /></button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {formData.significance.map((sig, i) => (
                          <span key={i} className="text-[10px] bg-orange-50 text-orange-600 px-3 py-1 rounded-full flex items-center gap-1 font-bold">
                            {sig} <FaTimes className="cursor-pointer" onClick={() => removeSignificance(i)} />
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1 mb-1"><FaPlus className="text-iskcon-orange" /> Preparations</label>
                      <div className="flex gap-2 mb-2">
                        <input 
                          type="text"
                          value={newPreparation}
                          onChange={e => setNewPreparation(e.target.value)}
                          onKeyPress={e => e.key === 'Enter' && addPreparation()}
                          className="flex-1 bg-gray-50 border border-gray-100 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-iskcon-orange"
                          placeholder="Add a preparation step..."
                        />
                        <button onClick={addPreparation} className="bg-gray-100 text-gray-600 px-4 rounded-xl hover:bg-gray-200 transition-colors"><FaPlus /></button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {formData.preparations.map((prep, i) => (
                          <span key={i} className="text-[10px] bg-blue-50 text-blue-600 px-3 py-1 rounded-full flex items-center gap-1 font-bold">
                            {prep} <FaTimes className="cursor-pointer" onClick={() => removePreparation(i)} />
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        id="isMajor" 
                        checked={formData.isMajor}
                        onChange={e => setFormData({ ...formData, isMajor: e.target.checked })}
                        className="w-4 h-4 text-iskcon-orange border-gray-300 rounded focus:ring-iskcon-orange"
                      />
                      <label htmlFor="isMajor" className="text-sm font-bold text-gray-600">Mark as Major Festival</label>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button 
                        onClick={handleSave}
                        className="flex-1 bg-iskcon-orange text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-orange-600 transition-all shadow-lg"
                      >
                        <FaSave /> {editingId ? 'Update' : 'Create'} Festival
                      </button>
                      <button 
                        onClick={resetForm}
                        className="bg-gray-100 text-gray-500 px-6 py-3 rounded-xl font-bold hover:bg-gray-200 transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        </div>
      </div>
    </main>
  );
}
