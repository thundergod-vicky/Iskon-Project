'use client';

import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Contact Us
          </motion.h1>
          <div className="w-24 h-1 bg-iskcon-orange mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have questions about our temple, activities, or spirituality? We'd love to hear from you. 
            Reach out through the form below or using our contact information.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info Cards */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Get in Touch</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-orange-50 rounded-2xl border border-orange-100">
                <FaMapMarkerAlt className="text-3xl text-iskcon-orange mb-4" />
                <h3 className="font-bold text-gray-800 mb-2">Location</h3>
                <p className="text-gray-600 text-sm">
                  ISKCON Durgapur,<br />
                  Durgapur, West Bengal,<br />
                  India.
                </p>
              </div>

              <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100">
                <FaPhone className="text-3xl text-amber-500 mb-4" />
                <h3 className="font-bold text-gray-800 mb-2">Phone</h3>
                <p className="text-gray-600 text-sm">
                  Main: +91 0000 000 000<br />
                  Office: +91 0000 000 000
                </p>
              </div>

              <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
                <FaEnvelope className="text-3xl text-blue-500 mb-4" />
                <h3 className="font-bold text-gray-800 mb-2">Email</h3>
                <p className="text-gray-600 text-sm hover:text-blue-600 transition-colors">
                  <a href="mailto:info.iskcondurgapur@gmail.com">info.iskcondurgapur@gmail.com</a>
                </p>
              </div>

              <div className="p-6 bg-green-50 rounded-2xl border border-green-100">
                <FaClock className="text-3xl text-green-500 mb-4" />
                <h3 className="font-bold text-gray-800 mb-2">Temple Hours</h3>
                <p className="text-gray-600 text-sm">
                  Morning: 4:30 AM - 1:00 PM<br />
                  Evening: 4:30 PM - 8:30 PM
                </p>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                {[FaFacebook, FaTwitter, FaInstagram, FaYoutube].map((Icon, i) => (
                  <a key={i} href="#" className="p-3 bg-gray-100 rounded-full text-gray-600 hover:bg-iskcon-orange hover:text-white transition-all">
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Send a Message</h2>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input type="text" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-iskcon-orange outline-none" placeholder="John" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input type="text" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-iskcon-orange outline-none" placeholder="Doe" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input type="email" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-iskcon-orange outline-none" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-iskcon-orange outline-none bg-white">
                  <option>General Inquiry</option>
                  <option>Donation Question</option>
                  <option>Volunteer Opportunities</option>
                  <option>Temple Programs</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea rows={4} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-iskcon-orange outline-none" placeholder="How can we help you?"></textarea>
              </div>
              <button type="submit" className="w-full bg-iskcon-orange text-white py-3 rounded-xl font-bold shadow-lg shadow-orange-500/30 hover:bg-iskcon-orange/90 transition-all">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
