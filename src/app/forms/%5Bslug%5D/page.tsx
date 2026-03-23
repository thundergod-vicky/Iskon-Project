'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaperPlane, FaCheckCircle, FaSpinner, FaUpload, FaChevronRight } from 'react-icons/fa';

export default function DynamicFormPage({ params }: { params: { slug: string } }) {
  const [form, setForm] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    fetchForm();
  }, []);

  const fetchForm = async () => {
    try {
      const res = await fetch(`/api/forms/${params.slug}`);
      const data = await res.json();
      setForm(data);
      
      // Initialize form fields
      const initial: any = {};
      data.fields.forEach((f: any) => initial[f.name] = '');
      setFormData(initial);
      
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleFileChange = async (e: any, name: string) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // In a real app, upload to S3/Cloudinary. 
    // Here we'll simulate the URL or convert to base64 if small.
    // For now, let's just use the filename to simulate success.
    setFormData({ ...formData, [name]: URL.createObjectURL(file) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/form-submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formId: form._id,
          data: formData
        })
      });
      if (res.ok) {
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 flex-col gap-4">
        <FaSpinner className="text-4xl text-orange-500 animate-spin" />
        <p className="font-bold text-gray-400">Loading Form...</p>
    </div>
  );

  if (!form) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 flex-col gap-4">
        <h1 className="text-4xl font-black text-gray-200">Form Not Found</h1>
        <p className="text-gray-400">This form might have been removed or is inactive.</p>
    </div>
  );

  return (
    <main className="min-h-screen bg-gray-50 pt-32 pb-24 px-4">
      {/* Hero */}
      <div className="max-w-3xl mx-auto mb-10 text-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-[2rem] p-12 shadow-sm border border-orange-50 inline-block w-full"
            >
                <div className="w-20 h-20 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center text-3xl mb-6 mx-auto">
                    <FaCheckCircle />
                </div>
                <h1 className="text-4xl font-black text-gray-900 mb-4">{form.title}</h1>
                <p className="text-gray-500 text-lg">{form.description}</p>
            </motion.div>
      </div>

      <div className="max-w-3xl mx-auto">
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="submitted"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border-2 border-green-200 rounded-[3rem] p-16 text-center shadow-xl shadow-green-100/30"
            >
               <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center text-5xl mb-8 mx-auto shadow-inner">
                  <FaCheckCircle />
               </div>
               <h2 className="text-4xl font-black text-gray-900 mb-4">Hare Krishna!</h2>
               <p className="text-xl text-green-700 font-medium">{form.successMessage}</p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[3rem] p-10 md:p-16 shadow-xl border border-gray-100 space-y-8"
            >
              {form.fields.map((field: any) => (
                <div key={field.name} className="space-y-3">
                  <label className="text-sm font-black text-gray-800 ml-2 tracking-wide uppercase flex items-center gap-2">
                     {field.label}
                     {field.required && <span className="text-red-500 text-xs">*</span>}
                  </label>
                  
                  {field.type === 'textarea' ? (
                    <textarea
                      required={field.required}
                      rows={4}
                      className="w-full bg-gray-50 border border-gray-100 rounded-3xl px-8 py-5 focus:bg-white focus:ring-4 focus:ring-orange-500/10 outline-none transition-all placeholder:text-gray-300 font-medium"
                      placeholder={field.placeholder || `Enter your ${field.label.toLowerCase()}...`}
                      value={formData[field.name]}
                      onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                    />
                  ) : field.type === 'select' ? (
                    <div className="relative">
                        <select
                            required={field.required}
                            className="w-full bg-gray-50 border border-gray-100 rounded-3xl px-8 py-5 focus:bg-white focus:ring-4 focus:ring-orange-500/10 outline-none transition-all appearance-none font-bold text-gray-700"
                            value={formData[field.name]}
                            onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                        >
                            <option value="">Select {field.label}...</option>
                            {field.options.map((opt: string) => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                        <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none text-orange-400">
                            <FaChevronRight className="rotate-90" />
                        </div>
                    </div>
                  ) : field.type === 'file' ? (
                    <div className="relative">
                        <input
                            type="file"
                            className="hidden"
                            id={`file-${field.name}`}
                            onChange={(e) => handleFileChange(e, field.name)}
                        />
                        <label 
                            htmlFor={`file-${field.name}`}
                            className="w-full bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl px-8 py-10 flex flex-col items-center justify-center cursor-pointer hover:bg-orange-50/50 hover:border-orange-200 transition-all group"
                        >
                            {formData[field.name] ? (
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-green-100 text-green-500 rounded-2xl flex items-center justify-center text-2xl mb-4 mx-auto shadow-sm">
                                        <FaCheckCircle />
                                    </div>
                                    <p className="text-sm font-bold text-green-700">File Selected</p>
                                    <p className="text-xs text-green-600 opacity-60 mt-1 truncate max-w-xs">{formData[field.name]}</p>
                                </div>
                            ) : (
                                <div className="text-center group-hover:scale-110 transition-transform">
                                    <div className="w-16 h-16 bg-orange-100 text-orange-500 rounded-2xl flex items-center justify-center text-2xl mb-4 mx-auto shadow-sm">
                                        <FaUpload />
                                    </div>
                                    <p className="text-sm font-black text-gray-500">Choose File</p>
                                    <p className="text-xs text-gray-400 mt-1">Upload your {field.label.toLowerCase()}</p>
                                </div>
                            )}
                        </label>
                    </div>
                  ) : (
                    <input
                      type={field.type}
                      required={field.required}
                      className="w-full bg-gray-50 border border-gray-100 rounded-full px-8 py-5 focus:bg-white focus:ring-4 focus:ring-orange-500/10 outline-none transition-all placeholder:text-gray-300 font-bold"
                      placeholder={field.placeholder || `Enter your ${field.label.toLowerCase()}...`}
                      value={formData[field.name]}
                      onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                    />
                  )}
                </div>
              ))}

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-6 bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-full font-black text-xl shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:scale-100"
              >
                {submitting ? (
                    <><FaSpinner className="animate-spin" /> Submitting Information...</>
                ) : (
                    <>Submit Form <FaPaperPlane className="text-sm" /></>
                )}
              </button>
              
              <p className="text-center text-xs text-gray-400 font-medium">
                  By submitting this form, you authorize ISKCON Durgapur to contact you regarding temple activities.
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
