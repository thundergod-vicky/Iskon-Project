'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaSearch, FaPlay, FaYoutube, FaFilm, FaVideo,
  FaBookOpen, FaChalkboardTeacher, FaTimes, FaEye,
  FaClock, FaExternalLinkAlt, FaFilter
} from 'react-icons/fa';

// ─── Real videos from ISKCON Global YouTube channel ────────────────────────
const ALL_VIDEOS = [
  { id: "Si76LKBHTgY", title: "Harinam Sankirtan by Devotees of ISKCON", description: "Experience the divine vibration of Harinam Sankirtan — the congregational chanting of the Holy Names performed by ISKCON devotees worldwide.", date: "2015", views: "1M", category: "Kirtan" },
  { id: "3keQ22a4ATs", title: "The Trailer of The Acharya Movie", description: "An inspiring trailer of the documentary on Srila Prabhupada — the Acharya who carried the Vedic message to the Western world.", date: "2015", views: "76K", category: "Documentary" },
  { id: "UuxERIdgM4M", title: "Sanctuary of the Soul — ISKCON London", description: "A beautiful glimpse inside the Radha-Krishna temple at Bhaktivedanta Manor in London — a sanctuary of peace.", date: "2015", views: "42K", category: "Documentary" },
  { id: "F-MadK104Uc", title: "ISKCON Govardhan Eco Village — In Harmony with Nature", description: "An inspiring tour of ISKCON's sustainable eco-village at Govardhan, Maharashtra.", date: "2015", views: "27K", category: "Documentary" },
  { id: "HN5-LSgvuEg", title: "ISKCON — Sharing The Joy of Devotion", description: "A heartwarming overview of the global ISKCON movement and how devotees spread the joy of bhakti-yoga.", date: "2014", views: "28K", category: "About ISKCON" },
  { id: "iDltJQm2JFk", title: "Taking Sannyasa — The Final Vow", description: "A profound look at the ancient Vedic tradition of Sannyasa — renunciation for complete dedication to God.", date: "2015", views: "23K", category: "Lecture" },
  { id: "DH_OYR-LiV8", title: "ISKCON Welcomes Pilgrims to Ayodhya", description: "ISKCON devotees welcome pilgrims to the holy city of Ayodhya — the birthplace of Lord Rama.", date: "2022", views: "8.3K", category: "Festival" },
  { id: "DLd84UES2v4", title: "British Prime Minister Thanks ISKCON Food Relief Team", description: "The British PM personally acknowledges ISKCON's extraordinary food relief efforts during the pandemic.", date: "2020", views: "6.6K", category: "Food Relief" },
  { id: "GruFteEHFKA", title: "Vice President of India Commends Srila Prabhupada and ISKCON", description: "The VP of India recognizes Srila Prabhupada's contribution and ISKCON's global humanitarian activities.", date: "2017", views: "7.3K", category: "About ISKCON" },
  { id: "Y15paji-oKw", title: "Festival of India in Poland", description: "A vibrant celebration of Indian culture, devotion, and Ratha Yatra festival in Poland.", date: "2016", views: "7.1K", category: "Festival" },
  { id: "pSdnpiyvLIc", title: "Bhakti Yoga In Everyday Life", description: "Discover how the ancient science of Bhakti Yoga can be integrated into modern daily life.", date: "2015", views: "12K", category: "Lecture" },
  { id: "hMFx-iPT6n4", title: "Hare Krishna! Movie — Hindi Trailer", description: "The official Hindi trailer of the award-winning documentary on Srila Prabhupada and ISKCON.", date: "2020", views: "3.2K", category: "Documentary" },
  { id: "g0PZNNpaB7s", title: "50th Anniversary — Srila Prabhupada's Jaladuta Journey", description: "Commemorating Srila Prabhupada's 1965 voyage from India to America that changed the world.", date: "2015", views: "5.3K", category: "Documentary" },
  { id: "xXM57_5ljRI", title: "Scandinavian Bhakti Sangam Festival 2015", description: "Devotees from across Scandinavia gathered for a mega festival of kirtan and Vedic culture.", date: "2015", views: "3.3K", category: "Festival" },
  { id: "olKIxKzq3p0", title: "24 Hour Kirtan Experience", description: "A transcendental 24-hour uninterrupted kirtan — chanting the Holy Names through the night.", date: "2015", views: "1.8K", category: "Kirtan" },
  { id: "c_gw25ys5LM", title: "The 100K Effort — Prabhupada Marathon 2015", description: "ISKCON devotees worldwide distribute 100,000 books in the annual Prabhupada Marathon.", date: "2015", views: "920", category: "About ISKCON" },
  { id: "MRnZT_8UnfI", title: "ISKCON Myanmar Begins Food Relief Efforts", description: "ISKCON devotees in Myanmar mobilize food relief following a natural disaster.", date: "2024", views: "613", category: "Food Relief" },
  { id: "eHEWBH3HlXY", title: "In Kali-yuga — The Age of Quarrel and Strife", description: "A lecture on the nature of the current age of Kali-yuga and the Vedic prescription for elevation.", date: "2024", views: "325", category: "Lecture" },
];

const CATEGORIES = ["All", "Kirtan", "Documentary", "Lecture", "Festival", "Food Relief", "About ISKCON"];

const categoryColors: Record<string, string> = {
  "Kirtan":        "bg-rose-100 text-rose-700",
  "Documentary":   "bg-indigo-100 text-indigo-700",
  "Lecture":       "bg-blue-100 text-blue-700",
  "Festival":      "bg-amber-100 text-amber-700",
  "Food Relief":   "bg-green-100 text-green-700",
  "About ISKCON":  "bg-orange-100 text-orange-700",
};

const categoryIcons: Record<string, React.ReactNode> = {
  "Kirtan":        <FaYoutube className="text-rose-500" />,
  "Documentary":   <FaFilm className="text-indigo-500" />,
  "Lecture":       <FaChalkboardTeacher className="text-blue-500" />,
  "Festival":      <FaVideo className="text-amber-500" />,
  "Food Relief":   <FaBookOpen className="text-green-600" />,
  "About ISKCON":  <FaPlay className="text-iskcon-orange" />,
};

export default function VideosPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [heroPlaying, setHeroPlaying] = useState(false);
  const [modalVideo, setModalVideo] = useState<(typeof ALL_VIDEOS)[0] | null>(null);

  const featured = ALL_VIDEOS[0];

  const filtered = ALL_VIDEOS.filter(v => {
    const matchesCat = activeCategory === "All" || v.category === activeCategory;
    const q = searchTerm.toLowerCase();
    const matchesSearch = !q || v.title.toLowerCase().includes(q) || v.description.toLowerCase().includes(q) || v.category.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  const categoryCounts = CATEGORIES.slice(1).map(cat => ({
    name: cat,
    count: ALL_VIDEOS.filter(v => v.category === cat).length,
  }));

  return (
    <main className="min-h-screen bg-pink-50 pt-20">

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="relative bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row gap-8 items-center">

            {/* Featured video player */}
            <div className="w-full lg:w-3/5">
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-gray-200">
                {heroPlaying ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${featured.id}?autoplay=1&rel=0`}
                    title={featured.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                ) : (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://img.youtube.com/vi/${featured.id}/maxresdefault.jpg`}
                      alt={featured.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setHeroPlaying(true)}
                        className="w-20 h-20 bg-iskcon-orange hover:bg-opacity-90 rounded-full flex items-center justify-center shadow-2xl transition-all"
                      >
                        <FaPlay className="text-3xl text-white ml-1" />
                      </motion.button>
                    </div>
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center gap-1.5 bg-iskcon-orange text-white text-xs font-bold px-3 py-1.5 rounded-full">
                        ★ Featured
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Featured info */}
            <div className="w-full lg:w-2/5">
              <p className="text-iskcon-orange text-sm font-bold uppercase tracking-widest mb-2">Featured Video</p>
              <h1 className="text-3xl lg:text-4xl font-black text-gray-900 mb-3 leading-tight">{featured.title}</h1>
              <p className="text-gray-600 mb-4 leading-relaxed">{featured.description}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                <span className="flex items-center gap-1"><FaEye className="text-iskcon-orange" /> {featured.views} views</span>
                <span className="flex items-center gap-1"><FaClock className="text-iskcon-orange" /> {featured.date}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${categoryColors[featured.category]}`}>{featured.category}</span>
              </div>

              {/* Channel subscribe */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setHeroPlaying(true)}
                  className="flex items-center justify-center gap-2 bg-iskcon-orange text-white px-6 py-3 rounded-xl font-bold hover:bg-opacity-90 transition-all"
                >
                  <FaPlay /> Watch Now
                </button>
                <a
                  href="https://www.youtube.com/@ISKCONglobal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 border-2 border-red-500 text-red-500 px-6 py-3 rounded-xl font-bold hover:bg-red-50 transition-all"
                >
                  <FaYoutube /> Subscribe on YouTube
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats bar ─────────────────────────────────────────────────────────── */}
      <div className="bg-iskcon-orange py-4">
        <div className="container mx-auto px-4 flex justify-center gap-12 md:gap-24 text-white text-center">
          {[["18", "Videos"], ["6", "Categories"], ["1M+", "Views"]].map(([v, l]) => (
            <div key={l}><div className="text-2xl font-black">{v}</div><div className="text-xs uppercase tracking-wider opacity-80">{l}</div></div>
          ))}
        </div>
      </div>

      {/* ── Filters ───────────────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-100 py-5 sticky top-[72px] z-30 shadow-sm">
        <div className="container mx-auto px-4 flex flex-col md:flex-row gap-4 items-center">
          <div className="flex flex-wrap gap-2 flex-1">
            <span className="flex items-center gap-1 text-gray-500 text-sm mr-1"><FaFilter className="text-iskcon-orange" /> Category:</span>
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
              placeholder="Search videos…"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-iskcon-orange"
            />
          </div>
        </div>
      </div>

      {/* ── Video Grid ────────────────────────────────────────────────────────── */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-500 text-sm">
              Showing <span className="text-gray-900 font-bold">{filtered.length}</span> of {ALL_VIDEOS.length} videos
              {activeCategory !== "All" && <> · <span className="text-iskcon-orange font-semibold">{activeCategory}</span></>}
            </p>
            {(searchTerm || activeCategory !== "All") && (
              <button onClick={() => { setSearchTerm(""); setActiveCategory("All"); }} className="text-xs text-gray-400 hover:text-iskcon-orange flex items-center gap-1">
                <FaTimes /> Clear filters
              </button>
            )}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-24 text-gray-400">
              No videos found.
              <button onClick={() => { setSearchTerm(""); setActiveCategory("All"); }} className="block mx-auto mt-3 text-iskcon-orange text-sm hover:underline">Reset filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((video, i) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.4) }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer border border-gray-100"
                  onClick={() => setModalVideo(video)}
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-video bg-gray-100 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                      <div className="w-12 h-12 bg-iskcon-orange rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300">
                        <FaPlay className="text-white text-sm ml-0.5" />
                      </div>
                    </div>
                    <div className="absolute top-2 left-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${categoryColors[video.category]}`}>
                        {video.category}
                      </span>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded flex items-center gap-1">
                      <FaYoutube className="text-red-400" />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 text-sm leading-tight line-clamp-2 mb-2 group-hover:text-iskcon-orange transition-colors">
                      {video.title}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span className="flex items-center gap-1"><FaEye /> {video.views} views</span>
                      <span>{video.date}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Category Overview ─────────────────────────────────────────────────── */}
      <section className="py-14 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-black text-gray-900 mb-8 text-center">Browse by Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categoryCounts.map(({ name, count }) => (
              <motion.button
                key={name}
                whileHover={{ y: -4, scale: 1.02 }}
                onClick={() => { setActiveCategory(name); window.scrollTo({ top: 600, behavior: "smooth" }); }}
                className={`rounded-2xl p-5 text-center transition-all border ${
                  activeCategory === name
                    ? "border-iskcon-orange bg-orange-50 shadow-md"
                    : "bg-gray-50 border-gray-100 hover:border-iskcon-orange/30 hover:shadow"
                }`}
              >
                <div className="flex justify-center mb-2 text-xl">{categoryIcons[name]}</div>
                <p className="font-bold text-gray-800 text-sm">{name}</p>
                <p className="text-gray-400 text-xs mt-0.5">{count} video{count !== 1 ? "s" : ""}</p>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Subscribe CTA ─────────────────────────────────────────────────────── */}
      <section className="py-14 bg-pink-50 border-t border-pink-100">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-2xl p-8 shadow-md text-center border border-gray-100">
            <FaYoutube className="text-6xl text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-black text-gray-900 mb-2">Subscribe for More Spiritual Content</h2>
            <p className="text-gray-500 mb-6 text-sm max-w-lg mx-auto">
              Stay updated with latest videos, live streams of temple ceremonies, and exclusive content from ISKCON temples worldwide.
            </p>
            <a
              href="https://www.youtube.com/@ISKCONglobal"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white px-8 py-3 rounded-xl font-bold transition-colors text-sm"
            >
              <FaYoutube /> Subscribe to ISKCON Global <FaExternalLinkAlt className="text-xs" />
            </a>
          </div>
        </div>
      </section>

      {/* ── Video Modal ───────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {modalVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setModalVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 28 }}
              className="bg-white rounded-2xl overflow-hidden max-w-4xl w-full shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              {/* Embed */}
              <div className="relative aspect-video bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${modalVideo.id}?autoplay=1&rel=0`}
                  title={modalVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>

              {/* Info */}
              <div className="p-6 bg-white">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${categoryColors[modalVideo.category]}`}>
                        {modalVideo.category}
                      </span>
                      <span className="text-xs text-gray-400 flex items-center gap-1"><FaEye /> {modalVideo.views} views · {modalVideo.date}</span>
                    </div>
                    <h2 className="text-xl font-black text-gray-900 mb-2">{modalVideo.title}</h2>
                    <p className="text-gray-500 text-sm leading-relaxed">{modalVideo.description}</p>
                  </div>
                  <div className="flex flex-col gap-2 shrink-0">
                    <a
                      href={`https://www.youtube.com/watch?v=${modalVideo.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-red-100 hover:bg-red-200 text-red-600 px-4 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap"
                    >
                      <FaYoutube /> YouTube
                    </a>
                    <button
                      onClick={() => setModalVideo(null)}
                      className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-600 px-4 py-2 rounded-xl text-xs font-bold transition-colors"
                    >
                      <FaTimes /> Close
                    </button>
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