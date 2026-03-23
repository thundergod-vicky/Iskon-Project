'use client';

import React from 'react';
import Link from 'next/link';

const categories = [
  {
    title: "Books",
    items: [
      { id: 1, title: "Bhagavad-gītā As It Is", lang: "en" },
      { id: 2, title: "Śrīmad-Bhāgavatam", lang: "en" },
      { id: 3, title: "Śrī Caitanya-caritāmṛta", lang: "en" },
      { id: 4, title: "Teachings of Lord Caitanya", lang: "en" },
      { id: 5, title: "Nectar of Devotion", lang: "en" },
      { id: 6, title: "Nectar of Instruction", lang: "en" },
      { id: 7, title: "Śrī Īśopaniṣad", lang: "en" },
      { id: 8, title: "Kṛṣṇa, the Supreme Personality of Godhead", lang: "en" },
    ]
  },
  {
    title: "Small Books",
    items: [
      { id: 9, title: "Beyond Illusion & Doubt", lang: "en" },
      { id: 10, title: "Chant and Be Happy", lang: "en" },
      { id: 11, title: "Civilization and Transcendence", lang: "en" },
      { id: 12, title: "Elevation to Kṛṣṇa Consciousness", lang: "en" }
    ]
  }
];

export default function PrabhupadaBooksPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#333333] pt-24 pb-12 font-serif">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header similar to Vedabase */}
        <div className="border-b border-[#E6D9C3] pb-6 mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#6B2A2A] mb-4">
            Bhaktivedanta Vedabase
          </h1>
          <p className="text-lg text-[#555555] italic">
            "The online encyclopedia of the timeless wisdom imparted by His Divine Grace A.C. Bhaktivedanta Swami Prabhupāda"
          </p>
        </div>

        {/* Categories */}
        <div className="space-y-12">
          {categories.map((category, idx) => (
            <div key={idx} className="bg-white border border-[#E6D9C3] rounded shadow-sm p-6 md:p-10">
              <h2 className="text-2xl font-bold text-[#6B2A2A] border-b border-[#E6D9C3] pb-4 mb-6">
                {category.title}
              </h2>
              
              <ul className="space-y-4">
                {category.items.map(item => (
                  <li key={item.id} className="flex items-start">
                    <span className="text-[#A47864] mr-3 mt-1 text-sm">▶</span>
                    <Link 
                      href="#" 
                      className="text-lg text-[#005580] hover:text-[#CC0000] hover:underline transition-colors block"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Footer */}
        <div className="mt-16 text-center text-sm text-[#777777] border-t border-[#E6D9C3] pt-8">
          <p>Content provided by the Bhaktivedanta Book Trust.</p>
        </div>
      </div>
    </div>
  );
}