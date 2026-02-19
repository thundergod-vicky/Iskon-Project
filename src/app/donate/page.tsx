'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FaHandHoldingHeart, FaRegCreditCard, FaPaypal, FaRegQuestionCircle, FaShieldAlt, FaRegCalendarAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface DonationOption {
  id: string;
  name: string;
  description: string;
  amounts: number[];
  image: string;
}

const donationOptions: DonationOption[] = [
  {
    id: 'temple',
    name: 'Temple Development',
    description: 'Support the construction, maintenance, and beautification of ISKCON temples worldwide.',
    amounts: [501, 1001, 2001, 5001, 10001, 21001],
    image: '/images/donations/temple-donation.jpg'
  },
  {
    id: 'food',
    name: 'Food For Life',
    description: 'Help provide prasadam (sanctified vegetarian food) to those in need around the world.',
    amounts: [251, 501, 1001, 2501, 5001, 10001],
    image: '/images/donations/food-donation.jpg'
  },
  {
    id: 'education',
    name: 'Vedic Education',
    description: 'Support Vedic educational programs, schools, and scholarships for students.',
    amounts: [501, 1001, 2001, 5001, 10001, 21001],
    image: '/images/donations/education-donation.jpg'
  },
  {
    id: 'books',
    name: 'Book Distribution',
    description: 'Help distribute Srila Prabhupada\'s books containing timeless Vedic wisdom worldwide.',
    amounts: [251, 501, 1001, 2501, 5001, 10001],
    image: '/images/donations/book-donation.jpg'
  },
  {
    id: 'cow',
    name: 'Cow Protection',
    description: 'Support our cow protection programs that care for cows throughout their natural lives.',
    amounts: [1001, 2001, 5001, 11000, 21001, 51001],
    image: '/images/donations/cow-donation.jpg'
  }
];

export default function DonatePage() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [recurring, setRecurring] = useState<boolean>(false);
  const [donorInfo, setDonorInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    country: '',
    pan: ''
  });
  const [paymentMethod, setPaymentMethod] = useState<string>('card');

  const handleOptionSelect = (id: string) => {
    setSelectedOption(id);
    setSelectedAmount(null);
    setCustomAmount('');
  };

  const handleDonorInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDonorInfo({
      ...donorInfo,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const amount = selectedAmount || (customAmount ? parseInt(customAmount) : 0);
    if (!selectedOption || amount <= 0 || !donorInfo.name || !donorInfo.email) {
      alert('Please fill all required fields');
      return;
    }
    
    // In a real app, you would handle payment processing here
    alert(`Thank you for your ${recurring ? 'recurring' : 'one-time'} donation of ₹${amount} to ${donationOptions.find(opt => opt.id === selectedOption)?.name}!`);
  };

  return (
    <div className="min-h-screen bg-pink-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 md:px-8 text-center bg-gradient-to-r from-orange-500 to-pink-500">
        <div className="absolute inset-0 opacity-20">
          <Image 
            src="/images/krishna-temple.jpg" 
            alt="Temple Background" 
            fill 
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Support the Mission of Lord Krishna</h1>
            <p className="text-lg md:text-xl text-white opacity-90 mb-6">
              Your generous contribution helps spread Krishna consciousness and serve communities worldwide.
            </p>
            <div className="flex justify-center">
              <div className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white text-orange-600 font-semibold shadow-lg">
                <FaHandHoldingHeart className="mr-2" />
                Donate Today
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Donation Options */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Select a Cause</h2>
              <div className="space-y-3">
                {donationOptions.map((option) => (
                  <div 
                    key={option.id}
                    className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                      selectedOption === option.id 
                        ? 'bg-orange-100 border-2 border-orange-500' 
                        : 'bg-gray-50 hover:bg-orange-50 border-2 border-transparent'
                    }`}
                    onClick={() => handleOptionSelect(option.id)}
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 relative overflow-hidden rounded-full mr-3">
                        <Image 
                          src={option.image} 
                          alt={option.name}
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{option.name}</h3>
                        <p className="text-sm text-gray-600 line-clamp-2">{option.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Why Donate?</h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <div className="shrink-0 mt-1 text-orange-500">•</div>
                  <p className="ml-2">Support spiritual knowledge distribution</p>
                </li>
                <li className="flex items-start">
                  <div className="shrink-0 mt-1 text-orange-500">•</div>
                  <p className="ml-2">Help feed millions through Food for Life</p>
                </li>
                <li className="flex items-start">
                  <div className="shrink-0 mt-1 text-orange-500">•</div>
                  <p className="ml-2">Preserve and promote Vedic culture</p>
                </li>
                <li className="flex items-start">
                  <div className="shrink-0 mt-1 text-orange-500">•</div>
                  <p className="ml-2">Support temple construction and maintenance</p>
                </li>
                <li className="flex items-start">
                  <div className="shrink-0 mt-1 text-orange-500">•</div>
                  <p className="ml-2">Contribute to cow protection programs</p>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column - Donation Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <form onSubmit={handleSubmit}>
                {selectedOption && (
                  <>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                      {donationOptions.find(opt => opt.id === selectedOption)?.name}
                    </h2>
                    
                    {/* Amount Selection */}
                    <div className="mb-6">
                      <h3 className="text-lg font-medium text-gray-800 mb-3">Select Amount*</h3>
                      <div className="grid grid-cols-3 gap-3 mb-4">
                        {donationOptions
                          .find(opt => opt.id === selectedOption)
                          ?.amounts.map((amount) => (
                            <button
                              key={amount}
                              type="button"
                              className={`py-2 px-4 rounded-lg border-2 transition-all ${
                                selectedAmount === amount
                                  ? 'border-orange-500 bg-orange-50 text-orange-700 font-medium'
                                  : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50'
                              }`}
                              onClick={() => {
                                setSelectedAmount(amount);
                                setCustomAmount('');
                              }}
                            >
                              ₹{amount}
                            </button>
                          ))}
                      </div>
                      <div className="mt-3">
                        <label className="text-gray-600 text-sm mb-1 block">Custom Amount (₹)</label>
                        <input
                          type="number"
                          placeholder="Enter amount"
                          value={customAmount}
                          onChange={(e) => {
                            setCustomAmount(e.target.value);
                            setSelectedAmount(null);
                          }}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                        />
                      </div>
                    </div>

                    {/* Recurring Option */}
                    <div className="mb-6">
                      <div className="flex items-center mb-3">
                        <input
                          type="checkbox"
                          id="recurring"
                          checked={recurring}
                          onChange={() => setRecurring(!recurring)}
                          className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500"
                        />
                        <label htmlFor="recurring" className="ml-2 text-gray-700 flex items-center">
                          <FaRegCalendarAlt className="mr-1 text-orange-500" />
                          Make this a monthly donation
                        </label>
                      </div>
                      {recurring && (
                        <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                          Your donation will automatically process monthly until canceled. You can cancel anytime by contacting us.
                        </p>
                      )}
                    </div>
                    
                    {/* Donor Information */}
                    <div className="mb-6">
                      <h3 className="text-lg font-medium text-gray-800 mb-3">Personal Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-gray-600 text-sm mb-1 block">Full Name*</label>
                          <input
                            type="text"
                            name="name"
                            value={donorInfo.name}
                            onChange={handleDonorInfoChange}
                            placeholder="Your full name"
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                            required
                          />
                        </div>
                        <div>
                          <label className="text-gray-600 text-sm mb-1 block">Email*</label>
                          <input
                            type="email"
                            name="email"
                            value={donorInfo.email}
                            onChange={handleDonorInfoChange}
                            placeholder="Your email address"
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                            required
                          />
                        </div>
                        <div>
                          <label className="text-gray-600 text-sm mb-1 block">Phone</label>
                          <input
                            type="tel"
                            name="phone"
                            value={donorInfo.phone}
                            onChange={handleDonorInfoChange}
                            placeholder="Your phone number"
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-gray-600 text-sm mb-1 block">Country</label>
                          <input
                            type="text"
                            name="country"
                            value={donorInfo.country}
                            onChange={handleDonorInfoChange}
                            placeholder="Your country"
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="text-gray-600 text-sm mb-1 block">PAN (For tax benefits in India)</label>
                          <input
                            type="text"
                            name="pan"
                            value={donorInfo.pan}
                            onChange={handleDonorInfoChange}
                            placeholder="PAN number (optional)"
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Payment Method */}
                    <div className="mb-6">
                      <h3 className="text-lg font-medium text-gray-800 mb-3">Payment Method</h3>
                      <div className="flex flex-wrap gap-3 mb-4">
                        <button
                          type="button"
                          className={`flex items-center py-2 px-4 rounded-lg border-2 transition-all ${
                            paymentMethod === 'card'
                              ? 'border-orange-500 bg-orange-50 text-orange-700 font-medium'
                              : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50'
                          }`}
                          onClick={() => setPaymentMethod('card')}
                        >
                          <FaRegCreditCard className="mr-2" />
                          Credit/Debit Card
                        </button>
                        <button
                          type="button"
                          className={`flex items-center py-2 px-4 rounded-lg border-2 transition-all ${
                            paymentMethod === 'upi'
                              ? 'border-orange-500 bg-orange-50 text-orange-700 font-medium'
                              : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50'
                          }`}
                          onClick={() => setPaymentMethod('upi')}
                        >
                          <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M21.41 11.41l-8.83-8.83c-0.39-0.39-1.02-0.39-1.41 0l-8.83 8.83c-0.39 0.39-0.39 1.02 0 1.41l8.83 8.83c0.39 0.39 1.02 0.39 1.41 0l8.83-8.83c0.39-0.38 0.39-1.02 0-1.41z" />
                          </svg>
                          UPI
                        </button>
                        <button
                          type="button"
                          className={`flex items-center py-2 px-4 rounded-lg border-2 transition-all ${
                            paymentMethod === 'netbanking'
                              ? 'border-orange-500 bg-orange-50 text-orange-700 font-medium'
                              : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50'
                          }`}
                          onClick={() => setPaymentMethod('netbanking')}
                        >
                          <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M4 10v7h16v-7H4zm8 5.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
                            <path d="M20 6H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm0 12H4v-6h16v6zm0-10H4V8h16v2z"/>
                          </svg>
                          NetBanking
                        </button>
                        <button
                          type="button"
                          className={`flex items-center py-2 px-4 rounded-lg border-2 transition-all ${
                            paymentMethod === 'paytm'
                              ? 'border-orange-500 bg-orange-50 text-orange-700 font-medium'
                              : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50'
                          }`}
                          onClick={() => setPaymentMethod('paytm')}
                        >
                          <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                          </svg>
                          Paytm/PhonePe
                        </button>
                      </div>
                      
                      {/* Payment Details based on method */}
                      {paymentMethod === 'card' && (
                        <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                          <p className="text-sm text-gray-600 mb-2">Enter your card details securely.</p>
                        </div>
                      )}
                      
                      {paymentMethod === 'upi' && (
                        <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                          <p className="text-sm text-gray-600">Scan QR code or enter your UPI ID to donate.</p>
                        </div>
                      )}
                      
                      {paymentMethod === 'netbanking' && (
                        <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                          <p className="text-sm text-gray-600">Select your bank to proceed with NetBanking.</p>
                          <div className="grid grid-cols-3 gap-2 mt-3">
                            {['SBI', 'HDFC', 'ICICI', 'Axis', 'PNB', 'Others'].map(bank => (
                              <button 
                                key={bank} 
                                type="button"
                                className="text-xs border border-gray-200 p-2 rounded hover:bg-orange-50"
                              >
                                {bank}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {paymentMethod === 'paytm' && (
                        <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                          <p className="text-sm text-gray-600">You will be redirected to Paytm/PhonePe to complete your payment.</p>
                        </div>
                      )}
                    </div>
                    
                    {/* Submit Button */}
                    <div className="mt-6">
                      <button
                        type="submit"
                        className="w-full py-3 px-4 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-4 focus:ring-orange-300"
                      >
                        Complete Donation
                      </button>
                      <p className="text-xs text-center text-gray-500 mt-2">
                        By donating, you agree to our Terms of Service and Privacy Policy.
                      </p>
                    </div>
                  </>
                )}
                
                {!selectedOption && (
                  <div className="p-10 text-center">
                    <h3 className="text-lg text-gray-600 mb-3">Please select a cause to support</h3>
                    <span className="inline-block animate-bounce bg-orange-100 rounded-full p-3 text-orange-500">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </span>
                  </div>
                )}
              </form>
            </div>
            
            {/* Transparency Section */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <div className="flex items-center mb-4">
                <FaShieldAlt className="text-orange-500 text-xl mr-2" />
                <h2 className="text-xl font-bold text-gray-800">Transparency Promise</h2>
              </div>
              <p className="text-gray-700 mb-4">
                We are committed to complete transparency in our financial operations. All donations are used as specified, with minimal administrative costs.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-orange-50 rounded-lg">
                  <h4 className="font-medium text-orange-700">Annual Reports</h4>
                  <p className="text-sm text-gray-600">Published every year</p>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg">
                  <h4 className="font-medium text-orange-700">Financial Audits</h4>
                  <p className="text-sm text-gray-600">Regular independent reviews</p>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg">
                  <h4 className="font-medium text-orange-700">Project Updates</h4>
                  <p className="text-sm text-gray-600">Regular donor communications</p>
                </div>
              </div>
            </div>
            
            {/* FAQs */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center mb-4">
                <FaRegQuestionCircle className="text-orange-500 text-xl mr-2" />
                <h2 className="text-xl font-bold text-gray-800">Frequently Asked Questions</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Are my donations tax-deductible?</h3>
                  <p className="text-gray-700 text-sm">Yes, ISKCON is a registered non-profit organization. Donations are tax-deductible as allowed by law in many countries.</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">How will my donation be used?</h3>
                  <p className="text-gray-700 text-sm">Your donation will be used for the specific cause you select. We provide regular updates on our projects and initiatives.</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Can I make an anonymous donation?</h3>
                  <p className="text-gray-700 text-sm">Yes, you can choose to remain anonymous during the donation process.</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">How do I cancel my recurring donation?</h3>
                  <p className="text-gray-700 text-sm">You can cancel your recurring donation at any time by contacting our donor support team.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Contact Section */}
      <section className="bg-orange-100 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Need Help With Your Donation?</h2>
          <p className="text-gray-700 mb-6">
            Our dedicated support team is here to assist you with any questions about donations.
          </p>
          <div className="inline-flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a href="mailto:donate@iskcon.org.in" className="px-6 py-3 bg-white text-orange-600 rounded-lg shadow-md hover:bg-orange-50 transition-colors">
              donate@iskcon.org.in
            </a>
            <a href="tel:+911234567890" className="px-6 py-3 bg-white text-orange-600 rounded-lg shadow-md hover:bg-orange-50 transition-colors">
              +91 (1234) 567-890
            </a>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Tax Benefits for Indian Donors</h3>
            <p className="text-gray-600 mb-4">
              Contributions to ISKCON qualify for tax exemption under Section 80G of the Income Tax Act, 1961. 
              You will receive a donation receipt that can be used for claiming tax benefits.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="bg-gray-50 p-3 rounded border border-gray-200">
                <p className="font-medium text-gray-800">80G Registration No:</p>
                <p className="text-gray-600">AAAT10384G/80G/2019-20/A/10010</p>
              </div>
              <div className="bg-gray-50 p-3 rounded border border-gray-200">
                <p className="font-medium text-gray-800">PAN:</p>
                <p className="text-gray-600">AAAT10384G</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 