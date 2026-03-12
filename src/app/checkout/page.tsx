'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLock, FaCreditCard, FaMobileAlt, FaUniversity, FaCheckCircle, FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

const CheckoutPage = () => {
  const { cartItems, totalPrice, clearCart } = useCart();
  const [isOrdered, setIsOrdered] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOrdered(true);
    setTimeout(() => {
      clearCart();
    }, 2000);
  };

  if (isOrdered) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center px-4 bg-gray-50">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white p-10 rounded-3xl shadow-2xl text-center border-t-8 border-green-500"
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 10, stiffness: 100, delay: 0.2 }}
            className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 text-5xl"
          >
            <FaCheckCircle />
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Jai Sri Krishna!</h1>
          <p className="text-gray-600 mb-8">
            Your order has been placed successfully. Thank you for supporting ISKCON Devotional Store.
          </p>
          <Link 
            href="/store"
            className="inline-block bg-purple-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-purple-700 transition-colors"
          >
            Return to Store
          </Link>
        </motion.div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center px-4 bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <Link href="/store" className="text-purple-600 font-bold hover:underline flex items-center justify-center gap-2">
            <FaArrowLeft /> Back to Store
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/store" className="p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow text-gray-600">
            <FaArrowLeft />
          </Link>
          <h1 className="text-3xl font-bold text-gray-800">Checkout</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contact Information */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
            >
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="w-8 h-8 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center text-sm">1</span>
                Contact Information
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Full Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none" placeholder="John Doe" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Email Address</label>
                  <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none" placeholder="john@example.com" required />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-gray-700">Phone Number</label>
                  <input type="tel" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none" placeholder="+91 98765 43210" required />
                </div>
              </div>
            </motion.div>

            {/* Shipping Address */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
            >
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="w-8 h-8 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center text-sm">2</span>
                Shipping Address
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-gray-700">Address Line 1</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none" placeholder="House No, Street Name" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">City</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none" placeholder="Durgapur" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">State</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none" placeholder="West Bengal" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Postal Code</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none" placeholder="713212" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Country</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none" value="India" readOnly />
                </div>
              </div>
            </motion.div>

            {/* Payment Method */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
            >
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="w-8 h-8 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center text-sm">3</span>
                Payment Method
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {[
                  { id: 'card', name: 'Card', icon: <FaCreditCard /> },
                  { id: 'upi', name: 'UPI', icon: <FaMobileAlt /> },
                  { id: 'bank', name: 'Net Banking', icon: <FaUniversity /> },
                ].map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`flex items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all ${
                      paymentMethod === method.id 
                      ? 'border-purple-500 bg-purple-50 text-purple-700' 
                      : 'border-gray-100 bg-gray-50 text-gray-500 gray-50 hover:bg-white hover:border-gray-200'
                    }`}
                  >
                    <span className="text-xl">{method.icon}</span>
                    <span className="font-bold">{method.name}</span>
                  </button>
                ))}
              </div>

              {paymentMethod === 'card' && (
                <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Card Number</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none" placeholder="0000 0000 0000 0000" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Expiry Date</label>
                      <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none" placeholder="MM/YY" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">CVV</label>
                      <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none" placeholder="123" />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'upi' && (
                <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">UPI ID</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none" placeholder="username@upi" />
                  </div>
                </div>
              )}

              {paymentMethod === 'bank' && (
                <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Select Bank</label>
                    <select className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none bg-white">
                      <option>State Bank of India</option>
                      <option>HDFC Bank</option>
                      <option>ICICI Bank</option>
                      <option>Axis Bank</option>
                    </select>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Summary Section */}
          <div className="lg:col-span-1">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 sticky top-32"
            >
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden border">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 line-clamp-1">{item.name}</p>
                        <p className="text-gray-500 font-bold">₹{item.price} × {item.quantity}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-6 border-t font-medium">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{totalPrice}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600">FREE</span>
                </div>
                <div className="flex justify-between text-xl font-bold pt-3 border-t text-gray-800">
                  <span>Total</span>
                  <span>₹{totalPrice}</span>
                </div>
              </div>

              <button 
                disabled
                title="we are working on this"
                className="w-full bg-gray-400 text-white py-4 rounded-xl font-bold cursor-not-allowed transition-all mt-8 flex items-center justify-center gap-2 shadow-lg"
              >
                <FaLock className="text-sm opacity-50" />
                Place Order
              </button>
              <p className="text-xs text-center text-gray-500 mt-4 h-5">
                Payments are secure and encrypted
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
