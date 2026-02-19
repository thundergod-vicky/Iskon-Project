'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaPlus, FaEdit, FaEye, FaSearch } from 'react-icons/fa';

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

export default function TemplesList() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [temples, setTemples] = useState(sampleTemples);
  const [filteredTemples, setFilteredTemples] = useState(sampleTemples);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Check if the user is logged in
    const checkAuth = () => {
      const authToken = localStorage.getItem('iskcon_admin_token');
      if (!authToken) {
        router.push('/admin/login');
        return;
      }
      
      setIsAuthenticated(true);
      fetchTemples();
    };

    checkAuth();
  }, [router]);

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
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Manage Temples</h1>
          <Link href="/admin/temples/add">
            <button className="px-4 py-2 bg-iskcon-orange text-white rounded-md hover:bg-iskcon-orange/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-iskcon-orange flex items-center">
              <FaPlus className="mr-2" /> Add New Temple
            </button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Search Bar */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-iskcon-orange focus:border-iskcon-orange"
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
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Temple
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Country
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTemples.length > 0 ? (
                  filteredTemples.map((temple) => (
                    <tr key={temple.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img
                              className="h-10 w-10 rounded-full object-cover"
                              src={temple.image || '/images/temple-placeholder.jpg'}
                              alt={temple.name}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{temple.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{temple.location}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{temple.country}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <Link href={`/temples/${temple.id}`} target="_blank">
                            <button className="text-blue-600 hover:text-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 p-1">
                              <FaEye />
                            </button>
                          </Link>
                          <Link href={`/admin/temples/edit/${temple.id}`}>
                            <button className="text-iskcon-orange hover:text-iskcon-orange/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-iskcon-orange p-1">
                              <FaEdit />
                            </button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                      No temples found matching your search criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination (simplified for now) */}
          {filteredTemples.length > 0 && (
            <div className="px-4 py-3 border-t border-gray-200 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Showing <span className="font-medium">{filteredTemples.length}</span> of <span className="font-medium">{temples.length}</span> temples
                </div>
                <div className="flex-1 flex justify-end">
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                    Previous
                  </button>
                  <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 