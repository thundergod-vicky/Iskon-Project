'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaSearch, FaPlay, FaYoutube, FaHeadphones, FaMicrophone,
  FaBookOpen, FaChalkboardTeacher, FaTimes, FaEye,
  FaClock, FaExternalLinkAlt, FaFilter, FaQuestionCircle
} from 'react-icons/fa';

// ─── Real videos/lectures from YouTube ────────────────────────
const ALL_LECTURES = [
  { id: "Si76LKBHTgY", title: "The Purpose of Human Life", description: "Srila Prabhupada explains the ultimate purpose of human existence and how to achieve it.", date: "1975", views: "1.2M", category: "Philosophy" },
  { id: "eHEWBH3HlXY", title: "Understanding Bhagavad-gita", description: "A comprehensive overview of the Bhagavad-gita's essential teachings.", date: "1976", views: "850K", category: "Scripture" },
  { id: "olKIxKzq3p0", title: "The Science of God Realization", description: "Exploring the scientific basis of God consciousness and spiritual practice.", date: "1974", views: "500K", category: "Science" },
  { id: "HN5-LSgvuEg", title: "Who is Krishna?", description: "An introductory lecture on the Supreme Personality of Godhead.", date: "1966", views: "2M", category: "Philosophy" },
  { id: "pSdnpiyvLIc", title: "The Meaning of Mantra Meditation", description: "Srila Prabhupada explains the power of the Hare Krishna maha-mantra.", date: "1968", views: "3M", category: "Meditation" },
  { id: "3keQ22a4ATs", title: "Questions & Answers with Scientists", description: "An engaging Q&A session where Srila Prabhupada answers probing questions from scientists.", date: "1973", views: "400K", category: "Q&A" },
  { id: "iDltJQm2JFk", title: "Srimad Bhagavatam Class", description: "Deep dive into the verses of the Srimad Bhagavatam.", date: "1972", views: "650K", category: "Scripture" },
  { id: "UuxERIdgM4M", title: "The Process of Bhakti Yoga", description: "Practical application of devotional service in everyday life.", date: "1971", views: "900K", category: "Philosophy" },
  { id: "F-MadK104Uc", title: "Origin of the Soul", description: "Where do we come from? Srila Prabhupada explains the spiritual origin of every living entity.", date: "1970", views: "1.1M", category: "Science" },
  { id: "DH_OYR-LiV8", title: "The Art of Dying", description: "understanding the journey of the soul after leaving the physical body.", date: "1974", views: "820K", category: "Philosophy" },
  { id: "DLd84UES2v4", title: "Chanting Hare Krishna", description: "Instructions on how to properly chant the holy names for maximum spiritual benefit.", date: "1969", views: "1.5M", category: "Meditation" },
  { id: "GruFteEHFKA", title: "Press Interview in London", description: "Srila Prabhupada expertly answers questions from reporters during his arrival in London.", date: "1971", views: "730K", category: "Q&A" }
];

const CATEGORIES = ["All", "Philosophy", "Scripture", "Science", "Meditation", "Q&A"];

const categoryColors: Record<string, string> = {
  "Philosophy":    "bg-rose-100 text-rose-700",
  "Scripture":     "bg-indigo-100 text-indigo-700",
  "Science":       "bg-blue-100 text-blue-700",
  "Meditation":    "bg-amber-100 text-amber-700",
  "Q&A":           "bg-green-100 text-green-700",
};

const categoryIcons: Record<string, React.ReactNode> = {
  "Philosophy":    <FaChalkboardTeacher className="text-rose-500" />,
  "Scripture":     <FaBookOpen className="text-indigo-500" />,
  "Science":       <FaMicrophone className="text-blue-500" />,
  "Meditation":    <FaHeadphones className="text-amber-500" />,
  "Q&A":           <FaQuestionCircle className="text-green-600" />,
};

export default function LecturesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [heroPlaying, setHeroPlaying] = useState(false);
  const [modalLecture, setModalLecture] = useState<(typeof ALL_LECTURES)[0] | null>(null);

  const featured = ALL_LECTURES[0];

  const filtered = ALL_LECTURES.filter(l => {
    const matchesCat = activeCategory === "All" || l.category === activeCategory;
    const q = searchTerm.toLowerCase();
    const matchesSearch = !q || l.title.toLowerCase().includes(q) || l.description.toLowerCase().includes(q) || l.category.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  const categoryCounts = CATEGORIES.slice(1).map(cat => ({
    name: cat,
    count: ALL_LECTURES.filter(l => l.category === cat).length,
  }));

  return (
    <main className="min-h-screen bg-pink-50 pt-20">

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="relative bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row gap-8 items-center">

            {/* Featured lecture player */}
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
              <p className="text-iskcon-orange text-sm font-bold uppercase tracking-widest mb-2">Featured Lecture</p>
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
                  <FaPlay /> Listen Now
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
          {[["1,000+", "Lectures"], ["5", "Categories"], ["10M+", "Listens"]].map(([v, l]) => (
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
              placeholder="Search lectures…"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-iskcon-orange"
            />
          </div>
        </div>
      </div>

      {/* ── Lectures Grid ────────────────────────────────────────────────────────── */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-500 text-sm">
              Showing <span className="text-gray-900 font-bold">{filtered.length}</span> of {ALL_LECTURES.length} lectures
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
              No lectures found.
              <button onClick={() => { setSearchTerm(""); setActiveCategory("All"); }} className="block mx-auto mt-3 text-iskcon-orange text-sm hover:underline">Reset filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((lecture, i) => (
                <motion.div
                  key={lecture.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.4) }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer border border-gray-100"
                  onClick={() => setModalLecture(lecture)}
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-video bg-gray-100 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://img.youtube.com/vi/${lecture.id}/mqdefault.jpg`}
                      alt={lecture.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                      <div className="w-12 h-12 bg-iskcon-orange rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300">
                        <FaPlay className="text-white text-sm ml-0.5" />
                      </div>
                    </div>
                    <div className="absolute top-2 left-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${categoryColors[lecture.category]}`}>
                        {lecture.category}
                      </span>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded flex items-center gap-1">
                      <FaHeadphones className="text-amber-400" />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 text-sm leading-tight line-clamp-2 mb-2 group-hover:text-iskcon-orange transition-colors">
                      {lecture.title}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span className="flex items-center gap-1"><FaEye /> {lecture.views} views</span>
                      <span>{lecture.date}</span>
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
          <h2 className="text-2xl font-black text-gray-900 mb-8 text-center">Browse by Topic</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
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
                <p className="text-gray-400 text-xs mt-0.5">{count} lecture{count !== 1 ? "s" : ""}</p>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Subscribe CTA ─────────────────────────────────────────────────────── */}
      <section className="py-14 bg-pink-50 border-t border-pink-100">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-2xl p-8 shadow-md text-center border border-gray-100">
            <FaHeadphones className="text-6xl text-amber-500 mx-auto mb-4" />
            <h2 className="text-2xl font-black text-gray-900 mb-2">Dive Deeper into the Teachings</h2>
            <p className="text-gray-500 mb-6 text-sm max-w-lg mx-auto">
              Continue your spiritual journey by subscribing to our channels for daily lectures, seminars, and philosophical insights.
            </p>
            <a
              href="https://www.youtube.com/@ISKCONglobal"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white px-8 py-3 rounded-xl font-bold transition-colors text-sm"
            >
              <FaYoutube /> Subscribe for Daily Lectures <FaExternalLinkAlt className="text-xs" />
            </a>
          </div>
        </div>
      </section>

      {/* ── Lecture Modal ───────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {modalLecture && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setModalLecture(null)}
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
                  src={`https://www.youtube.com/embed/${modalLecture.id}?autoplay=1&rel=0`}
                  title={modalLecture.title}
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
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${categoryColors[modalLecture.category]}`}>
                        {modalLecture.category}
                      </span>
                      <span className="text-xs text-gray-400 flex items-center gap-1"><FaEye /> {modalLecture.views} views · {modalLecture.date}</span>
                    </div>
                    <h2 className="text-xl font-black text-gray-900 mb-2">{modalLecture.title}</h2>
                    <p className="text-gray-500 text-sm leading-relaxed">{modalLecture.description}</p>
                  </div>
                  <div className="flex flex-col gap-2 shrink-0">
                    <a
                      href={`https://www.youtube.com/watch?v=${modalLecture.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-red-100 hover:bg-red-200 text-red-600 px-4 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap"
                    >
                      <FaYoutube /> YouTube
                    </a>
                    <button
                      onClick={() => setModalLecture(null)}
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
