'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaEnvelope, FaFacebook, FaYoutube, FaWhatsapp, FaPaperPlane } from 'react-icons/fa';

export default function ContactPage() {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitStatus('success');
            setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
            setTimeout(() => setSubmitStatus(null), 5000);
        }, 1500);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <main className="min-h-screen bg-gray-50 pb-20">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden bg-gray-900 border-b-8 border-orange-500">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-orange-900/60 to-gray-900 mix-blend-multiply" />
                    <img src="/images/gallery/temple-view.jpg" alt="Temple" className="w-full h-full object-cover opacity-20" />
                </div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto">
                        <span className="inline-block py-1.5 px-4 rounded-full bg-orange-500/20 text-orange-400 font-bold mb-4 tracking-wider uppercase text-sm border border-orange-500/30">Get in Touch</span>
                        <h1 className="text-4xl md:text-6xl font-black text-white mb-6">Contact Us</h1>
                        <p className="text-xl text-gray-300">We'd love to hear from you. Have a question about visiting, making a donation, or our community? Reach out below.</p>
                    </motion.div>
                </div>
            </section>

            <div className="container mx-auto px-4 -mt-10 relative z-20">
                <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
                    {/* Left: Info */}
                    <div className="col-span-1 lg:col-span-2 space-y-6">
                        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 flex gap-6 items-start">
                            <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center shrink-0">
                                <FaMapMarkerAlt className="text-2xl text-orange-500" />
                            </div>
                            <div>
                                <h3 className="font-black text-gray-900 text-xl mb-2">Visit the Temple</h3>
                                <p className="text-gray-500 mb-4 text-sm leading-relaxed">
                                    ISKCON Durgapur<br />
                                    Netaji Subhas Chandra Bose Road, A-Zone<br />
                                    Durgapur, West Bengal 713204
                                </p>
                                <a href="https://maps.google.com/?q=ISKCON+Durgapur+Netaji+Subhas+Chandra+Bose+Road+A-Zone+Durgapur+West+Bengal+713204" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-orange-600 hover:text-orange-700 underline underline-offset-4 decoration-orange-200 hover:decoration-orange-500 transition-colors">Get Directions →</a>
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 flex gap-6 items-start">
                            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0">
                                <FaEnvelope className="text-2xl text-blue-500" />
                            </div>
                            <div>
                                <h3 className="font-black text-gray-900 text-xl mb-2">Email Us</h3>
                                <p className="text-gray-500 mb-4 text-sm leading-relaxed">For general inquiries, drop us an email and we'll reply within 24 hours.</p>
                                <a href="mailto:info.iskcondurgapur@gmail.com" className="text-sm font-bold text-blue-600 hover:text-blue-700 underline underline-offset-4 decoration-blue-200 hover:decoration-blue-500 transition-colors">info.iskcondurgapur@gmail.com</a>
                            </div>
                        </motion.div>

                        {/* Social Links */}
                        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="bg-gray-900 rounded-3xl p-8 shadow-xl text-center">
                            <h3 className="font-black text-white text-xl mb-6">Let's Connect</h3>
                            <div className="flex justify-center gap-4">
                                <a href="https://www.facebook.com/profile.php?id=61571919518223" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/10 hover:bg-[#1877F2] hover:scale-110 transition-all rounded-full flex items-center justify-center text-white text-xl">
                                    <FaFacebook />
                                </a>
                                <a href="https://www.youtube.com/@iskcondurgapurofficial957" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/10 hover:bg-[#FF0000] hover:scale-110 transition-all rounded-full flex items-center justify-center text-white text-xl">
                                    <FaYoutube />
                                </a>
                                <a href="https://wa.me/919563786224" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/10 hover:bg-[#25D366] hover:scale-110 transition-all rounded-full flex items-center justify-center text-white text-xl">
                                    <FaWhatsapp />
                                </a>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right: Form */}
                    <div className="col-span-1 lg:col-span-3">
                        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-100">
                            <h2 className="text-3xl font-black text-gray-900 mb-2">Send a Message</h2>
                            <p className="text-gray-500 mb-8">Fill out the form below and we will get back to you directly.</p>

                            {submitStatus === 'success' ? (
                                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center py-16">
                                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-500 text-3xl">✓</div>
                                    <h3 className="text-2xl font-bold text-green-800 mb-2">Message Sent!</h3>
                                    <p className="text-green-600">Hare Krishna! Thank you for reaching out. We will respond soon.</p>
                                    <button onClick={() => setSubmitStatus(null)} className="mt-6 px-6 py-2 bg-green-100 text-green-700 font-bold rounded-lg hover:bg-green-200 transition-colors">Send Another</button>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Your Name</label>
                                            <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-4 focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all outline-none" placeholder="e.g. John Doe" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Email Address</label>
                                            <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-4 focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all outline-none" placeholder="john@example.com" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Subject</label>
                                        <input type="text" name="subject" value={formData.subject} onChange={handleChange} required className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-4 focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all outline-none" placeholder="How can we help?" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Your Message</label>
                                        <textarea name="message" value={formData.message} onChange={handleChange} required rows={5} className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-4 focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all outline-none resize-none" placeholder="Type your message here..."></textarea>
                                    </div>
                                    <button type="submit" disabled={isSubmitting} className="w-full flex justify-center items-center gap-2 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-black rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all disabled:opacity-70 disabled:transform-none text-lg">
                                        {isSubmitting ? 'Sending...' : <><FaPaperPlane /> Send Message</>}
                                    </button>
                                </form>
                            )}
                        </motion.div>
                    </div>
                </div>

                {/* Full Width Map */}
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-16 bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 max-w-6xl mx-auto">
                    <iframe title="ISKCON Durgapur Location" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3647.4!2d87.3169!3d23.5204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f71e9b0b0b0b0b%3A0x0!2sISKCON+Durgapur%2C+Netaji+Subhas+Chandra+Bose+Road%2C+A-Zone%2C+Durgapur%2C+West+Bengal+713204!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin&q=ISKCON+Durgapur+Netaji+Subhas+Chandra+Bose+Road+A-Zone+Durgapur+West+Bengal+713204" width="100%" height="400" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                </motion.div>
            </div>
        </main>
    );
}
