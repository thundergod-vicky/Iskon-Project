'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaExternalLinkAlt, FaRocket, FaGlobe, FaRobot, FaLayerGroup } from 'react-icons/fa';
import Image from 'next/image';

interface GrowGlobalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GrowGlobalModal({ isOpen, onClose }: GrowGlobalModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/40 backdrop-blur-md z-[9998] cursor-pointer"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 flex items-center justify-center z-[9999] pointer-events-none p-4 sm:p-6">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ 
                scale: 1, 
                opacity: 1, 
                y: 0,
                transition: { 
                  type: "spring",
                  damping: 25,
                  stiffness: 300
                  
                }
              }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              className="bg-white rounded-[24px] overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] max-w-4xl w-full pointer-events-auto flex flex-col md:flex-row max-h-[90vh] md:max-h-none border border-white/20"
            >
              {/* Left Side - Visual Identity */}
              <div className="md:w-[38%] bg-[#4F46E5] p-10 flex flex-col items-center justify-center text-white relative overflow-hidden shrink-0">
                {/* Subtle Geometric accents */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                  <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle,white_1px,transparent_1px)] [background-size:24px_24px]" />
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-3xl -ml-24 -mb-24" />
                
                <motion.div 
                  className="z-10 mb-8"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="w-40 h-40 bg-white rounded-3xl shadow-xl flex items-center justify-center p-6 border-4 border-white/20">
                    <Image 
                      src="/images/GrowGlobal_500.png" 
                      alt="GrowGlobal Logo" 
                      width={120} 
                      height={120}
                      className="object-contain"
                      priority
                    />
                  </div>
                </motion.div>
                
                <h2 className="text-3xl font-bold text-center tracking-tight relative z-10">GrowGlobal</h2>
                <div className="h-1 w-8 bg-indigo-300/50 mt-4 rounded-full relative z-10" />
                <p className="text-indigo-100/90 text-sm text-center mt-6 max-w-[220px] font-medium leading-relaxed relative z-10">
                  Accelerating Global Reach through Web 3.0 & Advanced AI Systems.
                </p>
              </div>

              {/* Right Side - Information Content */}
              <div className="md:w-[62%] p-8 md:p-14 flex flex-col relative bg-white overflow-y-auto">
                <button 
                  onClick={onClose}
                  className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all rounded-full z-20 group"
                  aria-label="Close modal"
                >
                  <FaTimes className="text-xl group-hover:rotate-90 transition-transform duration-300" />
                </button>

                <div className="space-y-10">
                  <header>
                    <span className="text-indigo-600 font-bold tracking-[0.2em] uppercase text-[10px] mb-3 block">Corporate Profile</span>
                    <h3 className="text-slate-900 mt-2 leading-snug text-2xl md:text-3xl font-bold tracking-tight">
                      Empowering the next generation of global businesses.
                    </h3>
                    <p className="text-slate-600 mt-4 leading-relaxed font-medium">
                      GrowGlobal.io is a premier Indian tech startup specializing in Web 3.0 protocols. We bridge the gap between local operations and global markets using autonomous AI scaling and blockchain integrity.
                    </p>
                  </header>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8">
                    <div className="flex items-start gap-4">
                      <div className="bg-indigo-50 w-12 h-12 shrink-0 flex items-center justify-center rounded-xl text-indigo-600">
                        <FaRobot className="text-xl" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-base">AI Automation</h4>
                        <p className="text-sm text-slate-500 mt-1 leading-tight">Scale operations with zero-touch intelligent workflows.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="bg-blue-50 w-12 h-12 shrink-0 flex items-center justify-center rounded-xl text-blue-600">
                        <FaRocket className="text-xl" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-base">Web 3.0 Scaling</h4>
                        <p className="text-sm text-slate-500 mt-1 leading-tight">Tokenizing assets for a borderless digital economy.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="bg-emerald-50 w-12 h-12 shrink-0 flex items-center justify-center rounded-xl text-emerald-600">
                        <FaGlobe className="text-xl" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-base">Global Hubs</h4>
                        <p className="text-sm text-slate-500 mt-1 leading-tight">Established presence in India and Estonia.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="bg-orange-50 w-12 h-12 shrink-0 flex items-center justify-center rounded-xl text-orange-600">
                        <FaLayerGroup className="text-xl" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-base">Ecosystem</h4>
                        <p className="text-sm text-slate-500 mt-1 leading-tight">A unified suite of 10+ scalable tech platforms.</p>
                      </div>
                    </div>
                  </div>

                  <footer className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-4 self-start sm:self-center">
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className={`w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold text-white shadow-sm ${i === 1 ? 'bg-indigo-600' : i === 2 ? 'bg-[#4F46E5]' : 'bg-indigo-400'}`}>
                            {i === 1 ? 'G' : i === 2 ? 'G' : 'IO'}
                          </div>
                        ))}
                      </div>
                      <span className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">Tech Partner</span>
                    </div>
                    
                    <a 
                      href="https://growglobal.io" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-indigo-600 text-white px-10 py-4 rounded-xl hover:bg-slate-900 transition-all font-bold shadow-xl shadow-indigo-100 hover:shadow-slate-200 active:scale-95 group"
                    >
                      <span>Visit growglobal.io</span>
                      <FaExternalLinkAlt className="text-xs opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </a>
                  </footer>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
