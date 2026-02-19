'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaMapMarkerAlt, FaPhone, FaGlobe, FaCalendarAlt, FaPrayingHands, FaHeart } from 'react-icons/fa';

// Interface for temple data
interface Temple {
  id: number;
  name: string;
  location: string;
  country: string;
  description: string;
  image: string;
  contact: {
    phone: string;
    email: string;
    website: string;
  };
  schedule: {
    arati: string;
    darshan: string;
    classes: string;
  };
}

export default function TemplesPage() {
  // Animation setup
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggeredContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  // Sample temple data
  const featuredTemples: Temple[] = [
    {
      id: 1,
      name: "Sri Sri Radha Krishna Temple",
      location: "Mayapur, West Bengal",
      country: "India",
      description: "The spiritual headquarters of ISKCON, this magnificent temple complex spans 700,000 square feet and is one of the largest temples in India. The Temple of the Vedic Planetarium features breathtaking architecture and spiritual exhibits.",
      image: "/images/iskcon-mayapur.jpg",
      contact: {
        phone: "+91 3472 245 239",
        email: "info@mayapur.com",
        website: "www.mayapur.com"
      },
      schedule: {
        arati: "4:30 AM, 7:15 AM, 12:30 PM, 4:15 PM, 7:00 PM",
        darshan: "7:15 AM to 1:00 PM, 4:00 PM to 8:00 PM",
        classes: "Morning: 7:30 AM, Evening: 5:30 PM"
      }
    },
    {
      id: 2,
      name: "Sri Sri Radha Parthasarathi Mandir",
      location: "New Delhi",
      country: "India",
      description: "One of the largest temple complexes in Delhi, this beautiful temple features stunning architecture and hosts numerous spiritual programs and festivals throughout the year.",
      image: "/images/iskcon-delhi.jpg",
      contact: {
        phone: "+91 11 2647 8992",
        email: "info@iskcondelhi.com",
        website: "www.iskcondelhi.com"
      },
      schedule: {
        arati: "4:30 AM, 7:15 AM, 12:00 PM, 4:15 PM, 7:00 PM",
        darshan: "4:30 AM to 12:30 PM, 4:30 PM to 9:00 PM",
        classes: "Morning: 8:00 AM, Evening: 6:30 PM"
      }
    },
    {
      id: 3,
      name: "ISKCON Temple of Vrindavan",
      location: "Vrindavan, Uttar Pradesh",
      country: "India",
      description: "Located in the sacred land of Lord Krishna's pastimes, this temple is a spiritual haven for devotees. The Krishna Balaram Mandir is famous for its beautiful deities and vibrant festivals.",
      image: "/images/iskcon-vrindavan.jpg",
      contact: {
        phone: "+91 565 254 0021",
        email: "info@iskconvrindavan.com",
        website: "www.iskconvrindavan.com"
      },
      schedule: {
        arati: "4:30 AM, 7:00 AM, 12:30 PM, 4:15 PM, 7:00 PM",
        darshan: "7:15 AM to 11:30 AM, 4:30 PM to 8:30 PM",
        classes: "Morning: 7:30 AM, Evening: 5:30 PM"
      }
    }
  ];

  const globalTemples: Temple[] = [
    {
      id: 4,
      name: "ISKCON London (Radha-Krishna Temple)",
      location: "London",
      country: "United Kingdom",
      description: "Located in the heart of London, this historical temple was established by Srila Prabhupada and serves as a spiritual and cultural center for thousands of visitors.",
      image: "/images/iskcon-london.jpg",
      contact: {
        phone: "+44 20 7437 3662",
        email: "info@iskconlondon.org",
        website: "www.iskconlondon.org"
      },
      schedule: {
        arati: "4:30 AM, 7:15 AM, 12:30 PM, 4:00 PM, 7:00 PM",
        darshan: "7:30 AM to 1:00 PM, 4:30 PM to 8:30 PM",
        classes: "Morning: 8:00 AM, Evening: 6:30 PM"
      }
    },
    {
      id: 5,
      name: "Sri Sri Radha Gopinath Temple",
      location: "Melbourne",
      country: "Australia",
      description: "A vibrant spiritual community in Melbourne offering a range of programs, festivals, and vegetarian feasts. The temple serves as a cultural hub for the Indian community.",
      image: "/images/iskcon-melbourne.jpg",
      contact: {
        phone: "+61 3 9214 0600",
        email: "info@iskconmelbourne.com.au",
        website: "www.iskconmelbourne.com.au"
      },
      schedule: {
        arati: "5:00 AM, 7:30 AM, 12:00 PM, 4:30 PM, 7:30 PM",
        darshan: "7:30 AM to 1:00 PM, 4:30 PM to 8:30 PM",
        classes: "Morning: 8:00 AM, Evening: 6:00 PM"
      }
    },
    {
      id: 6,
      name: "New Dvaraka Temple",
      location: "Los Angeles, California",
      country: "USA",
      description: "One of the first ISKCON temples in the Western world, established by Srila Prabhupada himself. It features beautiful deities and hosts a famous Sunday Feast program.",
      image: "/images/iskcon-la.jpg",
      contact: {
        phone: "+1 310 836 2676",
        email: "info@iskconla.org",
        website: "www.iskconla.org"
      },
      schedule: {
        arati: "4:30 AM, 7:00 AM, 12:00 PM, 4:00 PM, 7:00 PM",
        darshan: "7:15 AM to 1:00 PM, 4:30 PM to 8:30 PM",
        classes: "Morning: 7:30 AM, Evening: 6:00 PM"
      }
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/iskcon-temple-dome.jpg"
            alt="ISKCON Temple"
            fill
            sizes="100vw"
            priority
            className="object-cover brightness-75"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-sanskrit">ISKCON Temples</h1>
          <p className="text-xl text-white max-w-3xl mx-auto">
            Discover spiritual sanctuaries around the world dedicated to the worship of Lord Krishna
          </p>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 font-sanskrit">Sacred Spaces for Spiritual Connection</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              ISKCON temples are not merely buildings, but vibrant spiritual communities where devotees gather to practice devotional service, study sacred texts, and engage in worship of Lord Krishna. These temples serve as cultural centers, educational institutions, and spiritual havens for people from all walks of life.
            </p>
            <p className="text-gray-600 mb-10 leading-relaxed">
              With over 650 temples worldwide, ISKCON offers spiritual sanctuaries where anyone can experience the peace and joy of Krishna consciousness. Each temple follows traditional Vedic principles and provides a nurturing environment for spiritual growth.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="#featured-temples" className="btn-primary">
                Featured Temples
              </Link>
              <Link href="#temple-experiences" className="btn-secondary">
                Temple Experiences
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Temples Section */}
      <section id="featured-temples" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="section-title mb-16">Featured Temples in India</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {featuredTemples.map((temple, index) => (
              <motion.div
                key={temple.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border-t-4 border-iskcon-orange"
              >
                <div className="relative h-64">
                  <Image
                    src={temple.image}
                    alt={temple.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-800">{temple.name}</h3>
                  </div>
                  <div className="flex items-center text-gray-600 mb-4">
                    <FaMapMarkerAlt className="text-iskcon-orange mr-2" />
                    <span>{temple.location}, {temple.country}</span>
                  </div>
                  <p className="text-gray-600 mb-6 line-clamp-3">{temple.description}</p>
                  <button className="btn-secondary w-full">View Details</button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Temples Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="section-title mb-16">ISKCON Around the World</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {globalTemples.map((temple, index) => (
              <motion.div
                key={temple.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border-t-4 border-iskcon-orange"
              >
                <div className="relative h-64">
                  <Image
                    src={temple.image}
                    alt={temple.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-800">{temple.name}</h3>
                  </div>
                  <div className="flex items-center text-gray-600 mb-4">
                    <FaMapMarkerAlt className="text-iskcon-orange mr-2" />
                    <span>{temple.location}, {temple.country}</span>
                  </div>
                  <p className="text-gray-600 mb-6 line-clamp-3">{temple.description}</p>
                  <button className="btn-secondary w-full">View Details</button>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button className="btn-primary">View All Temples</button>
          </div>
        </div>
      </section>

      {/* Temple Experiences Section */}
      <section id="temple-experiences" className="py-20 bg-iskcon-orange/10">
        <div className="container mx-auto px-4">
          <h2 className="section-title mb-16">Temple Experiences</h2>
          
          <motion.div 
            ref={ref}
            variants={staggeredContainer}
            initial="hidden"
            animate={controls}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: <FaPrayingHands className="text-iskcon-orange text-4xl" />,
                title: "Daily Worship",
                description: "Experience the sacred arati ceremonies, where deities are offered worship with incense, lamps, flowers, and food while devotees sing devotional songs."
              },
              {
                icon: <FaCalendarAlt className="text-iskcon-orange text-4xl" />,
                title: "Festivals",
                description: "Join vibrant celebrations of sacred festivals like Janmashtami, Gaura Purnima, and Ratha Yatra, featuring music, dance, drama, and spiritual discourses."
              },
              {
                icon: <FaHeart className="text-iskcon-orange text-4xl" />,
                title: "Prasadam",
                description: "Taste spiritually sanctified vegetarian food (prasadam) that is first offered to Krishna with love and devotion before being distributed to visitors."
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                variants={fadeInUp}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Temple Visit Tips */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="section-title mb-16">Planning Your Temple Visit</h2>
          
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12 shadow-xl max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">Visitor Guidelines</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-iskcon-orange mr-2">•</span>
                    <span>Dress modestly; covered shoulders and legs are appropriate</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-iskcon-orange mr-2">•</span>
                    <span>Remove shoes before entering temple rooms</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-iskcon-orange mr-2">•</span>
                    <span>Avoid bringing non-vegetarian food onto temple premises</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-iskcon-orange mr-2">•</span>
                    <span>Photography may be restricted in certain areas</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-iskcon-orange mr-2">•</span>
                    <span>Maintain a respectful demeanor during ceremonies</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">Best Times to Visit</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-iskcon-orange mr-2">•</span>
                    <span>Morning arati (7:15 AM) - peaceful start to the day</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-iskcon-orange mr-2">•</span>
                    <span>Evening arati (7:00 PM) - energetic ceremony with music</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-iskcon-orange mr-2">•</span>
                    <span>Sunday Feast - cultural program and free vegetarian meal</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-iskcon-orange mr-2">•</span>
                    <span>Major festivals - immersive spiritual celebrations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-iskcon-orange mr-2">•</span>
                    <span>Weekday afternoons - quieter time for personal reflection</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Find a Temple Near You */}
      <section className="py-16 bg-iskcon-saffron/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8 font-sanskrit">Find a Temple Near You</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
            Discover the nearest ISKCON temple in your area and begin your spiritual journey today. Our temples welcome visitors of all backgrounds who wish to learn about Krishna consciousness.
          </p>
          <div className="max-w-xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex flex-col sm:flex-row mb-4">
                <input 
                  type="text" 
                  placeholder="Enter your location" 
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-iskcon-orange mb-3 sm:mb-0 sm:mr-3"
                />
                <button className="btn-primary whitespace-nowrap">
                  Search Temples
                </button>
              </div>
              <p className="text-sm text-gray-500">
                Or browse our <a href="#" className="text-iskcon-orange hover:underline">global temple directory</a> to find locations worldwide
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 