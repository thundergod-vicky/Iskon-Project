'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaTrash, FaSave, FaTimes, FaGripLines, FaEdit, FaChevronDown, FaChevronUp, FaEye } from 'react-icons/fa';
import Link from 'next/link';

export default function AdminFormBuilder() {
  const [forms, setForms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    slug: '',
    fields: [] as any[],
    successMessage: 'Thank you for your submission!'
  });

  const fieldTypes = [
    { label: 'Short Text', value: 'text' },
    { label: 'Long Text', value: 'textarea' },
    { label: 'Number', value: 'number' },
    { label: 'Date', value: 'date' },
    { label: 'Select Dropdown', value: 'select' },
  ];

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      const res = await fetch('/api/forms');
      const data = await res.json();
      if (Array.isArray(data)) setForms(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const addField = () => {
    setFormData({
      ...formData,
      fields: [...formData.fields, { label: '', name: '', type: 'text', required: false, options: [], placeholder: '' }]
    });
  };

  const removeField = (index: number) => {
    const newFields = formData.fields.filter((_, i) => i !== index);
    setFormData({ ...formData, fields: newFields });
  };

  const updateField = (index: number, updates: any) => {
    const newFields = [...formData.fields];
    newFields[index] = { ...newFields[index], ...updates };
    // Auto-generate name from label if name is empty
    if (updates.label && !newFields[index].name) {
        newFields[index].name = updates.label.toLowerCase().replace(/ /g, '_').replace(/[^\w-]+/g, '');
    }
    setFormData({ ...formData, fields: newFields });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingId ? `/api/forms/${editingId}` : '/api/forms';
      const method = editingId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        fetchForms();
        setIsEditing(false);
        setEditingId(null);
        setFormData({ title: '', description: '', slug: '', fields: [], successMessage: 'Thank you for your submission!' });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const startEdit = (form: any) => {
    setFormData({
      title: form.title,
      description: form.description || '',
      slug: form.slug,
      fields: form.fields,
      successMessage: form.successMessage
    });
    setEditingId(form._id);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const deleteForm = async (id: string) => {
    if (!confirm('Are you sure you want to delete this form? All submissions will be lost.')) return;
    try {
      const res = await fetch(`/api/forms/${id}`, { method: 'DELETE' });
      if (res.ok) fetchForms();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 pt-24 md:pt-32 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-black text-gray-900 mb-2">Form Builder</h1>
            <p className="text-gray-500">Create custom registration forms for events and services.</p>
          </div>
          {!isEditing && (
            <button 
                onClick={() => setIsEditing(true)} 
                className="bg-iskcon-orange text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg hover:bg-orange-600 transition-all font-premium"
            >
                <FaPlus /> Build New Form
            </button>
          )}
        </div>

        <AnimatePresence>
          {isEditing && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="mb-12 overflow-hidden">
                <form onSubmit={handleSave} className="bg-white border border-gray-100 rounded-[2rem] p-8 md:p-12 shadow-2xl space-y-8 relative">
                    <button type="button" onClick={() => { setIsEditing(false); setEditingId(null); }} className="absolute top-8 right-8 text-gray-300 hover:text-red-500 transition-colors">
                        <FaTimes className="text-2xl" />
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Form Title</label>
                            <input 
                                type="text" required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })}
                                className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:bg-white focus:ring-4 focus:ring-orange-500/10 outline-none transition-all font-black text-xl"
                                placeholder="Guru-Asraya Shelter Registration"
                            />
                        </div>
                        <div className="space-y-4">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Form ID / Slug (URL Friendly)</label>
                            <input 
                                type="text" value={formData.slug} onChange={e => setFormData({ ...formData, slug: e.target.value })}
                                className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:bg-white focus:ring-4 focus:ring-orange-500/10 outline-none transition-all font-bold text-gray-400"
                                placeholder="guru-asraya-registration"
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Form Description</label>
                        <textarea 
                            value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })}
                            className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:bg-white focus:ring-4 focus:ring-orange-500/10 outline-none transition-all min-h-[100px]"
                            placeholder="Help text for the users..."
                        />
                    </div>

                    <div className="pt-6 border-t border-gray-50">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                                <span className="w-10 h-10 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center text-sm">LIST</span>
                                Form Fields
                            </h3>
                            <button type="button" onClick={addField} className="text-sm font-bold bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-black flex items-center gap-2">
                                <FaPlus /> Add Field
                            </button>
                        </div>

                        <div className="space-y-4">
                            {formData.fields.map((field, i) => (
                                <motion.div 
                                    key={i} 
                                    initial={{ opacity: 0, x: -20 }} 
                                    animate={{ opacity: 1, x: 0 }} 
                                    className="p-6 bg-gray-50 border border-gray-100 rounded-[2rem] relative group"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                                        <div className="md:col-span-2 space-y-2">
                                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Field Label</label>
                                            <input 
                                                type="text" required value={field.label} onChange={e => updateField(i, { label: e.target.value })}
                                                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 shadow-sm"
                                                placeholder="e.g. Your Spiritual Name"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Field Type</label>
                                            <select 
                                                value={field.type} onChange={e => updateField(i, { type: e.target.value })}
                                                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 shadow-sm font-bold text-gray-700"
                                            >
                                                {fieldTypes.map(ft => <option key={ft.value} value={ft.value}>{ft.label}</option>)}
                                            </select>
                                        </div>
                                        <div className="flex items-center gap-3 px-2 py-4">
                                            <input 
                                                type="checkbox" checked={field.required} onChange={e => updateField(i, { required: e.target.checked })}
                                                className="w-5 h-5 rounded text-orange-500"
                                            />
                                            <span className="text-sm font-bold text-gray-600">Required</span>
                                            <button type="button" onClick={() => removeField(i)} className="ml-auto p-3 text-red-300 hover:text-red-500 transition-colors">
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </div>
                                    
                                    {field.type === 'select' && (
                                        <div className="mt-4 pt-4 border-t border-gray-200">
                                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Options (Comma separated)</label>
                                            <input 
                                                type="text" value={field.options.join(',')} onChange={e => updateField(i, { options: e.target.value.split(',').map(s => s.trim()) })}
                                                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 shadow-sm mt-1"
                                                placeholder="Option 1, Option 2, Option 3"
                                            />
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-8 border-t border-gray-50">
                        <button type="button" onClick={() => { setIsEditing(false); setEditingId(null); }} className="px-8 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition-all">Cancel</button>
                        <button type="submit" className="px-10 py-3 bg-iskcon-orange text-white rounded-xl font-black shadow-lg hover:shadow-xl hover:bg-orange-600 transition-all flex items-center gap-2">
                            <FaSave /> {editingId ? 'Update Form' : 'Save Form & Publish'}
                        </button>
                    </div>
                </form>
            </motion.div>
          )}
        </AnimatePresence>

        {loading ? (
            <div className="text-center py-20 text-gray-400 font-medium animate-pulse">Fetching forms...</div>
        ) : forms.length === 0 ? (
            <div className="bg-white rounded-[2rem] p-20 text-center border border-gray-100 shadow-sm">
                <div className="text-5xl text-gray-100 mb-6 flex justify-center"><FaEdit /></div>
                <h3 className="text-2xl font-black text-gray-400">No custom forms created yet.</h3>
                <p className="text-gray-400 mt-2 max-w-sm mx-auto">Build your first custom form to start collecting information from devotees.</p>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {forms.map(form => (
                    <motion.div key={form._id} className="bg-white rounded-[2rem] p-8 shadow-sm hover:shadow-xl transition-all border border-gray-100 group">
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-4 bg-orange-50 text-orange-500 rounded-2xl group-hover:scale-110 transition-transform">
                                <FaEdit className="text-2xl" />
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => startEdit(form)} className="p-3 text-gray-300 hover:text-orange-500 transition-colors"><FaEdit /></button>
                                <button onClick={() => deleteForm(form._id)} className="p-3 text-gray-300 hover:text-red-500 transition-colors"><FaTrash /></button>
                            </div>
                        </div>
                        <h3 className="text-2xl font-black text-gray-900 mb-2">{form.title}</h3>
                        <p className="text-gray-500 text-sm mb-6 line-clamp-2">{form.description}</p>
                        
                        <div className="flex items-center justify-between pt-6 border-t border-gray-50 mt-auto">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{form.fields.length} Fields</span>
                            </div>
                            <div className="flex gap-2">
                                <Link 
                                    href={`/admin/form-submissions/${form._id}`}
                                    className="px-4 py-2 bg-gray-50 text-gray-600 rounded-lg text-sm font-bold hover:bg-gray-100 transition-all flex items-center gap-2"
                                >
                                    <FaGripLines /> Results
                                </Link>
                                <Link 
                                    href={`/forms/${form.slug}`}
                                    target="_blank"
                                    className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-bold hover:bg-orange-600 transition-all flex items-center gap-2"
                                >
                                    <FaEye /> View
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        )}
      </div>
    </main>
  );
}
