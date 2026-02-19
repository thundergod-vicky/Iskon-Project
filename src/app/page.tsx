'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaArrowRight, FaCalendarAlt, FaPrayingHands, FaBookOpen, FaUsers, FaOm } from 'react-icons/fa';
import { GiLotus } from 'react-icons/gi';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section - Modern Split Screen */}
      <section className="relative min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-96 h-96 bg-orange-300 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-200 rounded-full blur-3xl opacity-50" />
        </div>

        {/* Decorative Circles */}
        <div className="absolute top-20 right-20 w-4 h-4 bg-orange-400 rounded-full animate-ping" />
        <div className="absolute top-40 right-40 w-2 h-2 bg-amber-500 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-40 left-20 w-3 h-3 bg-orange-500 rounded-full animate-ping" style={{ animationDelay: '1s' }} />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[calc(100vh-6rem)]">

            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isLoaded ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg mb-6"
              >
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-gray-700">Temple Open Daily 4:30 AM - 8:30 PM</span>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6"
                initial={{ opacity: 0 }}
                animate={isLoaded ? { opacity: 1 } : {}}
                transition={{ delay: 0.4 }}
              >
                <span className="text-gray-800">Welcome to</span>
                <br />
                <span className="bg-gradient-to-r from-orange-600 via-amber-500 to-orange-600 bg-clip-text text-transparent">
                  ISKCON Durgapur
                </span>
              </motion.h1>

              {/* Sanskrit Verse */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isLoaded ? { opacity: 1 } : {}}
                transition={{ delay: 0.6 }}
                className="mb-6 p-4 bg-white/60 backdrop-blur-sm rounded-xl border-l-4 border-orange-500"
              >
                <p className="text-2xl sm:text-3xl font-sanskrit text-orange-700 mb-2">
                  हरे कृष्ण हरे कृष्ण
                </p>
                <p className="text-lg font-sanskrit text-orange-600">
                  कृष्ण कृष्ण हरे हरे
                </p>
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={isLoaded ? { opacity: 1 } : {}}
                transition={{ delay: 0.8 }}
                className="text-lg sm:text-xl text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0"
              >
                Experience the divine atmosphere of Krishna Consciousness.
                Join us for daily aartis, spiritual discourses, and the nectarean prasadam.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Link
                  href="/about"
                  className="group relative bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-xl shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Visit Temple
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
                <Link
                  href="/donate"
                  className="bg-white text-orange-600 px-8 py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-orange-200 hover:border-orange-400"
                >
                  <span className="flex items-center justify-center gap-2">
                    <FaPrayingHands />
                    Support Seva
                  </span>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Content - Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isLoaded ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              {/* Main Image Card */}
              <motion.div
                className="relative z-10"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="relative h-[400px] sm:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/krishna-temple.jpg"
                    alt="ISKCON Durgapur Temple"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Floating Info Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1.2 }}
                    className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-gray-800 text-lg">Sri Sri Radha Madanmohan Temple</h3>
                        <p className="text-gray-500 text-sm">Durgapur, West Bengal</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-orange-500">🙏</div>
                        <p className="text-xs text-gray-500">Jai Sri Krishna</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Decorative Cards */}
              <motion.div
                initial={{ opacity: 0, rotate: -5 }}
                animate={isLoaded ? { opacity: 1, rotate: -6 } : {}}
                transition={{ delay: 0.5 }}
                className="absolute -top-4 -left-4 w-32 h-40 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl -z-10 shadow-lg"
              />
              <motion.div
                initial={{ opacity: 0, rotate: 5 }}
                animate={isLoaded ? { opacity: 1, rotate: 6 } : {}}
                transition={{ delay: 0.7 }}
                className="absolute -bottom-4 -right-4 w-40 h-32 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl -z-10 shadow-lg"
              />
            </motion.div>
          </div>

          {/* Bottom Feature Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.4 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12"
          >
            {[
              { icon: <FaOm className="text-2xl" />, label: 'Daily Aarti', time: '4:30 AM' },
              { icon: <FaBookOpen className="text-2xl" />, label: 'Gita Class', time: '6:00 PM' },
              { icon: <GiLotus className="text-2xl" />, label: 'Prasadam', time: 'Free' },
              { icon: <FaCalendarAlt className="text-2xl" />, label: 'Sunday Feast', time: '5:00 PM' },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-orange-100 hover:border-orange-300 transition-all cursor-pointer"
              >
                <div className="text-orange-500 mb-2">{item.icon}</div>
                <h4 className="font-semibold text-gray-800 text-sm">{item.label}</h4>
                <p className="text-orange-600 font-bold text-lg">{item.time}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 1 } : {}}
          transition={{ delay: 2 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2"
        >
          <motion.a
            href="#welcome"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center text-gray-500 hover:text-orange-500 transition-colors"
          >
            <span className="text-xs uppercase tracking-widest mb-2">Explore</span>
            <FaArrowRight className="rotate-90" />
          </motion.a>
        </motion.div>
      </section>

      {/* Welcome Section */}
      <section id="welcome" className="py-12 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4 sm:mb-6">
              Welcome to ISKCON Durgapur
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-2">
              The International Society for Krishna Consciousness (ISKCON) is a spiritual society founded in 1966 by His Divine Grace A.C. Bhaktivedanta Swami Prabhupada to spread the practice of Bhakti Yoga worldwide.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {[
              { icon: <FaPrayingHands className="text-iskcon-orange text-3xl sm:text-4xl mb-4" />, title: "Spiritual Practices", description: "Daily prayers, meditation, and spiritual disciplines for inner peace." },
              { icon: <FaBookOpen className="text-iskcon-orange text-3xl sm:text-4xl mb-4" />, title: "Ancient Wisdom", description: "Timeless Vedic knowledge from Bhagavad Gita and Srimad Bhagavatam." },
              { icon: <FaUsers className="text-iskcon-orange text-3xl sm:text-4xl mb-4" />, title: "Community", description: "Join a global family dedicated to spiritual growth and compassion." },
              { icon: <FaCalendarAlt className="text-iskcon-orange text-3xl sm:text-4xl mb-4" />, title: "Festivals & Events", description: "Celebrate spiritual festivals and participate in enlightening events." },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-4 sm:p-6 text-center hover:border-iskcon-orange hover:border-2 transition-all"
              >
                {item.icon}
                <h3 className="text-lg sm:text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-sm sm:text-base text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-12 sm:py-20 bg-gradient-to-r from-iskcon-blue/10 to-iskcon-orange/10">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center p-6 sm:p-10 bg-white rounded-xl sm:rounded-2xl shadow-lg border-t-4 border-iskcon-orange"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-sanskrit font-bold mb-4 sm:mb-6 text-gray-800 leading-relaxed">
              &quot;Chant Hare Krishna and be happy!&quot;
            </h2>
            <p className="text-base sm:text-lg text-gray-600 mb-4">
              — Srila Prabhupada, Founder-Acharya of ISKCON
            </p>
            <div className="mt-6 sm:mt-8">
              <Link href="/philosophy" className="btn-primary w-full sm:w-auto min-w-[200px]">
                Explore Our Philosophy
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Events Preview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">Upcoming Events</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-10">
              {[
                { title: "Janmashtami Celebration", date: "August 18, 2025", image: "/images/events/janmashtami-celebration.jpg" },
                { title: "Gaura Purnima Festival", date: "March 14, 2025", image: "/images/events/gaura-purnima-festival.jpg" },
                { title: "Ratha Yatra Festival", date: "July 1, 2025", image: "/images/events/ratha-yatra-festival.jpg" },
              ].map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card group"
                >
                  <div className="relative h-40 sm:h-48 overflow-hidden rounded-t-lg">
                    <div className="absolute inset-0 bg-iskcon-orange/20 group-hover:bg-iskcon-orange/0 transition-all duration-300 z-10"></div>
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 sm:p-5">
                    <p className="text-iskcon-orange font-medium flex items-center mb-2 text-sm sm:text-base">
                      <FaCalendarAlt className="mr-2" /> {event.date}
                    </p>
                    <h3 className="text-lg sm:text-xl font-bold mb-2">{event.title}</h3>
                    <Link href="/events" className="inline-flex items-center text-iskcon-orange hover:underline mt-2 text-sm sm:text-base">
                      Learn More <FaArrowRight className="ml-2 text-sm" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <Link href="/events" className="btn-secondary">
                View All Events
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-20 bg-iskcon-saffron/10">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between p-6 sm:p-8 bg-white rounded-xl sm:rounded-2xl shadow-xl">
            <div className="mb-6 md:mb-0 md:mr-10 w-full md:w-2/3">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 font-sanskrit">
                Join Our Spiritual Journey
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mb-6 max-w-lg">
                Subscribe to our newsletter to receive updates about upcoming events,
                philosophy discussions, and spiritual insights.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-iskcon-orange w-full sm:w-auto text-base"
                  aria-label="Email address"
                />
                <button
                  className="btn-primary whitespace-nowrap w-full sm:w-auto"
                  aria-label="Subscribe to newsletter"
                >
                  Subscribe Now
                </button>
              </div>
            </div>
            <div className="relative w-full md:w-1/3 h-48 sm:h-64">
              <Image
                src="/images/iskcon-logo.png"
                alt="ISKCON Logo"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-contain animate-float"
                quality={90}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}