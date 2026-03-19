'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaHeart, FaHandsHelping, FaGlobeAsia, FaBookOpen, FaUsers, FaQuoteLeft, FaGraduationCap } from 'react-icons/fa';

export default function MissionPage() {
    return (
        <main className="min-h-screen bg-white pb-20 overflow-hidden">
            {/* Hero Section */}
            <section className="relative pt-40 pb-32 overflow-hidden bg-gray-900 shadow-2xl">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-orange-950/90 via-orange-900/80 to-amber-950/90 mix-blend-multiply" />
                    <img src="/images/gallery/devotees-serving.jpg" alt="Devotees" className="w-full h-full object-cover opacity-40 scale-105" />
                    {/* Decorative elements */}
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent" />
                </div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl mx-auto"
                    >
                        <span className="inline-block py-2 px-6 rounded-full bg-orange-500 text-white font-bold mb-8 tracking-widest uppercase text-xs shadow-lg shadow-orange-500/20">Why we exist</span>
                        <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight">Our Mission</h1>
                        <div className="w-24 h-1.5 bg-orange-500 mx-auto mb-8 rounded-full shadow-glow" />
                        <p className="text-xl md:text-2xl text-orange-50/90 max-w-2xl mx-auto font-medium italic leading-relaxed">
                            "To systematically propagate spiritual knowledge to society at large and to educate all people in the techniques of spiritual life."
                        </p>
                    </motion.div>
                </div>

                {/* Bottom Curve/Transition */}
                <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent" />
            </section>

            <div className="relative">
                {/* Background Decorations */}
                <div className="absolute top-20 right-0 w-96 h-96 bg-orange-100/30 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 -z-10" />
                <div className="absolute top-1/2 left-0 w-64 h-64 bg-amber-100/40 blur-3xl rounded-full translate-y-full -translate-x-1/2 -z-10" />

                <div className="container mx-auto px-4 relative z-20">
                    {/* 7 Purposes Header Card */}
                    <div className="max-w-6xl mx-auto -mt-20 mb-24">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-[2.5rem] p-12 md:p-16 shadow-2xl border border-orange-100 text-center relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-400 via-orange-500 to-amber-500" />
                            
                            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">The Seven Purposes of ISKCON</h2>
                            <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                                Incorporated in 1966 by <span className="text-orange-600 font-bold">Srila Prabhupada</span>, ISKCON was established with seven clearly defined purposes to re-spiritualize human society.
                            </p>

                            {/* Decorative Pattern */}
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 opacity-[0.03] select-none pointer-events-none">
                                <FaUsers className="text-9xl" />
                            </div>
                        </motion.div>
                    </div>

                    {/* Grid Section */}
                    <div className="max-w-7xl mx-auto mb-32">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                {
                                    text: "To systematically propagate spiritual knowledge to society at large and to educate all people in the techniques of spiritual life.",
                                    icon: <FaGraduationCap />,
                                    title: "Spiritual Education"
                                },
                                {
                                    text: "To propagate a consciousness of Krishna (God), as it is revealed in the great scriptures of India, Bhagavad-gita and Srimad-Bhagavatam.",
                                    icon: <FaBookOpen />,
                                    title: "Krishna Consciousness"
                                },
                                {
                                    text: "To bring the members of the Society together with each other and nearer to Krishna, the prime entity.",
                                    icon: <FaUsers />,
                                    title: "Spiritual Community"
                                },
                                {
                                    text: "To teach and encourage the sankirtana movement, congregational chanting of the holy name of God.",
                                    icon: <FaHandsHelping />,
                                    title: "Sankirtana Movement"
                                },
                                {
                                    text: "To erect for the members and for society at large a holy place of transcendental pastimes dedicated to the personality of Krishna.",
                                    icon: <FaGlobeAsia />,
                                    title: "Holy Places"
                                },
                                {
                                    text: "To bring the members closer together for the purpose of teaching a simpler, more natural way of life.",
                                    icon: <FaHeart />,
                                    title: "Natural Living"
                                },
                                {
                                    text: "With a view towards achieving the aforementioned purposes, to publish and distribute periodicals, magazines, books and other writings.",
                                    icon: <FaBookOpen />,
                                    title: "Literary Mission"
                                }
                            ].map((purpose, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1, duration: 0.5 }}
                                    viewport={{ once: true }}
                                    className="group bg-white rounded-3xl p-10 shadow-xl border border-gray-100 hover:shadow-2xl hover:border-orange-200 transition-all duration-500 relative flex flex-col h-full overflow-hidden"
                                >
                                    {/* Number Watermark */}
                                    <div className="absolute top-6 right-8 text-8xl font-black text-orange-500/5 group-hover:text-orange-500/10 transition-colors pointer-events-none select-none italic">
                                        {i + 1}
                                    </div>

                                    {/* Icon Container */}
                                    <div className="relative mb-8">
                                        <div className="w-16 h-16 bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl flex items-center justify-center text-3xl text-orange-500 shadow-inner group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                                            {purpose.icon}
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-black text-gray-900 mb-4 group-hover:text-orange-600 transition-colors uppercase tracking-tight small-caps">{purpose.title}</h3>
                                    <p className="text-gray-600 font-medium leading-relaxed flex-grow">{purpose.text}</p>
                                    
                                    <div className="mt-6 w-12 h-1 bg-orange-100 group-hover:w-full group-hover:bg-orange-500 transition-all duration-500 rounded-full" />
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Core Values */}
                    <div className="bg-gray-900 rounded-[3rem] p-12 md:p-20 text-white max-w-7xl mx-auto shadow-3xl overflow-hidden relative mb-32 group">
                        {/* Interactive glow effect */}
                        <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-500/20 blur-[100px] rounded-full group-hover:bg-orange-500/30 transition-all duration-700" />
                        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-orange-600/10 blur-[100px] rounded-full group-hover:bg-orange-600/20 transition-all duration-700" />
                        
                        <div className="text-center relative z-10 mb-16">
                            <span className="text-orange-500 font-black uppercase tracking-[0.3em] text-sm mb-4 block">Our Foundation</span>
                            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Core Values</h2>
                            <p className="text-gray-400 text-lg max-w-2xl mx-auto">Guiding principles that define our community and every action we take in service to Krishna.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
                            {[
                                { title: 'Compassion', icon: <FaHeart />, desc: 'Extending love and kindness to all living beings, recognizing them as spiritual souls.' },
                                { title: 'Service', icon: <FaHandsHelping />, desc: 'Dedicating ourselves to selflessly serving Krishna and all living beings.' },
                                { title: 'Education', icon: <FaBookOpen />, desc: 'Sharing authentic spiritual knowledge from authorized Vedic texts.' }
                            ].map((val, i) => (
                                <div key={i} className="text-center group/item p-8 rounded-3xl hover:bg-white/5 transition-colors">
                                    <div className="w-24 h-24 mx-auto bg-gradient-to-tr from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center text-4xl text-white mb-8 shadow-2xl group-hover/item:scale-110 group-hover/item:rotate-3 transition-transform">
                                        {val.icon}
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4">{val.title}</h3>
                                    <p className="text-gray-400 text-base leading-relaxed">{val.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quote Section */}
                    <div className="max-w-5xl mx-auto text-center px-4 mb-32 relative">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-12 opacity-[0.05] select-none pointer-events-none">
                            <FaQuoteLeft className="text-[12rem] text-orange-600" />
                        </div>
                        <blockquote className="text-3xl md:text-5xl font-black text-gray-900 leading-[1.15] mb-12 relative z-10">
                            "I have started this International Society for Krishna Consciousness with this mission: to save the human society from <span className="text-orange-600">spiritual death.</span>"
                        </blockquote>
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-1 bg-orange-200 mb-6 rounded-full" />
                            <cite className="block text-xl font-black text-orange-600 not-italic uppercase tracking-[0.3em]">— Srila Prabhupada</cite>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="bg-gradient-to-br from-orange-600 to-amber-600 rounded-[3rem] p-12 md:p-24 text-center max-w-7xl mx-auto shadow-2xl relative overflow-hidden group">
                        <div className="absolute inset-0 bg-[url('/images/pattern-dots.svg')] opacity-10" />
                        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-t from-black/20 to-transparent" />
                        
                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight">Be A Part of the Mission</h2>
                            <p className="text-orange-50 text-xl mb-12 max-w-3xl mx-auto leading-relaxed font-medium">Join our global community in spreading spiritual knowledge and serving humanity through Krishna consciousness.</p>
                            <div className="flex flex-wrap justify-center gap-6">
                                <Link href="/events" className="px-10 py-5 bg-white text-orange-600 font-black rounded-2xl shadow-xl hover:shadow-orange-500/40 hover:-translate-y-1 active:scale-95 transition-all uppercase tracking-widest text-sm">Attend Programs</Link>
                                <Link href="/donate" className="px-10 py-5 bg-gray-900 text-white font-black rounded-2xl shadow-xl hover:shadow-black/40 hover:bg-black hover:-translate-y-1 active:scale-95 transition-all uppercase tracking-widest text-sm">Support the Mission</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}