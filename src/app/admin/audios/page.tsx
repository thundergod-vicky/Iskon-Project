'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaTrash, FaEdit, FaSave, FaTimes, FaMusic, FaUser, FaClock, FaInfoCircle, FaTag, FaImage, FaLink, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import Image from 'next/image';

interface Audio {
  _id: string;
  title: string;
  speaker: string;
  audioUrl: string;
  duration: string;
  description: string;
  category: 'Lecture' | 'Kirtan' | 'Bhajan' | 'Guided Meditation' | 'Other';
  tags: string[];
  image: string;
  isActive: boolean;
}

export default function AdminAudioPage() {
  const [audios, setAudios] = useState<Audio[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  
  // Form State
  const [formData, setFormData] = useState({
    title: '',
    speaker: 'Srila Prabhupada',
    audioUrl: '',
    duration: '',
    description: '',
    category: 'Lecture' as const,
    tags: [] as string[],
    image: '/images/audio-placeholder.jpg',
    isActive: true,
  });

  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    fetchAudios();
  }, []);

  const fetchAudios = async () => {
    try {
      const res = await fetch('/api/audios');
      const data = await res.json();
      setAudios(data);
    } catch (err) {
      console.error('Failed to fetch audios:', err);
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleEdit = (audio: Audio) => {
    setEditingId(audio._id);
    setFormData({
      title: audio.title,
      speaker: audio.speaker,
      audioUrl: audio.audioUrl,
      duration: audio.duration,
      description: audio.description,
      category: audio.category,
      tags: audio.tags,
      image: audio.image,
      isActive: audio.isActive,
    });
    setIsAdding(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSave = async () => {
    if (!formData.title || !formData.audioUrl) {
      showMessage('error', 'Title and Audio URL are required');
      return;
    }

    const url = editingId ? `/api/audios/${editingId}` : '/api/audios';
    const method = editingId ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        showMessage('success', `Audio ${editingId ? 'updated' : 'created'} successfully`);
        fetchAudios();
        resetForm();
      } else {
        const error = await res.json();
        showMessage('error', error.error || 'Failed to save audio');
      }
    } catch (err) {
      console.error('Save error:', err);
      showMessage('error', 'An error occurred while saving');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this audio resource?')) return;

    try {
      const res = await fetch(`/api/audios/${id}`, { method: 'DELETE' });
      if (res.ok) {
        showMessage('success', 'Audio deleted successfully');
        fetchAudios();
      }
    } catch (err) {
      console.error('Delete error:', err);
      showMessage('error', 'Failed to delete audio');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      speaker: 'Srila Prabhupada',
      audioUrl: '',
      duration: '',
      description: '',
      category: 'Lecture',
      tags: [],
      image: '/images/audio-placeholder.jpg',
      isActive: true,
    });
    setNewTag('');
    setEditingId(null);
    setIsAdding(false);
  };

  const addTag = () => {
    if (!newTag.trim()) return;
    if (formData.tags.includes(newTag.trim())) return;
    setFormData({ ...formData, tags: [...formData.tags, newTag.trim()] });
    setNewTag('');
  };

  const removeTag = (tagToRemove: string) => {
    setFormData({ ...formData, tags: formData.tags.filter(tag => tag !== tagToRemove) });
  };

  return (
    <main className="min-h-screen bg-pink-50 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-black text-gray-900">Audio Management</h1>
            <p className="text-gray-500">Add and manage spiritual audio resources</p>
          </div>
          {!isAdding && !editingId && (
            <button 
              onClick={() => setIsAdding(true)}
              className="bg-iskcon-orange text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-orange-600 transition-all shadow-lg"
            >
              <FaPlus /> Add New Audio
            </button>
          )}
        </header>

        <AnimatePresence>
          {message && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`mb-6 p-4 rounded-xl flex items-center gap-3 font-bold ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
            >
              {message.type === 'success' ? <FaCheckCircle /> : <FaExclamationCircle />}
              {message.text}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <section>
            {(isAdding || editingId) ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-6 rounded-3xl shadow-xl border border-pink-100 sticky top-24"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    {editingId ? 'Edit Audio Resource' : 'New Audio Resource'}
                  </h2>
                  <button onClick={resetForm} className="text-gray-400 hover:text-gray-600 p-2"><FaTimes /></button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1 mb-1"><FaMusic className="text-iskcon-orange" /> Title</label>
                    <input 
                      type="text" 
                      value={formData.title}
                      onChange={e => setFormData({ ...formData, title: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-iskcon-orange"
                      placeholder="e.g., The Process of Devotional Service"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1 mb-1"><FaUser className="text-iskcon-orange" /> Speaker</label>
                      <input 
                        type="text" 
                        value={formData.speaker}
                        onChange={e => setFormData({ ...formData, speaker: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-iskcon-orange"
                        placeholder="Srila Prabhupada"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1 mb-1"><FaClock className="text-iskcon-orange" /> Duration</label>
                      <input 
                        type="text" 
                        value={formData.duration}
                        onChange={e => setFormData({ ...formData, duration: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-iskcon-orange"
                        placeholder="e.g., 45:32"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1 mb-1"><FaLink className="text-iskcon-orange" /> Audio URL (Direct MP3 Link)</label>
                    <input 
                      type="text" 
                      value={formData.audioUrl}
                      onChange={e => setFormData({ ...formData, audioUrl: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-iskcon-orange font-mono"
                      placeholder="https://example.com/audio.mp3"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Category</label>
                    <select 
                      value={formData.category}
                      onChange={e => setFormData({ ...formData, category: e.target.value as any })}
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-iskcon-orange"
                    >
                      <option value="Lecture">Lecture</option>
                      <option value="Kirtan">Kirtan</option>
                      <option value="Bhajan">Bhajan</option>
                      <option value="Guided Meditation">Guided Meditation</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Description</label>
                    <textarea 
                      rows={3}
                      value={formData.description}
                      onChange={e => setFormData({ ...formData, description: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-iskcon-orange"
                      placeholder="Brief summary of the audio content..."
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1 mb-1"><FaTag className="text-iskcon-orange" /> Tags</label>
                    <div className="flex gap-2 mb-2">
                      <input 
                        type="text"
                        value={newTag}
                        onChange={e => setNewTag(e.target.value)}
                        onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addTag())}
                        className="flex-1 bg-gray-50 border border-gray-100 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-iskcon-orange"
                        placeholder="Add a tag..."
                      />
                      <button type="button" onClick={addTag} className="bg-gray-100 text-gray-600 px-4 rounded-xl hover:bg-gray-200 transition-colors"><FaPlus /></button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.map((tag) => (
                        <span key={tag} className="text-[10px] bg-orange-50 text-orange-600 px-3 py-1 rounded-full flex items-center gap-1 font-bold">
                          {tag} <FaTimes className="cursor-pointer" onClick={() => removeTag(tag)} />
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      id="isActive" 
                      checked={formData.isActive}
                      onChange={e => setFormData({ ...formData, isActive: e.target.checked })}
                      className="w-4 h-4 text-iskcon-orange border-gray-300 rounded focus:ring-iskcon-orange"
                    />
                    <label htmlFor="isActive" className="text-sm font-bold text-gray-600">Active (Visible to public)</label>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button 
                      onClick={handleSave}
                      className="flex-1 bg-iskcon-orange text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-orange-600 transition-all shadow-lg"
                    >
                      <FaSave /> {editingId ? 'Update' : 'Create'} Audio
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
            ) : (
              <div className="bg-white p-8 rounded-3xl border-2 border-dashed border-gray-200 text-center text-gray-400">
                <FaMusic className="text-4xl mx-auto mb-4 opacity-20" />
                <p>Select an audio to edit or click "Add New Audio" to start.</p>
              </div>
            )}
          </section>

          {/* List Section */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              All Audios <span className="bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded-full">{audios.length}</span>
            </h2>
            {loading ? (
              <div className="text-center py-12 text-gray-400">Loading audio library...</div>
            ) : audios.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 text-gray-400">
                No audio resources found.
              </div>
            ) : (
              audios.map((audio) => (
                <motion.div 
                  key={audio._id}
                  layout
                  className={`bg-white p-4 rounded-2xl shadow-sm border-2 transition-all ${editingId === audio._id ? 'border-iskcon-orange ring-2 ring-orange-100' : 'border-transparent hover:border-pink-100'}`}
                >
                  <div className="flex gap-4">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-pink-50 flex items-center justify-center">
                       <FaMusic className="text-iskcon-orange text-xl opacity-50" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-gray-900 leading-tight">{audio.title}</h3>
                        <div className="flex gap-1">
                          <button onClick={() => handleEdit(audio)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"><FaEdit /></button>
                          <button onClick={() => handleDelete(audio._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"><FaTrash /></button>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <FaUser className="text-iskcon-orange" /> {audio.speaker}
                        </p>
                        <p className="text-xs text-gray-400 flex items-center gap-1">
                          <FaClock /> {audio.duration || 'N/A'}
                        </p>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                          audio.category === 'Lecture' ? 'bg-blue-100 text-blue-600' :
                          audio.category === 'Kirtan' ? 'bg-purple-100 text-purple-600' :
                          'bg-orange-100 text-orange-600'
                        }`}>
                          {audio.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
