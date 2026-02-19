'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaSearch, FaBookOpen, FaDownload, FaGlobe, FaHeart, FaQuoteLeft } from 'react-icons/fa';

// Sample book data
const books = [
  {
    id: 1,
    title: "Bhagavad-gita As It Is",
    author: "A.C. Bhaktivedanta Swami Prabhupada",
    description: "The definitive guide to understanding the essence of Krishna consciousness. Features the original Sanskrit text, Roman transliteration, word-for-word meanings, English translation, and detailed purports. Updated with improved translations and additional commentary.",
    image: "/images/books/bhagavad-gita.jpg",
    category: "scripture",
    languages: ["English", "Hindi", "Spanish", "Russian", "German", "Bengali", "Chinese", "Japanese", "French"],
    year: 1972,
    lastUpdated: "2025",
    readLink: "/resources/books/bhagavad-gita",
    downloadLink: "/downloads/bhagavad-gita"
  },
  {
    id: 2,
    title: "Srimad-Bhagavatam",
    author: "A.C. Bhaktivedanta Swami Prabhupada",
    description: "The complete collection of the 18,000 verses of Srimad-Bhagavatam (Bhagavata Purana), with extensive commentary. Now includes interactive study guides, cross-references, and audio narration features.",
    image: "/images/books/srimad-bhagavatam.jpg",
    category: "scripture",
    languages: ["English", "Hindi", "Spanish", "Bengali", "Chinese"],
    year: 1972,
    lastUpdated: "2025",
    readLink: "/resources/books/srimad-bhagavatam",
    downloadLink: "/downloads/srimad-bhagavatam"
  },
  {
    id: 3,
    title: "Sri Caitanya-caritamrta",
    author: "A.C. Bhaktivedanta Swami Prabhupada",
    description: "The complete biography of Sri Caitanya Mahaprabhu with newly added historical references, maps, and cultural context. Enhanced with multimedia content and virtual pilgrimage experiences.",
    image: "/images/books/caitanya-caritamrta.jpg",
    category: "biography",
    languages: ["English", "Bengali", "Hindi", "Sanskrit"],
    year: 1975,
    lastUpdated: "2025",
    readLink: "/resources/books/caitanya-caritamrta",
    downloadLink: "/downloads/caitanya-caritamrta"
  },
  {
    id: 4,
    title: "The Science of Self-Realization",
    author: "A.C. Bhaktivedanta Swami Prabhupada",
    description: "Updated for modern readers with new research correlations between ancient wisdom and contemporary science. Includes special sections on quantum consciousness, neuroscience, and meditation practices.",
    image: "/images/books/science-of-self-realization.jpg",
    category: "philosophy",
    languages: ["English", "Hindi", "German", "Japanese", "Korean", "French"],
    year: 1977,
    lastUpdated: "2025",
    readLink: "/resources/books/science-of-self-realization",
    downloadLink: "/downloads/science-of-self-realization"
  },
  {
    id: 5,
    title: "Krishna Book",
    author: "A.C. Bhaktivedanta Swami Prabhupada",
    description: "The timeless pastimes of Lord Krishna now with enhanced illustrations, geographical references, and cultural insights. Features augmented reality content bringing Krishna's pastimes to life.",
    image: "/images/books/krishna-book.jpg",
    category: "scripture",
    languages: ["English", "Hindi", "French", "Spanish", "Russian"],
    year: 1970,
    lastUpdated: "2025",
    readLink: "/resources/books/krishna-book",
    downloadLink: "/downloads/krishna-book"
  },
  {
    id: 6,
    title: "Perfect Questions, Perfect Answers",
    author: "A.C. Bhaktivedanta Swami Prabhupada",
    description: "A newly expanded edition featuring contemporary dialogues addressing modern philosophical questions about consciousness, artificial intelligence, and the meaning of life in the digital age.",
    image: "/images/books/perfect-questions.jpg",
    category: "philosophy",
    languages: ["English", "Hindi", "Spanish", "German"],
    year: 1977,
    lastUpdated: "2025",
    readLink: "/resources/books/perfect-questions",
    downloadLink: "/downloads/perfect-questions"
  },
  {
    id: 7,
    title: "The Nectar of Devotion",
    author: "A.C. Bhaktivedanta Swami Prabhupada",
    description: "The complete science of Bhakti-yoga, updated with practical applications for the modern age. Now includes guided practices, meditation techniques, and interactive devotional exercises.",
    image: "/images/books/nectar-of-devotion.jpg",
    category: "philosophy",
    languages: ["English", "Hindi", "Bengali", "Spanish"],
    year: 1970,
    lastUpdated: "2025",
    readLink: "/resources/books/nectar-of-devotion",
    downloadLink: "/downloads/nectar-of-devotion"
  },
  {
    id: 8,
    title: "Beyond Time and Space",
    author: "A.C. Bhaktivedanta Swami Prabhupada",
    description: "A groundbreaking new compilation exploring Vedic perspectives on quantum physics, cosmology, and consciousness. Features contributions from modern scientists and spiritual practitioners.",
    image: "/images/books/beyond-time-space.jpg",
    category: "science",
    languages: ["English", "Hindi", "Chinese", "Russian"],
    year: 2025,
    lastUpdated: "2025",
    readLink: "/resources/books/beyond-time-space",
    downloadLink: "/downloads/beyond-time-space"
  }
];

// Available filters
const categories = ["all", "scripture", "philosophy", "biography", "science"];
const languages = ["all", "English", "Hindi", "Bengali", "Spanish", "Russian", "German", "French", "Japanese"];

export default function BooksPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeLanguage, setActiveLanguage] = useState("all");

  // Filter books based on search, category, and language
  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "all" || book.category === activeCategory;
    const matchesLanguage = activeLanguage === "all" || book.languages.includes(activeLanguage);

    return matchesSearch && matchesCategory && matchesLanguage;
  });

  return (
    <div className="pt-20 bg-pink-50">
      {/* Hero Section */}
      <section className="relative h-[30vh] lg:h-[40vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/books-banner.jpg"
            alt="Srila Prabhupada's Books"
            layout="fill"
            objectFit="cover"
            priority
            className="brightness-75"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 font-sanskrit">Srila Prabhupada's Books</h1>
          <p className="text-xl text-white max-w-3xl mx-auto">
            The literary legacy of His Divine Grace A.C. Bhaktivedanta Swami Prabhupada
          </p>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-10 bg-pink-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
                "Books are the Basis"
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Srila Prabhupada considered the translation and publication of Vedic literature his most important contribution. In just twelve years, he wrote over 70 volumes of transcendental literature, now translated into more than 50 languages worldwide. These books constitute a true spiritual library covering topics from self-realization and yoga to the nature of consciousness and the spiritual world.
              </p>
              <div className="flex justify-center space-x-4">
                <div className="flex flex-col items-center">
                  <div className="text-3xl font-bold text-iskcon-orange">70+</div>
                  <div className="text-gray-600">Books</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-3xl font-bold text-iskcon-orange">50+</div>
                  <div className="text-gray-600">Languages</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-3xl font-bold text-iskcon-orange">500M+</div>
                  <div className="text-gray-600">Copies Distributed</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-10 bg-pink-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col space-y-6">
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search books by title or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-iskcon-orange"
                />
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
              </div>

              {/* Filters */}
              <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
                <div>
                  <label className="text-gray-700 font-medium">Category:</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${activeCategory === category
                          ? "bg-iskcon-orange text-white"
                          : "bg-white text-gray-700 hover:bg-gray-100"
                          }`}
                      >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-gray-700 font-medium">Language:</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {languages.map((language) => (
                      <button
                        key={language}
                        onClick={() => setActiveLanguage(language)}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${activeLanguage === language
                          ? "bg-iskcon-orange text-white"
                          : "bg-white text-gray-700 hover:bg-gray-100"
                          }`}
                      >
                        {language}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Books Grid */}
      <section className="py-16 bg-pink-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {filteredBooks.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredBooks.map((book) => (
                  <motion.div
                    key={book.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="card overflow-hidden group h-full flex flex-col"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={book.image}
                        alt={book.title}
                        layout="fill"
                        objectFit="cover"
                        className="group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 right-3 bg-iskcon-orange text-white text-xs py-1 px-3 rounded-full capitalize">
                        {book.category}
                      </div>
                    </div>
                    <div className="p-6 flex-grow flex flex-col">
                      <h3 className="text-xl font-bold mb-2">{book.title}</h3>
                      <p className="text-gray-500 mb-4">{book.author} • {book.year}</p>
                      <p className="text-gray-700 mb-4 line-clamp-3">{book.description}</p>

                      <div className="mt-auto">
                        <div className="flex flex-wrap gap-1 mb-4">
                          {book.languages.map((language) => (
                            <span
                              key={language}
                              className="inline-flex items-center px-2 py-1 bg-pink-100 text-gray-700 text-xs rounded"
                            >
                              <FaGlobe className="mr-1 text-iskcon-blue" /> {language}
                            </span>
                          ))}
                        </div>

                        <div className="flex space-x-2">
                          <Link
                            href={book.readLink}
                            className="flex-1 bg-iskcon-orange text-white text-center py-2 rounded-lg flex items-center justify-center hover:bg-opacity-90 transition-colors"
                          >
                            <FaBookOpen className="mr-2" /> Read Online
                          </Link>
                          <Link
                            href={book.downloadLink}
                            className="flex-1 border border-iskcon-orange text-iskcon-orange text-center py-2 rounded-lg flex items-center justify-center hover:bg-pink-100 transition-colors"
                          >
                            <FaDownload className="mr-2" /> Download
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-2xl font-bold text-gray-700 mb-2">No books found</h3>
                <p className="text-gray-500 mb-6">Try changing your search criteria</p>
                <button
                  onClick={() => {
                    setActiveCategory("all");
                    setActiveLanguage("all");
                    setSearchTerm("");
                  }}
                  className="btn-secondary"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-16 bg-pink-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center bg-white p-8 rounded-2xl shadow-lg border-t-4 border-iskcon-orange">
            <FaQuoteLeft className="text-4xl text-iskcon-orange/30 mb-4 mx-auto" />
            <p className="text-xl md:text-2xl font-serif italic text-gray-700 mb-6">
              "If you want to know me, read my books."
            </p>
            <p className="text-gray-600">— Srila Prabhupada, Founder-Acharya of ISKCON</p>
          </div>
        </div>
      </section>

      {/* Book Distribution CTA */}
      <section className="py-16 bg-pink-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center bg-gradient-to-r from-pink-200 to-iskcon-orange/10 rounded-2xl overflow-hidden">
            <div className="md:w-1/2 p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-4 font-sanskrit">Share the Wisdom</h2>
              <p className="text-gray-700 mb-6">
                Help distribute Srila Prabhupada's books and spread the message of Krishna consciousness around the world. Book distribution is the most important activity of ISKCON.
              </p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                <Link href="/get-involved/book-distribution" className="btn-primary">
                  <FaHeart className="mr-2 inline" /> Support Book Distribution
                </Link>
                <Link href="/donate" className="btn-secondary">
                  Make a Donation
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 relative h-64 md:h-auto">
              <Image
                src="/images/book-distribution.jpg"
                alt="ISKCON Book Distribution"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}