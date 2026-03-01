'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaCalendar, FaMapMarkerAlt, FaUsers, FaInfoCircle, FaStar } from 'react-icons/fa';

export default function FestivalsPage() {
  const [festivals, setFestivals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFestival, setSelectedFestival] = useState<any>(null);

  useEffect(() => {
    const fetchFestivals = async () => {
      try {
        const res = await fetch('/api/festivals');
        const data = await res.json();
        
        // If no festivals in DB, use some fallbacks for now or empty
        if (data && data.length > 0) {
          setFestivals(data);
          setSelectedFestival(data[0]);
        }
      } catch (err) {
        console.error('Failed to fetch festivals:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFestivals();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl font-bold text-gray-400">Loading Sacred Festivals...</div>
      </div>
    );
  }

  if (!selectedFestival) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl font-bold text-gray-400">No upcoming festivals scheduled.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src={selectedFestival.image}
            alt={selectedFestival.name}
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">ISKCON Festivals</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Experience the joy and devotion of Vaishnava celebrations
          </p>
        </div>
      </section>

      {/* Festival Navigation */}
      <section className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap justify-center gap-4">
            {festivals.map((festival) => (
              <button
                key={festival.id}
                onClick={() => setSelectedFestival(festival)}
                className={`px-6 py-3 rounded-lg transition-all ${
                  selectedFestival.id === festival.id
                    ? 'bg-iskcon-orange text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {festival.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Festival Details */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          key={selectedFestival.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative h-64">
              <Image
                src={selectedFestival.image}
                alt={selectedFestival.name}
                fill
                className="object-cover"
              />
            </div>
            
            <div className="p-8">
              <div className="flex flex-wrap items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-gray-800">
                  {selectedFestival.name}
                </h2>
                <div className="flex items-center text-gray-600">
                  <FaCalendar className="mr-2" />
                  {selectedFestival.date}
                </div>
              </div>

              <div className="flex items-center text-gray-600 mb-6">
                <FaMapMarkerAlt className="mr-2" />
                {selectedFestival.location}
              </div>

              <p className="text-gray-700 mb-8">{selectedFestival.description}</p>

              {/* Significance */}
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <FaStar className="text-iskcon-orange mr-2" />
                  Spiritual Significance
                </h3>
                <ul className="space-y-3">
                  {selectedFestival.significance.map((point: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="text-iskcon-orange mr-2">•</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Preparations */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <FaInfoCircle className="text-iskcon-orange mr-2" />
                  Festival Preparations
                </h3>
                <ul className="space-y-3">
                  {selectedFestival.preparations.map((prep: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="text-iskcon-orange mr-2">•</span>
                      {prep}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Call to Action */}
      <section className="bg-iskcon-orange text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Join the Celebrations</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Experience the joy of spiritual festivals and connect with the devotee community
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/temples"
              className="bg-white text-iskcon-orange px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Find Nearest Temple
            </a>
            <a
              href="/events/calendar"
              className="bg-transparent border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-iskcon-orange transition"
            >
              View Festival Calendar
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
