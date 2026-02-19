"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaShoppingCart, FaFilter, FaSearch, FaHeart } from 'react-icons/fa';

// Sample product data - in a real app, this would come from an API or database
const products = [
  {
    id: 1,
    name: "108 Tulasi Mala Beads",
    price: 350,
    category: "Spiritual Items",
    image: "/images/store/tulasi-mala.jpg",
    description: "Hand-crafted Tulasi japa mala with protective bead bag",
    rating: 5,
    reviews: 128,
    inStock: true
  },
  {
    id: 2,
    name: "Bhagavad Gita As It Is",
    price: 280,
    category: "Books",
    image: "/images/store/bhagavad-gita.jpg",
    description: "Complete edition with original Sanskrit, English translation, and elaborate purports",
    rating: 5,
    reviews: 256,
    inStock: true
  },
  {
    id: 3,
    name: "Deity Dress Set",
    price: 1500,
    category: "Deity Worship",
    image: "/images/store/deity-dress.jpg",
    description: "Beautiful handcrafted dress set for small deities",
    rating: 4.8,
    reviews: 89,
    inStock: true
  },
  {
    id: 4,
    name: "Pure Sandalwood Incense",
    price: 120,
    category: "Worship Items",
    image: "/images/store/incense.jpg",
    description: "Premium quality sandalwood incense sticks",
    rating: 4.9,
    reviews: 167,
    inStock: true
  },
  {
    id: 5,
    name: "Krishna Art Print",
    price: 450,
    category: "Art",
    image: "/images/store/krishna-art.jpg",
    description: "High-quality print of original Krishna conscious artwork",
    rating: 4.7,
    reviews: 73,
    inStock: true
  },
  {
    id: 6,
    name: "Brass Arati Set",
    price: 2500,
    category: "Worship Items",
    image: "/images/store/arati-set.jpg",
    description: "Complete brass arati set for deity worship",
    rating: 4.9,
    reviews: 92,
    inStock: false
  }
];

const categories = [
  "All Items",
  "Spiritual Items",
  "Books",
  "Deity Worship",
  "Worship Items",
  "Art"
];

const StorePage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Items");
  const [searchQuery, setSearchQuery] = useState("");
  const [cartCount, setCartCount] = useState(0);

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "All Items" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = () => {
    setCartCount(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-900 to-purple-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">ISKCON Devotional Store</h1>
            <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
              Discover our collection of spiritual items, books, and devotional accessories to enhance your Krishna consciousness journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <div className="relative group">
              <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50">
                <FaFilter className="text-gray-500" />
                <span>Filter</span>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`block w-full text-left px-4 py-2 hover:bg-purple-50 ${selectedCategory === category ? 'bg-purple-50 text-purple-700' : 'text-gray-700'
                      }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            <button className="relative flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
              <FaShoppingCart />
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="relative h-48 rounded-t-xl overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                <button className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100">
                  <FaHeart className="text-gray-400 hover:text-red-500" />
                </button>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-800">{product.name}</h3>
                    <p className="text-sm text-gray-500">{product.category}</p>
                  </div>
                  <p className="font-bold text-purple-600">₹{product.price}</p>
                </div>
                <p className="text-sm text-gray-600 mb-4">{product.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(product.rating)
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                            }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-1">({product.reviews})</span>
                  </div>
                  <button
                    onClick={addToCart}
                    disabled={!product.inStock}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${product.inStock
                      ? 'bg-purple-600 text-white hover:bg-purple-700'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                  >
                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Newsletter Section */}
      <section className="bg-purple-900 text-white py-16 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="mb-8 max-w-2xl mx-auto">
            Subscribe to receive updates about new products, special offers, and exclusive discounts.
          </p>
          <form className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 text-purple-900 font-medium px-6 py-3 rounded-lg transition duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default StorePage; 