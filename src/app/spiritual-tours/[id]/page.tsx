'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowLeft, FaMapMarkerAlt, FaCalendarAlt, FaRupeeSign, FaUsers, FaStar, FaPlane, FaBus, FaHotel, FaUtensils, FaClock, FaCheckCircle } from 'react-icons/fa';

interface TourDestination {
  id: string;
  name: string;
  location: string;
  description: string;
  image: string;
  duration: string;
  price: number;
  rating: number;
  groupSize: string;
  dates: string[];
  category: string;
  features: string[];
}

const tourDestinations: TourDestination[] = [
  {
    id: '1',
    name: 'Vrindavan & Mathura Pilgrimage',
    location: 'Uttar Pradesh, India',
    description: 'Explore the divine birthplace of Lord Krishna and the sacred forests where He performed His pastimes. Visit temples like Banke Bihari, ISKCON Vrindavan, Krishna Balaram Mandir, and boat on the Yamuna River.',
    image: '/images/tours/vrindavan.jpg',
    duration: '5 days',
    price: 15000,
    rating: 4.9,
    groupSize: '10-20',
    dates: ['May 15-20, 2023', 'June 10-15, 2023', 'July 5-10, 2023'],
    category: 'Krishna Pastimes',
    features: ['Temple visits', 'Sacred sites', 'Spiritual discourses', 'Prasadam', 'Cultural programs']
  },
  {
    id: '2',
    name: 'Jagannath Puri Yatra',
    location: 'Odisha, India',
    description: 'Experience the ancient city of Lord Jagannath with visits to the magnificent Jagannath Temple, the pristine Puri Beach, and participate in the traditional Rath Yatra if timed accordingly.',
    image: '/images/tours/puri.jpg',
    duration: '6 days',
    price: 18000,
    rating: 4.8,
    groupSize: '15-25',
    dates: ['April 20-26, 2023', 'August 12-18, 2023', 'December 5-11, 2023'],
    category: 'Temple Pilgrimage',
    features: ['Rath Yatra', 'Temple darshan', 'Prasadam', 'Beach meditation', 'Cultural exposure']
  },
  {
    id: '3',
    name: 'Mayapur Spiritual Retreat',
    location: 'West Bengal, India',
    description: 'Visit the world headquarters of ISKCON at Mayapur, the birthplace of Lord Chaitanya Mahaprabhu. Experience the massive Temple of Vedic Planetarium and daily kirtans and aarti ceremonies.',
    image: '/images/tours/mayapur.jpg',
    duration: '7 days',
    price: 20000,
    rating: 4.9,
    groupSize: '20-30',
    dates: ['March 10-17, 2023', 'September 5-12, 2023', 'November 20-27, 2023'],
    category: 'Spiritual Retreat',
    features: ['TOVP tour', 'Ganga arati', 'Spiritual classes', 'Prasadam', 'Kirtan sessions']
  },
  {
    id: '4',
    name: 'Sacred Dwarka & Somnath Journey',
    location: 'Gujarat, India',
    description: 'Visit Dwarka, the kingdom of Lord Krishna, and the revered Somnath Temple. Experience the spiritual ambiance of these ancient sites and learn about their historical significance.',
    image: '/images/tours/dwarka.jpg',
    duration: '8 days',
    price: 25000,
    rating: 4.7,
    groupSize: '15-25',
    dates: ['February 15-23, 2023', 'October 8-16, 2023', 'December 20-28, 2023'],
    category: 'Krishna Pastimes',
    features: ['Temple visits', 'Boat rides', 'Spiritual discourses', 'Local cuisine', 'Beach meditation']
  },
  {
    id: '5',
    name: 'Himalayan Spiritual Trek',
    location: 'Uttarakhand, India',
    description: 'Embark on a spiritual journey through the Himalayas, visiting sacred sites like Badrinath, Kedarnath, and Rishikesh. Experience meditation by the Ganges and visit ancient temples.',
    image: '/images/tours/himalaya.jpg',
    duration: '12 days',
    price: 35000,
    rating: 4.6,
    groupSize: '10-15',
    dates: ['May 1-12, 2023', 'June 15-27, 2023', 'September 10-22, 2023'],
    category: 'Pilgrimage Trek',
    features: ['Temple visits', 'Meditation', 'Yoga sessions', 'Ganga arati', 'Mountain trekking']
  },
  {
    id: '6',
    name: 'South India Temple Tour',
    location: 'Tamil Nadu & Kerala, India',
    description: 'Explore the magnificent temples of South India, including Srirangam, Madurai Meenakshi, and Krishna temples in Kerala. Learn about Dravidian architecture and culture.',
    image: '/images/tours/south-india.jpg',
    duration: '10 days',
    price: 30000,
    rating: 4.8,
    groupSize: '15-20',
    dates: ['January 10-20, 2023', 'July 5-15, 2023', 'November 10-20, 2023'],
    category: 'Temple Pilgrimage',
    features: ['Temple architecture', 'Cultural programs', 'Traditional arts', 'Prasadam', 'Boat house stay']
  }
];

export default function TourDetail() {
  const params = useParams();
  const [tour, setTour] = useState<TourDestination | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (params?.id) {
      const found = tourDestinations.find(t => t.id === params.id);
      setTour(found || null);
    }
    setIsLoading(false);
  }, [params]);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 flex justify-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="min-h-screen pt-32 text-center">
        <h1 className="text-3xl font-bold mb-4">Tour Not Found</h1>
        <Link href="/spiritual-tours" className="text-blue-600 hover:underline">Back to All Tours</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full pt-20">
        <Image 
          src={tour.image}
          alt={tour.name}
          fill
          className="object-cover brightness-75"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-4 text-center">
            <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold mb-4 inline-block">
              {tour.category}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">{tour.name}</h1>
            <div className="flex items-center justify-center text-white text-lg">
              <FaMapMarkerAlt className="mr-2" />
              <span>{tour.location}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <Link href="/spiritual-tours" className="inline-flex items-center text-gray-600 hover:text-blue-600 mb-8 transition-colors">
            <FaArrowLeft className="mr-2" /> Back to All Tours
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-blue-600 inline-block">Journey Overview</h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {tour.description}
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">What's Included</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {tour.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-gray-700">
                      <FaCheckCircle className="text-green-500 mr-3 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                  <div className="flex items-center text-gray-700">
                    <FaHotel className="text-blue-500 mr-3 flex-shrink-0" />
                    <span>Premium Accommodations</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <FaUtensils className="text-amber-500 mr-3 flex-shrink-0" />
                    <span>Pure Vegetarian Prasadam</span>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Dates</h2>
                <div className="flex flex-wrap gap-4">
                  {tour.dates.map((date, index) => (
                    <div key={index} className="bg-blue-50 border border-blue-100 px-6 py-3 rounded-2xl flex items-center">
                      <FaCalendarAlt className="text-blue-600 mr-3" />
                      <span className="text-blue-900 font-medium">{date}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <aside className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 sticky top-24">
                <div className="text-center mb-8">
                  <p className="text-gray-500 text-sm mb-1 uppercase tracking-wider font-bold">Invest in your Soul</p>
                  <h3 className="text-4xl font-black text-gray-900 flex items-center justify-center">
                    <FaRupeeSign size={24} className="mr-1" /> {tour.price.toLocaleString()}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">per person (all inclusive)</p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <div className="flex items-center text-gray-600">
                      <FaClock className="mr-3" />
                      <span>Duration</span>
                    </div>
                    <span className="font-bold text-gray-900">{tour.duration}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <div className="flex items-center text-gray-600">
                      <FaUsers className="mr-3" />
                      <span>Group Size</span>
                    </div>
                    <span className="font-bold text-gray-900">{tour.groupSize} People</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <div className="flex items-center text-gray-600">
                      <FaStar className="mr-3 text-amber-500" />
                      <span>Rating</span>
                    </div>
                    <span className="font-bold text-gray-900">{tour.rating} / 5.0</span>
                  </div>
                </div>

                <button className="w-full bg-blue-600 text-white py-5 rounded-2xl font-bold shadow-xl shadow-blue-500/30 hover:bg-blue-700 transition-all transform hover:-translate-y-1">
                  Book This Journey
                </button>
                <p className="text-center text-gray-400 text-xs mt-4 italic">
                  * Limited seats available for upcoming dates
                </p>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
