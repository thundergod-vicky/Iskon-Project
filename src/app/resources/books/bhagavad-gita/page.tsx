'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaArrowLeft, FaBookmark, FaShare, FaSearch, FaChevronLeft,
  FaChevronRight, FaSpinner, FaOm, FaLanguage, FaBook,
  FaInfoCircle, FaListUl, FaQuoteRight
} from 'react-icons/fa';

// ─── Data ─────────────────────────────────────────────────────────────────────
const CHAPTERS_META = [
  { number: 1, title: "Observing the Armies on the Battlefield", verses: 47 },
  { number: 2, title: "Contents of the Gita Summarized", verses: 72 },
  { number: 3, title: "Karma-yoga", verses: 43 },
  { number: 4, title: "Transcendental Knowledge", verses: 42 },
  { number: 5, title: "Karma-yoga — Action in Krishna Consciousness", verses: 29 },
  { number: 6, title: "Dhyana-yoga", verses: 47 },
  { number: 7, title: "Knowledge of the Absolute", verses: 30 },
  { number: 8, title: "Attaining the Supreme", verses: 28 },
  { number: 9, title: "The Most Confidential Knowledge", verses: 34 },
  { number: 10, title: "The Opulence of the Absolute", verses: 42 },
  { number: 11, title: "The Universal Form", verses: 55 },
  { number: 12, title: "Devotional Service", verses: 20 },
  { number: 13, title: "Nature, the Enjoyer, and Consciousness", verses: 35 },
  { number: 14, title: "The Three Modes of Material Nature", verses: 27 },
  { number: 15, title: "The Yoga of the Supreme Person", verses: 20 },
  { number: 16, title: "The Divine and Demoniac Natures", verses: 24 },
  { number: 17, title: "The Divisions of Faith", verses: 28 },
  { number: 18, title: "Conclusion — The Perfection of Renunciation", verses: 78 },
];

// ─── Types ────────────────────────────────────────────────────────────────────
interface Commentary {
  author: string;
  et?: string;   // English translation
  ht?: string;   // Hindi translation
  ec?: string;   // English commentary
  hc?: string;   // Hindi commentary
}

interface VerseData {
  _id: string;
  chapter: number;
  verse: number;
  slok: string;           // Sanskrit
  transliteration: string;
  tej?: Commentary;
  siva?: Commentary;
  purohit?: Commentary;
  chinmay?: Commentary;
  san?: Commentary;
  adi?: Commentary;
  gambir?: Commentary;
  madhav?: Commentary;
  anand?: Commentary;
  rams?: Commentary;
  raman?: Commentary;
  abhinav?: Commentary;
  sankar?: Commentary;
  jaya?: Commentary;
  vallabh?: Commentary;
  ms?: Commentary;
  srid?: Commentary;
  dhan?: Commentary;
  venkat?: Commentary;
  puru?: Commentary;
  neel?: Commentary;
}

interface ChapterMeta {
  number: number;
  title: string;
  verses: number;
}

// ─── Commentary Tab ───────────────────────────────────────────────────────────
const COMMENTARIES: { key: keyof VerseData; label: string }[] = [
  { key: "siva",    label: "Swami Sivananda" },
  { key: "tej",     label: "Swami Tejomayananda" },
  { key: "purohit", label: "Shri Purohit Swami" },
  { key: "chinmay", label: "Swami Chinmayananda" },
  { key: "san",     label: "Dr. S. Sankaranarayan" },
  { key: "anand",   label: "Swami Adidevananda" },
  { key: "rams",    label: "Swami Ramsukhdas" },
  { key: "puru",    label: "Prabhu Dutt Brahmachari" },
];

export default function BhagavadGitaReaderPage() {
  const searchParams = useSearchParams();

  const initChapter = parseInt(searchParams?.get("chapter") || "1");
  const [activeChapter, setActiveChapter] = useState(
    initChapter >= 1 && initChapter <= 18 ? initChapter : 1
  );
  const [activeVerse, setActiveVerse] = useState(1);
  const [showSidebar, setShowSidebar] = useState(true);
  const [showSanskrit, setShowSanskrit] = useState(true);
  const [showTransliteration, setShowTransliteration] = useState(true);
  const [fontSize, setFontSize] = useState(17);
  const [verseData, setVerseData] = useState<VerseData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [activeCommentary, setActiveCommentary] = useState<keyof VerseData>("siva");
  const [sidebarSearch, setSidebarSearch] = useState("");
  const [showVerseList, setShowVerseList] = useState(false);

  const currentChapterMeta: ChapterMeta = CHAPTERS_META[activeChapter - 1];

  // ── Fetch verse from API ───────────────────────────────────────────────────
  const loadVerse = useCallback(async (ch: number, v: number) => {
    setIsLoading(true);
    setError(false);
    setVerseData(null);
    try {
      const res = await fetch(`https://vedicscriptures.github.io/slok/${ch}/${v}`);
      if (!res.ok) throw new Error();
      const data: VerseData = await res.json();
      setVerseData(data);
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadVerse(activeChapter, activeVerse);
  }, [activeChapter, activeVerse, loadVerse]);

  // ── Navigation helpers ─────────────────────────────────────────────────────
  const nextVerse = () => {
    if (activeVerse < currentChapterMeta.verses) {
      setActiveVerse(v => v + 1);
    } else if (activeChapter < 18) {
      setActiveChapter(c => c + 1);
      setActiveVerse(1);
    }
  };

  const prevVerse = () => {
    if (activeVerse > 1) {
      setActiveVerse(v => v - 1);
    } else if (activeChapter > 1) {
      const prevMeta = CHAPTERS_META[activeChapter - 2];
      setActiveChapter(c => c - 1);
      setActiveVerse(prevMeta.verses);
    }
  };

  const isFirst = activeChapter === 1 && activeVerse === 1;
  const isLast = activeChapter === 18 && activeVerse === CHAPTERS_META[17].verses;

  // ── Current commentary ─────────────────────────────────────────────────────
  const getCommentaryText = (key: keyof VerseData) => {
    if (!verseData) return null;
    const c = verseData[key] as Commentary | undefined;
    if (!c) return null;
    return c.et || c.ht || c.ec || c.hc || null;
  };

  const filteredChapters = CHAPTERS_META.filter(
    ch =>
      ch.title.toLowerCase().includes(sidebarSearch.toLowerCase()) ||
      String(ch.number).includes(sidebarSearch)
  );

  return (
    <div className="min-h-screen flex flex-col bg-amber-50">
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header className="bg-white shadow-sm py-3 px-4 fixed top-0 left-0 right-0 z-50 border-b border-gray-100">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/resources/books" className="flex items-center gap-2 text-gray-600 hover:text-iskcon-orange transition-colors text-sm font-medium">
              <FaArrowLeft /> Back to Books
            </Link>
            <div className="hidden md:flex items-center gap-2">
              <FaOm className="text-iskcon-orange text-xl" />
              <h1 className="text-lg font-bold text-gray-800">Bhagavad-gita As It Is</h1>
            </div>
          </div>

          <div className="flex items-center gap-1 md:gap-2">
            <button onClick={() => setFontSize(s => Math.max(13, s - 1))} className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-iskcon-orange hover:bg-orange-50 rounded transition-colors font-bold text-sm">A-</button>
            <span className="text-xs text-gray-400 hidden md:block">{fontSize}px</span>
            <button onClick={() => setFontSize(s => Math.min(26, s + 1))} className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-iskcon-orange hover:bg-orange-50 rounded transition-colors font-bold text-base">A+</button>

            <button className="w-8 h-8 hidden md:flex items-center justify-center text-gray-600 hover:text-iskcon-orange hover:bg-orange-50 rounded transition-colors">
              <FaBookmark />
            </button>
            <button className="w-8 h-8 hidden md:flex items-center justify-center text-gray-600 hover:text-iskcon-orange hover:bg-orange-50 rounded transition-colors">
              <FaShare />
            </button>

            <button
              onClick={() => setShowSidebar(s => !s)}
              className="ml-2 px-4 py-1.5 bg-iskcon-orange text-white rounded-full text-sm font-semibold hover:bg-opacity-90 transition-colors"
            >
              {showSidebar ? "Hide" : "Chapters"}
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 pt-14">
        {/* ── Sidebar ────────────────────────────────────────────────────────── */}
        <AnimatePresence>
          {showSidebar && (
            <motion.aside
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-72 bg-white border-r border-gray-200 h-[calc(100vh-3.5rem)] fixed left-0 top-14 overflow-y-auto z-40"
            >
              <div className="p-4">
                <div className="relative mb-4">
                  <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                  <input
                    type="text"
                    placeholder="Search chapters…"
                    value={sidebarSearch}
                    onChange={e => setSidebarSearch(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-iskcon-orange"
                  />
                </div>
                <p className="text-xs font-bold uppercase text-gray-400 tracking-wider mb-3 px-1">18 Chapters</p>
                <div className="space-y-1">
                  {filteredChapters.map(ch => (
                    <button
                      key={ch.number}
                      onClick={() => { setActiveChapter(ch.number); setActiveVerse(1); }}
                      className={`w-full text-left px-3 py-2.5 rounded-xl transition-all text-sm ${
                        activeChapter === ch.number
                          ? "bg-iskcon-orange/10 text-iskcon-orange font-semibold border border-iskcon-orange/20"
                          : "hover:bg-gray-50 text-gray-700"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                          activeChapter === ch.number ? "bg-iskcon-orange text-white" : "bg-gray-100 text-gray-600"
                        }`}>
                          {ch.number}
                        </div>
                        <div>
                          <p className="leading-tight">{ch.title}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{ch.verses} verses</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* ── Main Content ────────────────────────────────────────────────────── */}
        <main
          className={`flex-1 min-h-screen transition-all duration-200 ${showSidebar ? "ml-0 md:ml-72" : "ml-0"}`}
        >
          <div className="max-w-3xl mx-auto px-4 py-10">
            {/* Chapter Title */}
            <div className="text-center mb-8">
              <span className="inline-block bg-iskcon-orange/10 text-iskcon-orange text-sm font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">
                Chapter {activeChapter}
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">
                {currentChapterMeta.title}
              </h2>
              <p className="text-gray-500">{currentChapterMeta.verses} verses</p>
            </div>

            {/* Display Options */}
            <div className="bg-white border border-gray-100 rounded-2xl p-4 mb-6 flex flex-wrap gap-4 items-center">
              <span className="text-sm font-semibold text-gray-600">Display:</span>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" checked={showSanskrit} onChange={() => setShowSanskrit(s => !s)} className="accent-iskcon-orange" />
                <FaOm className="text-iskcon-orange" /> Sanskrit
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" checked={showTransliteration} onChange={() => setShowTransliteration(s => !s)} className="accent-iskcon-orange" />
                <FaLanguage className="text-iskcon-orange" /> Transliteration
              </label>

              {/* Verse jump */}
              <div className="ml-auto flex items-center gap-2">
                <button
                  onClick={() => setShowVerseList(s => !s)}
                  className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-iskcon-orange border border-gray-200 rounded-lg px-3 py-1.5"
                >
                  <FaListUl /> Jump to verse
                </button>
              </div>
            </div>

            {/* Verse Selector (dropdown) */}
            {showVerseList && (
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-gray-100 rounded-2xl p-4 mb-6 max-h-52 overflow-y-auto">
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: currentChapterMeta.verses }, (_, i) => i + 1).map(v => (
                    <button
                      key={v}
                      onClick={() => { setActiveVerse(v); setShowVerseList(false); }}
                      className={`w-10 h-10 rounded-lg text-sm font-semibold transition-all ${
                        activeVerse === v
                          ? "bg-iskcon-orange text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-orange-100 hover:text-iskcon-orange"
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Navigation (top) */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={prevVerse}
                disabled={isFirst}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isFirst ? "bg-gray-100 text-gray-300 cursor-not-allowed" : "bg-white hover:bg-orange-50 text-gray-700 border border-gray-200 hover:border-iskcon-orange"
                }`}
              >
                <FaChevronLeft /> Prev
              </button>
              <span className="text-sm font-semibold text-gray-600 bg-white px-4 py-2 rounded-xl border border-gray-200">
                Verse {activeVerse} / {currentChapterMeta.verses}
              </span>
              <button
                onClick={nextVerse}
                disabled={isLast}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isLast ? "bg-gray-100 text-gray-300 cursor-not-allowed" : "bg-white hover:bg-orange-50 text-gray-700 border border-gray-200 hover:border-iskcon-orange"
                }`}
              >
                Next <FaChevronRight />
              </button>
            </div>

            {/* Verse Content */}
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-3xl shadow-md p-16 flex flex-col items-center gap-4 text-iskcon-orange"
                >
                  <FaSpinner className="text-4xl animate-spin" />
                  <p className="text-gray-500 text-sm">Loading verse {activeChapter}.{activeVerse}…</p>
                </motion.div>
              ) : error ? (
                <motion.div
                  key="error"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-3xl shadow-md p-16 text-center"
                >
                  <p className="text-red-500 font-semibold mb-3">Could not load this verse. Please check your connection.</p>
                  <button onClick={() => loadVerse(activeChapter, activeVerse)} className="btn-primary text-sm">
                    Retry
                  </button>
                </motion.div>
              ) : verseData ? (
                <motion.div
                  key={`${activeChapter}-${activeVerse}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                  className="bg-white rounded-3xl shadow-md overflow-hidden mb-8"
                  style={{ fontSize: `${fontSize}px` }}
                >
                  {/* Verse header */}
                  <div className="bg-gradient-to-r from-iskcon-orange/10 to-amber-50 px-8 py-5 border-b border-orange-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FaOm className="text-iskcon-orange text-2xl" />
                      <h3 className="font-black text-iskcon-orange text-lg">
                        Bhagavad-gita {activeChapter}.{activeVerse}
                      </h3>
                    </div>
                    <span className="text-xs bg-iskcon-orange/10 text-iskcon-orange px-3 py-1 rounded-full font-semibold">
                      BG {verseData._id}
                    </span>
                  </div>

                  <div className="p-8">
                    {/* Sanskrit */}
                    {showSanskrit && (
                      <div className="mb-7 pb-7 border-b border-dashed border-gray-200">
                        <p className="text-xs font-bold uppercase text-gray-400 tracking-widest mb-3">Sanskrit</p>
                        <p className="font-sanskrit text-gray-900 whitespace-pre-line leading-[2] text-[1.1em]">
                          {verseData.slok}
                        </p>
                      </div>
                    )}

                    {/* Transliteration */}
                    {showTransliteration && (
                      <div className="mb-7 pb-7 border-b border-dashed border-gray-200">
                        <p className="text-xs font-bold uppercase text-gray-400 tracking-widest mb-3">Transliteration</p>
                        <p className="text-gray-500 italic whitespace-pre-line leading-relaxed">
                          {verseData.transliteration}
                        </p>
                      </div>
                    )}

                    {/* Translation */}
                    <div className="mb-7">
                      <div className="flex items-center gap-2 mb-3">
                        <FaBook className="text-iskcon-orange" />
                        <p className="text-xs font-bold uppercase text-gray-400 tracking-widest">Translation</p>
                      </div>
                      <p className="text-gray-800 leading-relaxed font-medium">
                        {verseData.siva?.et || verseData.tej?.ht || verseData.purohit?.et || "Translation not available."}
                      </p>
                    </div>

                    {/* Commentary Tabs */}
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <FaQuoteRight className="text-iskcon-orange" />
                        <p className="text-xs font-bold uppercase text-gray-400 tracking-widest">Commentary</p>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {COMMENTARIES.map(({ key, label }) => {
                          const commentaryObj = verseData[key] as Commentary | undefined;
                          const available = !!(commentaryObj?.et || commentaryObj?.ht || commentaryObj?.ec || commentaryObj?.hc);
                          if (!available) return null;
                          return (
                            <button
                              key={key}
                              onClick={() => setActiveCommentary(key)}
                              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                                activeCommentary === key
                                  ? "bg-iskcon-orange text-white"
                                  : "bg-gray-100 text-gray-600 hover:bg-orange-100"
                              }`}
                            >
                              {label}
                            </button>
                          );
                        })}
                      </div>
                      <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100">
                        <p className="text-xs font-semibold text-amber-700 mb-3">
                          {(verseData[activeCommentary] as Commentary | undefined)?.author || "Commentary"}
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                          {getCommentaryText(activeCommentary) || "No commentary available for this translation. Try another commentary above."}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>

            {/* Navigation (bottom) */}
            <div className="flex items-center justify-between mt-4 mb-16">
              <button
                onClick={prevVerse}
                disabled={isFirst}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isFirst ? "bg-gray-100 text-gray-300 cursor-not-allowed" : "bg-white hover:bg-orange-50 text-gray-700 border border-gray-200 hover:border-iskcon-orange"
                }`}
              >
                <FaChevronLeft /> Prev Verse
              </button>
              <button
                onClick={nextVerse}
                disabled={isLast}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isLast ? "bg-gray-100 text-gray-300 cursor-not-allowed" : "bg-iskcon-orange text-white hover:bg-opacity-90 shadow-md"
                }`}
              >
                Next Verse <FaChevronRight />
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
