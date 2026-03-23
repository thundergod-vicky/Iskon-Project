'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPrayingHands, FaCheckCircle, FaTimes, FaWhatsapp, FaCreditCard } from 'react-icons/fa';

const pujasList = [
  {
    id: 1,
    name: 'Mangal Aarti Puja',
    price: 501,
    description: 'Special early morning blessings during Mangal Aarti. Receive divine grace to start your endeavors.',
    image: '/images/temple-altar.jpg'
  },
  {
    id: 2,
    name: 'Tulasi Aarti Support',
    price: 1001,
    description: 'Sponsor the daily Tulasi Aarti and receive special prayers for your family’s spiritual well-being.',
    image: '/images/history-of-iskcon.jpg'
  },
  {
    id: 3,
    name: 'Narasimha Kavacha Puja',
    price: 2001,
    description: 'Powerful protection prayers offered to Lord Narasimhadeva for overcoming obstacles in life.',
    image: '/images/krishna-temple.jpg'
  },
  {
    id: 4,
    name: 'Special Festival Sankalpa',
    price: 5001,
    description: 'Exclusive prayers during major festivals like Janmashtami or Gaura Purnima for overall prosperity.',
    image: '/images/events/janmashtami-celebration.jpg'
  }
];

export default function OnlinePujaBookingPage() {
  const [selectedPuja, setSelectedPuja] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    gotra: '',
    purpose: '',
    whatsapp: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Note: Replace this with the actual payment gateway link provided by ISKCON Durgapur
  const PAYMENT_LINK = "https://razorpay.me/@iskcondurgapur"; 

  const handleBookNow = (puja: any) => {
    setSelectedPuja(puja);
    setIsModalOpen(true);
    setIsSubmitted(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, here we would save the booking details to the database before redirecting
    // For now, we simulate success and show payment details
    setIsSubmitted(true);
  };

  const proceedToPayment = () => {
    // Open payment link in a new tab
    window.open(PAYMENT_LINK, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center bg-iskcon-orange">
        <div className="absolute inset-0">
          <Image
            src="/images/temple-altar.jpg"
            alt="Temple Altar"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <FaPrayingHands className="text-6xl mx-auto mb-4 text-orange-200" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Book Online Puja</h1>
          <p className="text-xl max-w-2xl mx-auto opacity-90">
            Seek divine blessings from anywhere. We will perform the puja on your behalf and send you the video on WhatsApp.
          </p>
        </div>
      </section>

      {/* Puja List Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Available Pujas</h2>
            <p className="text-gray-600">Select a puja below to proceed with the booking and payment.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pujasList.map((puja) => (
              <motion.div
                key={puja.id}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 flex flex-col"
              >
                <div className="relative h-48 w-full bg-orange-100">
                  <Image 
                    src={puja.image} 
                    alt={puja.name} 
                    fill 
                    className="object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/iskcon-logo.png';
                    }}
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full font-bold text-iskcon-orange shadow-sm">
                    ₹{puja.price}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{puja.name}</h3>
                  <p className="text-gray-600 text-sm mb-6 flex-1">{puja.description}</p>
                  <button
                    onClick={() => handleBookNow(puja)}
                    className="w-full bg-iskcon-orange text-white py-3 rounded-xl font-bold hover:bg-orange-600 transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <FaPrayingHands /> Book Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <AnimatePresence>
        {isModalOpen && selectedPuja && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 py-8 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-[2rem] shadow-2xl w-full max-w-2xl overflow-hidden relative"
            >
              {/* Modal Header */}
              <div className="bg-orange-50 p-6 flex items-center justify-between border-b border-orange-100">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Booking: {selectedPuja.name}</h2>
                  <p className="text-iskcon-orange font-medium">Dakshina: ₹{selectedPuja.price}</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 shadow-sm transition-colors"
                >
                  <FaTimes />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-8">
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-blue-50 text-blue-800 p-4 rounded-xl text-sm mb-6 flex items-start gap-3">
                      <FaWhatsapp className="text-2xl shrink-0 text-green-500" />
                      <div>
                        <strong>Video Delivery:</strong> We will send a personalized video of your puja to your provided WhatsApp number.
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Full Name *</label>
                        <input 
                          type="text" 
                          name="fullName"
                          required
                          value={formData.fullName}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-iskcon-orange outline-none" 
                          placeholder="Devotee Name" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Gotra (Optional)</label>
                        <input 
                          type="text" 
                          name="gotra"
                          value={formData.gotra}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-iskcon-orange outline-none" 
                          placeholder="e.g. Kashyapa" 
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">Sankalpa / Purpose *</label>
                      <textarea 
                        name="purpose"
                        required
                        value={formData.purpose}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-iskcon-orange outline-none h-24 resize-none" 
                        placeholder="Please mention your prayer request..." 
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">WhatsApp Number *</label>
                      <input 
                        type="tel" 
                        name="whatsapp"
                        required
                        value={formData.whatsapp}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-iskcon-orange outline-none" 
                        placeholder="+91 98765 43210" 
                      />
                    </div>

                    <div className="pt-4 flex justify-end gap-4">
                      <button 
                        type="button" 
                        onClick={() => setIsModalOpen(false)}
                        className="px-6 py-3 font-bold text-gray-500 hover:bg-gray-100 rounded-xl transition-colors"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit" 
                        className="px-8 py-3 bg-iskcon-orange text-white font-bold rounded-xl shadow-md hover:bg-orange-600 transition-colors"
                      >
                        Save Details & Proceed to Pay
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
                      <FaCheckCircle />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Details Saved!</h3>
                    <p className="text-gray-600 mb-8 max-w-sm mx-auto">
                      Your details have been recorded. Please complete the payment of <strong>₹{selectedPuja.price}</strong> to confirm your booking.
                    </p>
                    <div className="space-y-4 max-w-sm mx-auto">
                      <button 
                        onClick={proceedToPayment}
                        className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-lg"
                      >
                        <FaCreditCard /> Pay ₹{selectedPuja.price} Online
                      </button>
                      <p className="text-xs text-gray-400">
                        After payment, please screenshot the receipt to our WhatsApp support if needed.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
