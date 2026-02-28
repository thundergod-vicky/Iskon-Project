'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaPlus, FaEdit, FaEye, FaSearch, FaArrowLeft } from 'react-icons/fa';

// Sample temple data - in a real application, this would come from an API
const sampleTemples = [
  {
    id: '1',
    name: 'ISKCON Bangalore',
    location: 'Bangalore, Karnataka',
    country: 'India',
    image: '/images/iskcon-bangalore.jpg'
  },
  {
    id: '2',
    name: 'ISKCON Mayapur',
    location: 'Mayapur, West Bengal',
    country: 'India',
    image: '/images/iskcon-mayapur.jpg'
  },
  {
    id: '3',
    name: 'ISKCON London',
    location: 'London',
    country: 'United Kingdom',
    image: '/images/iskcon-london.jpg'
  },
  {
    id: '4',
    name: 'ISKCON New York',
    location: 'Brooklyn, New York',
    country: 'United States',
    image: '/images/iskcon-newyork.jpg'
  },
  {
    id: '5',
    name: 'ISKCON Delhi',
    location: 'New Delhi',
    country: 'India',
    image: '/images/iskcon-delhi.jpg'
  }
];

import { useAuth } from '@/context/auth/AuthContext';

export default function TemplesList() {
  const router = useRouter();
  const { user, loading: authLoading, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [temples, setTemples] = useState(sampleTemples);
  const [filteredTemples, setFilteredTemples] = useState(sampleTemples);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated) {
        router.push('/admin/login');
      } else {
        fetchTemples();
      }
    }
  }, [authLoading, isAuthenticated, router]);

  const fetchTemples = async () => {
    setIsLoading(true);
    
    try {
      // In a real application, this would be an API call
      // For now, we'll simulate it with the sample data
      setTemples(sampleTemples);
      setFilteredTemples(sampleTemples);
      setIsLoading(false);
    } catch (err) {
      console.error('Error fetching temples:', err);
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value === '') {
      setFilteredTemples(temples);
      return;
    }
    
    const filtered = temples.filter(temple => 
      temple.name.toLowerCase().includes(value.toLowerCase()) ||
      temple.location.toLowerCase().includes(value.toLowerCase()) ||
      temple.country.toLowerCase().includes(value.toLowerCase())
    );
    
    setFilteredTemples(filtered);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-t-4 border-iskcon-orange border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 pt-24 md:p-8 md:pt-32">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center">
            <Link href="/admin" className="mr-4 p-2 bg-white rounded-full shadow hover:bg-gray-50 text-gray-600">
              <FaArrowLeft />
            </Link>
            <h1 className="text-3xl font-bold text-gray-800">Manage Temples</h1>
          </div>
          <Link href="/admin/temples/add">
            <button className="flex items-center px-6 py-3 bg-iskcon-orange text-white rounded-lg shadow hover:bg-iskcon-orange/90 transition">
              <FaPlus className="mr-2" /> Add New Temple
            </button>
          </Link>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          {/* Search Bar */}
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <div className="relative max-w-lg">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-iskcon-orange focus:border-iskcon-orange sm:text-sm transition-shadow"
                placeholder="Search temples by name, location, or country..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>

          {/* Temples Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left font-semibold text-gray-700">
                    Temple
                  </th>
                  <th scope="col" className="px-6 py-4 text-left font-semibold text-gray-700">
                    Location
                  </th>
                  <th scope="col" className="px-6 py-4 text-left font-semibold text-gray-700">
                    Country
                  </th>
                  <th scope="col" className="px-6 py-4 text-right font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTemples.length > 0 ? (
                  filteredTemples.map((temple) => (
                    <tr key={temple.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-12 w-12 flex-shrink-0 bg-gray-200 rounded-lg overflow-hidden border border-gray-100">
                            <img
                              className="h-full w-full object-cover"
                              src={temple.image || '/images/temple-placeholder.jpg'}
                              alt={temple.name}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-bold text-gray-900">{temple.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-700 flex items-center">
                          <svg className="w-4 h-4 mr-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path></svg>
                          {temple.location}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                          {temple.country}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-3">
                          <Link href={`/temples/${temple.id}`} target="_blank">
                            <button className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 p-2 rounded-full transition-colors" title="View details">
                              <FaEye size={18} />
                            </button>
                          </Link>
                          <Link href={`/admin/temples/edit/${temple.id}`}>
                            <button className="text-iskcon-orange hover:text-orange-700 hover:bg-orange-50 p-2 rounded-full transition-colors" title="Edit temple">
                              <FaEdit size={18} />
                            </button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 whitespace-nowrap text-center text-gray-500">
                      <div className="flex justify-center mb-2">
                        <FaSearch size={24} className="text-gray-300" />
                      </div>
                      <p className="text-lg">No temples found</p>
                      <p className="text-sm text-gray-400">Try adjusting your search query</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filteredTemples.length > 0 && (
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Showing <span className="font-semibold text-gray-900">{filteredTemples.length}</span> of <span className="font-semibold text-gray-900">{temples.length}</span> temples
              </div>
              <div className="flex space-x-2">
                <button className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 transition-colors shadow-sm">
                  Previous
                </button>
                <button className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 transition-colors shadow-sm">
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 