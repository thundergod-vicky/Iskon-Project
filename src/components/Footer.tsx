'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaFacebook, FaTwitter, FaYoutube, FaInstagram, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  const footerLinks = [
    {
      title: 'About ISKCON',
      links: [
        { name: 'Our Mission', href: '/about/mission' },
        { name: 'Srila Prabhupada', href: '/about/prabhupada' },
        { name: 'History', href: '/about/history' },
        { name: 'Centers Worldwide', href: '/temples' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'Bhagavad Gita', href: '/resources/bhagavad-gita' },
        { name: 'Vedic Literature', href: '/resources/vedic-literature' },
        { name: 'Online Books', href: '/resources/books' },
        { name: 'Podcasts', href: '/resources/podcasts' },
      ],
    },
    {
      title: 'Get Involved',
      links: [
        { name: 'Become a Volunteer', href: '/get-involved/volunteer' },
        { name: 'Attend Programs', href: '/events' },
        { name: 'Support Our Mission', href: '/donate' },
        { name: 'Newsletter', href: '/newsletter' },
      ],
    },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        {/* Main footer content */}
        <div className="pt-16 pb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Organization Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center mb-6">
                <div className="relative h-12 w-12 mr-3">
                  <Image
                    src="/images/iskcon-logo.png"
                    alt="ISKCON Logo"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <span className="text-2xl font-bold font-sanskrit">ISKCON</span>
              </div>
              <p className="mb-6 text-gray-400">
                The International Society for Krishna Consciousness (ISKCON), known colloquially as the Hare Krishna movement, is a Gaudiya Vaishnava religious organization founded by A.C. Bhaktivedanta Swami Prabhupada in 1966.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <p className="flex items-center text-gray-400">
                  <FaMapMarkerAlt className="mr-3 text-iskcon-orange" />
                  <span>3764 Watseka Avenue, Los Angeles, CA 90034</span>
                </p>
                <p className="flex items-center text-gray-400">
                  <FaPhone className="mr-3 text-iskcon-orange" />
                  <span>+1 (310) 836-2676</span>
                </p>
                <p className="flex items-center text-gray-400">
                  <FaEnvelope className="mr-3 text-iskcon-orange" />
                  <span>info@iskcon.org</span>
                </p>
              </div>
            </div>

            {/* Quick Links */}
            {footerLinks.map((column) => (
              <div key={column.title}>
                <h3 className="text-lg font-bold mb-4 text-iskcon-gold">{column.title}</h3>
                <ul className="space-y-2">
                  {column.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-iskcon-orange transition-colors duration-300"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-gray-400">
                © {new Date().getFullYear()} ISKCON. All Rights Reserved.
              </p>
            </div>

            <div className="flex space-x-4">
              {[
                { icon: <FaFacebook />, href: 'https://facebook.com/iskcon' },
                { icon: <FaTwitter />, href: 'https://twitter.com/iskcon' },
                { icon: <FaInstagram />, href: 'https://instagram.com/iskcon' },
                { icon: <FaYoutube />, href: 'https://youtube.com/iskcon' },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 text-gray-400 hover:text-white p-2 rounded-full transition-colors duration-300"
                  whileHover={{ y: -3 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Lotus Pattern */}
      <div className="bg-gray-950 h-6 w-full overflow-hidden relative">
        <div className="absolute inset-0 bg-lotus-pattern opacity-20"></div>
      </div>
    </footer>
  );
} 