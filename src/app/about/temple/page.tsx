'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaClock, FaCalendarAlt, FaHandsHelping } from 'react-icons/fa';

export default function TemplePage() {
    return (
        <main className="min-h-screen bg-gray-50 pb-20">
            {/* Hero Section */}
            <section className="relative pt-32 pb-32 overflow-hidden bg-gray-900 border-b-8 border-orange-500">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-orange-900/60 to-black/80 mix-blend-multiply" />
                    <img src="/images/history-of-iskcon.jpg" alt="Temple" className="w-full h-full object-cover opacity-30 grayscale blur-sm" />
                </div>
                <div className="container mx-auto px-4 relative z-10 text-center flex flex-col items-center">
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="max-w-4xl mx-auto">
                        <span className="inline-block py-1.5 px-4 rounded-full bg-orange-500/20 text-orange-400 font-bold mb-6 tracking-wider uppercase text-sm border border-orange-500/30">Our Sacred Space</span>
                        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 drop-shadow-2xl tracking-tighter">
                            Temple <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">Info</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 font-light max-w-3xl mx-auto">
                            A spiritual oasis in the heart of Durgapur
                        </p>
                    </motion.div>
                </div>
            </section>

            <div className="container mx-auto px-4 -mt-16 relative z-20">
                {/* Intro Card */}
                <div className="bg-white rounded-[2.5rem] p-10 md:p-16 shadow-2xl max-w-5xl mx-auto border border-gray-100 mb-24 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-400 via-orange-500 to-amber-500" />
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <div className="flex-1">
                            <div className="w-16 h-1 bg-orange-500 mb-6" />
                            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 leading-tight tracking-tight">
                                Welcome to<br />ISKCON Durgapur
                            </h2>
                            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                                Established to propagate the timeless science of Krishna Consciousness, ISKCON Durgapur is more than just a temple; it is a vibrant community center offering spiritual education, culture, and service opportunities.
                            </p>
                            <div className="flex items-start mb-5">
                                <div className="w-10 h-10 shrink-0 bg-orange-50 rounded-xl flex items-center justify-center text-orange-500 mr-4 shadow-inner">
                                    <FaMapMarkerAlt className="text-lg" />
                                </div>
                                <div>
                                    <h3 className="font-black text-gray-900 uppercase tracking-tight text-sm mb-1">Location</h3>
                                    <p className="text-gray-600">Nachan Road, Benachity, Durgapur, West Bengal, India</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="w-10 h-10 shrink-0 bg-orange-50 rounded-xl flex items-center justify-center text-orange-500 mr-4 shadow-inner">
                                    <FaClock className="text-lg" />
                                </div>
                                <div>
                                    <h3 className="font-black text-gray-900 uppercase tracking-tight text-sm mb-1">Darshan Timings</h3>
                                    <p className="text-gray-600">Morning: 4:30 AM – 1:00 PM</p>
                                    <p className="text-gray-600">Evening: 4:00 PM – 8:30 PM</p>
                                </div>
                            </div>
                        </div>

                        <div className="w-full md:w-2/5 bg-orange-50 rounded-3xl overflow-hidden border border-orange-100 shadow-lg shrink-0 h-72 flex items-center justify-center">
                            <img
                                src="/images/history-of-iskcon.jpg"
                                alt="ISKCON Durgapur Temple"
                                className="w-full h-full object-cover opacity-80"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = 'none';
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Facilities */}
                <div className="max-w-6xl mx-auto bg-gray-900 rounded-[3rem] p-10 md:p-20 text-white overflow-hidden relative shadow-2xl">
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-500/20 blur-[100px] rounded-full" />
                    <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-orange-600/10 blur-[100px] rounded-full" />

                    <div className="relative z-10 text-center mb-16">
                        <span className="text-orange-500 font-black uppercase tracking-[0.3em] text-sm mb-4 block">What We Offer</span>
                        <h2 className="text-4xl font-black mb-4">Temple Facilities</h2>
                        <div className="w-16 h-1 bg-orange-500 mx-auto rounded-full" />
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 relative z-10">
                        {[
                            {
                                icon: <FaCalendarAlt />,
                                title: 'Temple Hall',
                                desc: 'A spacious prayer hall for kirtans, lectures, and finding inner peace.'
                            },
                            {
                                icon: <FaHandsHelping />,
                                title: 'Guest House',
                                desc: 'Clean and comfortable accommodation for visiting devotees and life members.'
                            },
                            {
                                icon: <FaCalendarAlt />,
                                title: "Govinda's Restaurant",
                                desc: 'Pure vegetarian sattvic meals offered to the Lord and distributed as prasadam.'
                            }
                        ].map((facility, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                viewport={{ once: true }}
                                className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/10 hover:-translate-y-2 transition-transform duration-300 group"
                            >
                                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center text-2xl text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                    {facility.icon}
                                </div>
                                <h3 className="font-black text-xl text-white mb-3 tracking-tight">{facility.title}</h3>
                                <p className="text-gray-300 leading-relaxed">{facility.desc}</p>
                                <div className="mt-5 w-10 h-0.5 bg-orange-500/40 group-hover:w-full group-hover:bg-orange-500 transition-all duration-500 rounded-full" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
