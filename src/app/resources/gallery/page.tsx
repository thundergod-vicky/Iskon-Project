'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaTimes, FaChevronLeft, FaChevronRight, FaFilter, FaCamera, FaMapMarkerAlt, FaImage } from 'react-icons/fa';

// ─── Gallery Data — Real images from Wikimedia Commons (CC licensed) ─────────
const GALLERY_IMAGES = [
  // ── Ratha Yatra / Festivals
  { id: 1, src: "/images/gallery/ratha-yatra-dhaka.jpg", title: "Ratha Yatra 2024", location: "Dhaka, Bangladesh", category: "Festival", credit: "Wikimedia Commons" },
  { id: 2, src: "/images/gallery/ratha-yatra-moscow.jpg", title: "Ratha Yatra in Moscow", location: "Moscow, Russia", category: "Festival", credit: "Wikimedia Commons" },

  // ── Temples
  { id: 3, src: "/images/gallery/temple-mayapur.jpg", title: "Sri Krishna Temple", location: "Mayapur, West Bengal", category: "Temples", credit: "Wikimedia Commons" },
  { id: 4, src: "/images/gallery/temple-delhi.jpg", title: "ISKCON Temple Delhi", location: "New Delhi, India", category: "Temples", credit: "Wikimedia Commons" },
  { id: 5, src: "/images/gallery/temple-bangalore.jpg", title: "ISKCON Temple Bangalore", location: "Bangalore, Karnataka", category: "Temples", credit: "Wikimedia Commons" },
  { id: 6, src: "/images/gallery/temple-vrindavan.jpg", title: "Krishna-Balarama Mandir", location: "Vrindavan, Uttar Pradesh", category: "Temples", credit: "Wikimedia Commons" },
];

const CATEGORIES = ["All", "Festival", "Temples", "Devotees"];

const categoryColors: Record<string, string> = {
  "Festival":  "bg-amber-100 text-amber-700",
  "Temples":   "bg-orange-100 text-orange-700",
  "Devotees":  "bg-rose-100 text-rose-700",
};

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = GALLERY_IMAGES.filter(img => {
    const matchesCat = activeCategory === "All" || img.category === activeCategory;
    const q = searchTerm.toLowerCase();
    const matchesSearch = !q || img.title.toLowerCase().includes(q) || img.location.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  const openLightbox = (idx: number) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () => setLightboxIndex(i => (i !== null ? (i - 1 + filtered.length) % filtered.length : null));
  const nextImage = () => setLightboxIndex(i => (i !== null ? (i + 1) % filtered.length : null));

  const currentImage = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  return (
    <main className="min-h-screen bg-white pt-20 overflow-hidden">
      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center overflow-hidden bg-gray-900 shadow-2xl">
        <div className="absolute inset-0 z-0">
          {/* Fallback & Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-orange-950/80 via-black/40 to-white z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-amber-600/20 z-0" />
          
          {GALLERY_IMAGES[0] && (
            <Image
              src={GALLERY_IMAGES[0].src}
              alt="ISKCON Gallery"
              fill
              className="object-cover opacity-60 scale-105"
              priority
            />
          )}
          
          {/* Decorative Pattern */}
          <div className="absolute inset-0 bg-[url('/images/pattern-dots.svg')] opacity-10 mix-blend-overlay z-10" />
        </div>

        <div className="container mx-auto px-4 relative z-20 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <span className="inline-block py-2 px-6 rounded-full bg-orange-600 text-white font-black mb-6 tracking-[0.3em] uppercase text-xs shadow-xl">
              Sacred Moments
            </span>
            <h1 className="text-5xl md:text-8xl font-black text-white mb-6 tracking-tight drop-shadow-2xl">
              Photo <span className="text-orange-500">Gallery</span>
            </h1>
            <div className="w-24 h-1.5 bg-orange-500 mx-auto mb-8 rounded-full shadow-glow" />
            <p className="text-xl md:text-2xl text-orange-50/90 max-w-2xl mx-auto font-medium leading-relaxed italic drop-shadow-md">
              "Glimpses of devotion, festivals, and the global ISKCON family"
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Stats Bar ─────────────────────────────────────────────────────── */}
      <div className="relative z-30 -mt-12 mb-16 px-4">
        <div className="container mx-auto max-w-4xl bg-white rounded-3xl shadow-2xl border border-orange-100 p-8 flex justify-around items-center divide-x divide-orange-100">
          {[
            { value: "20+", label: "Sacred Photos", icon: <FaCamera /> },
            { value: "3", label: "Galleries", icon: <FaImage /> },
            { value: "10+", label: "Locations", icon: <FaMapMarkerAlt /> }
          ].map((stat, i) => (
            <div key={i} className="flex-1 text-center px-4 first:pl-0 last:pr-0">
              <div className="text-orange-500 text-2xl mb-1 flex justify-center">{stat.icon}</div>
              <div className="text-3xl font-black text-gray-900 tracking-tight">{stat.value}</div>
              <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-100/30 blur-[100px] rounded-full -z-10 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-100/30 blur-[100px] rounded-full -z-10 -translate-x-1/2" />

        {/* ── Controls (Filters & Search) ──────────────────────────────────── */}
        <div className="bg-white/80 backdrop-blur-md border border-orange-100 rounded-3xl p-6 mb-12 shadow-xl sticky top-24 z-40 transform-gpu transition-all hover:bg-white">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="flex flex-wrap justify-center gap-3">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2.5 rounded-2xl text-sm font-black transition-all duration-300 tracking-tight ${
                    activeCategory === cat
                      ? "bg-orange-600 text-white shadow-xl shadow-orange-600/20 scale-105"
                      : "bg-orange-50 text-orange-700 hover:bg-orange-100 border border-orange-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            
            <div className="relative w-full lg:w-96">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-400" />
              <input
                type="text"
                placeholder="Search moments, locations..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-6 py-4 bg-orange-50/50 border border-orange-100 rounded-2xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all shadow-inner"
              />
            </div>
          </div>
        </div>

        {/* ── Gallery Grid ─────────────────────────────────────────────────── */}
        <div className="mb-24">
          <div className="flex items-center justify-between mb-10 px-4">
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">
              {activeCategory === "All" ? "Everything" : activeCategory} 
              <span className="text-gray-300 ml-2 font-medium">({filtered.length})</span>
            </h2>
            {(searchTerm || activeCategory !== "All") && (
              <button 
                onClick={() => { setSearchTerm(""); setActiveCategory("All"); }}
                className="text-sm font-bold text-orange-600 hover:text-orange-700 underline underline-offset-4 decoration-2 decoration-orange-200"
              >
                Reset Filters
              </button>
            )}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-32 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-100">
              <div className="bg-gray-100 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <FaSearch className="text-gray-400 text-3xl" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-2">No moments found</h3>
              <p className="text-gray-500">Try adjusting your search or filters.</p>
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-8 space-y-8">
              {filtered.map((img, i) => (
                <motion.div
                  key={img.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  viewport={{ once: true }}
                  className="break-inside-avoid group cursor-pointer"
                  onClick={() => openLightbox(i)}
                >
                  <div className="bg-white rounded-[2rem] overflow-hidden shadow-xl border border-gray-100 group-hover:shadow-3xl group-hover:border-orange-200 transition-all duration-500">
                    <div className="relative aspect-[4/5] sm:aspect-auto overflow-hidden bg-gray-100">
                      <Image
                        src={img.src}
                        alt={img.title}
                        width={600}
                        height={800}
                        className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700"
                        onError={e => {
                          (e.target as HTMLImageElement).src = "/images/iskcon-logo.png";
                        }}
                      />
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                        <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                          <span className={`text-[10px] font-black px-3 py-1 rounded-full mb-3 inline-block uppercase tracking-wider ${categoryColors[img.category]}`}>
                            {img.category}
                          </span>
                          <h3 className="text-xl font-black text-white mb-2 leading-tight uppercase tracking-tight">{img.title}</h3>
                          <div className="flex items-center gap-2 text-orange-400 text-sm font-bold">
                            <FaMapMarkerAlt />
                            <span>{img.location}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* View Action (Floating) */}
                      <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-100">
                        <div className="bg-white text-orange-600 p-4 rounded-[1.5rem] shadow-2xl">
                          <FaCamera className="text-xl" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          <div className="mt-20 text-center">
            <p className="text-gray-400 text-sm font-medium flex items-center justify-center gap-2">
              <span className="w-12 h-px bg-gray-100" />
              Photographs by ISKCON Devotees Community
              <span className="w-12 h-px bg-gray-100" />
            </p>
          </div>
        </div>
      </div>

      {/* ── Lightbox ─────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {currentImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-gray-950/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
            onClick={closeLightbox}
          >
            {/* Close */}
            <button 
              onClick={closeLightbox}
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-10"
            >
              <FaTimes className="text-4xl" />
            </button>

            {/* Navigation */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 md:px-12 pointer-events-none">
              <button
                onClick={e => { e.stopPropagation(); prevImage(); }}
                className="bg-white/10 hover:bg-orange-600 text-white rounded-[2rem] p-6 transition-all pointer-events-auto backdrop-blur-md border border-white/10 group active:scale-90"
              >
                <FaChevronLeft className="text-2xl group-hover:-translate-x-1 transition-transform" />
              </button>
              <button
                onClick={e => { e.stopPropagation(); nextImage(); }}
                className="bg-white/10 hover:bg-orange-600 text-white rounded-[2rem] p-6 transition-all pointer-events-auto backdrop-blur-md border border-white/10 group active:scale-90"
              >
                <FaChevronRight className="text-2xl group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Image Container */}
            <motion.div
              key={lightboxIndex}
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 30, opacity: 0 }}
              className="relative max-w-6xl w-full flex flex-col items-center bg-white rounded-[3rem] overflow-hidden shadow-edge border border-white/10"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative w-full aspect-video bg-gray-900 overflow-hidden">
                <Image
                  src={currentImage.src}
                  alt={currentImage.title}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="w-full p-8 md:p-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className={`text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest ${categoryColors[currentImage.category]}`}>
                        {currentImage.category}
                      </span>
                      <span className="text-gray-400 font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                         <FaMapMarkerAlt className="text-orange-500" /> {currentImage.location}
                      </span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black text-gray-950 tracking-tight leading-none uppercase">
                      {currentImage.title}
                    </h2>
                    <p className="text-gray-400 font-medium italic">Contributor: {currentImage.credit}</p>
                  </div>
                  
                  <div className="flex items-center gap-4 border-t md:border-t-0 pt-6 md:pt-0">
                    <div className="text-right hidden md:block">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Position</p>
                      <p className="text-2xl font-black text-gray-950 leading-none">{(lightboxIndex ?? 0) + 1} <span className="text-gray-300">/</span> {filtered.length}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
