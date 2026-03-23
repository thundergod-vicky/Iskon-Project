'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlane, FaCheckCircle, FaTimes, FaCreditCard, FaClock, FaStar } from 'react-icons/fa';

export default function SpiritualRetreatsPage() {
  const [retreats, setRetreats] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRetreat, setSelectedRetreat] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const PAYMENT_LINK = "https://razorpay.me/@iskcondurgapur"; 

  useEffect(() => {
    fetch('/api/retreats').then(r => r.json()).then(data => {
      if (Array.isArray(data)) setRetreats(data);
      setIsLoading(false);
    }).catch((err) => {
      console.error(err);
      setIsLoading(false);
    });
  }, []);

  const handleRegister = (retreat: any) => {
    setSelectedRetreat(retreat);
    setIsModalOpen(true);
    setIsSubmitted(false);
  };

  const handleChange = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/retreat-registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, retreatId: selectedRetreat._id })
      });
      if (res.ok) setIsSubmitted(true);
    } catch (err) {
      console.error(err);
    }
  };

  const proceedToPayment = () => {
    window.open(PAYMENT_LINK, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center bg-blue-700">
        <div className="absolute inset-0">
          <Image src="/images/tours/mayapur.jpg" alt="Spiritual Retreat" fill className="object-cover brightness-50" onError={(e) => { (e.target as HTMLImageElement).src = '/images/iskcon-logo.png'; }} priority />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <FaPlane className="text-6xl mx-auto mb-4 text-blue-200" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Spiritual Retreats</h1>
          <p className="text-xl max-w-2xl mx-auto opacity-90">Embark on transformative journeys to India's holiest sites, guided by experienced devotees.</p>
        </div>
      </section>

      {/* Retreats List Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {isLoading ? (
            <div className="text-center text-gray-500 py-16">Loading retreats...</div>
          ) : retreats.length === 0 ? (
            <div className="text-center text-gray-500 py-16">No spiritual retreats available at the moment. Please check back later!</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {retreats.map((retreat) => (
                <motion.div key={retreat._id} whileHover={{ y: -5 }} className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 flex flex-col">
                  <div className="relative h-48 w-full bg-blue-50">
                    <Image src={retreat.image || '/images/tours/placeholder.jpg'} alt={retreat.title} fill className="object-cover" onError={(e) => { (e.target as HTMLImageElement).src = '/images/iskcon-logo.png'; }} />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full font-bold text-blue-600 shadow-sm">
                      ₹{retreat.price}
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{retreat.title}</h3>
                    <div className="flex items-center text-sm text-gray-500 mb-4 gap-2 font-medium">
                      <FaClock /> {retreat.duration}
                    </div>
                    <p className="text-gray-600 text-sm mb-6 flex-1">{retreat.description}</p>
                    <button onClick={() => handleRegister(retreat)} className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2">
                       Register Now
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section (Preserved) */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Pilgrim Testimonials</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Hear from devotees who have experienced the transformative power of our spiritual retreats
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-bold">RD</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Radha Devi</h3>
                  <div className="flex text-amber-500 text-sm mt-1">
                    <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The Vrindavan retreat was beyond my expectations. Our guide was knowledgeable and the spiritual atmosphere was profound. I felt connected to Krishna's pastimes in a way I never had before."
              </p>
            </div>
            
            <div className="bg-gray-50 border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-green-600 font-bold">MG</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Madhav Gopal</h3>
                  <div className="flex text-amber-500 text-sm mt-1">
                    <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The Mayapur retreat was life-changing. The kirtans, the Temple of Vedic Planetarium, and the association of devotees created an atmosphere of deep spiritual connection."
              </p>
            </div>
            
            <div className="bg-gray-50 border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-purple-600 font-bold">SG</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Saraswati Ganga</h3>
                  <div className="flex text-amber-500 text-sm mt-1">
                    <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The South India temple retreat was perfectly organized. We visited so many beautiful temples, and our guide explained the history and significance of each place. The prasadam was delicious!"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <AnimatePresence>
        {isModalOpen && selectedRetreat && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 py-8 overflow-y-auto">
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="bg-white rounded-[2rem] shadow-2xl w-full max-w-xl overflow-hidden relative">
              <div className="bg-blue-50 p-6 flex items-center justify-between border-b border-blue-100">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Register: {selectedRetreat.title}</h2>
                  <p className="text-blue-600 font-medium">Retreat Fee: ₹{selectedRetreat.price}</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 shadow-sm transition-colors"><FaTimes /></button>
              </div>

              <div className="p-8">
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">Full Name *</label>
                      <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Devotee Name" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">Email Address *</label>
                      <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="john@example.com" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">Phone Number *</label>
                      <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="+91 98765 43210" />
                    </div>

                    <div className="pt-4 flex justify-end gap-4">
                      <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 font-bold text-gray-500 hover:bg-gray-100 rounded-xl transition-colors">Cancel</button>
                      <button type="submit" className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-md hover:bg-blue-700 transition-colors">Save Details & Pay</button>
                    </div>
                  </form>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
                      <FaCheckCircle />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Registration Saved!</h3>
                    <p className="text-gray-600 mb-8 max-w-sm mx-auto">
                      Please complete the payment of <strong>₹{selectedRetreat.price}</strong> to confirm your seat for the retreat.
                    </p>
                    <button onClick={proceedToPayment} className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-lg">
                      <FaCreditCard /> Pay ₹{selectedRetreat.price} Online
                    </button>
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