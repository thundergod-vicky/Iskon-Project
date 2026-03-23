'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGraduationCap, FaCheckCircle, FaTimes, FaCreditCard, FaClock } from 'react-icons/fa';

export default function CoursesPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const PAYMENT_LINK = "https://razorpay.me/@iskcondurgapur"; 

  useEffect(() => {
    fetch('/api/courses')
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) {
          // ensure we only show active ones or just render them all if there's no active flag
          setCourses(data);
        } else {
          console.error('API returned non-array data', data);
        }
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  const handleRegister = (course: any) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
    setIsSubmitted(false);
  };

  const handleChange = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/course-registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, courseId: selectedCourse._id })
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
      <section className="relative h-[40vh] flex items-center justify-center bg-[#2a2d34]">
        <div className="absolute inset-0">
          <Image src="/images/temple-altar.jpg" alt="Vedic Study" fill className="object-cover brightness-50" priority />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <FaGraduationCap className="text-6xl mx-auto mb-4 text-orange-200" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Vedic Courses</h1>
          <p className="text-xl max-w-2xl mx-auto opacity-90">Deepen your spiritual understanding through our comprehensive study programs.</p>
        </div>
      </section>

      {/* Courses List Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {isLoading ? (
            <div className="text-center text-gray-500 py-16">Loading courses...</div>
          ) : courses.length === 0 ? (
            <div className="text-center text-gray-500 py-16">No courses available at the moment. Please check back later!</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course) => (
                <motion.div key={course._id} whileHover={{ y: -5 }} className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 flex flex-col">
                  <div className="relative h-48 w-full bg-gray-200">
                    <Image src={course.image || '/images/iskcon-logo.png'} alt={course.title} fill className="object-cover" onError={(e) => { (e.target as HTMLImageElement).src = '/images/iskcon-logo.png'; }} />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full font-bold text-iskcon-orange shadow-sm">
                      ₹{course.price}
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{course.title}</h3>
                    <div className="flex items-center text-sm text-gray-500 mb-4 gap-2 font-medium">
                      <FaClock /> {course.duration}
                    </div>
                    <p className="text-gray-600 text-sm mb-6 flex-1">{course.description}</p>
                    <button onClick={() => handleRegister(course)} className="w-full bg-iskcon-orange text-white py-3 rounded-xl font-bold hover:bg-orange-600 transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2">
                       Register Now
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Booking Modal */}
      <AnimatePresence>
        {isModalOpen && selectedCourse && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 py-8 overflow-y-auto">
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="bg-white rounded-[2rem] shadow-2xl w-full max-w-xl overflow-hidden relative">
              <div className="bg-orange-50 p-6 flex items-center justify-between border-b border-orange-100">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Register: {selectedCourse.title}</h2>
                  <p className="text-iskcon-orange font-medium">Course Fee: ₹{selectedCourse.price}</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 shadow-sm transition-colors"><FaTimes /></button>
              </div>

              <div className="p-8">
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">Full Name *</label>
                      <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-iskcon-orange outline-none" placeholder="Student Name" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">Email Address *</label>
                      <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-iskcon-orange outline-none" placeholder="john@example.com" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">Phone Number *</label>
                      <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-iskcon-orange outline-none" placeholder="+91 98765 43210" />
                    </div>

                    <div className="pt-4 flex justify-end gap-4">
                      <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 font-bold text-gray-500 hover:bg-gray-100 rounded-xl transition-colors">Cancel</button>
                      <button type="submit" className="px-8 py-3 bg-iskcon-orange text-white font-bold rounded-xl shadow-md hover:bg-orange-600 transition-colors">Save Details & Pay</button>
                    </div>
                  </form>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
                      <FaCheckCircle />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Registration Saved!</h3>
                    <p className="text-gray-600 mb-8 max-w-sm mx-auto">
                      Please complete the payment of <strong>₹{selectedCourse.price}</strong> to confirm your seat for the course.
                    </p>
                    <button onClick={proceedToPayment} className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-lg">
                      <FaCreditCard /> Pay ₹{selectedCourse.price} Online
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