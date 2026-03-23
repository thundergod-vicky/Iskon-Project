'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaCheckCircle, FaStar, FaCrown, FaGem, FaHandsHelping, FaCreditCard } from 'react-icons/fa';

const iconMap: { [key: string]: any } = {
    'FaStar': <FaStar className="text-4xl text-amber-500 mb-4" />,
    'FaCrown': <FaCrown className="text-4xl text-orange-500 mb-4" />,
    'FaHandsHelping': <FaHandsHelping className="text-4xl text-teal-500 mb-4" />,
    'FaGem': <FaGem className="text-4xl text-blue-500 mb-4" />
};

const PAYMENT_LINK = "https://razorpay.me/@iskcondurgapur";

export default function MembershipPage() {
    const [membershipLevels, setMembershipLevels] = useState<any[]>([]);
    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', membershipLevel: 'Life Member', membershipLevelId: '', membershipLevelName: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('/api/membership-levels')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setMembershipLevels(data);
                    if (data.length > 0) {
                        setFormData((prev: any) => ({ 
                            ...prev, 
                            membershipLevelId: data[1]?._id || data[0]._id,
                            membershipLevelName: data[1]?.title || data[0].title 
                        }));
                    }
                }
                setIsLoading(false);
            })
            .catch(err => {
                console.error(err);
                setIsLoading(false);
            });
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const res = await fetch('/api/membership-requests', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                setSubmitted(true);
                setTimeout(() => setSubmitted(false), 8000);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="min-h-screen bg-gray-50 pb-20">
            {/* Hero */}
            <section className="relative pt-32 pb-20 overflow-hidden bg-gray-900">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-900/80 to-gray-900/90 mix-blend-multiply" />
                    <img src="/images/gallery/temple-view.jpg" alt="Temple" className="w-full h-full object-cover opacity-30" />
                </div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl mx-auto"
                    >
                        <span className="inline-block py-1 px-3 rounded-full bg-orange-500/20 text-orange-300 text-sm font-bold mb-4 border border-orange-500/30">
                            Join Our Spiritual Family
                        </span>
                        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                            Become a <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">Member</span>
                        </h1>
                        <p className="text-xl text-gray-300">
                            Support the temple's daily operations, cow protection, and free food distribution while receiving exclusive spiritual benefits.
                        </p>
                    </motion.div>
                </div>
            </section>

            <div className="container mx-auto px-4 -mt-10 relative z-20">
                {/* Pricing Cards */}
                {isLoading ? (
                    <div className="text-center py-20 text-gray-500 font-bold">Loading membership tiers...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
                        {membershipLevels.map((level, i) => (
                            <motion.div
                                key={level.title}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.15 }}
                                className={`bg-white rounded-3xl shadow-xl overflow-hidden border-2 flex flex-col ${level.featured ? 'border-orange-500 transform md:-translate-y-4 shadow-orange-200' : 'border-transparent'}`}
                            >
                                {level.featured && (
                                    <div className="bg-gradient-to-r from-orange-500 to-rose-500 text-white text-center py-2 text-sm font-bold uppercase tracking-wider">
                                        Most Popular
                                    </div>
                                )}
                                <div className={`${level.bgLight} p-8 text-center border-b ${level.border}`}>
                                    {iconMap[level.icon] || <FaStar className="text-4xl text-amber-500 mb-4" />}
                                    <h3 className="text-2xl font-black text-gray-800 mb-2">{level.title}</h3>
                                    <div className="text-4xl font-extrabold text-gray-900 mb-1">₹{level.price.toLocaleString()}</div>
                                    <div className="text-sm font-bold text-gray-500 uppercase tracking-widest leading-6">{level.subtitle}</div>
                                </div>
                                <div className="p-8 flex-1 flex flex-col">
                                    <ul className="space-y-4 mb-8 flex-1">
                                        {level.benefits.map((benefit: string, idx: number) => (
                                            <li key={idx} className="flex items-start text-sm text-gray-600 font-medium">
                                                <FaCheckCircle className={`mt-0.5 mr-3 shrink-0 text-lg bg-clip-text text-transparent bg-gradient-to-br ${level.color} drop-shadow-sm`} style={{ color: 'unset' }} />
                                                {benefit}
                                            </li>
                                        ))}
                                    </ul>
                                    <button
                                        onClick={() => {
                                            setFormData((prev: any) => ({ 
                                                ...prev, 
                                                membershipLevelId: level._id,
                                                membershipLevelName: level.title 
                                            }));
                                            window.scrollTo({ top: document.getElementById('enroll')?.offsetTop || 0, behavior: 'smooth' });
                                        }}
                                        className={`w-full py-4 rounded-xl font-black text-white shadow-lg transform hover:-translate-y-1 transition-all bg-gradient-to-r from-orange-500 to-rose-500`}
                                    >
                                        Select {level.title}
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Enrollment Form */}
                <div id="enroll" className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-black text-gray-900 mb-3">Begin Your Enrollment</h2>
                        <p className="text-gray-500">Please provide your details below to process your membership request.</p>
                    </div>

                    {submitted ? (
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center"
                        >
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FaCheckCircle className="text-4xl text-green-500" />
                            </div>
                             <h3 className="text-2xl font-bold text-green-800 mb-2">Hare Krishna! Application Received.</h3>
                             <p className="text-green-600 mb-6">Your application has been recorded. To support the mission immediately, you can complete the membership payment online.</p>
                             <a 
                                href={PAYMENT_LINK}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 py-4 px-8 bg-orange-500 text-white rounded-xl font-black shadow-lg hover:shadow-xl hover:bg-orange-600 transition-all text-lg"
                             >
                                <FaCreditCard /> Pay Membership Fee Online
                             </a>
                             <p className="text-gray-400 text-sm mt-4">Our devotees will contact you shortly to issue your membership card.</p>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Full Legal Name</label>
                                    <input
                                        type="text" required
                                        className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all outline-none"
                                        placeholder="e.g. Rahul Sharma"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Mobile Number</label>
                                    <input
                                        type="tel" required
                                        className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all outline-none"
                                        placeholder="+91"
                                        value={formData.phone}
                                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                                <input
                                    type="email" required
                                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all outline-none"
                                    placeholder="your@email.com"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>

                             <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Selected Membership Tier</label>
                                <select
                                    className="w-full px-5 py-4 bg-white border-2 border-orange-200 text-orange-800 font-black rounded-xl focus:ring-2 focus:ring-orange-500 transition-all outline-none"
                                    value={formData.membershipLevelId}
                                    onChange={e => {
                                        const level = membershipLevels.find(l => l._id === e.target.value);
                                        setFormData({ 
                                            ...formData, 
                                            membershipLevelId: e.target.value,
                                            membershipLevelName: level?.title || ''
                                        });
                                    }}
                                >
                                    {membershipLevels.map(l => (
                                        <option key={l._id} value={l._id}>{l.title} — ₹{l.price.toLocaleString()}</option>
                                    ))}
                                </select>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-black transform hover:-translate-y-1 transition-all shadow-lg disabled:opacity-70 disabled:transform-none"
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center gap-2">Processing...</span>
                                ) : (
                                    <>Submit Application <FaPaperPlane /></>
                                )}
                            </button>
                            <p className="text-center text-xs text-gray-400 mt-4">
                                By submitting this form, you agree to ISKCON Durgapur's privacy policy and membership terms.
                            </p>
                        </form>
                    )}
                </div>
            </div>
        </main>
    );
}
