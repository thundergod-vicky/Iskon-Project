'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaGlobeAsia, FaBookOpen, FaQuoteLeft, FaLandmark, FaUsers, FaShip } from 'react-icons/fa';

export default function HistoryPage() {
    return (
        <main className="min-h-screen bg-gray-50 pb-20">
            {/* Hero Section */}
            <section className="relative pt-32 pb-32 overflow-hidden bg-gray-900 border-b-8 border-orange-500">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-orange-900/60 to-black/80 mix-blend-multiply" />
                    <img src="/images/history-of-iskcon.jpg" alt="History" className="w-full h-full object-cover opacity-30 grayscale blur-sm" />
                </div>
                <div className="container mx-auto px-4 relative z-10 text-center flex flex-col items-center">
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="max-w-4xl mx-auto">
                        <span className="inline-block py-1.5 px-4 rounded-full bg-orange-500/20 text-orange-400 font-bold mb-6 tracking-wider uppercase text-sm border border-orange-500/30">Humble Beginnings</span>
                        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 drop-shadow-2xl tracking-tighter">
                            The ISKCON <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">Saga</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 font-light max-w-3xl mx-auto">
                            How a 69-year-old saint traveled to America with ₹40 and started a global spiritual revolution.
                        </p>
                    </motion.div>
                </div>
            </section>

            <div className="container mx-auto px-4 -mt-16 relative z-20">
                {/* Introduction Block */}
                <div className="bg-white rounded-[2.5rem] p-10 md:p-16 shadow-2xl max-w-5xl mx-auto border border-gray-100 mb-24 flex flex-col md:flex-row gap-12 items-center">
                    <div className="flex-1">
                        <div className="w-16 h-1 bg-orange-500 mb-6"></div>
                        <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 leading-tight">A Lineage of <br />Self-Realized Masters</h2>
                        <p className="text-gray-600 mb-6 text-lg">
                            The International Society for Krishna Consciousness (ISKCON) traces its origins to the teachings of Lord Chaitanya Mahaprabhu (1486-1534), considered by followers as an incarnation of Krishna Himself. 
                        </p>
                        <p className="text-gray-600 mb-6 text-lg">
                            Lord Chaitanya revitalized the bhakti tradition in India through His emphasis on congregational chanting. This lineage was preserved by a succession of spiritual masters, leading to Srila Prabhupada bringing these ancient teachings to the West.
                        </p>
                    </div>
                    
                    <div className="w-full md:w-1/3 bg-orange-50 rounded-3xl p-8 border border-orange-200 shrink-0 transform md:rotate-3 shadow-lg">
                        <FaQuoteLeft className="text-4xl text-orange-300 mb-4" />
                        <blockquote className="text-xl font-bold italic text-gray-800 leading-snug">
                            "In these Western countries, the Krishna consciousness movement was first started in New York in 1966... and now we have twenty-two centers all over the United States, Canada, England, and Germany."
                        </blockquote>
                        <div className="mt-4 font-black uppercase text-xs tracking-widest text-orange-600">— Srila Prabhupada, 1970</div>
                    </div>
                </div>

                {/* Timeline */}
                <div className="max-w-4xl mx-auto mb-32 relative">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black text-gray-900 mb-4">The Journey</h2>
                        <p className="text-gray-500">Key milestones in the propagation of Krishna Consciousness worldwide.</p>
                    </div>
                    
                    <div className="absolute left-1/2 top-40 bottom-0 w-1 bg-gradient-to-b from-orange-200 via-orange-400 to-transparent -translate-x-1/2 hidden md:block"></div>

                    {[
                        { year: '1896', title: 'Birth of Srila Prabhupada', desc: 'Born in Calcutta, India, on September 1, 1896.', icon: <FaGlobeAsia /> },
                        { year: '1922', title: 'Meeting the Master', desc: 'Srila Prabhupada met his spiritual master, who requested him to spread the mission to the English-speaking world.', icon: <FaUsers /> },
                        { year: '1944', title: 'Back to Godhead', desc: 'He began publishing the magazine, completely single-handedly at first.', icon: <FaBookOpen /> },
                        { year: '1965', title: 'Journey on the Jaladuta', desc: 'At 69, he boarded a cargo ship to America with $7 and translations of sacred texts.', icon: <FaShip /> },
                        { year: '1966', title: 'Founding ISKCON', desc: 'Officially established in a humble storefront at 26 Second Avenue in New York City.', icon: <FaLandmark /> },
                        { year: 'Present', title: 'Global Movement', desc: 'Over 650 temples, eco-villages, schools, and millions of followers worldwide.', icon: <FaGlobeAsia /> }
                    ].map((item, idx) => (
                        <motion.div 
                            key={item.year}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            className={`flex items-center justify-between w-full mb-12 md:mb-8 ${idx % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'} flex-col`}
                        >
                            <div className="hidden md:block w-5/12"></div>
                            <div className="z-20 w-16 h-16 shrink-0 bg-white border-4 border-orange-400 rounded-full flex items-center justify-center text-xl text-orange-500 shadow-xl font-black mb-4 md:mb-0">
                                {item.icon}
                            </div>
                            <div className={`w-full md:w-5/12 bg-white p-8 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 ${idx % 2 === 0 ? 'md:text-left text-center' : 'md:text-right text-center'}`}>
                                <h3 className="text-4xl font-black text-orange-200 mb-1 leading-none">{item.year}</h3>
                                <h4 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h4>
                                <p className="text-gray-600 leading-relaxed font-medium">{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>


            </div>
        </main>
    );
}