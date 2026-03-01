'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaPlus, FaEdit, FaTrash, FaSave, FaTimes, FaPlusCircle, 
  FaQuoteLeft, FaTags, FaInfoCircle, FaCheckCircle, FaExclamationTriangle 
} from 'react-icons/fa';

interface IQuote {
  _id: string;
  text: string;
  source: string;
  date?: string;
  tags: string[];
  active: boolean;
}

export default function AdminQuotesPage() {
  const [quotes, setQuotes] = useState<IQuote[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    text: '',
    source: '',
    date: '',
    tags: '',
    active: true
  });

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/quotes');
      if (res.ok) {
        const data = await res.json();
        setQuotes(data);
      }
    } catch (err) {
      console.error('Failed to fetch quotes:', err);
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, tags: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '')
    };

    try {
      const url = editingId ? `/api/quotes/${editingId}` : '/api/quotes';
      const method = editingId ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        showMessage('success', editingId ? 'Quote updated successfully!' : 'Quote added successfully!');
        setFormData({ text: '', source: '', date: '', tags: '', active: true });
        setIsAdding(false);
        setEditingId(null);
        fetchQuotes();
      } else {
        const data = await res.json();
        showMessage('error', data.error || 'Operation failed');
      }
    } catch (err) {
      showMessage('error', 'Network error occurred');
    }
  };

  const handleEdit = (quote: IQuote) => {
    setFormData({
      text: quote.text,
      source: quote.source,
      date: quote.date || '',
      tags: quote.tags.join(', '),
      active: quote.active
    });
    setEditingId(quote._id);
    setIsAdding(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this quote?')) return;

    try {
      const res = await fetch(`/api/quotes/${id}`, { method: 'DELETE' });
      if (res.ok) {
        showMessage('success', 'Quote deleted successfully');
        fetchQuotes();
      } else {
        showMessage('error', 'Failed to delete quote');
      }
    } catch (err) {
      showMessage('error', 'Network error occurred');
    }
  };

  const cancelForm = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({ text: '', source: '', date: '', tags: '', active: true });
  };

  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 bg-white p-8 rounded-[2.5rem] shadow-sm border border-pink-100">
          <div>
            <h1 className="text-3xl font-black text-gray-900 mb-1">Quotes Management</h1>
            <p className="text-gray-500 text-sm">Add and manage Srila Prabhupada's divine instructions</p>
          </div>
          {!isAdding && (
            <button
              onClick={() => setIsAdding(true)}
              className="mt-4 md:mt-0 flex items-center gap-2 bg-iskcon-orange text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-orange-200 hover:scale-105 transition-all text-sm"
            >
              <FaPlus /> Add New Quote
            </button>
          )}
        </div>

        {/* Status Message */}
        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`mb-6 p-4 rounded-2xl flex items-center gap-3 shadow-sm border ${
                message.type === 'success' 
                  ? 'bg-green-50 text-green-700 border-green-100' 
                  : 'bg-red-50 text-red-700 border-red-100'
              }`}
            >
              {message.type === 'success' ? <FaCheckCircle /> : <FaExclamationTriangle />}
              <span className="font-semibold text-sm">{message.text}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Add/Edit Form */}
        <AnimatePresence>
          {isAdding && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-10 overflow-hidden"
            >
              <div className="bg-white p-8 rounded-[2.5rem] shadow-md border border-pink-100">
                <div className="flex justify-between items-center mb-6">
                   <h2 className="text-xl font-black text-gray-900 flex items-center gap-2">
                    {editingId ? <FaEdit className="text-iskcon-orange" /> : <FaPlusCircle className="text-iskcon-orange" />}
                    {editingId ? 'Edit Quote' : 'Create New Quote'}
                  </h2>
                  <button onClick={cancelForm} className="text-gray-400 hover:text-red-500 transition-colors">
                    <FaTimes size={20} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Quote Text</label>
                    <textarea
                      name="text"
                      required
                      placeholder="Enter Srila Prabhupada's quote..."
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-iskcon-orange/20 h-40 resize-none transition-all leading-relaxed"
                      value={formData.text}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Source / Book</label>
                      <input
                        type="text"
                        name="source"
                        required
                        placeholder="e.g. Bhagavad-gita 2.13, Purport"
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-iskcon-orange/20 transition-all font-medium"
                        value={formData.source}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Date (Optional)</label>
                      <input
                        type="text"
                        name="date"
                        placeholder="e.g. London, August 1973"
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-iskcon-orange/20 transition-all font-medium"
                        value={formData.date}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2 flex items-center gap-2">
                      <FaTags /> Tags (comma separated)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. devotion, karma, chanting"
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-iskcon-orange/20 transition-all font-medium"
                      value={formData.tags}
                      onChange={handleTagsChange}
                    />
                  </div>

                  <div className="flex items-center gap-4 pt-4">
                    <button
                      type="submit"
                      className="flex-1 bg-iskcon-orange text-white py-4 rounded-2xl font-black shadow-lg shadow-orange-100 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                    >
                      <FaSave /> {editingId ? 'Update Quote' : 'Save Divine Instruction'}
                    </button>
                    <button
                      type="button"
                      onClick={cancelForm}
                      className="px-8 py-4 border-2 border-gray-100 text-gray-400 rounded-2xl font-bold hover:bg-gray-50 hover:text-gray-600 transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quotes List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4 px-4">
             <h3 className="text-gray-400 text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2">
              <FaQuoteLeft /> Live Quotes Pool ({quotes.length})
            </h3>
            <div className="flex items-center gap-2 text-[10px] text-gray-400 uppercase font-black tracking-widest bg-gray-100 px-3 py-1 rounded-full">
              <FaInfoCircle className="text-iskcon-orange" /> Real-time Database
            </div>
          </div>

          {loading ? (
             <div className="text-center py-20 bg-white rounded-[2.5rem] border border-pink-50 shadow-sm">
                <div className="w-12 h-12 border-4 border-iskcon-orange border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-400 text-sm font-medium">Synching with database...</p>
             </div>
          ) : quotes.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-[3rem] border border-pink-50 shadow-sm">
              <div className="text-gray-200 mb-4 inline-block bg-pink-50 p-6 rounded-full"><FaQuoteLeft size={40} /></div>
              <p className="text-gray-400 font-medium italic">Your quotes pool is currently empty.</p>
              <button onClick={() => setIsAdding(true)} className="mt-4 text-iskcon-orange font-bold text-sm hover:underline">Start adding now</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {quotes.map((quote) => (
                <motion.div
                  key={quote._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white p-6 rounded-[2rem] shadow-sm hover:shadow-md transition-all border border-pink-50 flex items-center justify-between group"
                >
                  <div className="flex-1 pr-8">
                    <p className="text-gray-800 font-medium mb-2 line-clamp-2 italic leading-relaxed">"{quote.text}"</p>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] bg-pink-50 text-iskcon-orange px-2 py-0.5 rounded-md font-black uppercase tracking-tighter">
                        {quote.source}
                      </span>
                      {quote.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">#{tag}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(quote)}
                      className="p-3 bg-gray-50 text-gray-400 hover:bg-iskcon-orange hover:text-white rounded-xl transition-all shadow-sm"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(quote._id)}
                      className="p-3 bg-gray-50 text-gray-400 hover:bg-red-500 hover:text-white rounded-xl transition-all shadow-sm"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
