'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaHandsHelping, FaLeaf, FaBookOpen, FaUtensils, FaCamera, FaHeart, FaPaperPlane } from 'react-icons/fa';

const opportunities = [
    {
        title: 'Food for Life (Prasadam)',
        icon: <FaUtensils className="text-4xl text-orange-500 mb-4" />,
        color: 'from-orange-500 to-amber-500',
        bgLight: 'bg-orange-50',
        description: 'Help prepare, pack, and distribute sanctified vegetarian meals to the needy and temple visitors.',
        timeCommitment: '2-4 hours/week',
        skills: 'Cooking enthusiasm, hygiene focus'
    },
    {
        title: 'Temple Maintenance (Seva)',
        icon: <FaHandsHelping className="text-4xl text-teal-500 mb-4" />,
        color: 'from-teal-400 to-emerald-500',
        bgLight: 'bg-teal-50',
        description: 'Keep the Lord\'s home pristine. Assist in cleaning, organizing, and decorating the temple grounds.',
        timeCommitment: 'Flexible',
        skills: 'Dedication, attention to detail'
    },
    {
        title: 'Book Distribution (Sankirtan)',
        icon: <FaBookOpen className="text-4xl text-blue-500 mb-4" />,
        color: 'from-blue-500 to-indigo-500',
        bgLight: 'bg-blue-50',
        description: '\"Books are the basis.\" Share spiritual knowledge by distributing Srila Prabhupada\'s books to the public.',
        timeCommitment: 'Weekends (3 hours)',
        skills: 'Communication, enthusiasm'
    },
    {
        title: 'Digital Media & IT',
        icon: <FaCamera className="text-4xl text-purple-500 mb-4" />,
        color: 'from-purple-500 to-pink-500',
        bgLight: 'bg-purple-50',
        description: 'Help manage our website, social media, photography, and live streaming of temple classes/aartis.',
        timeCommitment: 'Remote/Flexible',
        skills: 'Tech-savvy, photography, social media'
    },
    {
        title: 'Cow Protection (Goshala)',
        icon: <FaLeaf className="text-4xl text-green-500 mb-4" />,
        color: 'from-green-500 to-lime-500',
        bgLight: 'bg-green-50',
        description: 'Assist in caring for our cows — feeding, cleaning the goshala, and learning the art of cow protection.',
        timeCommitment: 'Early mornings or evenings',
        skills: 'Compassion for animals, physical stamina'
    },
    {
        title: 'Guest Reception/Care',
        icon: <FaHeart className="text-4xl text-rose-500 mb-4" />,
        color: 'from-rose-500 to-red-500',
        bgLight: 'bg-rose-50',
        description: 'Welcome new visitors, guide them around the temple, and answer their preliminary spiritual questions.',
        timeCommitment: '3 hours/shift',
        skills: 'Welcoming attitude, basic philosophy'
    }
];

export default function VolunteerPage() {
    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', areaOfInterest: 'Temple Maintenance (Seva)', availability: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const res = await fetch('/api/volunteers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                setSubmitted(true);
                setFormData({ name: '', email: '', phone: '', areaOfInterest: 'Temple Maintenance (Seva)', availability: '' });
                setTimeout(() => setSubmitted(false), 5000);
            } else {
                alert('Failed to submit. Please try again later.');
            }
        } catch (err) {
            console.error(err);
            alert('A network error occurred.');
        } finally {
            setIsSubmitting(true); // Keeping the button state as requested or resetting it
            setIsSubmitting(false);
        }
    };

    return (
        <main className="min-h-screen bg-gray-50 pb-20">
            {/* Hero */}
            <section className="relative pt-32 pb-20 overflow-hidden bg-gray-900">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-t from-teal-900/90 to-gray-900/80 mix-blend-multiply" />
                    <img src="/images/gallery/devotees-serving.jpg" alt="Devotees Serving" className="w-full h-full object-cover opacity-30" />
                </div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl mx-auto"
                    >
                        <span className="inline-block py-1 px-3 rounded-full bg-teal-500/20 text-teal-300 text-sm font-bold mb-4 border border-teal-500/30">
                            Service to Humanity & God
                        </span>
                        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                            Become a <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-300">Volunteer</span>
                        </h1>
                        <p className="text-xl text-gray-300">
                            "The best way to find yourself is to lose yourself in the service of others." Join our vibrant community of volunteers rendering devotional service.
                        </p>
                    </motion.div>
                </div>
            </section>

            <div className="container mx-auto px-4 -mt-10 relative z-20">
                {/* Opportunities Grid */}
                <div className="text-center mb-12 max-w-2xl mx-auto mt-20">
                    <h2 className="text-3xl font-black text-gray-900 mb-4">Areas of Service</h2>
                    <p className="text-gray-500">Whatever your skills, time, or background, there is a place for you to serve at ISKCON Durgapur.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-20">
                    {opportunities.map((opp, i) => (
                        <motion.div
                            key={opp.title}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all group"
                        >
                            <div className={`w-20 h-20 rounded-2xl ${opp.bgLight} flex items-center justify-center mb-6 transform group-hover:-translate-y-2 transition-transform`}>
                                {opp.icon}
                            </div>
                            <h3 className="text-2xl font-black text-gray-800 mb-3">{opp.title}</h3>
                            <p className="text-gray-600 mb-6 min-h-[80px]">{opp.description}</p>
                            
                            <div className="space-y-2 border-t border-gray-100 pt-6 mt-auto">
                                <div className="flex justify-between text-sm">
                                    <span className="font-bold text-gray-400 uppercase tracking-wide">Commitment</span>
                                    <span className="font-semibold text-gray-700">{opp.timeCommitment}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="font-bold text-gray-400 uppercase tracking-wide">Skills needed</span>
                                    <span className="font-semibold text-gray-700 text-right max-w-[150px]">{opp.skills}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Enrollment Form */}
                <div id="volunteer-form" className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-black text-gray-900 mb-3">Register as a Volunteer</h2>
                        <p className="text-gray-500">Sign up and our Volunteer Coordinator will reach out to discuss how you can best serve.</p>
                    </div>

                    {submitted ? (
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center"
                        >
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FaHandsHelping className="text-4xl text-green-500" />
                            </div>
                            <h3 className="text-2xl font-bold text-green-800 mb-2">Thank you for stepping forward!</h3>
                            <p className="text-green-600">Your desire to serve is greatly appreciated. We will contact you within 48 hours.</p>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                                    <input
                                        type="text" required
                                        className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all outline-none"
                                        placeholder="Your Name"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Mobile Number</label>
                                    <input
                                        type="tel" required
                                        className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all outline-none"
                                        placeholder="+91"
                                        value={formData.phone}
                                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                                    <input
                                        type="email" required
                                        className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all outline-none"
                                        placeholder="your@email.com"
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Availability (approx.)</label>
                                    <select
                                        className="w-full px-5 py-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 transition-all outline-none"
                                        value={formData.availability}
                                        onChange={e => setFormData({ ...formData, availability: e.target.value })}
                                    >
                                        <option value="">Select availability...</option>
                                        <option value="Weekends Only">Weekends Only</option>
                                        <option value="Weekdays">Weekdays</option>
                                        <option value="2-4 Hours Weekly">2-4 Hours Weekly</option>
                                        <option value="Flexible">Flexible / Open</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Primary Area of Interest</label>
                                <select
                                    className="w-full px-5 py-4 bg-white border-2 border-teal-200 text-teal-800 font-bold rounded-xl focus:ring-2 focus:ring-teal-500 transition-all outline-none"
                                    value={formData.areaOfInterest}
                                    onChange={e => setFormData({ ...formData, areaOfInterest: e.target.value })}
                                >
                                    {opportunities.map(opp => (
                                        <option key={opp.title} value={opp.title}>{opp.title}</option>
                                    ))}
                                    <option value="Other">Other Skills to Offer</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all shadow-lg disabled:opacity-70 disabled:transform-none"
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center gap-2">Sending Info...</span>
                                ) : (
                                    <>Sign Up to Volunteer <FaPaperPlane /></>
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </main>
    );
}
