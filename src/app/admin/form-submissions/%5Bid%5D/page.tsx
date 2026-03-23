'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrash, FaCheck, FaAddressCard, FaInfoCircle, FaFileDownload, FaChevronLeft } from 'react-icons/fa';
import Link from 'next/link';

export default function AdminFormSubmissions({ params }: { params: { id: string } }) {
  const [form, setForm] = useState<any>(null);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [formRes, subRes] = await Promise.all([
        fetch(`/api/forms/${params.id}`),
        fetch('/api/form-submissions')
      ]);
      const formData = await formRes.json();
      const subData = await subRes.json();
      
      setForm(formData);
      if (Array.isArray(subData)) {
        setSubmissions(subData.filter(s => s.formId?._id === params.id || s.formId === params.id));
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const deleteSubmission = async (id: string) => {
    if (!confirm('Are you sure you want to delete this submission?')) return;
    try {
      const res = await fetch(`/api/form-submissions/${id}`, { method: 'DELETE' });
      if (res.ok) fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const exportCSV = () => {
    if (!form || submissions.length === 0) return;
    const headers = form.fields.map((f: any) => f.label);
    const rows = submissions.map(s => form.fields.map((f: any) => s.data[f.name] || ''));
    
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', `${form.slug}-submissions.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <main className="min-h-screen bg-gray-50 pt-24 md:pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <Link href="/admin/forms" className="flex items-center gap-2 text-gray-400 hover:text-orange-500 transition-colors font-bold text-sm mb-6">
            <FaChevronLeft /> Back to Forms
        </Link>

        {form && (
            <div className="flex justify-between items-center mb-10">
                <div>
                   <h1 className="text-4xl font-black text-gray-900 mb-2">{form.title}</h1>
                   <p className="text-gray-500">Collected data from {submissions.length} devotees.</p>
                </div>
                <button 
                  onClick={exportCSV}
                  className="px-6 py-4 bg-gray-900 text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-black shadow-lg transition-all"
                >
                    <FaFileDownload /> Export CSV
                </button>
            </div>
        )}

        {loading ? (
            <div className="text-center py-20 text-gray-400 font-medium">Fetching submission data...</div>
        ) : submissions.length === 0 ? (
            <div className="bg-white rounded-[2rem] p-20 text-center border border-gray-100 shadow-sm text-gray-400 font-bold">
                 No responses found for this form yet.
            </div>
        ) : (
            <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Date</th>
                                {form?.fields.map((f: any) => (
                                    <th key={f.name} className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">{f.label}</th>
                                ))}
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {submissions.map((s) => (
                                <tr key={s._id} className="hover:bg-gray-50 transition-all font-medium text-gray-700">
                                    <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-400">{new Date(s.createdAt).toLocaleDateString()}</td>
                                    {form?.fields.map((f: any) => (
                                        <td key={f.name} className="px-6 py-4">
                                            {f.type === 'file' ? (
                                                <a href={s.data[f.name]} target="_blank" className="text-orange-500 underline truncate block max-w-xs">{s.data[f.name]}</a>
                                            ) : (
                                                <div className="truncate max-w-xs font-bold text-gray-800">{String(s.data[f.name] || '-')}</div>
                                            )}
                                        </td>
                                    ))}
                                    <td className="px-6 py-4 text-right">
                                        <button onClick={() => deleteSubmission(s._id)} className="p-3 text-red-100 hover:text-red-500 transition-colors"><FaTrash /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )}
      </div>
    </main>
  );
}
