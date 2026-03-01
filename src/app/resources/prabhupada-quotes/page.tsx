'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaSearch, FaFilter, FaShareAlt, FaCopy, FaCheck } from 'react-icons/fa';

interface IQuote {
  _id: string;
  text: string;
  source: string;
  date?: string;
  tags: string[];
}

export default function PrabhupadaQuotesPage() {
  const [quotes, setQuotes] = useState<IQuote[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTag, setActiveTag] = useState('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const res = await fetch('/api/quotes');
        if (res.ok) {
          const data = await res.ok ? await res.json() : [];
          setQuotes(data);
        }
      } catch (err) {
        console.error('Failed to fetch quotes:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuotes();
  }, []);

  const allTags = ['All', ...Array.from(new Set(quotes.flatMap(q => q.tags)))];

  const filteredQuotes = quotes.filter(q => {
    const matchesSearch = q.text.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         q.source.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = activeTag === 'All' || q.tags.includes(activeTag);
    return matchesSearch && matchesTag;
  });

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <main className="min-h-screen bg-pink-50 pt-24 pb-20">
      {/* Header */}
      <section className="container mx-auto px-4 mb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-iskcon-orange font-bold uppercase tracking-[0.3em] text-sm mb-4">Divine Instructions</p>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6">Srila Prabhupada Quotes</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg italic bg-white/50 py-4 px-6 rounded-2xl border border-pink-100 shadow-sm">
            "Everything is there in my books. If you want to know me, you read my books."
          </p>
        </motion.div>
      </section>

      {/* Filters */}
      <section className="container mx-auto px-4 mb-12">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-pink-100 flex flex-col md:flex-row gap-6 items-center">
          <div className="relative flex-1 w-full">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search quotes by text or source..."
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-iskcon-orange/20 transition-all text-gray-800"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {allTags.slice(0, 8).map(tag => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeTag === tag
                    ? 'bg-iskcon-orange text-white shadow-lg shadow-orange-200'
                    : 'bg-gray-50 text-gray-500 hover:bg-pink-100 hover:text-iskcon-orange'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Quotes Content */}
      <section className="container mx-auto px-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-iskcon-orange border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-400 animate-pulse">Fetching divine wisdom...</p>
          </div>
        ) : filteredQuotes.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-xl">No quotes found matching your criteria.</p>
            <button 
              onClick={() => {setSearchTerm(''); setActiveTag('All');}}
              className="mt-4 text-iskcon-orange font-bold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            <AnimatePresence>
              {filteredQuotes.map((quote, index) => (
                <motion.div
                  key={quote._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="break-inside-avoid bg-white p-8 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-500 border border-pink-50 relative group flex flex-col"
                >
                  <FaQuoteLeft className="text-3xl text-iskcon-orange/10 absolute top-8 left-8" />
                  
                  <div className="relative z-10">
                    <p className="text-xl md:text-2xl font-medium text-gray-800 leading-relaxed mb-8 pt-4">
                      "{quote.text}"
                    </p>
                    
                    <div className="mt-auto border-t border-pink-50 pt-6">
                      <p className="font-black text-gray-900 text-sm mb-1">– Srila Prabhupada</p>
                      <p className="text-xs text-gray-400 font-medium uppercase tracking-wider line-clamp-2">
                        {quote.source} {quote.date && `• ${quote.date}`}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="absolute top-6 right-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button 
                      onClick={() => copyToClipboard(quote.text, quote._id)}
                      className="p-2.5 bg-gray-50 hover:bg-iskcon-orange hover:text-white rounded-xl text-gray-400 transition-all shadow-sm"
                      title="Copy Quote"
                    >
                      {copiedId === quote._id ? <FaCheck /> : <FaCopy />}
                    </button>
                    <button 
                      className="p-2.5 bg-gray-50 hover:bg-iskcon-orange hover:text-white rounded-xl text-gray-400 transition-all shadow-sm"
                      title="Share Quote"
                    >
                      <FaShareAlt />
                    </button>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {quote.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-bold uppercase tracking-widest text-iskcon-orange/60 px-2 py-0.5 bg-orange-50 rounded-md">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>

      {/* Sample Data Notice (only if no data) */}
      {!loading && quotes.length === 0 && (
        <section className="container mx-auto px-4 mt-12">
          <div className="bg-amber-50 border border-amber-100 p-8 rounded-[2rem] text-center">
            <h3 className="text-amber-800 font-bold text-xl mb-2">No quotes added yet</h3>
            <p className="text-amber-700/70">The administrator hasn't added any quotes to the database yet. Please check back later or contact the temple admin.</p>
          </div>
        </section>
      )}
    </main>
  );
}