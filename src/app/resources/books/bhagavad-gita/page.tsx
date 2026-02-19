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
  const [fontSize, setFontSize] = useState(16);
  const [currentVerse, setCurrentVerse] = useState(sampleVerses[0]);

  useEffect(() => {
    // In a real app, this would fetch the verse data based on the active chapter and verse
    // For this demo, we'll just use our sample verses
    const verseIndex = Math.min(activeVerse - 1, sampleVerses.length - 1);
    setCurrentVerse(sampleVerses[verseIndex]);
  }, [activeChapter, activeVerse]);

  // Navigation helpers
  const nextVerse = () => {
    const currentChapter = chapters[activeChapter - 1];
    if (activeVerse < currentChapter.verses) {
      setActiveVerse(activeVerse + 1);
    } else if (activeChapter < chapters.length) {
      setActiveChapter(activeChapter + 1);
      setActiveVerse(1);
    }
  };

  const prevVerse = () => {
    if (activeVerse > 1) {
      setActiveVerse(activeVerse - 1);
    } else if (activeChapter > 1) {
      const prevChapterIndex = activeChapter - 2;
      setActiveChapter(activeChapter - 1);
      setActiveVerse(chapters[prevChapterIndex].verses);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navigation Bar */}
      <header className="bg-white shadow-md py-3 px-4 fixed top-0 left-0 right-0 z-40">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/resources/books" className="flex items-center text-gray-600 hover:text-iskcon-orange mr-4">
              <FaArrowLeft className="mr-2" /> Back to Books
            </Link>
            <h1 className="text-xl font-bold hidden md:block">Bhagavad-gita As It Is</h1>
          </div>
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setFontSize(Math.max(12, fontSize - 2))}
              className="p-2 text-gray-600 hover:text-iskcon-orange"
              aria-label="Decrease font size"
            >
              A-
            </button>
            <button 
              onClick={() => setFontSize(Math.min(24, fontSize + 2))}
              className="p-2 text-gray-600 hover:text-iskcon-orange"
              aria-label="Increase font size"
            >
              A+
            </button>
            <button 
              onClick={() => {}} 
              className="p-2 text-gray-600 hover:text-iskcon-orange hidden md:block"
              aria-label="Print"
            >
              <FaPrint />
            </button>
            <button 
              onClick={() => {}} 
              className="p-2 text-gray-600 hover:text-iskcon-orange hidden md:block"
              aria-label="Share"
            >
              <FaShare />
            </button>
            <button 
              onClick={() => {}} 
              className="p-2 text-gray-600 hover:text-iskcon-orange"
              aria-label="Bookmark"
            >
              <FaBookmark />
            </button>
            <button 
              onClick={() => {}} 
              className="p-2 text-gray-600 hover:text-iskcon-orange"
              aria-label="Download"
            >
              <FaDownload />
            </button>
            <button 
              onClick={() => setShowSidebar(!showSidebar)} 
              className="ml-2 p-2 bg-iskcon-orange text-white rounded"
              aria-label={showSidebar ? "Hide chapters" : "Show chapters"}
            >
              {showSidebar ? "Hide Chapters" : "Show Chapters"}
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 pt-16">
        {/* Sidebar - Chapters Navigation */}
        {showSidebar && (
          <aside className="w-64 lg:w-80 bg-white border-r border-gray-200 h-[calc(100vh-4rem)] fixed left-0 top-16 overflow-y-auto p-4">
            <div className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search in Bhagavad-gita..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-iskcon-orange"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            
            <h2 className="font-bold text-lg mb-3">Chapters</h2>
            <div className="space-y-1">
              {chapters.map((chapter) => (
                <button
                  key={chapter.number}
                  onClick={() => {
                    setActiveChapter(chapter.number);
                    setActiveVerse(1);
                  }}
                  className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    activeChapter === chapter.number
                      ? "bg-iskcon-orange/10 text-iskcon-orange font-medium"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center">
                    <div className="w-7 h-7 bg-iskcon-orange/10 rounded-full flex items-center justify-center text-iskcon-orange font-bold mr-3">
                      {chapter.number}
                    </div>
                    <span className="text-sm">{chapter.title}</span>
                  </div>
                </button>
              ))}
            </div>
          </aside>
        )}

        {/* Main Content */}
        <main 
          className={`flex-1 bg-pink-50 min-h-screen transition-all ${
            showSidebar ? "ml-64 lg:ml-80" : "ml-0"
          }`}
        >
          <div className="container mx-auto px-4 py-8 max-w-4xl">
            {/* Chapter Title */}
            <div className="mb-8 text-center">
              <p className="text-iskcon-orange font-medium">Chapter {activeChapter}</p>
              <h2 className="text-3xl font-bold mb-2">
                {chapters[activeChapter - 1]?.title}
              </h2>
              <p className="text-gray-600">
                {chapters[activeChapter - 1]?.verses} verses
              </p>
            </div>

            {/* Display Options */}
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
              <p className="font-medium mb-2">Display Options:</p>
              <div className="flex flex-wrap gap-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={showOriginalText}
                    onChange={() => setShowOriginalText(!showOriginalText)}
                    className="mr-2"
                  />
                  Sanskrit Text
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={showWordByWord}
                    onChange={() => setShowWordByWord(!showWordByWord)}
                    className="mr-2"
                  />
                  Word-by-Word
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={showPurport}
                    onChange={() => setShowPurport(!showPurport)}
                    className="mr-2"
                  />
                  Purport
                </label>
              </div>
            </div>

            {/* Verse Navigation */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={prevVerse}
                disabled={activeChapter === 1 && activeVerse === 1}
                className={`flex items-center px-4 py-2 rounded-lg ${
                  activeChapter === 1 && activeVerse === 1
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-white hover:bg-pink-100 text-gray-700"
                }`}
              >
                <FaChevronLeft className="mr-2" /> Previous Verse
              </button>
              <span className="font-medium">
                Verse {activeVerse} of {chapters[activeChapter - 1]?.verses}
              </span>
              <button
                onClick={nextVerse}
                disabled={activeChapter === chapters.length && activeVerse === chapters[chapters.length - 1].verses}
                className={`flex items-center px-4 py-2 rounded-lg ${
                  activeChapter === chapters.length && activeVerse === chapters[chapters.length - 1].verses
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-white hover:bg-pink-100 text-gray-700"
                }`}
              >
                Next Verse <FaChevronRight className="ml-2" />
              </button>
            </div>

            {/* Verse Content */}
            <motion.div
              key={`${activeChapter}-${activeVerse}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden mb-10"
            >
              {/* Verse Number */}
              <div className="bg-iskcon-orange/10 p-4 border-b border-iskcon-orange/20">
                <h3 className="text-lg font-bold text-iskcon-orange">
                  Bhagavad-gita {currentVerse.number}
                </h3>
              </div>

              <div className="p-6" style={{ fontSize: `${fontSize}px` }}>
                {/* Sanskrit Text */}
                {showOriginalText && (
                  <div className="mb-6">
                    <p className="font-sanskrit mb-3 text-gray-900 whitespace-pre-line leading-relaxed">{currentVerse.sanskrit}</p>
                    <p className="text-gray-600 italic whitespace-pre-line">{currentVerse.transliteration}</p>
                  </div>
                )}

                {/* Word by Word */}
                {showWordByWord && (
                  <div className="mb-6 overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sanskrit</th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">English</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {currentVerse.wordByWord.map((word, index) => (
                          <tr key={index} className="hover:bg-pink-50">
                            <td className="px-3 py-2 whitespace-nowrap font-sanskrit">{word.sanskrit}</td>
                            <td className="px-3 py-2 whitespace-nowrap">{word.english}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Translation */}
                <div className="mb-6">
                  <h4 className="text-lg font-bold mb-3 text-gray-800">Translation</h4>
                  <p className="text-gray-700 leading-relaxed">{currentVerse.translation}</p>
                </div>

                {/* Purport */}
                {showPurport && (
                  <div>
                    <h4 className="text-lg font-bold mb-3 text-gray-800">Purport</h4>
                    <p className="text-gray-700 leading-relaxed">{currentVerse.purport}</p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Verse Navigation (Bottom) */}
            <div className="flex items-center justify-between mb-10">
              <button
                onClick={prevVerse}
                disabled={activeChapter === 1 && activeVerse === 1}
                className={`flex items-center px-4 py-2 rounded-lg ${
                  activeChapter === 1 && activeVerse === 1
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-white hover:bg-pink-100 text-gray-700"
                }`}
              >
                <FaChevronLeft className="mr-2" /> Previous Verse
              </button>
              <button
                onClick={nextVerse}
                disabled={activeChapter === chapters.length && activeVerse === chapters[chapters.length - 1].verses}
                className={`flex items-center px-4 py-2 rounded-lg ${
                  activeChapter === chapters.length && activeVerse === chapters[chapters.length - 1].verses
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-white hover:bg-pink-100 text-gray-700"
                }`}
              >
                Next Verse <FaChevronRight className="ml-2" />
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 