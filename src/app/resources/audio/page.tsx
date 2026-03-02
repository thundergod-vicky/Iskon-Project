'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaPlay, FaPause, FaDownload, FaHeart, FaRegHeart, FaShare, FaVolumeUp, FaStepForward, FaStepBackward, FaMusic, FaUser, FaClock, FaQuoteLeft, FaTimes } from 'react-icons/fa';

interface Audio {
  _id: string;
  title: string;
  speaker: string;
  audioUrl: string;
  duration: string;
  description: string;
  category: string;
  tags: string[];
  image: string;
  date: string;
}

export default function AudioPage() {
  const [audios, setAudios] = useState<Audio[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Player State
  const [currentAudio, setCurrentAudio] = useState<Audio | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    fetchAudios();
  }, []);

  const fetchAudios = async () => {
    try {
      const res = await fetch('/api/audios');
      const data = await res.json();
      setAudios(data);
    } catch (err) {
      console.error('Failed to fetch audios:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePlay = (audio: Audio) => {
    if (currentAudio?._id === audio._id) {
      setIsPlaying(!isPlaying);
      if (isPlaying) audioRef.current?.pause();
      else audioRef.current?.play();
    } else {
      setCurrentAudio(audio);
      setIsPlaying(true);
      setProgress(0);
      if (audioRef.current) {
        audioRef.current.src = audio.audioUrl;
        audioRef.current.play();
      }
    }
  };

  const onTimeUpdate = () => {
    if (audioRef.current) {
      const p = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(p || 0);
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setProgress(val);
    if (audioRef.current) {
      audioRef.current.currentTime = (val / 100) * audioRef.current.duration;
    }
  };

  const categories = ['All', 'Lecture', 'Kirtan', 'Bhajan', 'Guided Meditation'];

  const filteredAudios = audios.filter(audio => {
    const matchesSearch = audio.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         audio.speaker.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || audio.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-pink-50 pb-32">
      {/* Hidden Audio Element */}
      <audio 
        ref={audioRef} 
        onTimeUpdate={onTimeUpdate}
        onEnded={() => setIsPlaying(false)}
        className="hidden"
      />

      {/* Hero section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 bg-iskcon-orange rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-300 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-5xl md:text-7xl font-black mb-6 text-gray-900 tracking-tight">
                Spiritual <span className="text-iskcon-orange">Vibrations</span>
              </h1>
              <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto font-medium">
                Immerse yourself in transcendental knowledge and devotion with our curated audio library from around the globe.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="relative max-w-2xl mx-auto shadow-2xl rounded-3xl overflow-hidden bg-white/80 backdrop-blur-md border border-white p-2"
            >
              <div className="flex items-center">
                <div className="pl-6 text-gray-400">
                  <FaSearch className="text-xl" />
                </div>
                <input
                  type="text"
                  placeholder="Search for lectures, kirtans, speakers..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full bg-transparent px-4 py-4 text-gray-800 placeholder-gray-400 focus:outline-none font-medium"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar Filters */}
          <aside className="lg:w-1/4 space-y-8">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-pink-100">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <FaMusic className="text-iskcon-orange" /> Categories
              </h3>
              <div className="space-y-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-4 py-3 rounded-2xl font-bold transition-all flex justify-between items-center ${
                      selectedCategory === cat 
                      ? 'bg-iskcon-orange text-white shadow-lg shadow-orange-100' 
                      : 'text-gray-500 hover:bg-pink-50 hover:text-iskcon-orange'
                    }`}
                  >
                    {cat}
                    {selectedCategory === cat && <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-iskcon-orange to-orange-600 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden group">
               <FaQuoteLeft className="absolute -top-4 -right-4 text-8xl opacity-10 group-hover:rotate-12 transition-transform duration-500" />
               <p className="font-serif italic text-lg relative z-10 mb-4">
                 "In this age of Kaali, the only means of deliverance is the chanting of the holy names of the Lord."
               </p>
               <cite className="font-bold text-sm opacity-80">— Chaitanya Mahaprabhu</cite>
            </div>
          </aside>

          {/* Audio List */}
          <div className="lg:w-3/4">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
                {[1,2,3,4].map(i => <div key={i} className="h-48 bg-gray-200 rounded-3xl"></div>)}
              </div>
            ) : filteredAudios.length === 0 ? (
              <div className="bg-white rounded-3xl p-20 text-center border-2 border-dashed border-gray-200">
                <FaMusic className="text-6xl mx-auto mb-6 text-gray-200" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No Audios Found</h3>
                <p className="text-gray-500">Try adjusting your search or filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnimatePresence mode="popLayout">
                  {filteredAudios.map((audio) => (
                    <motion.div
                      key={audio._id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      whileHover={{ y: -5 }}
                      className="bg-white rounded-3xl p-6 shadow-sm border border-transparent hover:border-pink-200 hover:shadow-xl transition-all group flex gap-5"
                    >
                      <div className="shrink-0 relative w-24 h-24 rounded-2xl overflow-hidden bg-gray-100">
                        <Image 
                          src={audio.image || '/images/audio-placeholder.jpg'} 
                          alt={audio.title} 
                          fill 
                          className="object-cover group-hover:scale-110 transition-transform duration-500" 
                        />
                        <button 
                          onClick={() => handlePlay(audio)}
                          className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          {currentAudio?._id === audio._id && isPlaying ? 
                            <FaPause className="text-white text-2xl" /> : 
                            <FaPlay className="text-white text-2xl ml-1" />
                          }
                        </button>
                      </div>
                      <div className="flex-1">
                        <span className="text-[10px] font-black uppercase tracking-widest text-iskcon-orange mb-1 block">
                          {audio.category}
                        </span>
                        <h3 className="font-bold text-gray-900 mb-1 group-hover:text-iskcon-orange transition-colors line-clamp-1">
                          {audio.title}
                        </h3>
                        <p className="text-sm text-gray-500 flex items-center gap-1 mb-2">
                          <FaUser className="text-xs" /> {audio.speaker}
                        </p>
                        <div className="flex items-center justify-between mt-auto">
                          <span className="text-xs text-gray-400 font-medium flex items-center gap-1">
                            <FaClock /> {audio.duration}
                          </span>
                          <div className="flex gap-2">
                             <a 
                               href={audio.audioUrl} 
                               download 
                               className="p-2 text-gray-400 hover:text-iskcon-orange transition-colors"
                               onClick={(e) => e.stopPropagation()}
                             >
                               <FaDownload />
                             </a>
                             <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                               <FaRegHeart />
                             </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Floating Audio Player */}
      <AnimatePresence>
        {currentAudio && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[95%] max-w-4xl z-50 pointer-events-none"
          >
            <div className="bg-white/95 backdrop-blur-xl border border-white/50 shadow-2xl rounded-full px-6 py-4 pointer-events-auto flex items-center gap-8">
              {/* Info */}
              <div className="hidden md:flex items-center gap-4 w-1/4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 shadow-lg border-2 border-iskcon-orange">
                  <Image src={currentAudio.image || '/images/audio-placeholder.jpg'} alt={currentAudio.title} fill className="object-cover" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-gray-900 truncate">{currentAudio.title}</h4>
                  <p className="text-[10px] text-gray-500 font-bold truncate uppercase tracking-widest">{currentAudio.speaker}</p>
                </div>
              </div>

              {/* Controls */}
              <div className="flex-1 flex flex-col items-center gap-2">
                <div className="flex items-center gap-6">
                  <button className="text-gray-400 hover:text-iskcon-orange transition-colors hidden sm:block"><FaStepBackward /></button>
                  <button 
                    onClick={() => handlePlay(currentAudio)}
                    className="w-12 h-12 rounded-full bg-iskcon-orange text-white shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-all"
                  >
                    {isPlaying ? <FaPause /> : <FaPlay className="ml-1" />}
                  </button>
                  <button className="text-gray-400 hover:text-iskcon-orange transition-colors hidden sm:block"><FaStepForward /></button>
                </div>
                <div className="w-full flex items-center gap-3">
                  <span className="text-[10px] font-bold text-gray-400 w-8">0:00</span>
                  <input 
                    type="range"
                    min="0"
                    max="100"
                    value={progress}
                    onChange={handleProgressChange}
                    className="flex-1 h-1.5 bg-gray-100 rounded-full appearance-none cursor-pointer accent-iskcon-orange"
                  />
                  <span className="text-[10px] font-bold text-gray-400 w-8">{currentAudio.duration}</span>
                </div>
              </div>

              {/* Volume & Extras */}
              <div className="hidden lg:flex items-center gap-4 w-1/4 justify-end">
                <div className="flex items-center gap-2">
                  <FaVolumeUp className="text-gray-400" />
                  <input 
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={(e) => {
                      const v = parseFloat(e.target.value);
                      setVolume(v);
                      if (audioRef.current) audioRef.current.volume = v;
                    }}
                    className="w-20 h-1 bg-gray-100 rounded-full appearance-none cursor-pointer accent-iskcon-orange"
                  />
                </div>
                <button className="text-gray-400 hover:text-iskcon-orange" onClick={() => setCurrentAudio(null)}><FaTimes /></button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}