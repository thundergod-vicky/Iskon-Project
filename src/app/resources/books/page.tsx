'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaSearch, FaBookOpen, FaGlobe, FaHeart, FaQuoteLeft, FaSpinner, FaOm, FaExternalLinkAlt } from 'react-icons/fa';

// ─── Book Data ────────────────────────────────────────────────────────────────
const prabhupadaBooks = [
  {
    id: 1,
    title: "Bhagavad-gita As It Is",
    author: "A.C. Bhaktivedanta Swami Prabhupada",
    description: "The definitive guide to understanding the essence of Krishna consciousness. Sanskrit text, transliteration, word-for-word meanings, and detailed purports.",
    image: "/images/store/bhagavad-gita.jpg",
    spineColor: "#8B1A1A",
    category: "Scripture",
    year: 1972,
    readLink: "/resources/books/bhagavad-gita",
    external: false,
  },
  {
    id: 2,
    title: "Srimad-Bhagavatam",
    author: "A.C. Bhaktivedanta Swami Prabhupada",
    description: "The great spiritual classic — 18,000 verses on the science of God, the soul, and the universe, with extensive commentary.",
    image: "/images/books/srimad-bhagavatam.jpg",
    spineColor: "#1A3A5C",
    category: "Scripture",
    year: 1972,
    readLink: "https://vedabase.io/en/library/sb/",
    external: true,
  },
  {
    id: 3,
    title: "The Mahabharata",
    author: "Vyasadeva",
    description: "The world's longest epic — a sweeping saga of dharma, war, and redemption featuring the Pandavas and Kauravas, culminating in the Bhagavad-gita.",
    image: "/images/books/mahabharata.jpg",
    spineColor: "#5C2A00",
    category: "Epic",
    year: 400,
    readLink: "https://www.sacred-texts.com/hin/maha/index.htm",
    external: true,
  },
  {
    id: 4,
    title: "The Ramayana",
    author: "Valmiki",
    description: "The timeless story of Lord Rama, Sita, and the triumph of dharma over evil — one of the greatest spiritual epics of all time.",
    image: "/images/books/ramayana.jpg",
    spineColor: "#1E5C2A",
    category: "Epic",
    year: 500,
    readLink: "https://www.sacred-texts.com/hin/rama/index.htm",
    external: true,
  },
  {
    id: 5,
    title: "Krsna — The Supreme Personality of Godhead",
    author: "A.C. Bhaktivedanta Swami Prabhupada",
    description: "The complete pastimes of Lord Krishna — His birth in Mathura, childhood in Vrindavan, and divine activities with the gopis.",
    image: "/images/books/krishna-book.jpg",
    spineColor: "#0A3D52",
    category: "Scripture",
    year: 1970,
    readLink: "https://vedabase.io/en/library/kb/",
    external: true,
  },
  {
    id: 6,
    title: "Vishnu Purana",
    author: "Vyasadeva",
    description: "One of the eighteen Mahapuranas glorifying Lord Vishnu — covering creation, the solar dynasty, the life of Krishna, and cosmic dissolution.",
    image: "/images/books/vishnu-purana.jpg",
    spineColor: "#3A1A5C",
    category: "Purana",
    year: 400,
    readLink: "https://www.sacred-texts.com/hin/vp/index.htm",
    external: true,
  },
  {
    id: 7,
    title: "The Nectar of Devotion",
    author: "A.C. Bhaktivedanta Swami Prabhupada",
    description: "A summary study of Srila Rupa Goswami's Bhakti-rasamrita-sindhu — the complete science of devotional service.",
    image: "/images/books/nectar-of-devotion.jpg",
    spineColor: "#7A3300",
    category: "Philosophy",
    year: 1970,
    readLink: "https://vedabase.io/en/library/nod/",
    external: true,
  },
];

// ─── Gita API types ───────────────────────────────────────────────────────────
interface GitaChapter {
  chapter_number: number;
  verses_count: number;
  name: string;
  translation: string;
  transliteration: string;
  meaning: { en: string; hi: string };
  summary: { en: string; hi: string };
}

const chapterGradients = [
  "from-orange-600 to-amber-400", "from-violet-700 to-purple-400",
  "from-teal-600 to-emerald-400", "from-rose-700 to-pink-400",
  "from-blue-700 to-cyan-400",   "from-amber-700 to-yellow-400",
  "from-indigo-700 to-blue-400", "from-fuchsia-700 to-pink-400",
  "from-green-700 to-lime-400",  "from-red-700 to-orange-400",
  "from-sky-700 to-blue-400",    "from-pink-700 to-rose-400",
  "from-yellow-700 to-amber-400","from-slate-700 to-gray-400",
  "from-emerald-700 to-teal-400","from-orange-800 to-red-400",
  "from-cyan-700 to-sky-400",    "from-purple-800 to-violet-400",
];

const categoryColors: Record<string, string> = {
  Scripture: "bg-orange-100 text-orange-700",
  Epic:      "bg-amber-100 text-amber-700",
  Purana:    "bg-purple-100 text-purple-700",
  Philosophy:"bg-teal-100 text-teal-700",
};

export default function BooksPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [gitaChapters, setGitaChapters] = useState<GitaChapter[]>([]);
  const [isLoadingGita, setIsLoadingGita] = useState(true);
  const [gitaError, setGitaError] = useState(false);
  const [chapterSearch, setChapterSearch] = useState("");
  const [expandedChapter, setExpandedChapter] = useState<number | null>(null);
  const [hoveredBook, setHoveredBook] = useState<number | null>(null);

  useEffect(() => {
    fetch("https://vedicscriptures.github.io/chapters")
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(setGitaChapters)
      .catch(() => setGitaError(true))
      .finally(() => setIsLoadingGita(false));
  }, []);

  const filteredBooks = prabhupadaBooks.filter(b =>
    b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredChapters = gitaChapters.filter(ch =>
    ch.meaning.en.toLowerCase().includes(chapterSearch.toLowerCase()) ||
    ch.translation.toLowerCase().includes(chapterSearch.toLowerCase()) ||
    String(ch.chapter_number).includes(chapterSearch)
  );

  return (
    <div className="pt-20 min-h-screen" style={{ background: "linear-gradient(135deg, #fdf6ec 0%, #fef3e2 50%, #fdf6ec 100%)" }}>

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="relative h-[38vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/books-banner.jpg" alt="Sacred Books" fill style={{ objectFit: "cover" }} priority className="brightness-50" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
            <p className="text-iskcon-saffron text-sm font-bold uppercase tracking-[0.3em] mb-2">Sacred Library</p>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-3 drop-shadow-xl">Hindu Scripture Library</h1>
            <p className="text-gray-200 max-w-xl mx-auto">Timeless wisdom from the Vedic tradition — epics, puranas, and devotional classics.</p>
          </motion.div>
        </div>
      </section>

      {/* ── Stats bar ─────────────────────────────────────────────────────────── */}
      <div className="bg-iskcon-orange py-5">
        <div className="container mx-auto px-4 flex justify-center gap-16 text-white text-center">
          {[["7", "Sacred Texts"], ["700+", "Gita Verses"], ["50+", "Languages"]].map(([v, l]) => (
            <div key={l}><div className="text-3xl font-black">{v}</div><div className="text-xs uppercase tracking-wider opacity-80">{l}</div></div>
          ))}
        </div>
      </div>

      {/* ── Books Shelf ────────────────────────────────────────────────────────── */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs font-bold uppercase text-iskcon-orange tracking-widest mb-1">Sacred Collection</p>
              <h2 className="text-4xl font-black text-gray-900">The Books</h2>
            </div>
            <div className="relative w-full md:w-64">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <input
                type="text"
                placeholder="Search books or author…"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 border border-amber-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-iskcon-orange"
              />
            </div>
          </div>

          {/* Book shelf line */}
          <div className="relative">
            {/* Shelf plank */}
            <div
              className="absolute bottom-0 left-0 right-0 h-4 rounded-sm z-10"
              style={{ background: "linear-gradient(180deg, #c8a96e 0%, #a07840 60%, #7a5c28 100%)", boxShadow: "0 4px 12px rgba(0,0,0,0.25)" }}
            />

            <div className="flex flex-wrap justify-center gap-3 pb-5">
              {filteredBooks.map((book, i) => (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  viewport={{ once: true }}
                  className="relative cursor-pointer group"
                  style={{ perspective: "800px" }}
                  onMouseEnter={() => setHoveredBook(book.id)}
                  onMouseLeave={() => setHoveredBook(null)}
                >
                  {/* Book 3D unit */}
                  <motion.div
                    animate={{ rotateY: hoveredBook === book.id ? -12 : 0, y: hoveredBook === book.id ? -12 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    style={{ transformStyle: "preserve-3d" }}
                    className="relative"
                  >
                    {/* Book Spine (left side, 3D illusion) */}
                    <div
                      className="absolute left-0 top-0 bottom-0 rounded-l-sm z-10"
                      style={{
                        width: "16px",
                        background: `linear-gradient(180deg, ${book.spineColor}dd, ${book.spineColor})`,
                        boxShadow: "inset -3px 0 6px rgba(0,0,0,0.3)",
                        transform: "translateX(-14px) rotateY(-90deg)",
                        transformOrigin: "right center",
                      }}
                    />

                    {/* Book Cover */}
                    <div
                      className="relative overflow-hidden rounded-r-sm rounded-bl-sm"
                      style={{
                        width: "160px",
                        height: "240px",
                        boxShadow: hoveredBook === book.id
                          ? "6px 10px 30px rgba(0,0,0,0.4), -2px 0 8px rgba(0,0,0,0.2)"
                          : "4px 6px 18px rgba(0,0,0,0.3), -2px 0 6px rgba(0,0,0,0.15)",
                        borderLeft: `3px solid ${book.spineColor}`,
                      }}
                    >
                      <Image
                        src={book.image}
                        alt={book.title}
                        fill
                        style={{ objectFit: "cover" }}
                        className="transition-transform duration-500 group-hover:scale-105"
                        onError={e => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />

                      {/* Sheen overlay */}
                      <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-black/20 pointer-events-none" />

                      {/* Category badge */}
                      <div className="absolute top-2 right-2 z-10">
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider ${categoryColors[book.category] || "bg-gray-100 text-gray-600"}`}>
                          {book.category}
                        </span>
                      </div>

                      {/* Hover overlay with CTA */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hoveredBook === book.id ? 1 : 0 }}
                        className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center gap-3 px-3"
                      >
                        <p className="text-white text-xs font-bold text-center leading-tight">{book.title}</p>
                        <p className="text-gray-300 text-[10px] text-center">{book.author}</p>
                        {book.external ? (
                          <a
                            href={book.readLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 bg-iskcon-orange text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-opacity-90 transition-all"
                          >
                            <FaExternalLinkAlt className="text-[10px]" /> Read Online
                          </a>
                        ) : (
                          <Link
                            href={book.readLink}
                            className="flex items-center gap-1.5 bg-iskcon-orange text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-opacity-90 transition-all"
                          >
                            <FaBookOpen className="text-[10px]" /> Read Online
                          </Link>
                        )}
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Title below book */}
                  <motion.div
                    className="mt-3 w-[160px]"
                    animate={{ opacity: hoveredBook === book.id ? 1 : 0.75 }}
                  >
                    <p className="text-xs font-bold text-gray-800 text-center leading-tight line-clamp-2">{book.title}</p>
                    <p className="text-[10px] text-gray-500 text-center mt-0.5 truncate">{book.author}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          {filteredBooks.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              No books match your search.{" "}
              <button onClick={() => setSearchTerm("")} className="text-iskcon-orange underline">Clear</button>
            </div>
          )}
        </div>
      </section>

      {/* ── Bhagavad Gita Chapters ───────────────────────────────────────────── */}
      <section className="py-16 bg-white border-t border-orange-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <FaOm className="text-3xl text-iskcon-orange" />
              <div>
                <p className="text-xs font-bold uppercase text-iskcon-orange tracking-widest">via vedicscriptures API</p>
                <h2 className="text-3xl font-black text-gray-900">Bhagavad Gita — All 18 Chapters</h2>
              </div>
            </div>
            <div className="relative w-full md:w-72">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <input
                type="text"
                placeholder="Search chapters…"
                value={chapterSearch}
                onChange={e => setChapterSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-amber-50 focus:outline-none focus:ring-2 focus:ring-iskcon-orange"
              />
            </div>
          </div>

          <p className="text-gray-400 text-sm mb-10 ml-10">
            {gitaChapters.length > 0
              ? `${filteredChapters.length} of ${gitaChapters.length} chapters · ${gitaChapters.reduce((s, c) => s + c.verses_count, 0)} total slokas`
              : "Loading from API…"}
          </p>

          {isLoadingGita ? (
            <div className="flex flex-col items-center py-24 gap-4 text-iskcon-orange">
              <FaSpinner className="text-4xl animate-spin" />
              <p className="text-gray-400 text-sm">Fetching chapters…</p>
            </div>
          ) : gitaError ? (
            <div className="text-center py-16">
              <p className="text-red-500 font-semibold">Could not load chapters. Please check your internet connection.</p>
              <button onClick={() => window.location.reload()} className="mt-4 btn-primary text-sm">Retry</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredChapters.map((chapter, i) => (
                <motion.div
                  key={chapter.chapter_number}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.4) }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col border border-gray-100"
                >
                  <div className={`relative h-40 bg-gradient-to-br ${chapterGradients[i % chapterGradients.length]} flex flex-col items-center justify-center text-white p-5`}>
                    <div className="absolute inset-0 opacity-10 flex items-center justify-center">
                      <FaOm className="text-[8rem]" />
                    </div>
                    <div className="relative z-10 text-center">
                      <span className="bg-white/20 backdrop-blur-sm px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-widest mb-2 inline-block">
                        Ch. {chapter.chapter_number}
                      </span>
                      <p className="text-xl font-bold leading-tight">{chapter.name}</p>
                      <p className="text-xs mt-1 opacity-80 italic">{chapter.transliteration}</p>
                    </div>
                    <div className="absolute bottom-2 right-3 bg-white/20 backdrop-blur-sm rounded-full px-2.5 py-0.5 text-xs font-semibold">
                      {chapter.verses_count} verses
                    </div>
                  </div>

                  <div className="p-5 flex flex-col flex-grow">
                    <div className="mb-3">
                      <p className="font-bold text-gray-900">{chapter.meaning.en}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{chapter.meaning.hi}</p>
                    </div>
                    <p className={`text-gray-500 text-sm leading-relaxed ${expandedChapter === chapter.chapter_number ? "" : "line-clamp-3"}`}>
                      {chapter.summary.en}
                    </p>
                    <button
                      onClick={() => setExpandedChapter(expandedChapter === chapter.chapter_number ? null : chapter.chapter_number)}
                      className="text-xs text-iskcon-orange font-semibold mt-1 text-left hover:underline"
                    >
                      {expandedChapter === chapter.chapter_number ? "Show less ↑" : "Read more ↓"}
                    </button>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <Link
                        href={`/resources/books/bhagavad-gita?chapter=${chapter.chapter_number}`}
                        className="w-full bg-iskcon-orange text-white py-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-opacity-90 transition-colors text-sm font-bold"
                      >
                        <FaBookOpen /> Read Chapter {chapter.chapter_number}
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Quote ─────────────────────────────────────────────────────────────── */}
      <section className="py-14 border-t border-amber-100" style={{ background: "#fdf6ec" }}>
        <div className="container mx-auto px-4 text-center">
          <FaQuoteLeft className="text-5xl text-iskcon-orange/20 mb-4 mx-auto" />
          <p className="text-2xl md:text-3xl font-serif italic text-gray-700 mb-4 max-w-2xl mx-auto leading-relaxed">
            "If you want to know me, read my books."
          </p>
          <p className="text-gray-400 text-sm">— Srila Prabhupada, Founder-Acharya of ISKCON</p>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────────── */}
      <section className="py-12 bg-iskcon-orange/5 border-t border-orange-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-black text-gray-900 mb-2">Share the Wisdom</h2>
          <p className="text-gray-500 max-w-xl mx-auto mb-6 text-sm">Help distribute Srila Prabhupada's books and spread Krishna consciousness worldwide.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/get-involved/book-distribution" className="btn-primary">
              <FaHeart className="inline mr-2" /> Support Book Distribution
            </Link>
            <Link href="/donate" className="btn-secondary">Make a Donation</Link>
          </div>
        </div>
      </section>
    </div>
  );
}