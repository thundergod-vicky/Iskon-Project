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
          {/* Backdrop - Subtle and clean */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-[9998] cursor-pointer"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 flex items-center justify-center z-[9999] pointer-events-none p-4 md:p-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-white rounded-xl overflow-hidden shadow-2xl max-w-3xl w-full pointer-events-auto flex flex-col md:flex-row border border-slate-200"
            >
              {/* Left Side - Corporate Identity */}
              <div className="md:w-[40%] bg-slate-900 p-8 flex flex-col items-center justify-center text-white shrink-0">
                <div className="mb-6 p-4 bg-white rounded-lg shadow-inner">
                  <Image 
                    src="/images/GrowGlobal_500.png" 
                    alt="GrowGlobal Logo" 
                    width={100} 
                    height={100}
                    className="object-contain"
                    priority
                  />
                </div>
                
                <div className="text-center">
                  <h2 className="text-xl font-bold tracking-tight mb-2">GrowGlobal</h2>
                  <div className="h-1 w-10 bg-indigo-500 mx-auto rounded-full mb-4" />
                  <p className="text-slate-400 text-xs leading-relaxed px-2">
                    Official Technology Partner for ISKCON Durgapur Digital Initiatives.
                  </p>
                </div>
              </div>

              {/* Right Side - Detailed Information */}
              <div className="md:w-[60%] p-8 md:p-10 flex flex-col bg-white overflow-y-auto">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1 tracking-tight">Corporate Profile</h3>
                    <p className="text-indigo-600 font-bold text-[10px] uppercase tracking-wider">Advancing Digital Frontiers</p>
                  </div>
                  <button 
                    onClick={onClose}
                    className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors rounded-lg"
                    title="Close"
                  >
                    <FaTimes className="text-lg" />
                  </button>
                </div>

                <p className="text-slate-600 leading-relaxed text-sm mb-8">
                  GrowGlobal is a distinguished Indian technology startup bridging the gap between local enterprise and global digital markets through Web 3.0 and AI.
                </p>

                <div className="grid grid-cols-1 gap-y-6 mb-8">
                  {[
                    { icon: <FaRobot />, title: 'AI Automation', desc: 'Implementing intelligent, autonomous workflows.' },
                    { icon: <FaRocket />, title: 'Web 3.0 Integration', desc: 'Secure and borderless asset management.' },
                    { icon: <FaGlobe />, title: 'Global Presence', desc: 'Strategic hubs in India and Estonia.' },
                  ].map((service, idx) => (
                    <div key={idx} className="flex gap-4 group">
                      <div className="text-indigo-600 text-xl mt-0.5 opacity-80 shrink-0">
                        {service.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm mb-1">{service.title}</h4>
                        <p className="text-xs text-slate-500 leading-tight font-medium">{service.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-slate-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    Strategic Partner
                  </div>
                  
                  <a 
                    href="https://growglobal.io" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-600 transition-all text-xs font-bold shadow-md"
                  >
                    <span>Visit growglobal.io</span>
                    <FaExternalLinkAlt className="text-[10px]" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
