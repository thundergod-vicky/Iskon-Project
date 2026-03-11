'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaClock, FaOm, FaBed, FaUtensils, FaStore, FaPrayingHands, FaCar } from 'react-icons/fa';

export default function TemplePage() {
    return (
        <main className="min-h-screen bg-gray-50 pb-20">
            {/* Hero Section */}
            <section className="relative pt-32 pb-32 overflow-hidden bg-gray-900 border-b-8 border-orange-500">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-orange-900/40 to-gray-900 mix-blend-multiply" />
                    <img src="/images/gallery/temple-view.jpg" alt="ISKCON Durgapur Temple" className="w-full h-full object-cover opacity-60" />
                </div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-4xl mx-auto">
                        <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-orange-500/20 text-orange-400 font-bold mb-6 tracking-wider uppercase text-sm border border-orange-500/30">
                            <FaOm /> Spiritual Oasis
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 drop-shadow-2xl">
                            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">Temple</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto drop-shadow-md">
                            A sanctuary of peace, devotion, and spiritual culture in the heart of Durgapur.
                        </p>
                    </motion.div>
                </div>
            </section>

            <div className="container mx-auto px-4 -mt-20 relative z-20">
                
                {/* Main Info Blocks */}
                <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-2 bg-white rounded-3xl p-10 shadow-2xl border border-gray-100">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-16 h-16 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center text-3xl shadow-inner shrink-0"><FaMapMarkerAlt /></div>
                            <div>
                                <h2 className="text-3xl font-black text-gray-900">ISKCON Durgapur</h2>
                                <p className="text-orange-600 font-bold uppercase tracking-wider text-sm">Hare Krishna Land</p>
                            </div>
                        </div>
                        <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                            Established to propagate the timeless science of Krishna Consciousness, ISKCON Durgapur is more than just a temple; it is a vibrant community center offering spiritual education, Vedic culture, and service opportunities to humanity.
                        </p>
                        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                            We welcome guests from all walks of life to experience the joyful chanting, profound philosophy, and delicious sanctified vegetarian food (prasadam) that our temple offers daily.
                        </p>
                        
                        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                            <h3 className="font-bold text-gray-900 mb-2 uppercase tracking-widest text-xs">Address</h3>
                            <p className="text-gray-700 font-medium text-lg">Netaji Subhas Chandra Bose Road,<br/>A-Zone, Durgapur,<br/>West Bengal, India 713204</p>
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-10 shadow-2xl text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/20 blur-3xl rounded-full" />
                        <div className="relative z-10">
                            <div className="w-16 h-16 bg-white/10 text-orange-400 rounded-2xl flex items-center justify-center text-3xl mb-8 backdrop-blur-sm"><FaClock /></div>
                            <h2 className="text-2xl font-black mb-8">Darshan Timings</h2>
                            
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-orange-400 font-bold text-sm uppercase tracking-widest mb-2">Morning</h3>
                                    <ul className="space-y-2 font-medium text-gray-300">
                                        <li className="flex justify-between"><span>Mangal Aarti</span> <span>04:30 AM</span></li>
                                        <li className="flex justify-between"><span>Darshan Aarti</span> <span>07:30 AM</span></li>
                                        <li className="flex justify-between"><span>Guru Puja</span> <span>07:45 AM</span></li>
                                        <li className="flex justify-between"><span>Srimad Bhagavatam</span> <span>08:15 AM</span></li>
                                        <li className="flex justify-between border-t border-white/10 pt-2 mt-2"><span>Altar Closes</span> <span className="text-orange-300">01:00 PM</span></li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-orange-400 font-bold text-sm uppercase tracking-widest mb-2">Evening</h3>
                                    <ul className="space-y-2 font-medium text-gray-300">
                                        <li className="flex justify-between"><span>Altar Opens</span> <span>04:00 PM</span></li>
                                        <li className="flex justify-between"><span>Tulasi Aarti</span> <span>06:45 PM</span></li>
                                        <li className="flex justify-between"><span>Gaura Aarti</span> <span>07:00 PM</span></li>
                                        <li className="flex justify-between"><span>Bhagavad Gita</span> <span>07:45 PM</span></li>
                                        <li className="flex justify-between border-t border-white/10 pt-2 mt-2"><span>Altar Closes</span> <span className="text-orange-300">08:30 PM</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Facilities */}
                <div className="max-w-6xl mx-auto mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-black text-gray-900 mb-4">Temple Facilities</h2>
                        <p className="text-gray-500">Everything you need for a comfortable and spiritually uplifting visit.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { title: "Temple Hall", icon: <FaPrayingHands />, desc: "A spacious, air-conditioned prayer hall (Temple Room) where the Deities reside. Perfect for kirtan and quiet meditation." },
                            { title: "Govinda's Restaurant", icon: <FaUtensils />, desc: "Enjoy pure, sattvic vegetarian meals and snacks, lovingly offered to the Lord as prasadam before serving." },
                            { title: "Guest House", icon: <FaBed />, desc: "Clean, comfortable accommodation available for life members and visiting devotees. Prior booking required." },
                            { title: "Gift Shop", icon: <FaStore />, desc: "Books by Srila Prabhupada, japa beads, devotional clothing, pure incense, and spiritual souvenirs." },
                            { title: "Free Parking", icon: <FaCar />, desc: "Ample safely-guarded parking space available within the temple premises for 2-wheelers and 4-wheelers." },
                            { title: "Goshala", icon: <FaOm />, desc: "Visit our cow protection center to feed and serve the cows, central to the Vedic agrarian lifestyle." },
                        ].map((fac, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow group"
                            >
                                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-amber-500 text-white rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-md transform group-hover:-translate-y-2 transition-transform">
                                    {fac.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">{fac.title}</h3>
                                <p className="text-gray-600 leading-relaxed font-medium">{fac.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="max-w-4xl mx-auto text-center bg-orange-50 rounded-[3rem] p-12 border border-orange-200 shadow-xl relative overflow-hidden">
                    <FaOm className="absolute -right-10 -bottom-10 text-[15rem] text-orange-500/5 rotate-12" />
                    <div className="relative z-10">
                        <h2 className="text-3xl font-black text-gray-900 mb-4">Planning a Visit?</h2>
                        <p className="text-gray-600 text-lg mb-8 max-w-xl mx-auto">Groups and schools are welcome for guided tours. Please contact us in advance to ensure we can properly host you.</p>
                        <a href="/about/contact" className="inline-block px-8 py-4 bg-orange-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:bg-orange-700 hover:-translate-y-1 transition-all">
                            Contact Us for Details
                        </a>
                    </div>
                </div>

            </div>
        </main>
    );
}
