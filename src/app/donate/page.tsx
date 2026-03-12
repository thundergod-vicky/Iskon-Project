'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHandHoldingHeart, FaLeaf, FaBookOpen, FaUtensils, FaGopuram, FaCreditCard, FaLock, FaCheckCircle } from 'react-icons/fa';

const donationOptions = [
    {
        id: 'temple',
        name: 'Temple Development',
        description: 'Support the construction, maintenance, and beautification of ISKCON Durgapur.',
        icon: <FaGopuram className="text-3xl" />,
        color: 'from-orange-500 to-amber-500',
        bgLight: 'bg-orange-50',
        border: 'border-orange-200'
    },
    {
        id: 'food',
        name: 'Food For Life',
        description: 'Help provide sanctified vegetarian meals (prasadam) to the needy.',
        icon: <FaUtensils className="text-3xl" />,
        color: 'from-green-500 to-emerald-500',
        bgLight: 'bg-green-50',
        border: 'border-green-200'
    },
    {
        id: 'cow',
        name: 'Cow Protection',
        description: 'Support our Goshala in caring for cows throughout their natural lives.',
        icon: <FaLeaf className="text-3xl" />,
        color: 'from-amber-500 to-yellow-500',
        bgLight: 'bg-amber-50',
        border: 'border-amber-200'
    },
    {
        id: 'books',
        name: 'Vedic Knowledge',
        description: 'Distribute Srila Prabhupada\'s books to spread spiritual wisdom.',
        icon: <FaBookOpen className="text-3xl" />,
        color: 'from-blue-500 to-cyan-500',
        bgLight: 'bg-blue-50',
        border: 'border-blue-200'
    }
];

const presetAmounts = [501, 1001, 2501, 5001, 11000];

export default function DonatePage() {
    const [selectedOption, setSelectedOption] = useState(donationOptions[0]);
    const [amount, setAmount] = useState<number | string>(1001);
    const [isProcessing, setIsProcessing] = useState(false);
    const [step, setStep] = useState(1); // 1 = Amount, 2 = Details, 3 = Success

    const handleNext = (e: React.FormEvent) => {
        e.preventDefault();
        setStep(2);
    };

    const handleProcess = (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            setStep(3);
        }, 2000);
    };

    return (
        <main className="min-h-screen bg-gray-50 pb-20">
            {/* Hero */}
            <section className="relative pt-32 pb-24 overflow-hidden bg-gray-900">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-900/90 to-amber-900/80 mix-blend-multiply" />
                    <img src="/images/gallery/temple-view.jpg" alt="Temple" className="w-full h-full object-cover opacity-30" />
                </div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl mx-auto"
                    >
                        <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-orange-500/20 text-orange-300 text-sm font-bold mb-6 border border-orange-500/30">
                            <FaHandHoldingHeart /> Support the Mission
                        </span>
                        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                            Make a <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400">Divine Offering</span>
                        </h1>
                        <p className="text-xl text-orange-50/90 mb-10 max-w-2xl mx-auto">
                            "In this age of Kali, the only way to attain spiritual perfection is by giving in charity for the service of the Lord."
                        </p>
                    </motion.div>
                </div>
            </section>

            <div className="container mx-auto px-4 -mt-16 relative z-20">
                <div className="max-w-5xl mx-auto bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row">
                    
                    {/* Left: Options */}
                    <div className="w-full md:w-5/12 bg-gray-50 border-r border-gray-100 p-8 lg:p-10">
                        <h2 className="text-xl font-bold text-gray-800 mb-6">Select a Cause</h2>
                        <div className="space-y-4">
                            {donationOptions.map(opt => (
                                <motion.div
                                    key={opt.id}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setSelectedOption(opt)}
                                    className={`cursor-pointer p-4 rounded-2xl border-2 transition-all duration-200 flex items-center gap-4 ${
                                        selectedOption.id === opt.id 
                                            ? `${opt.border} ${opt.bgLight} shadow-sm` 
                                            : 'border-transaprent bg-white hover:border-gray-200'
                                    }`}
                                >
                                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-br ${opt.color} text-white shadow-md`}>
                                        {opt.icon}
                                    </div>
                                    <div>
                                        <h3 className={`font-bold ${selectedOption.id === opt.id ? 'text-gray-900' : 'text-gray-700'}`}>{opt.name}</h3>
                                        <p className="text-xs text-gray-500 line-clamp-1">{opt.description}</p>
                                    </div>
                                    {selectedOption.id === opt.id && (
                                        <FaCheckCircle className="ml-auto text-lg shrink-0 delay-100 ease-out transition-all animate-in zoom-in-50 text-orange-500" />
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Payment Forms */}
                    <div className="w-full md:w-7/12 p-8 lg:p-12 relative min-h-[500px]">
                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="h-full flex flex-col"
                                >
                                    <div>
                                        <h2 className="text-sm font-bold text-orange-500 tracking-wider uppercase mb-1">{selectedOption.name}</h2>
                                        <h3 className="text-3xl font-black text-gray-900 mb-2">Choose Amount</h3>
                                        <p className="text-gray-500 mb-8">{selectedOption.description}</p>
                                    </div>
                                    
                                    <form onSubmit={handleNext} className="flex-1 flex flex-col">
                                        <div className="grid grid-cols-3 gap-3 mb-6">
                                            {presetAmounts.map(val => (
                                                <button
                                                    key={val}
                                                    type="button"
                                                    onClick={() => setAmount(val)}
                                                    className={`py-4 rounded-2xl font-bold transition-all ${
                                                        amount === val 
                                                            ? 'bg-gray-900 text-white shadow-lg' 
                                                            : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-100'
                                                    }`}
                                                >
                                                    ₹{val}
                                                </button>
                                            ))}
                                            <div className="col-span-3 relative mt-2">
                                                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 font-bold">₹</div>
                                                <input
                                                    type="number"
                                                    className="w-full pl-10 pr-6 py-5 bg-white border-2 border-gray-100 rounded-2xl font-bold text-xl text-gray-800 focus:border-orange-500 focus:ring-0 outline-none transition-all shadow-sm"
                                                    placeholder="Custom Amount"
                                                    value={amount}
                                                    onChange={e => setAmount(Number(e.target.value) || '')}
                                                    min="1"
                                                />
                                            </div>
                                        </div>

                                        <button 
                                            type="submit"
                                            disabled={!amount || Number(amount) < 1}
                                            className="mt-auto w-full py-5 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all disabled:opacity-50 disabled:transform-none text-lg flex items-center justify-center gap-2"
                                        >
                                            Proceed to Donate ₹{amount || 0}
                                        </button>
                                    </form>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="h-full flex flex-col"
                                >
                                    <button onClick={() => setStep(1)} className="text-sm font-bold text-gray-400 hover:text-gray-800 mb-6 flex items-center gap-1 transition-colors">
                                        ← Back to amount
                                    </button>
                                    
                                    <h3 className="text-3xl font-black text-gray-900 mb-8">Your Details</h3>
                                    
                                    <form onSubmit={handleProcess} className="flex-1 flex flex-col space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-xs font-bold text-gray-500 uppercase ml-1 mb-1 block">First Name</label>
                                                <input type="text" required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:bg-white transition-all font-medium text-gray-800" />
                                            </div>
                                            <div>
                                                <label className="text-xs font-bold text-gray-500 uppercase ml-1 mb-1 block">Last Name</label>
                                                <input type="text" required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:bg-white transition-all font-medium text-gray-800" />
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <label className="text-xs font-bold text-gray-500 uppercase ml-1 mb-1 block">Email Address</label>
                                            <input type="email" required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:bg-white transition-all font-medium text-gray-800" />
                                        </div>

                                        <div>
                                            <label className="text-xs font-bold text-gray-500 uppercase ml-1 mb-1 block">PAN Number (For 80G Tax Exemption)</label>
                                            <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:bg-white transition-all font-medium text-gray-800 uppercase" placeholder="ABCDE1234F" />
                                        </div>
                                        
                                        <div className="pt-4 mt-auto">
                                            <div className="flex items-center gap-2 mb-4 text-xs font-bold text-gray-400 justify-center">
                                                <FaLock /> 256-bit Secure Checkout
                                            </div>
                                            <button 
                                                type="submit"
                                                disabled={isProcessing}
                                                className="w-full py-5 bg-gray-900 text-white font-black rounded-xl shadow-lg hover:shadow-xl hover:bg-black hover:-translate-y-1 transition-all disabled:opacity-70 disabled:transform-none flex items-center justify-center gap-2"
                                            >
                                                {isProcessing ? (
                                                    <span className="flex items-center gap-2">
                                                        <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                                                        Processing Securely...
                                                    </span>
                                                ) : (
                                                    <>Pay ₹{amount} <FaCreditCard /></>
                                                )}
                                            </button>
                                        </div>
                                    </form>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="h-full flex flex-col items-center justify-center text-center py-10"
                                >
                                    <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center text-5xl mb-6 shadow-inner mx-auto">
                                        <FaCheckCircle />
                                    </div>
                                    <h3 className="text-3xl font-black text-gray-900 mb-2">Donation Successful</h3>
                                    <p className="text-gray-500 mb-8 max-w-sm mx-auto">
                                        Thank you for your generous contribution of ₹{amount} towards {selectedOption.name}. May Lord Krishna bless you eternally!
                                    </p>
                                    <div className="bg-gray-50 rounded-2xl p-6 w-full max-w-sm mb-8">
                                        <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Receipt Number</p>
                                        <p className="text-lg font-mono font-bold text-gray-800 mb-4">TXN-{Math.floor(Math.random() * 1000000000)}</p>
                                        <p className="text-sm text-gray-500">
                                            Your 80G tax exemption receipt has been heavily sent to your email.
                                        </p>
                                    </div>
                                    <button 
                                        onClick={() => { setStep(1); setAmount(1001); }}
                                        className="font-bold text-orange-500 hover:text-orange-600 transition-colors"
                                    >
                                        Make another donation
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Info blocks below */}
                <div className="max-w-5xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-orange-100 flex gap-4">
                        <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center shrink-0 text-xl">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" /></svg>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 mb-1">100% Secure Payments</h4>
                            <p className="text-sm text-gray-500">All transactions are encrypted with 256-bit SSL technology. Your bank details are never stored on our servers.</p>
                        </div>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-teal-100 flex gap-4">
                        <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-xl flex items-center justify-center shrink-0 text-xl">
                            <span className="font-black">80G</span>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 mb-1">Tax Benefits Available</h4>
                            <p className="text-sm text-gray-500">Donations made are eligible for income tax exemption under Section 80G of the Indian Income Tax Act.</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}