'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Sample video data from ISKCON Durgapur channel
const videos = [
  {
    id: 1,
    title: "ISKCON Durgapur Video 1",
    youtubeId: "LD25moUCfwE", 
    date: "Recent",
    description: "Watch latest class from ISKCON Durgapur.",
  },
  {
    id: 2,
    title: "ISKCON Durgapur Video 2",
    youtubeId: "Waa3-c86QFc", 
    date: "Recent",
    description: "Daily morning lecture / kirtan.",
  },
  {
    id: 3,
    title: "ISKCON Durgapur Video 3",
    youtubeId: "hqwem5DgBfg", 
    date: "Recent",
    description: "Inspiring Krishna conscious video.",
  },
  {
    id: 4,
    title: "ISKCON Durgapur Video 4",
    youtubeId: "j9CGkVEgRJ0", 
    date: "Recent",
    description: "Temple discourse and kirtan.",
  },
  {
    id: 5,
    title: "ISKCON Durgapur Video 5",
    youtubeId: "ltZ3hpRFQAc", 
    date: "Recent",
    description: "Special event coverage from Durgapur.",
  },
  {
    id: 6,
    title: "ISKCON Durgapur Video 6",
    youtubeId: "EuOGA1PxOU4", 
    date: "Recent",
    description: "Divine message from ISKCON DGP.",
  }
];

export default function LecturesPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/images/srila-prabhupada.jpg"
            alt="Srila Prabhupada"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Temple Lectures</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Watch recent classes and kirtans from ISKCON Durgapur
          </p>
        </div>
      </section>

      {/* Videos Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Latest Videos</h2>
          <p className="text-gray-600">Subscribe to our <a href="https://www.youtube.com/@iskcondurgapurofficial957" target="_blank" rel="noopener noreferrer" className="text-iskcon-orange hover:underline font-bold">YouTube Channel</a> for more content.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
            >
              <div className="aspect-video relative w-full">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src={`https://www.youtube.com/embed/${video.youtubeId}`} 
                  title={video.title} 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                  className="absolute inset-0"
                ></iframe>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{video.title}</h3>
                <p className="text-gray-600 mb-4">{video.description}</p>
                <div className="text-sm text-gray-500 font-medium">
                  {video.date}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
