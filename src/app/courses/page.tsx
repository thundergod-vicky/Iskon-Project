'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaClock, FaGraduationCap, FaUsers, FaStar, FaSearch, FaFilter, FaChevronDown, FaChevronUp } from 'react-icons/fa';

// Define course interface
interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  duration: string;
  schedule: string;
  instructor: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  rating: number;
  enrolledCount: number;
  featured: boolean;
  price: number | 'Free';
  language: string;
}

// Sample course data
const coursesData: Course[] = [
  {
    id: 'bhagavad-gita-essentials',
    title: 'Bhagavad Gita Essentials',
    description: 'A comprehensive introduction to the timeless wisdom of Bhagavad Gita. Learn about karma yoga, bhakti yoga, and the science of self-realization.',
    image: '/images/courses/bhagavad-gita.jpg',
    duration: '8 weeks',
    schedule: 'Saturdays, 10:00 AM - 12:00 PM',
    instructor: 'Radha Krishna Das',
    level: 'Beginner',
    category: 'Scripture Study',
    rating: 4.9,
    enrolledCount: 1245,
    featured: true,
    price: 'Free',
    language: 'English'
  },
  {
    id: 'mantra-meditation',
    title: 'ISKCON Disciple Course',
    description: 'Learn the art of mantra meditation, focusing on the Hare Krishna maha-mantra. Develop a consistent practice and experience inner peace.',
    image: '/images/courses/meditation.jpg',
    duration: '4 weeks',
    schedule: 'Wednesdays, 6:30 PM - 8:00 PM',
    instructor: 'Yamuna Devi Dasi',
    level: 'Beginner',
    category: 'Meditation',
    rating: 4.8,
    enrolledCount: 890,
    featured: true,
    price: 400,
    language: 'English'
  },
  {
    id: 'bhakti-yoga-philosophy',
    title: 'Pujari Course',
    description: 'Explore the profound philosophy of Bhakti Yoga, the path of devotional service. Learn about the nine processes of devotional service and their application.',
    image: '/images/courses/bhakti-yoga.jpg',
    duration: '12 weeks',
    schedule: 'Tuesdays & Thursdays, 7:00 PM - 8:30 PM',
    instructor: 'Govinda Das',
    level: 'Intermediate',
    category: 'Philosophy',
    rating: 4.7,
    enrolledCount: 675,
    featured: false,
    price: 1200,
    language: 'English'
  },
  {
    id: 'vedic-cooking',
    title: 'Vedic Cooking & Prasadam Preparation',
    description: 'Learn to prepare sanctified vegetarian food according to Vedic traditions. Master the art of cooking with consciousness and devotion.',
    image: '/images/courses/vedic-cooking.jpg',
    duration: '6 weeks',
    schedule: 'Sundays, 3:00 PM - 5:00 PM',
    instructor: 'Lakshmi Devi Dasi',
    level: 'Beginner',
    category: 'Lifestyle',
    rating: 4.9,
    enrolledCount: 750,
    featured: true,
    price: 1499,
    language: 'English'
  },
  {
    id: 'sanskrit-basics',
    title: 'Mridanga & Kartal Course',
    description: 'An introduction to the Sanskrit language, focusing on pronunciation, basic grammar, and vocabulary used in common Vaishnava prayers and mantras.',
    image: '/images/courses/sanskrit.jpg',
    duration: '10 weeks',
    schedule: 'Mondays, 6:00 PM - 7:30 PM',
    instructor: 'Dr. Nityananda Das',
    level: 'Beginner',
    category: 'Language',
    rating: 4.6,
    enrolledCount: 420,
    featured: false,
    price: 1999,
    language: 'English'
  },
  {
    id: 'srimad-bhagavatam',
    title: 'Srimad Bhagavatam: First Canto',
    description: 'A deep dive into the first canto of Srimad Bhagavatam, exploring the philosophical foundations, historical context, and spiritual insights.',
    image: '/images/courses/bhagavatam.jpg',
    duration: '16 weeks',
    schedule: 'Fridays, 5:30 PM - 7:30 PM',
    instructor: 'Bhakti Charu Swami',
    level: 'Advanced',
    category: 'Scripture Study',
    rating: 4.9,
    enrolledCount: 560,
    featured: false,
    price: 2499,
    language: 'English'
  },
  {
    id: 'kirtan-basics',
    title: 'Kirtan Basics: Learn to Play Harmonium',
    description: 'Learn to play harmonium and lead kirtans. This course covers music theory basics, traditional melodies, and techniques specific to Vaishnava kirtan.',
    image: '/images/courses/kirtan.jpg',
    duration: '8 weeks',
    schedule: 'Saturdays, 2:00 PM - 4:00 PM',
    instructor: 'Madhava Das',
    level: 'Beginner',
    category: 'Music',
    rating: 4.8,
    enrolledCount: 380,
    featured: true,
    price: 1799,
    language: 'English'
  },
  {
    id: 'temple-worship',
    title: 'Temple Worship & Deity Service',
    description: 'Learn the principles and practices of deity worship according to Vaishnava traditions. Includes practical training in altar setup, offerings, and arati ceremonies.',
    image: '/images/courses/temple-worship.jpg',
    duration: '6 weeks',
    schedule: 'Sundays, 9:00 AM - 11:00 AM',
    instructor: 'Radha Govinda Das',
    level: 'Intermediate',
    category: 'Lifestyle',
    rating: 4.7,
    enrolledCount: 310,
    featured: false,
    price: 999,
    language: 'English'
  }
];

// Unique categories for filtering
const categories = [...new Set(coursesData.map(course => course.category))];
const levels = ['Beginner', 'Intermediate', 'Advanced'];

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Filter courses based on search query, category, and level
  const filteredCourses = coursesData.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? course.category === selectedCategory : true;
    const matchesLevel = selectedLevel ? course.level === selectedLevel : true;

    return matchesSearch && matchesCategory && matchesLevel;
  });

  // Get featured courses
  const featuredCourses = coursesData.filter(course => course.featured);

  return (
    <main className="min-h-screen pb-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-600 to-indigo-700 py-20 md:py-28">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Spiritual Courses
            </motion.h1>
            <motion.p
              className="text-xl mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Deepen your spiritual knowledge and practice through our structured courses.
              From beginner to advanced levels, discover the timeless wisdom of Vedic scriptures.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <a href="#courses" className="btn-primary">
                Browse Courses
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Featured Courses</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map(course => (
              <motion.div
                key={course.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative h-48 bg-gray-200">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/images/courses/placeholder.jpg";
                    }}
                  />
                  <div className="absolute top-0 right-0 bg-iskcon-orange text-white px-3 py-1 text-sm font-bold">
                    Featured
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-800">{course.title}</h3>
                    <div className="flex items-center text-amber-500">
                      <FaStar />
                      <span className="text-sm ml-1 text-gray-700">{course.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-600 mb-4">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">{course.level}</span>
                    <span className="mx-2">•</span>
                    <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">{course.category}</span>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {course.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <FaCalendarAlt className="mr-1 text-gray-400" />
                      <span>{course.schedule}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <FaClock className="mr-1 text-gray-400" />
                      <span>{course.duration}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-iskcon-orange">
                      {typeof course.price === 'number' ? `₹${course.price}` : course.price}
                    </span>
                    <Link href={`/courses/${course.id}`} className="px-4 py-2 bg-iskcon-orange text-white rounded-md hover:bg-iskcon-orange/90 transition-colors">
                      View Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All Courses */}
      <section id="courses" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Explore All Courses</h2>

          {/* Search and Filter */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search courses..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-iskcon-orange"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <button
                className="md:w-auto w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                onClick={() => setShowFilters(!showFilters)}
              >
                <FaFilter />
                Filters
                {showFilters ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
              </button>
            </div>

            {showFilters && (
              <div className="bg-gray-50 p-4 rounded-md mb-6 flex flex-wrap gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-iskcon-orange"
                    value={selectedCategory || ''}
                    onChange={(e) => setSelectedCategory(e.target.value === '' ? null : e.target.value)}
                  >
                    <option value="">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-iskcon-orange"
                    value={selectedLevel || ''}
                    onChange={(e) => setSelectedLevel(e.target.value === '' ? null : e.target.value)}
                  >
                    <option value="">All Levels</option>
                    {levels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>

                <button
                  className="px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                  onClick={() => {
                    setSelectedCategory(null);
                    setSelectedLevel(null);
                    setSearchQuery('');
                  }}
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>

          {/* Course Grid */}
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map(course => (
                <motion.div
                  key={course.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative h-48 bg-gray-200">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/images/courses/placeholder.jpg";
                      }}
                    />
                    {course.featured && (
                      <div className="absolute top-0 right-0 bg-iskcon-orange text-white px-3 py-1 text-sm font-bold">
                        Featured
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-gray-800">{course.title}</h3>
                      <div className="flex items-center text-amber-500">
                        <FaStar />
                        <span className="text-sm ml-1 text-gray-700">{course.rating}</span>
                      </div>
                    </div>

                    <div className="flex items-center text-gray-600 mb-4">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">{course.level}</span>
                      <span className="mx-2">•</span>
                      <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">{course.category}</span>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {course.description}
                    </p>

                    <div className="flex flex-wrap gap-4 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <FaUsers className="mr-1 text-gray-400" />
                        <span>{course.enrolledCount} students</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <FaClock className="mr-1 text-gray-400" />
                        <span>{course.duration}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-iskcon-orange">
                        {typeof course.price === 'number' ? `₹${course.price}` : course.price}
                      </span>
                      <Link href={`/courses/${course.id}`} className="px-4 py-2 bg-iskcon-orange text-white rounded-md hover:bg-iskcon-orange/90 transition-colors">
                        View Details
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FaGraduationCap className="mx-auto h-16 w-16 text-gray-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">No courses found</h3>
              <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria</p>
              <button
                className="mt-6 px-4 py-2 bg-iskcon-orange text-white rounded-md"
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedLevel(null);
                  setSearchQuery('');
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Why Study With Us</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaGraduationCap className="text-pink-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Expert Teachers</h3>
              <p className="text-gray-600">
                Learn from experienced devotees and scholars who have deep knowledge and realization of the subject matter.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUsers className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Supportive Community</h3>
              <p className="text-gray-600">
                Study alongside like-minded individuals and form connections that support your spiritual journey.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaClock className="text-green-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Flexible Learning</h3>
              <p className="text-gray-600">
                Many courses offer both in-person and online options, allowing you to study at your own pace and convenience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-iskcon-orange text-white rounded-lg p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Spiritual Journey?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Enroll in our courses and embark on a transformative experience that will deepen your understanding of Krishna consciousness.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="#courses" className="px-6 py-3 bg-white text-iskcon-orange font-medium rounded-md hover:bg-gray-100">
                Browse Courses
              </a>
              <Link href="/contact" className="px-6 py-3 bg-transparent border-2 border-white text-white font-medium rounded-md hover:bg-white/10">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 