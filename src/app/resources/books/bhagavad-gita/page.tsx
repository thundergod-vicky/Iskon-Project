'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaBookmark, FaDownload, FaShare, FaSearch, FaPrint, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// Sample chapter data
const chapters = [
  { number: 1, title: "Observing the Armies on the Battlefield of Kuruksetra", verses: 47 },
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
  { number: 18, title: "Conclusion — The Perfection of Renunciation", verses: 78 }
];

// Sample verse data for Chapter 1
const sampleVerses = [
  {
    number: "1.1",
    sanskrit: "धृतराष्ट्र उवाच\nधर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः ।\nमामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय ॥१॥",
    transliteration: "dhṛtarāṣṭra uvāca\ndharma-kṣetre kuru-kṣetre samavetā yuyutsavaḥ\nmāmakāḥ pāṇḍavāś caiva kim akurvata sañjaya",
    wordByWord: [
      { sanskrit: "dhṛtarāṣṭraḥ", english: "King Dhṛtarāṣṭra" },
      { sanskrit: "uvāca", english: "said" },
      { sanskrit: "dharma-kṣetre", english: "in the place of pilgrimage" },
      { sanskrit: "kuru-kṣetre", english: "in the place named Kurukṣetra" },
      { sanskrit: "samavetāḥ", english: "assembled" },
      { sanskrit: "yuyutsavaḥ", english: "desiring to fight" },
      { sanskrit: "māmakāḥ", english: "my party (sons)" },
      { sanskrit: "pāṇḍavāḥ", english: "the sons of Pāṇḍu" },
      { sanskrit: "ca", english: "and" },
      { sanskrit: "eva", english: "certainly" },
      { sanskrit: "kim", english: "what" },
      { sanskrit: "akurvata", english: "did they do" },
      { sanskrit: "sañjaya", english: "O Sañjaya" }
    ],
    translation: "Dhritarashtra said: O Sanjaya, after my sons and the sons of Pandu assembled in the place of pilgrimage at Kurukshetra, desiring to fight, what did they do?",
    purport: "Bhagavad-gita is the widely read theistic science summarized in the Gita-mahatmya (Glorification of the Gita). There it says that one should read Bhagavad-gita very scrutinizingly with the help of a person who is a devotee of Sri Krishna and try to understand it without personally motivated interpretations. The example of clear understanding is there in the Bhagavad-gita itself, in the way the teaching is understood by Arjuna, who heard the Gita directly from the Lord. If someone is fortunate enough to understand the Bhagavad-gita in that line of disciplic succession, without motivated interpretation, then he surpasses all studies of Vedic wisdom, and all scriptures of the world. One will find in the Bhagavad-gita all that is contained in other scriptures, but the reader will also find things which are not to be found elsewhere. That is the specific standard of the Gita. It is the perfect theistic science because it is directly spoken by the Supreme Personality of Godhead, Lord Sri Krishna."
  },
  {
    number: "1.2",
    sanskrit: "सञ्जय उवाच\nदृष्ट्वा तु पाण्डवानीकं व्यूढं दुर्योधनस्तदा ।\nआचार्यमुपसङ्गम्य राजा वचनमब्रवीत् ॥२॥",
    transliteration: "sañjaya uvāca\ndṛṣṭvā tu pāṇḍavānīkaṁ vyūḍhaṁ duryodhanas tadā\nācāryam upasaṅgamya rājā vacanam abravīt",
    wordByWord: [
      { sanskrit: "sañjayaḥ", english: "Sañjaya" },
      { sanskrit: "uvāca", english: "said" },
      { sanskrit: "dṛṣṭvā", english: "after seeing" },
      { sanskrit: "tu", english: "but" },
      { sanskrit: "pāṇḍava-anīkam", english: "the soldiers of the Pāṇḍavas" },
      { sanskrit: "vyūḍham", english: "arranged in military phalanx" },
      { sanskrit: "duryodhanaḥ", english: "King Duryodhana" },
      { sanskrit: "tadā", english: "at that time" },
      { sanskrit: "ācāryam", english: "the teacher" },
      { sanskrit: "upasaṅgamya", english: "approaching nearby" },
      { sanskrit: "rājā", english: "the king" },
      { sanskrit: "vacanam", english: "words" },
      { sanskrit: "abravīt", english: "spoke" }
    ],
    translation: "Sanjaya said: O King, after looking over the army arranged in military formation by the sons of Pandu, King Duryodhana went to his teacher and spoke the following words.",
    purport: "Dhritarashtra was blind from birth. Unfortunately, he was also bereft of spiritual vision. He knew very well that his sons were equally blind in the matter of religion, and he was sure that they could never reach an understanding with the Pandavas, who were all pious since birth. Still he was doubtful about the influence of the place of pilgrimage, and Sanjaya could understand his motive in asking about the situation on the battlefield. Sanjaya wanted, therefore, to encourage the despondent King and thus assured him that his sons were not going to make any sort of compromise under the influence of the holy place. Sanjaya therefore informed the King that his son, Duryodhana, after seeing the military force of the Pandavas, at once went to the commander-in-chief, Dronacharya, to inform him of the real position."
  },
  {
    number: "1.3",
    sanskrit: "पश्यैतां पाण्डुपुत्राणामाचार्य महतीं चमूम् ।\nव्यूढां द्रुपदपुत्रेण तव शिष्येण धीमता ॥३॥",
    transliteration: "paśyaitāṁ pāṇḍu-putrāṇām ācārya mahatīṁ camūm\nvyūḍhāṁ drupada-putreṇa tava śiṣyeṇa dhīmatā",
    wordByWord: [
      { sanskrit: "paśya", english: "behold" },
      { sanskrit: "etām", english: "this" },
      { sanskrit: "pāṇḍu-putrāṇām", english: "of the sons of Pāṇḍu" },
      { sanskrit: "ācārya", english: "O teacher" },
      { sanskrit: "mahatīm", english: "great" },
      { sanskrit: "camūm", english: "military force" },
      { sanskrit: "vyūḍhām", english: "arranged" },
      { sanskrit: "drupada-putreṇa", english: "by the son of Drupada" },
      { sanskrit: "tava", english: "your" },
      { sanskrit: "śiṣyeṇa", english: "disciple" },
      { sanskrit: "dhīmatā", english: "very intelligent" }
    ],
    translation: "O my teacher, behold the great army of the sons of Pandu, so expertly arranged by your intelligent disciple the son of Drupada.",
    purport: "Duryodhana, a great diplomat, wanted to point out the defects of Dronacharya, the great brahmin commander-in-chief. Dronacharya had some political quarrel with King Drupada, the father of Draupadi, who was Arjuna's wife. As a result of this quarrel, Drupada performed a great sacrifice, by which he received the benediction of having a son who would be able to kill Dronacharya. Dronacharya knew this perfectly well, and yet as a liberal brahmin he did not hesitate to impart all his military secrets when the son of Drupada, Dhrishtadyumna, was entrusted to him for military education. Now, on the Battlefield of Kurukshetra, Dhrishtadyumna took the side of the Pandavas, and it was he who arranged for their military phalanx, after having learned the art from Dronacharya. Duryodhana pointed out this mistake of Dronacharya's so that he might be alert and uncompromising in the fighting."
  }
];

export default function BhagavadGitaReaderPage() {
  const [activeChapter, setActiveChapter] = useState(1);
  const [activeVerse, setActiveVerse] = useState(1);
  const [showSidebar, setShowSidebar] = useState(true);
  const [showOriginalText, setShowOriginalText] = useState(true);
  const [showWordByWord, setShowWordByWord] = useState(false);
  const [showPurport, setShowPurport] = useState(true);
  const [fontSize, setFontSize] = useState(18);
  const [loading, setLoading] = useState(true);
  
  // High-level data
  const [fullChapters, setFullChapters] = useState<any[]>([]);
  const [allVerses, setAllVerses] = useState<any[]>([]);
  const [allTranslations, setAllTranslations] = useState<any[]>([]);
  const [allCommentaries, setAllCommentaries] = useState<any[]>([]);
  
  // Current view data
  const [currentVerse, setCurrentVerse] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [chRes, vRes, tRes, cRes] = await Promise.all([
          fetch('/data/gita/chapters.json'),
          fetch('/data/gita/verse.json'),
          fetch('/data/gita/translation.json'),
          fetch('/data/gita/commentary.json')
        ]);

        const chaptersData = await chRes.json();
        const verseData = await vRes.json();
        const translationData = await tRes.json();
        const commentaryData = await cRes.json();

        setFullChapters(chaptersData);
        setAllVerses(verseData);
        setAllTranslations(translationData);
        setAllCommentaries(commentaryData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Gita data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (allVerses.length === 0) return;

    const verse = allVerses.find(v => v.chapter_number === activeChapter && v.verse_number === activeVerse);
    if (verse) {
      const translation = allTranslations.find(t => t.verse_id === verse.id && t.lang === 'english');
      const commentary = allCommentaries.find(c => c.verse_id === verse.id && c.lang === 'english');
      
      setCurrentVerse({
        number: `${activeChapter}.${activeVerse}`,
        sanskrit: verse.text,
        transliteration: verse.transliteration,
        wordByWord: verse.word_meanings,
        translation: translation?.description || "Translation loading...",
        purport: commentary?.description || "Commentary not available."
      });
    }
  }, [activeChapter, activeVerse, allVerses, allTranslations, allCommentaries]);

  // Navigation helpers
  const nextVerse = () => {
    const chapterInfo = fullChapters.find(c => c.chapter_number === activeChapter) || chapters[activeChapter - 1];
    const versesInChapter = chapterInfo?.verses_count || chapterInfo?.verses || 0;
    
    if (activeVerse < versesInChapter) {
      setActiveVerse(activeVerse + 1);
    } else if (activeChapter < 18) {
      setActiveChapter(activeChapter + 1);
      setActiveVerse(1);
    }
  };

  const prevVerse = () => {
    if (activeVerse > 1) {
      setActiveVerse(activeVerse - 1);
    } else if (activeChapter > 1) {
      const prevChapterInfo = fullChapters.find(c => c.chapter_number === activeChapter - 1) || chapters[activeChapter - 2];
      const versesInPrev = prevChapterInfo?.verses_count || prevChapterInfo?.verses || 0;
      setActiveChapter(activeChapter - 1);
      setActiveVerse(versesInPrev);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pink-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-iskcon-orange border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium font-primary">Loading Divine Wisdom...</p>
        </div>
      </div>
    );
  }

  const currentChapterInfo = fullChapters.find(c => c.chapter_number === activeChapter) || chapters[activeChapter - 1];

  return (
    <div className="min-h-screen flex flex-col font-primary">
      {/* Top Navigation Bar */}
      <header className="bg-white shadow-md py-3 px-4 fixed top-0 left-0 right-0 z-40">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/resources/books" className="flex items-center text-gray-600 hover:text-iskcon-orange mr-4">
              <FaArrowLeft className="mr-2" /> <span className="hidden sm:inline">Back to Books</span>
            </Link>
            <h1 className="text-lg md:text-xl font-bold">Bhagavad-gita As It Is</h1>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-3">
            <button 
              onClick={() => setFontSize(Math.max(12, fontSize - 2))}
              className="p-2 text-gray-600 hover:text-iskcon-orange"
              aria-label="Decrease font size"
            >
              A-
            </button>
            <button 
              onClick={() => setFontSize(Math.min(32, fontSize + 2))}
              className="p-2 text-gray-600 hover:text-iskcon-orange"
              aria-label="Increase font size"
            >
              A+
            </button>
            <button 
              onClick={() => window.print()} 
              className="p-2 text-gray-600 hover:text-iskcon-orange hidden md:block"
              aria-label="Print"
            >
              <FaPrint />
            </button>
            <button 
              onClick={() => setShowSidebar(!showSidebar)} 
              className="ml-2 px-3 py-1.5 bg-iskcon-orange text-white rounded text-sm font-bold shadow-sm hover:bg-iskcon-orange/90 transition-all"
            >
              {showSidebar ? "Hide Chapters" : "Show Chapters"}
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 pt-16">
        {/* Sidebar - Chapters Navigation */}
        {showSidebar && (
          <aside className="w-64 lg:w-80 bg-white border-r border-gray-200 h-[calc(100vh-4rem)] fixed left-0 top-16 overflow-y-auto p-4 z-30 transition-all">
            <h2 className="font-bold text-lg mb-3 px-2">Chapters</h2>
            <div className="space-y-1">
              {(fullChapters.length > 0 ? fullChapters : chapters).map((chapter) => {
                const num = chapter.chapter_number || chapter.number;
                const title = chapter.name || chapter.title;
                return (
                  <button
                    key={num}
                    onClick={() => {
                      setActiveChapter(num);
                      setActiveVerse(1);
                      if (window.innerWidth < 1024) setShowSidebar(false);
                    }}
                    className={`block w-full text-left px-3 py-2.5 rounded-lg transition-colors ${
                      activeChapter === num
                        ? "bg-iskcon-orange/10 text-iskcon-orange font-bold border-l-4 border-iskcon-orange"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold mr-3 text-xs ${
                        activeChapter === num ? "bg-iskcon-orange text-white" : "bg-gray-100 text-gray-500"
                      }`}>
                        {num}
                      </div>
                      <span className="text-sm line-clamp-2 leading-tight">{title}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </aside>
        )}

        {/* Main Content */}
        <main 
          className={`flex-1 bg-white min-h-screen transition-all ${
            showSidebar ? "ml-64 lg:ml-80" : "ml-0"
          }`}
        >
          <div className="container mx-auto px-4 py-8 max-w-4xl">
            {/* Chapter Title */}
            <motion.div 
              key={`chapter-head-${activeChapter}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-8 text-center"
            >
              <p className="text-iskcon-orange font-bold uppercase tracking-widest text-sm mb-1">Chapter {activeChapter}</p>
              <h2 className="text-2xl md:text-3xl font-black mb-2 text-gray-900 px-4">
                {currentChapterInfo?.name || currentChapterInfo?.title}
              </h2>
              <div className="w-24 h-1 bg-iskcon-orange mx-auto mb-3"></div>
              <p className="text-gray-500 font-medium">
                {currentChapterInfo?.verses_count || currentChapterInfo?.verses} Verses
              </p>
            </motion.div>

            {/* Display Options */}
            <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100 mb-8 flex flex-wrap gap-6 items-center justify-center">
              <span className="text-sm font-bold text-gray-500 uppercase">View:</span>
              <label className="flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  checked={showOriginalText}
                  onChange={() => setShowOriginalText(!showOriginalText)}
                  className="w-4 h-4 rounded text-iskcon-orange focus:ring-iskcon-orange mr-2"
                />
                <span className={`text-sm font-medium transition-colors ${showOriginalText ? "text-iskcon-orange" : "text-gray-500 group-hover:text-gray-700"}`}>Sanskrit</span>
              </label>
              <label className="flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  checked={showWordByWord}
                  onChange={() => setShowWordByWord(!showWordByWord)}
                  className="w-4 h-4 rounded text-iskcon-orange focus:ring-iskcon-orange mr-2"
                />
                <span className={`text-sm font-medium transition-colors ${showWordByWord ? "text-iskcon-orange" : "text-gray-500 group-hover:text-gray-700"}`}>Word Meanings</span>
              </label>
              <label className="flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  checked={showPurport}
                  onChange={() => setShowPurport(!showPurport)}
                  className="w-4 h-4 rounded text-iskcon-orange focus:ring-iskcon-orange mr-2"
                />
                <span className={`text-sm font-medium transition-colors ${showPurport ? "text-iskcon-orange" : "text-gray-500 group-hover:text-gray-700"}`}>Purport</span>
              </label>
            </div>

            {/* Verse Navigation */}
            <div className="flex items-center justify-between mb-8 sticky top-20 bg-white/80 backdrop-blur-md py-2 z-20 px-2 rounded-xl">
              <button
                onClick={prevVerse}
                disabled={activeChapter === 1 && activeVerse === 1}
                className="p-3 bg-gray-100 hover:bg-iskcon-orange hover:text-white rounded-full transition-all disabled:opacity-30"
                title="Previous Verse"
              >
                <FaChevronLeft />
              </button>
              <div className="flex flex-col items-center">
                <span className="text-xs font-bold text-gray-400 uppercase">Verse</span>
                <span className="text-xl font-black text-iskcon-orange">
                  {activeVerse} <span className="text-gray-300 font-normal">/ {currentChapterInfo?.verses_count || currentChapterInfo?.verses}</span>
                </span>
              </div>
              <button
                onClick={nextVerse}
                disabled={activeChapter === 18 && activeVerse === 78}
                className="p-3 bg-gray-100 hover:bg-iskcon-orange hover:text-white rounded-full transition-all disabled:opacity-30"
                title="Next Verse"
              >
                <FaChevronRight />
              </button>
            </div>

            {/* Verse Content */}
            {currentVerse && (
              <motion.div
                key={`${activeChapter}-${activeVerse}`}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl shadow-xl shadow-pink-100/50 border border-pink-50 overflow-hidden mb-12"
              >
                <div className="bg-gradient-to-r from-iskcon-orange to-iskcon-saffron p-6 text-white">
                  <h3 className="text-xl font-black tracking-tight flex items-center">
                    <span className="bg-white/20 px-3 py-1 rounded-lg text-sm mr-3">BG {currentVerse.number}</span>
                    The Divine Message
                  </h3>
                </div>

                <div className="p-8 md:p-12 space-y-12" style={{ fontSize: `${fontSize}px` }}>
                  {/* Sanskrit Text */}
                  {showOriginalText && (
                    <section className="text-center bg-pink-50/30 p-8 rounded-3xl border border-pink-100/50">
                      <p className="font-sanskrit text-2xl md:text-3xl text-gray-900 whitespace-pre-line leading-[1.8] mb-8 font-bold italic" style={{ fontSize: `${fontSize + 6}px` }}>
                        {currentVerse.sanskrit}
                      </p>
                      <p className="text-gray-500 italic leading-relaxed max-w-2xl mx-auto" style={{ fontSize: `${fontSize}px` }}>
                        {currentVerse.transliteration}
                      </p>
                    </section>
                  )}

                  {/* Word by Word */}
                  {showWordByWord && currentVerse.wordByWord && (
                    <section>
                      <h4 className="flex items-center text-sm font-black text-gray-400 uppercase tracking-widest mb-6 border-l-4 border-iskcon-orange pl-4">Word Meanings</h4>
                      <div className="bg-gray-50 p-6 rounded-2xl text-gray-700 leading-relaxed whitespace-pre-line font-medium border border-gray-100">
                        {currentVerse.wordByWord}
                      </div>
                    </section>
                  )}

                  {/* Translation */}
                  <section>
                    <h4 className="flex items-center text-sm font-black text-gray-400 uppercase tracking-widest mb-6 border-l-4 border-iskcon-orange pl-4">Translation</h4>
                    <p className="text-gray-800 font-bold leading-relaxed text-lg" style={{ fontSize: `${fontSize + 2}px` }}>
                      {currentVerse.translation}
                    </p>
                  </section>

                  {/* Purport */}
                  {showPurport && (
                    <section className="border-t border-gray-100 pt-10">
                      <h4 className="flex items-center text-sm font-black text-gray-400 uppercase tracking-widest mb-6 border-l-4 border-iskcon-orange pl-4">Purport</h4>
                      <div className="text-gray-700 leading-relaxed space-y-4 whitespace-pre-line">
                        {currentVerse.purport}
                      </div>
                    </section>
                  )}
                </div>
              </motion.div>
            )}

            {/* Bottom Nav */}
            <div className="flex justify-center gap-4 mb-20">
               <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="px-6 py-3 bg-gray-900 text-white rounded-full font-bold text-sm shadow-lg hover:bg-gray-800 transition-all flex items-center">
                 Scroll to Top
               </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
