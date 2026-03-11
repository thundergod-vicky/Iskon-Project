'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaBookOpen, FaGlobeAmericas, FaShip, FaPrayingHands } from 'react-icons/fa';

export default function PrabhupadaBiographyPage() {
    return (
        <main className="min-h-screen bg-gray-50 pb-20">
            {/* Hero Section */}
            <section className="relative pt-32 pb-32 overflow-hidden bg-gray-900 border-b-8 border-orange-500">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-orange-900/60 to-black/90 mix-blend-multiply" />
                    <img src="/images/gallery/temple-view.jpg" alt="Srila Prabhupada" className="w-full h-full object-cover opacity-30 grayscale blur-[2px]" />
                </div>
                <div className="container mx-auto px-4 relative z-10 text-center flex flex-col items-center">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-4xl mx-auto">
                        <span className="inline-block py-1.5 px-6 rounded-full bg-orange-500/20 text-orange-400 font-bold mb-6 tracking-widest uppercase text-sm border border-orange-500/30">Founder-Acharya</span>
                        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 drop-shadow-2xl tracking-tight">
                            His Divine Grace <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">A.C. Bhaktivedanta Swami Prabhupada</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 font-light max-w-3xl mx-auto">
                            The extraordinary life of the spiritual ambassador who brought the timeless teachings of Krishna Consciousness to the world.
                        </p>
                    </motion.div>
                </div>
            </section>

            <div className="container mx-auto px-4 -mt-16 relative z-20">
                {/* Introduction Block */}
                <div className="bg-white rounded-[2.5rem] p-10 md:p-16 shadow-2xl max-w-5xl mx-auto border border-gray-100 mb-24 grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="w-16 h-1 bg-orange-500 mb-6"></div>
                        <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 leading-tight">A Lifetime in <br />Preparation</h2>
                        <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                            Born Abhay Charan De on September 1, 1896, in Calcutta, India, his father was a pure Vaishnava who raised him to be a devotee of Krishna. In 1922, Abhay met his spiritual master, Srila Bhaktisiddhanta Sarasvati Thakura, who made a fateful request: <strong>spread the message of Lord Chaitanya in the English language.</strong>
                        </p>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            It took decades of preparation. In 1959, he took the vow of sannyasa (renunciation), becoming A.C. Bhaktivedanta Swami. He then began his life's masterpiece: a massive translation and commentary on the 18,000-verse Srimad-Bhagavatam.
                        </p>
                    </div>
                    <div className="bg-slate-900 rounded-[2rem] p-10 text-white relative overflow-hidden shadow-2xl transform md:rotate-2">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/20 blur-3xl rounded-full" />
                        <FaQuoteLeft className="text-5xl text-orange-500/40 mb-6 relative z-10" />
                        <blockquote className="text-2xl font-bold italic leading-snug relative z-10 mb-6">
                            "I shall never undergo the grief of being unable to work. I shall work until the last moment of my life."
                        </blockquote>
                        <div className="text-orange-400 font-black tracking-widest uppercase text-sm relative z-10">— Srila Prabhupada</div>
                    </div>
                </div>

                {/* The Journey Section */}
                <div className="max-w-6xl mx-auto mb-24">
                    <div className="grid md:grid-cols-3 gap-8">
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white p-10 rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all group">
                            <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform"><FaShip /></div>
                            <h3 className="text-2xl font-black text-gray-900 mb-4">The Jaladuta Voyage</h3>
                            <p className="text-gray-600 leading-relaxed">At age 69, he boarded a cargo ship to New York, suffering two heart attacks during the perilous 35-day journey. He arrived in 1965 with $7 in rupees and a crate of translated texts.</p>
                        </motion.div>
                        
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} viewport={{ once: true }} className="bg-white p-10 rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all group">
                            <div className="w-16 h-16 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform"><FaGlobeAmericas /></div>
                            <h3 className="text-2xl font-black text-gray-900 mb-4">Establishing ISKCON</h3>
                            <p className="text-gray-600 leading-relaxed">In July 1966, he founded ISKCON in a small storefront in New York. Over the next 11 years, he circled the globe 14 times, establishing 108 temples across six continents.</p>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} viewport={{ once: true }} className="bg-white p-10 rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all group">
                            <div className="w-16 h-16 bg-green-50 text-green-500 rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform"><FaBookOpen /></div>
                            <h3 className="text-2xl font-black text-gray-900 mb-4">Literary Legacy</h3>
                            <p className="text-gray-600 leading-relaxed">Despite his travel schedule, he authored over 80 volumes of translation and commentary. The Bhaktivedanta Book Trust (BBT) became the world's largest publisher of Vedic literature.</p>
                        </motion.div>
                    </div>
                </div>

                {/* Dark Timeline */}
                <div className="max-w-5xl mx-auto bg-gray-900 rounded-[3rem] p-10 md:p-20 shadow-2xl relative overflow-hidden text-white">
                    <div className="absolute inset-0 bg-[url('/images/gallery/temple-view.jpg')] opacity-5 bg-cover mix-blend-screen" />
                    
                    <div className="text-center relative z-10 mb-16">
                        <h2 className="text-4xl font-black mb-4">Milestones of a Mahabhagavata</h2>
                        <p className="text-gray-400">Key moments in the life of the Founder-Acharya.</p>
                    </div>

                    <div className="relative z-10 max-w-3xl mx-auto">
                        <div className="absolute left-[39px] top-4 bottom-4 w-1 bg-gradient-to-b from-orange-500/50 via-orange-500/20 to-transparent"></div>
                        
                        {[
                            { year: '1896', desc: 'Born Abhay Charan De in Calcutta.' },
                            { year: '1922', desc: 'Meets his spiritual master, Srila Bhaktisiddhanta Sarasvati Thakura.' },
                            { year: '1933', desc: 'Officially initiated in Allahabad.' },
                            { year: '1959', desc: 'Accepts the renounced order of life (sannyasa) in Mathura.' },
                            { year: '1965', desc: 'Travels to America aboard the Jaladuta cargo ship.' },
                            { year: '1966', desc: 'Incorporates ISKCON in New York City.' },
                            { year: '1977', desc: 'Departs from this mortal world in Vrindavan, India, leaving behind a global spiritual movement.' }
                        ].map((item, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="flex gap-8 mb-10 last:mb-0 relative"
                            >
                                <div className="w-20 h-20 rounded-2xl bg-gray-800 border-2 border-orange-500 flex items-center justify-center shrink-0 z-10 shadow-[0_0_15px_rgba(249,115,22,0.3)]">
                                    <span className="font-black text-orange-400 text-lg">{item.year}</span>
                                </div>
                                <div className="pt-5">
                                    <p className="text-xl text-gray-300 font-medium leading-relaxed">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </main>
    );
}
