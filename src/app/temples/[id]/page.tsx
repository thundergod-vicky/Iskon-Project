'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowLeft, FaPhone, FaEnvelope, FaGlobe, FaClock, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

interface Temple {
  id: number;
  name: string;
  location: string;
  country: string;
  description: string;
  image: string;
  contact: {
    phone: string;
    email: string;
    website: string;
  };
  schedule: {
    arati: string;
    darshan: string;
    classes: string;
  };
}

// Sample temple data (matching TemplesPage)
const sampleTemples: Temple[] = [
  {
    id: 1,
    name: "Sri Sri Radha Krishna Temple",
    location: "Mayapur, West Bengal",
    country: "India",
    description: "The spiritual headquarters of ISKCON, this magnificent temple complex spans 700,000 square feet and is one of the largest temples in India. The Temple of the Vedic Planetarium features breathtaking architecture and spiritual exhibits.",
    image: "/images/iskcon-mayapur.jpg",
    contact: {
      phone: "+91 3472 245 239",
      email: "info@mayapur.com",
      website: "www.mayapur.com"
    },
    schedule: {
      arati: "4:30 AM, 7:15 AM, 12:30 PM, 4:15 PM, 7:00 PM",
      darshan: "7:15 AM to 1:00 PM, 4:00 PM to 8:00 PM",
      classes: "Morning: 7:30 AM, Evening: 5:30 PM"
    }
  },
  {
    id: 2,
    name: "Sri Sri Radha Parthasarathi Mandir",
    location: "New Delhi",
    country: "India",
    description: "One of the largest temple complexes in Delhi, this beautiful temple features stunning architecture and hosts numerous spiritual programs and festivals throughout the year.",
    image: "/images/iskcon-delhi.jpg",
    contact: {
      phone: "+91 11 2647 8992",
      email: "info@iskcondelhi.com",
      website: "www.iskcondelhi.com"
    },
    schedule: {
      arati: "4:30 AM, 7:15 AM, 12:00 PM, 4:15 PM, 7:00 PM",
      darshan: "4:30 AM to 12:30 PM, 4:30 PM to 9:00 PM",
      classes: "Morning: 8:00 AM, Evening: 6:30 PM"
    }
  },
  {
    id: 3,
    name: "ISKCON Temple of Vrindavan",
    location: "Vrindavan, Uttar Pradesh",
    country: "India",
    description: "Located in the sacred land of Lord Krishna's pastimes, this temple is a spiritual haven for devotees. The Krishna Balaram Mandir is famous for its beautiful deities and vibrant festivals.",
    image: "/images/iskcon-vrindavan.jpg",
    contact: {
      phone: "+91 565 254 0021",
      email: "info@iskconvrindavan.com",
      website: "www.iskconvrindavan.com"
    },
    schedule: {
      arati: "4:30 AM, 7:00 AM, 12:30 PM, 4:15 PM, 7:00 PM",
      darshan: "7:15 AM to 11:30 AM, 4:30 PM to 8:30 PM",
      classes: "Morning: 7:30 AM, Evening: 5:30 PM"
    }
  },
  {
    id: 4,
    name: "ISKCON London (Radha-Krishna Temple)",
    location: "London",
    country: "United Kingdom",
    description: "Located in the heart of London, this historical temple was established by Srila Prabhupada and serves as a spiritual and cultural center for thousands of visitors.",
    image: "/images/iskcon-london.jpg",
    contact: {
      phone: "+44 20 7437 3662",
      email: "info@iskconlondon.org",
      website: "www.iskconlondon.org"
    },
    schedule: {
      arati: "4:30 AM, 7:15 AM, 12:30 PM, 4:00 PM, 7:00 PM",
      darshan: "7:30 AM to 1:00 PM, 4:30 PM to 8:30 PM",
      classes: "Morning: 8:00 AM, Evening: 6:30 PM"
    }
  },
  {
    id: 5,
    name: "Sri Sri Radha Gopinath Temple",
    location: "Melbourne",
    country: "Australia",
    description: "A vibrant spiritual community in Melbourne offering a range of programs, festivals, and vegetarian feasts. The temple serves as a cultural hub for the Indian community.",
    image: "/images/iskcon-melbourne.jpg",
    contact: {
      phone: "+61 3 9214 0600",
      email: "info@iskconmelbourne.com.au",
      website: "www.iskconmelbourne.com.au"
    },
    schedule: {
      arati: "5:00 AM, 7:30 AM, 12:00 PM, 4:30 PM, 7:30 PM",
      darshan: "7:30 AM to 1:00 PM, 4:30 PM to 8:30 PM",
      classes: "Morning: 8:00 AM, Evening: 6:00 PM"
    }
  },
  {
    id: 6,
    name: "New Dvaraka Temple",
    location: "Los Angeles, California",
    country: "USA",
    description: "One of the first ISKCON temples in the Western world, established by Srila Prabhupada himself. It features beautiful deities and hosts a famous Sunday Feast program.",
    image: "/images/iskcon-la.jpg",
    contact: {
      phone: "+1 310 836 2676",
      email: "info@iskconla.org",
      website: "www.iskconla.org"
    },
    schedule: {
      arati: "4:30 AM, 7:00 AM, 12:00 PM, 4:00 PM, 7:00 PM",
      darshan: "7:15 AM to 1:00 PM, 4:30 PM to 8:30 PM",
      classes: "Morning: 7:30 AM, Evening: 6:00 PM"
    }
  }
];

export default function PublicTempleDetail() {
  const params = useParams();
  const [temple, setTemple] = useState<Temple | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (params?.id) {
      const id = parseInt(params.id as string);
      const found = sampleTemples.find(t => t.id === id);
      setTemple(found || null);
    }
    setIsLoading(false);
  }, [params]);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 flex justify-center">
        <div className="w-12 h-12 border-4 border-iskcon-orange border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!temple) {
    return (
      <div className="min-h-screen pt-32 text-center">
        <h1 className="text-3xl font-bold mb-4">Temple Not Found</h1>
        <Link href="/temples" className="text-iskcon-orange hover:underline">Back to All Temples</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full pt-20">
        <Image 
          src={temple.image}
          alt={temple.name}
          fill
          className="object-cover brightness-75"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">{temple.name}</h1>
            <div className="flex items-center justify-center text-white text-lg">
              <FaMapMarkerAlt className="mr-2" />
              <span>{temple.location}, {temple.country}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <Link href="/temples" className="inline-flex items-center text-gray-600 hover:text-iskcon-orange mb-8 transition-colors">
            <FaArrowLeft className="mr-2" /> Back to All Temples
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-iskcon-orange inline-block">About the Temple</h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {temple.description}
                </p>
              </section>

              <section className="bg-orange-50 p-8 rounded-3xl border border-orange-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <FaClock className="mr-3 text-iskcon-orange" /> Temple Schedule
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">Arati</h3>
                    <p className="text-gray-600 text-sm whitespace-pre-line">{temple.schedule.arati}</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">Darshan</h3>
                    <p className="text-gray-600 text-sm whitespace-pre-line">{temple.schedule.darshan}</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">Classes</h3>
                    <p className="text-gray-600 text-sm whitespace-pre-line">{temple.schedule.classes}</p>
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <aside className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 sticky top-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Info</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <FaPhone className="mt-1 mr-3 text-iskcon-orange" />
                    <div>
                      <p className="text-sm font-semibold text-gray-800">Phone</p>
                      <p className="text-gray-600">{temple.contact.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FaEnvelope className="mt-1 mr-3 text-iskcon-orange" />
                    <div>
                      <p className="text-sm font-semibold text-gray-800">Email</p>
                      <p className="text-gray-600">{temple.contact.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FaGlobe className="mt-1 mr-3 text-iskcon-orange" />
                    <div>
                      <p className="text-sm font-semibold text-gray-800">Website</p>
                      <a href={`https://${temple.contact.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {temple.contact.website}
                      </a>
                    </div>
                  </div>
                </div>
                <button className="w-full bg-iskcon-orange text-white py-4 rounded-xl font-bold mt-8 shadow-lg shadow-orange-500/30 hover:bg-iskcon-orange/90 transition-all">
                  Support This Temple
                </button>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
