'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaBookOpen, FaHeart, FaPrayingHands, FaChevronDown, FaOm } from 'react-icons/fa';
import Link from 'next/link';

const teachings = [
    {
        id: 1,
        title: "The Science of Self-Realization",
        subtitle: "Discovering who you truly are",
        description: "The fundamental teaching of Bhagavad-gita is that we are not the temporary material body, but eternal spirit souls (jivatma). Realizing this distinction is the first step in spiritual life.",
        principles: [
            "We are not this body but eternal spirit souls",
            "The soul is part and parcel of Krishna (God)",
            "Our natural position is one of eternal loving service"
        ],
        icon: <FaOm />
    },
    {
        id: 2,
        title: "The Process of Bhakti Yoga",
        subtitle: "The path of devotion in the modern age",
        description: "Bhakti-yoga is not a passive meditation, but an active engagement of all senses in the service of the Supreme. In this age of Kali, the most recommended and effective process is the congregational chanting of the holy names.",
        principles: [
            "Chanting the Hare Krishna Maha-mantra daily",
            "Following the four regulative principles for purity",
            "Engaging one's talents and work in devotional service"
        ],
        icon: <FaPrayingHands />
    },
    {
        id: 3,
        title: "Understanding the Absolute Truth",
        subtitle: "Knowing the Supreme Personality of Godhead",
        description: "The Absolute Truth is realized in three phases: Brahman (the all-pervading formless spiritual energy), Paramatma (the localized aspect in the heart of every being), and Bhagavan (the Supreme Personality of Godhead, Sri Krishna).",
        principles: [
            "Krishna is the Supreme source of all energies",
            "Love of God is our dormant, natural state",
            "Pure devotional service leads to complete spiritual fulfillment"
        ],
        icon: <FaHeart />
    }
];

export default function TeachingsPage() {
    const [expandedSection, setExpandedSection] = useState<number | null>(1);

    return (
        <main className="min-h-screen bg-gray-50 pb-20">
            {/* Hero Section */}
            <section className="relative pt-32 pb-32 overflow-hidden bg-gray-900 border-b-8 border-orange-500">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-amber-900/60 to-black/80 mix-blend-multiply" />
                    <img src="/images/gallery/devotees-serving.jpg" alt="Teachings" className="w-full h-full object-cover opacity-30 grayscale blur-sm" />
                </div>
                <div className="container mx-auto px-4 relative z-10 text-center flex flex-col items-center">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-4xl mx-auto">
                        <span className="inline-block py-1.5 px-6 rounded-full bg-amber-500/20 text-amber-400 font-bold mb-6 tracking-widest uppercase text-sm border border-amber-500/30">Vedic Wisdom</span>
                        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 drop-shadow-2xl tracking-tight">
                            The Complete <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300">Teachings</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 font-light max-w-3xl mx-auto">
                            Timeless philosophy presented clearly for the modern seeker by Srila Prabhupada.
                        </p>
                    </motion.div>
                </div>
            </section>

            <div className="container mx-auto px-4 -mt-16 relative z-20">
                
                {/* Quote Card */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-[2rem] p-10 md:p-16 shadow-2xl max-w-5xl mx-auto border border-amber-100 mb-20 text-center">
                    <FaQuoteLeft className="text-5xl text-amber-200 mx-auto mb-8" />
                    <blockquote className="text-2xl md:text-4xl font-black text-gray-900 leading-tight mb-8">
                        "Krishna consciousness is not an artificial imposition on the mind. This consciousness is the original energy of the living entity."
                    </blockquote>
                    <p className="text-xl font-bold text-amber-600 tracking-widest uppercase text-sm">— Srila Prabhupada</p>
                </motion.div>

                {/* Core Teachings Accordion */}
                <div className="max-w-4xl mx-auto mb-24">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Core Philosophy</h2>
                        <p className="text-gray-500 text-lg">The foundational truths of the Gaudiya Vaishnava tradition.</p>
                    </div>

                    <div className="space-y-6">
                        {teachings.map((teaching, idx) => (
                            <motion.div 
                                key={teaching.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className={`bg-white rounded-3xl overflow-hidden border transition-all duration-300 ${expandedSection === teaching.id ? 'border-amber-300 shadow-2xl ring-4 ring-amber-50' : 'border-gray-100 shadow-md hover:border-amber-200'}`}
                            >
                                <button 
                                    onClick={() => setExpandedSection(expandedSection === teaching.id ? null : teaching.id)}
                                    className="w-full text-left p-6 md:p-8 flex items-center justify-between outline-none"
                                >
                                    <div className="flex items-center gap-6">
                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-colors ${expandedSection === teaching.id ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg' : 'bg-gray-50 text-gray-400'}`}>
                                            {teaching.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-black text-gray-900 mb-1">{teaching.title}</h3>
                                            <p className="text-amber-600 font-bold text-sm tracking-wider uppercase">{teaching.subtitle}</p>
                                        </div>
                                    </div>
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-300 ${expandedSection === teaching.id ? 'bg-amber-100 text-amber-600 rotate-180' : 'bg-gray-50 text-gray-400'}`}>
                                        <FaChevronDown />
                                    </div>
                                </button>

                                <AnimatePresence>
                                    {expandedSection === teaching.id && (
                                        <motion.div 
                                            initial={{ height: 0, opacity: 0 }} 
                                            animate={{ height: 'auto', opacity: 1 }} 
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-6 pb-8 md:px-8 md:pl-28 border-t border-gray-50 pt-6">
                                                <p className="text-gray-600 text-lg leading-relaxed mb-6">{teaching.description}</p>
                                                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                                                    <h4 className="font-bold text-gray-900 mb-4 uppercase tracking-widest text-xs">Core Principles</h4>
                                                    <ul className="space-y-4">
                                                        {teaching.principles.map((principle, index) => (
                                                            <li key={index} className="flex items-start gap-4">
                                                                <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-500 flex items-center justify-center shrink-0 mt-0.5 text-xs"><FaOm /></div>
                                                                <span className="text-gray-700 font-medium">{principle}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Call to Action Grid */}
                <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
                    <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-[2.5rem] p-10 text-white shadow-xl relative overflow-hidden group">
                        <FaBookOpen className="absolute -right-6 -bottom-6 text-[10rem] text-white/10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500" />
                        <div className="relative z-10 w-full h-full flex flex-col items-start">
                            <h3 className="text-3xl font-black mb-4">Explore the Books</h3>
                            <p className="text-orange-100 mb-10 text-lg leading-relaxed max-w-sm">Dive deep into the vast library of translated Vedic texts and commentaries.</p>
                            <Link href="/resources/books" className="mt-auto inline-flex items-center gap-2 px-8 py-4 bg-white text-orange-600 font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
                                View Library <FaChevronDown className="-rotate-90" />
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-gray-900 rounded-[2.5rem] p-10 text-white shadow-xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/20 blur-3xl rounded-full" />
                        <FaQuoteLeft className="absolute -right-6 -bottom-6 text-[10rem] text-white/5 group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-500" />
                        <div className="relative z-10 w-full h-full flex flex-col items-start">
                            <h3 className="text-3xl font-black mb-4">Listen to Lectures</h3>
                            <p className="text-gray-400 mb-10 text-lg leading-relaxed max-w-sm">Hear the profound philosophy directly from Srila Prabhupada's original audio recordings.</p>
                            <Link href="/resources/audio" className="mt-auto inline-flex items-center gap-2 px-8 py-4 bg-amber-500 text-gray-900 font-bold rounded-xl shadow-lg hover:shadow-xl hover:bg-amber-400 hover:-translate-y-1 transition-all">
                                Listen Now <FaChevronDown className="-rotate-90" />
                            </Link>
                        </div>
                    </motion.div>
                </div>

            </div>
        </main>
    );
}
