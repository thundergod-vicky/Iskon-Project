'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaHeart, FaHandsHelping, FaGlobeAsia, FaBookOpen, FaUsers, FaQuoteLeft, FaGraduationCap } from 'react-icons/fa';

export default function MissionPage() {
    return (
        <main className="min-h-screen bg-gray-50 pb-20">
            {/* Hero Section */}
            <section className="relative pt-32 pb-24 overflow-hidden bg-gray-900 border-b-8 border-orange-500">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-900/90 to-amber-900/80 mix-blend-multiply" />
                    <img src="/images/gallery/devotees-serving.jpg" alt="Devotees" className="w-full h-full object-cover opacity-30" />
                </div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto">
                        <span className="inline-block py-1.5 px-4 rounded-full bg-orange-500/20 text-orange-400 font-bold mb-4 tracking-wider uppercase text-sm border border-orange-500/30">Why we exist</span>
                        <h1 className="text-4xl md:text-6xl font-black text-white mb-6">Our Mission</h1>
                        <p className="text-xl text-orange-50/90 max-w-2xl mx-auto">
                            "To systematically propagate spiritual knowledge to society at large and to educate all people in the techniques of spiritual life."
                        </p>
                    </motion.div>
                </div>
            </section>

            <div className="container mx-auto px-4 -mt-10 relative z-20">
                {/* 7 Purposes Grid */}
                <div className="max-w-6xl mx-auto mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-black text-gray-900 mb-4">The Seven Purposes of ISKCON</h2>
                        <p className="text-gray-500 max-w-2xl mx-auto">Incorporated in 1966 by Srila Prabhupada, ISKCON was established with seven clearly defined purposes to re-spiritualize human society.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {
                                text: "To systematically propagate spiritual knowledge to society at large and to educate all people in the techniques of spiritual life.",
                                icon: <FaGraduationCap />
                            },
                            {
                                text: "To propagate a consciousness of Krishna (God), as it is revealed in the great scriptures of India, Bhagavad-gita and Srimad-Bhagavatam.",
                                icon: <FaBookOpen />
                            },
                            {
                                text: "To bring the members of the Society together with each other and nearer to Krishna, the prime entity.",
                                icon: <FaUsers />
                            },
                            {
                                text: "To teach and encourage the sankirtana movement, congregational chanting of the holy name of God.",
                                icon: <FaHandsHelping />
                            },
                            {
                                text: "To erect for the members and for society at large a holy place of transcendental pastimes dedicated to the personality of Krishna.",
                                icon: <FaGlobeAsia />
                            },
                            {
                                text: "To bring the members closer together for the purpose of teaching a simpler, more natural way of life.",
                                icon: <FaHeart />
                            },
                            {
                                text: "With a view towards achieving the aforementioned purposes, to publish and distribute periodicals, magazines, books and other writings.",
                                icon: <FaBookOpen />
                            }
                        ].map((purpose, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:-translate-y-2 transition-transform transform duration-300"
                            >
                                <div className="text-4xl text-orange-100 mb-6 relative">
                                    <span className="absolute -top-4 -left-4 text-7xl font-black text-orange-50/50 mix-blend-multiply z-0">{i + 1}</span>
                                    <div className="relative z-10 text-orange-500 bg-orange-50 w-16 h-16 flex items-center justify-center rounded-2xl shadow-inner">
                                        {purpose.icon}
                                    </div>
                                </div>
                                <p className="text-gray-700 font-medium leading-relaxed relative z-10">{purpose.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Core Values */}
                <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-10 md:p-16 text-white max-w-6xl mx-auto shadow-2xl overflow-hidden relative mb-20">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 pattern-diagonal-lines-sm" />
                    
                    <div className="text-center relative z-10 mb-12">
                        <h2 className="text-3xl font-black text-white mb-4">Our Core Values</h2>
                        <p className="text-gray-400">Guiding principles that define our community and actions.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">
                        {[
                            { title: 'Compassion', icon: <FaHeart />, desc: 'Extending love and kindness to all living beings, recognizing them as spiritual souls.' },
                            { title: 'Service', icon: <FaHandsHelping />, desc: 'Dedicating ourselves to selflessly serving Krishna and all living beings.' },
                            { title: 'Education', icon: <FaBookOpen />, desc: 'Sharing authentic spiritual knowledge from authorized Vedic texts.' }
                        ].map((val, i) => (
                            <div key={i} className="text-center group">
                                <div className="w-20 h-20 mx-auto bg-white/10 rounded-2xl flex items-center justify-center text-3xl text-orange-400 mb-6 group-hover:bg-orange-500 group-hover:text-white transition-all transform group-hover:-translate-y-2 shadow-lg backdrop-blur-sm">
                                    {val.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3">{val.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{val.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quote Section */}
                <div className="max-w-4xl mx-auto text-center px-4 mb-20">
                    <FaQuoteLeft className="text-6xl text-orange-200 mx-auto mb-6" />
                    <blockquote className="text-2xl md:text-4xl font-black text-gray-900 leading-tight mb-8">
                        "I have started this International Society for Krishna Consciousness with this mission: to save the human society from spiritual death."
                    </blockquote>
                    <cite className="block text-xl font-bold text-orange-600 not-italic uppercase tracking-widest">— Srila Prabhupada</cite>
                </div>

                {/* CTA */}
                <div className="bg-orange-500 rounded-3xl p-10 md:p-16 text-center max-w-6xl mx-auto shadow-xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-amber-600 to-orange-400 mix-blend-multiply" />
                    <div className="relative z-10">
                        <h2 className="text-3xl font-black text-white mb-4">Be A Part of the Mission</h2>
                        <p className="text-orange-100 text-lg mb-8 max-w-2xl mx-auto">There are many ways to be part of ISKCON's global mission to spread spiritual knowledge and serve humanity.</p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/events" className="px-8 py-4 bg-white text-orange-600 font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">Attend Programs</Link>
                            <Link href="/donate" className="px-8 py-4 bg-gray-900 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:bg-black hover:-translate-y-1 transition-all">Support the Mission</Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}