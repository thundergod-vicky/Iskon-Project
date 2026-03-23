'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaFilter, FaTimes, FaCameraRetro, FaDownload, FaShare } from 'react-icons/fa';

interface IGallery {
  _id: string;
  title: string;
  src: string;
  thumbnail: string;
  category: string;
  description?: string;
  width: number;
  height: number;
  active: boolean;
  createdAt: string;
}

export default function PrabhupadaGallery() {
    const [galleryItems, setGalleryItems] = useState<IGallery[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const res = await fetch('/api/gallery');
                if (res.ok) {
                    const data = await res.json();
                    setGalleryItems(data.filter((item: IGallery) => item.active !== false));
                }
            } catch (error) {
                console.error('Failed to fetch gallery images', error);
            } finally {
                setLoading(false);
            }
        };
        fetchImages();
    }, []);

    const categories = ['All', ...Array.from(new Set(galleryItems.map(item => item.category || 'Uncategorized').filter(cat => cat !== 'All')))];

    const filteredImages = galleryItems.filter(item => {
        const itemCategory = item.category || 'Uncategorized';
        const matchesCategory = selectedCategory === 'All' || itemCategory === selectedCategory;
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
    });

    const selectedImgData = galleryItems.find(img => img._id === selectedImage);

    return (
        <main className="min-h-screen bg-gray-50 pb-20">
            {/* Hero Section */}
            <section className="relative pt-32 pb-24 overflow-hidden bg-gray-900 border-b-8 border-orange-500">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent mix-blend-multiply" />
                    <img src="/images/gallery/devotees-serving.jpg" alt="Gallery" className="w-full h-full object-cover opacity-20 grayscale" />
                </div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-3xl mx-auto">
                        <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white/10 text-white font-bold mb-6 tracking-wider shadow-inner backdrop-blur-md border border-white/20">
                            <FaCameraRetro /> Photo Archives
                        </span>
                        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 drop-shadow-lg">
                            Visual <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">History</span>
                        </h1>
                        <p className="text-xl text-gray-400 font-light">
                            Rare and historical photographs from the early days of the Hare Krishna movement.
                        </p>
                    </motion.div>
                </div>
            </section>

            <div className="container mx-auto px-4 -mt-8 relative z-20">
                {/* Search & Filter Bar */}
                <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 max-w-5xl mx-auto mb-12 flex flex-col md:flex-row gap-6 items-center justify-between">
                    <div className="relative w-full md:w-96">
                        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input 
                            type="text" 
                            placeholder="Search photographs..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all font-medium text-gray-700"
                        />
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-2 bg-gray-50 p-2 rounded-2xl border border-gray-200">
                        <FaFilter className="text-gray-400 ml-2 mr-2" />
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${selectedCategory === cat ? 'bg-orange-500 text-white shadow-md' : 'text-gray-500 hover:bg-gray-200 hover:text-gray-800'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Masonry-style Grid */}
                {loading ? (
                    <div className="text-center py-20 text-gray-400 font-medium">Loading gallery...</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        <AnimatePresence>
                            {filteredImages.map((item, idx) => (
                                <motion.div 
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                                    key={item._id} 
                                    onClick={() => setSelectedImage(item._id)}
                                    className="group cursor-pointer bg-white rounded-3xl p-3 shadow-md hover:shadow-2xl border border-gray-100 transition-all duration-300"
                                >
                                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-gray-100">
                                        <img src={item.thumbnail || item.src} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white mb-2 ml-auto"><FaSearch /></div>
                                        </div>
                                        {item.createdAt && (
                                            <div className="absolute top-4 left-4 font-black uppercase text-xs tracking-widest bg-orange-500 text-white py-1 px-3 rounded-lg shadow-lg">
                                                {new Date(item.createdAt).getFullYear()}
                                            </div>
                                        )}
                                    </div>
                                    <div className="px-3 pb-3">
                                        <p className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-1">{item.category || 'Uncategorized'}</p>
                                        <h3 className="text-lg font-black text-gray-900">{item.title}</h3>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
                
                {!loading && filteredImages.length === 0 && (
                    <div className="text-center py-20">
                        <div className="text-6xl text-gray-200 mb-4 inline-block"><FaCameraRetro /></div>
                        <h3 className="text-2xl font-bold text-gray-400">No photographs found.</h3>
                    </div>
                )}
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && selectedImgData && (
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
                    >
                        <div className="absolute inset-0 bg-black/95 backdrop-blur-sm" onClick={() => setSelectedImage(null)} />
                        
                        <button onClick={() => setSelectedImage(null)} className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white text-xl transition-colors z-[60]">
                            <FaTimes />
                        </button>

                        <motion.div 
                            initial={{ scale: 0.95, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 20 }}
                            className="relative z-10 w-full max-w-5xl bg-gray-900 rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row border border-gray-800"
                        >
                            <div className="w-full md:w-2/3 bg-black aspect-video md:aspect-auto relative flex items-center justify-center p-4">
                                <img src={selectedImgData.src} alt="Preview" className="max-w-full max-h-[70vh] object-contain rounded-xl" />
                            </div>
                            <div className="w-full md:w-1/3 p-8 md:p-10 flex flex-col border-t md:border-t-0 md:border-l border-gray-800 bg-gray-900">
                                {selectedImgData.createdAt && (
                                    <div className="inline-block py-1 px-3 bg-orange-500/20 text-orange-400 font-bold uppercase text-xs tracking-widest rounded-lg mb-4 w-fit">
                                        {new Date(selectedImgData.createdAt).getFullYear()}
                                    </div>
                                )}
                                <h2 className="text-3xl font-black text-white mb-2">{selectedImgData.title}</h2>
                                <p className="text-orange-500 font-bold text-sm uppercase tracking-widest mb-6">{selectedImgData.category || 'Uncategorized'}</p>
                                <p className="text-gray-400 leading-relaxed text-lg mb-8 flex-grow">{selectedImgData.description || ''}</p>
                                
                                <div className="flex gap-4 mt-auto">
                                    <a href={selectedImgData.src} download={selectedImgData.title} target="_blank" rel="noreferrer" className="flex-1 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors">
                                        <FaDownload /> Download
                                    </a>
                                    <button className="flex-1 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors">
                                        <FaShare /> Share
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}