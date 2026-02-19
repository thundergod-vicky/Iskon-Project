'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaSearch, FaPlay, FaFilter, FaYoutube, FaFilm, FaVideo, FaBookOpen, FaChalkboardTeacher } from 'react-icons/fa';

interface VideoContent {
  id: number;
  title: string;
  presenter: string;
  duration: string;
  description: string;
  date: string;
  image: string;
  views: number;
  category: string;
}

interface VideoCategory {
  name: string;
  description: string;
  count: number;
  icon: React.ReactNode;
}

export default function VideosPage() {
  // Sample featured videos data
  const featuredVideos: VideoContent[] = [
    {
      id: 1,
      title: "Introduction to Krishna Consciousness",
      presenter: "Radhanath Swami",
      duration: "28:45",
      description: "An introductory exploration of Krishna Consciousness philosophy and practice for beginners.",
      date: "June 15, 2023",
      image: "/images/iskcon-logo.png",
      views: 24567,
      category: "Introduction"
    },
    {
      id: 2,
      title: "The Science of Bhakti Yoga",
      presenter: "Gaur Gopal Das",
      duration: "42:18",
      description: "Exploring the scientific basis of Bhakti yoga and its relevance in the modern world.",
      date: "July 23, 2023",
      image: "/images/iskcon-logo.png",
      views: 18923,
      category: "Yoga"
    },
    {
      id: 3,
      title: "Krishna's Pastimes in Vrindavan",
      presenter: "Sacinandana Swami",
      duration: "56:30",
      description: "Beautiful narrations of Lord Krishna's divine activities in the holy land of Vrindavan.",
      date: "May 10, 2023",
      image: "/images/iskcon-logo.png",
      views: 32145,
      category: "Pastimes"
    }
  ];

  // Video categories
  const videoCategories: VideoCategory[] = [
    {
      name: "Lectures",
      description: "Philosophical discourses by leading spiritual teachers",
      count: 187,
      icon: <FaChalkboardTeacher className="text-iskcon-orange text-2xl" />
    },
    {
      name: "Documentaries",
      description: "In-depth explorations of Vedic culture and history",
      count: 42,
      icon: <FaFilm className="text-iskcon-orange text-2xl" />
    },
    {
      name: "Festivals",
      description: "Celebrations and festivals from around the world",
      count: 93,
      icon: <FaVideo className="text-iskcon-orange text-2xl" />
    },
    {
      name: "Tutorials",
      description: "Instructional videos on spiritual practices",
      count: 64,
      icon: <FaBookOpen className="text-iskcon-orange text-2xl" />
    }
  ];

  // Documentaries data
  const documentaries = [
    {
      title: "Hare Krishna! The Mantra, the Movement and the Swami who started it all",
      description: "The life story of Srila Prabhupada and the birth of ISKCON",
      duration: "1:30:45",
      image: "/images/iskcon-logo.png"
    },
    {
      title: "The Spiritual Quest",
      description: "Following the journey of spiritual seekers around the world",
      duration: "42:18",
      image: "/images/iskcon-logo.png"
    },
    {
      title: "Living with Devotees",
      description: "A glimpse into the lives of Krishna devotees in various communities",
      duration: "55:22",
      image: "/images/iskcon-logo.png"
    }
  ];

  return (
    <main className="min-h-screen bg-pink-50">
      {/* Hero section */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-iskcon-orange/20 to-iskcon-blue/20"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">Spiritual Video Resources</h1>
            <p className="text-xl text-gray-600 mb-8">
              Explore our collection of lectures, documentaries, and instructional videos to deepen your spiritual understanding.
            </p>
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search videos by title, speaker, or topic..."
                className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-iskcon-orange"
              />
              <FaSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-iskcon-orange text-white px-4 py-1.5 rounded-full hover:bg-iskcon-orange-dark transition">
                Search
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Videos section */}
      <section className="py-16 bg-pink-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Featured Videos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredVideos.map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100"
                >
                  <div className="relative h-52 bg-iskcon-orange/10">
                    <Image
                      src={video.image}
                      alt={video.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <button className="bg-iskcon-orange hover:bg-iskcon-orange-dark rounded-full p-4 text-white shadow-lg transition transform hover:scale-110">
                        <FaPlay className="text-2xl" />
                      </button>
                    </div>
                    <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg line-clamp-1 text-gray-800">{video.title}</h3>
                    </div>
                    <p className="text-iskcon-orange text-sm mb-2">{video.presenter}</p>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{video.description}</p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>{video.date}</span>
                      <span>{video.views.toLocaleString()} views</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link
                href="/resources/videos/all"
                className="bg-iskcon-orange text-white px-6 py-2 rounded-full hover:bg-iskcon-orange-dark transition inline-block"
              >
                View All Videos
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Video Categories section */}
      <section className="py-16 bg-gradient-to-r from-iskcon-blue/10 to-iskcon-orange/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Browse by Category</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {videoCategories.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-center"
                  whileHover={{ y: -5 }}
                >
                  <div className="w-16 h-16 mx-auto bg-iskcon-orange/10 rounded-full flex items-center justify-center mb-4">
                    {category.icon}
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-gray-800">{category.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{category.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">{category.count} videos</span>
                    <Link
                      href={`/resources/videos/category/${category.name.toLowerCase()}`}
                      className="text-iskcon-orange font-medium text-sm hover:underline"
                    >
                      Browse →
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Documentaries Section */}
      <section className="py-16 bg-pink-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800">Featured Documentaries</h2>
              <div className="flex items-center">
                <span className="text-iskcon-orange mr-2"><FaFilter /></span>
                <select className="border border-gray-300 rounded-md py-1 px-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-iskcon-orange">
                  <option>All</option>
                  <option>Most Recent</option>
                  <option>Most Viewed</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {documentaries.map((doc, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative aspect-video">
                    <Image
                      src={doc.image}
                      alt={doc.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <FaPlay className="text-white text-5xl transform hover:scale-110 transition-transform cursor-pointer" />
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded-md">
                      {doc.duration}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-lg mb-2 text-gray-800 line-clamp-2">{doc.title}</h3>
                    <p className="text-gray-600 text-sm">{doc.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* YouTube Channel Section */}
      <section className="py-16 bg-iskcon-orange/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 bg-white p-8 rounded-xl shadow-md"
          >
            <div className="md:w-1/3 flex justify-center">
              <FaYoutube className="text-9xl text-red-600" />
            </div>
            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Subscribe to Our YouTube Channel</h2>
              <p className="text-gray-600 mb-6">
                Stay updated with our latest videos, live streams of temple ceremonies,
                and exclusive content by subscribing to our official YouTube channel.
              </p>
              <a
                href="https://www.youtube.com/iskcon"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition inline-flex items-center"
              >
                <FaYoutube className="mr-2" /> Subscribe Now
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Newsletter section */}
      <section className="py-16 bg-pink-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto bg-white rounded-xl p-8 shadow-md"
          >
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Stay Updated</h2>
            <p className="text-gray-600 text-center mb-6">
              Subscribe to receive notifications about new video uploads, live streams, and special content.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-2 border border-gray-300 bg-white text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-iskcon-orange"
              />
              <button className="bg-iskcon-orange text-white px-6 py-2 rounded-lg hover:bg-iskcon-orange-dark transition sm:w-auto w-full">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
} 