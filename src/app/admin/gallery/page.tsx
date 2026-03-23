'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaPlus, FaEdit, FaTrash, FaSave, FaTimes, FaPlusCircle, 
  FaCheckCircle, FaExclamationTriangle, FaImage 
} from 'react-icons/fa';

interface IGallery {
  _id: string;
  title: string;
  src: string;
  thumbnail: string;
  category: string;
  description?: string;
  width: number;
  height: number;
  active: boolean;
}

export default function AdminGalleryPage() {
  const [images, setImages] = useState<IGallery[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    src: '',
    thumbnail: '',
    category: 'All',
    description: '',
    width: 1920,
    height: 1080,
    active: true
  });

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/gallery');
      if (res.ok) {
        const data = await res.json();
        setImages(data);
      }
    } catch (err) {
      console.error('Failed to fetch images:', err);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingId ? `/api/gallery/${editingId}` : '/api/gallery';
      const method = editingId ? 'PUT' : 'POST';
      
      const payload = { ...formData, width: Number(formData.width), height: Number(formData.height) };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        showMessage('success', editingId ? 'Image updated!' : 'Image added!');
        cancelForm();
        fetchImages();
      } else {
        const data = await res.json();
        showMessage('error', data.error || 'Operation failed');
      }
    } catch (err) {
      showMessage('error', 'Network error occurred');
    }
  };

  const handleEdit = (image: IGallery) => {
    setFormData({
      title: image.title,
      src: image.src,
      thumbnail: image.thumbnail || image.src,
      category: image.category || 'All',
      description: image.description || '',
      width: image.width || 1920,
      height: image.height || 1080,
      active: typeof image.active === 'boolean' ? image.active : true
    });
    setEditingId(image._id);
    setIsAdding(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteClick = (id: string) => {
    setDeleteConfirmId(id);
  };

  const executeDelete = async () => {
    if (!deleteConfirmId) return;
    const id = deleteConfirmId;
    setDeleteConfirmId(null);
    
    try {
      const res = await fetch(`/api/gallery/${id}`, { method: 'DELETE' });
      if (res.ok) {
        showMessage('success', 'Image deleted successfully');
        fetchImages();
      } else {
        showMessage('error', 'Failed to delete');
      }
    } catch (err) {
      showMessage('error', 'Network error occurred');
    }
  };

  const cancelForm = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({ title: '', src: '', thumbnail: '', category: 'All', description: '', width: 1920, height: 1080, active: true });
  };

  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
          <div>
            <h1 className="text-3xl font-black text-gray-900 mb-1">Gallery Management</h1>
            <p className="text-gray-500 text-sm">Upload images and manage photo gallery</p>
          </div>
          {!isAdding && (
            <button
              onClick={() => setIsAdding(true)}
              className="mt-4 md:mt-0 flex items-center gap-2 bg-iskcon-orange text-white px-8 py-3 rounded-2xl font-bold hover:scale-105 transition-all text-sm"
            >
              <FaPlus /> Add New Image
            </button>
          )}
        </div>

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

        <AnimatePresence>
          {isAdding && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-10 overflow-hidden"
            >
              <div className="bg-white p-8 rounded-[2.5rem] shadow-md border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                   <h2 className="text-xl font-black text-gray-900 flex items-center gap-2">
                    {editingId ? <FaEdit className="text-iskcon-orange" /> : <FaPlusCircle className="text-iskcon-orange" />}
                    {editingId ? 'Edit Image' : 'Add New Image'}
                  </h2>
                  <button onClick={cancelForm} className="text-gray-400 hover:text-red-500 transition-colors">
                    <FaTimes size={20} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-black uppercase text-gray-400 mb-2">Title</label>
                      <input type="text" name="title" required className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 text-gray-800" value={formData.title} onChange={handleInputChange} />
                    </div>
                    <div>
                      <label className="block text-xs font-black uppercase text-gray-400 mb-2">Category (e.g. Temples, Festivals)</label>
                      <input type="text" name="category" className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 text-gray-800" value={formData.category} onChange={handleInputChange} />
                    </div>
                    <div>
                      <label className="block text-xs font-black uppercase text-gray-400 mb-2">Image URL (src)</label>
                      <input type="text" name="src" required className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 text-gray-800" value={formData.src} onChange={handleInputChange} />
                    </div>
                    <div>
                      <label className="block text-xs font-black uppercase text-gray-400 mb-2">Thumbnail URL</label>
                      <input type="text" name="thumbnail" required className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 text-gray-800" value={formData.thumbnail} onChange={handleInputChange} />
                    </div>
                    <div>
                      <label className="block text-xs font-black uppercase text-gray-400 mb-2">Width</label>
                      <input type="number" name="width" className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 text-gray-800" value={formData.width} onChange={handleInputChange} />
                    </div>
                    <div>
                      <label className="block text-xs font-black uppercase text-gray-400 mb-2">Height</label>
                      <input type="number" name="height" className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 text-gray-800" value={formData.height} onChange={handleInputChange} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase text-gray-400 mb-2">Description</label>
                    <textarea name="description" className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 text-gray-800 h-24" value={formData.description} onChange={handleInputChange} />
                  </div>
                  <div className="flex items-center gap-4 pt-4">
                    <button type="submit" className="flex-1 bg-iskcon-orange text-white py-4 rounded-2xl font-black shadow-lg hover:scale-[1.02] flex items-center justify-center gap-2">
                      <FaSave /> {editingId ? 'Update Image' : 'Save Image'}
                    </button>
                    <button type="button" onClick={cancelForm} className="px-8 py-4 border-2 border-gray-100 text-gray-400 rounded-2xl font-bold hover:bg-gray-50">
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4 px-4">
             <h3 className="text-gray-400 text-xs font-black uppercase flex items-center gap-2">
              <FaImage /> Live Gallery Pool ({images.length})
            </h3>
          </div>

          {loading ? (
             <div className="text-center py-20 bg-white rounded-[2.5rem] border border-gray-100">
                <p className="text-gray-400 text-sm font-medium">Synching with database...</p>
             </div>
          ) : images.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-[3rem] border border-gray-100">
              <p className="text-gray-400 font-medium italic">Your gallery is empty.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {images.map((img) => (
                <div key={img._id} className="bg-white p-4 rounded-[2rem] shadow-sm border border-gray-100 flex items-center gap-4 group">
                  <div className="w-20 h-20 bg-gray-200 rounded-xl overflow-hidden shrink-0">
                    <img src={img.thumbnail || img.src} alt={img.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <h4 className="font-bold text-gray-800 truncate">{img.title}</h4>
                    <span className="text-xs text-iskcon-orange uppercase font-bold">{img.category}</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button onClick={() => handleEdit(img)} className="p-2 bg-gray-50 text-gray-400 hover:text-white hover:bg-iskcon-orange rounded-lg">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDeleteClick(img._id)} className="p-2 bg-gray-50 text-gray-400 hover:text-white hover:bg-red-500 rounded-lg">
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
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
              className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 to-rose-500" />
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-6 mx-auto">
                <FaTrash className="text-2xl text-red-500" />
              </div>
              <h3 className="text-xl font-black text-center text-gray-900 mb-2">Delete Image?</h3>
              <p className="text-center text-gray-500 text-sm mb-8">
                Are you sure you want to permanently remove this image from the gallery? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteConfirmId(null)}
                  className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={executeDelete}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-xl font-bold shadow-lg shadow-red-500/30 hover:shadow-red-500/50 hover:scale-[1.02] transition-all"
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
