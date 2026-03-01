'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaTimes, FaChevronLeft, FaChevronRight, FaFilter, FaCamera, FaMapMarkerAlt } from 'react-icons/fa';

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
    <main className="min-h-screen bg-pink-50 pt-20">

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="relative h-[40vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          {GALLERY_IMAGES[0] && (
            <Image
              src={GALLERY_IMAGES[0].src}
              alt="ISKCON Gallery"
              fill
              className="object-cover brightness-50"
              priority
            />
          )}
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-iskcon-saffron text-sm font-bold uppercase tracking-[0.3em] mb-2">Sacred Moments</p>
            <h1 className="text-5xl md:text-7xl font-black mb-3 drop-shadow-2xl">Photo Gallery</h1>
            <p className="text-gray-200 max-w-lg mx-auto">Glimpses of devotion, festivals, and the global ISKCON family</p>
          </motion.div>
        </div>
      </section>

      {/* ── Stats ──────────────────────────────────────────────────────────── */}
      <div className="bg-iskcon-orange py-4">
        <div className="container mx-auto px-4 flex justify-center gap-16 text-white text-center">
          {[["20", "Photos"], ["3", "Categories"], ["10+", "Locations"]].map(([v, l]) => (
            <div key={l}><div className="text-2xl font-black">{v}</div><div className="text-xs uppercase tracking-wider opacity-80">{l}</div></div>
          ))}
        </div>
      </div>

      {/* ── Filters ─────────────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-100 py-5 sticky top-[72px] z-30 shadow-sm">
        <div className="container mx-auto px-4 flex flex-col md:flex-row gap-4 items-center">
          <div className="flex flex-wrap gap-2 flex-1 items-center">
            <span className="flex items-center gap-1 text-gray-400 text-sm mr-1"><FaFilter className="text-iskcon-orange" /></span>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                  activeCategory === cat
                    ? "bg-iskcon-orange text-white shadow"
                    : "bg-gray-100 text-gray-600 hover:bg-orange-50 hover:text-iskcon-orange"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-64 shrink-0">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <input
              type="text"
              placeholder="Search by title or location…"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-iskcon-orange"
            />
          </div>
        </div>
      </div>

      {/* ── Gallery Grid ────────────────────────────────────────────────────── */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-500 text-sm">
              Showing <span className="font-bold text-gray-900">{filtered.length}</span> of {GALLERY_IMAGES.length} photos
              {activeCategory !== "All" && <> · <span className="text-iskcon-orange font-semibold">{activeCategory}</span></>}
            </p>
            {(searchTerm || activeCategory !== "All") && (
              <button onClick={() => { setSearchTerm(""); setActiveCategory("All"); }} className="text-xs text-gray-400 hover:text-iskcon-orange flex items-center gap-1">
                <FaTimes /> Clear
              </button>
            )}
          </div>

          {/* Masonry-style grid using CSS columns */}
          {filtered.length === 0 ? (
            <div className="text-center py-24 text-gray-400">No photos found.</div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
              {filtered.map((img, i) => (
                <motion.div
                  key={img.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.4) }}
                  viewport={{ once: true }}
                  className="break-inside-avoid bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer border border-gray-100 mb-4"
                  onClick={() => openLightbox(i)}
                >
                  <div className="relative overflow-hidden bg-gray-100">
                    <Image
                      src={img.src}
                      alt={img.title}
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={e => {
                        (e.target as HTMLImageElement).src = "/images/iskcon-logo.png";
                      }}
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                          <FaCamera className="text-white text-2xl" />
                        </div>
                      </div>
                    </div>
                    {/* Category badge */}
                    <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${categoryColors[img.category]}`}>
                        {img.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="font-semibold text-gray-800 text-sm leading-tight mb-1 group-hover:text-iskcon-orange transition-colors line-clamp-1">{img.title}</p>
                    <p className="text-gray-400 text-xs flex items-center gap-1"><FaMapMarkerAlt className="text-iskcon-orange text-[10px]" /> {img.location}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          <p className="text-center mt-8 text-gray-400 text-xs">
            Photos sourced from Wikimedia Commons · Creative Commons licensed
          </p>
        </div>
      </section>

      {/* ── Lightbox ─────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {currentImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Prev */}
            <button
              onClick={e => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/30 text-white rounded-full p-3 transition-all z-10"
            >
              <FaChevronLeft className="text-xl" />
            </button>

            {/* Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 28 }}
              className="relative max-w-5xl max-h-[85vh] w-full bg-white rounded-2xl overflow-hidden shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative max-h-[70vh] overflow-hidden bg-gray-100">
                <Image
                  src={currentImage.src}
                  alt={currentImage.title}
                  width={1200}
                  height={800}
                  className="w-full h-auto max-h-[70vh] object-contain"
                />
              </div>
              <div className="p-5 bg-white">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${categoryColors[currentImage.category]}`}>{currentImage.category}</span>
                      <span className="text-gray-400 text-xs flex items-center gap-1"><FaMapMarkerAlt className="text-iskcon-orange" /> {currentImage.location}</span>
                    </div>
                    <h2 className="font-black text-xl text-gray-900">{currentImage.title}</h2>
                    <p className="text-gray-400 text-xs mt-1">📷 {currentImage.credit}</p>
                  </div>
                  <button onClick={closeLightbox} className="bg-gray-100 hover:bg-gray-200 rounded-xl p-2.5 text-gray-600 transition-colors shrink-0">
                    <FaTimes />
                  </button>
                </div>
                <div className="flex justify-between items-center mt-3 text-xs text-gray-400">
                  <span>{(lightboxIndex ?? 0) + 1} of {filtered.length}</span>
                  <div className="flex gap-2">
                    <button onClick={prevImage} className="bg-gray-100 hover:bg-iskcon-orange hover:text-white px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"><FaChevronLeft /> Prev</button>
                    <button onClick={nextImage} className="bg-gray-100 hover:bg-iskcon-orange hover:text-white px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1">Next <FaChevronRight /></button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Next */}
            <button
              onClick={e => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/30 text-white rounded-full p-3 transition-all z-10"
            >
              <FaChevronRight className="text-xl" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
