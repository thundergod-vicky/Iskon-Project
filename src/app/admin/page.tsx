'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaUsers, FaCalendarAlt, FaBookOpen, FaImage, FaSignOutAlt, FaHome, FaUtensils, FaHandsHelping, FaAddressCard, FaStar, FaWpforms } from 'react-icons/fa';
import { useAuth } from '@/context/auth/AuthContext';

export default function AdminDashboard() {
  const router = useRouter();
  const { user, loading, logout, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/admin/login');
    }
  }, [loading, isAuthenticated, router]);

  const handleLogout = () => {
    logout();
  };

  if (loading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-t-4 border-iskcon-orange border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-24 md:pt-32">
      {/* Admin Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-800">ISKCON Admin Dashboard</h1>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center text-red-600 hover:text-red-800"
          >
            <FaSignOutAlt className="mr-2" /> Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Welcome to ISKCON Admin Panel</h2>
          <p className="text-gray-600">
            Use this dashboard to manage temple listings, events, and website content. Select a section below to get started.
          </p>
        </div>

        {/* Admin Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {user?.role !== 'prasad_admin' && (
            <>
              {/* Temple Management */}
              <Link href="/admin/temples" className="block">
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300 border-t-4 border-iskcon-orange">
                  <div className="flex items-center text-iskcon-orange mb-4">
                    <FaHome className="text-3xl" />
                    <h3 className="text-xl font-bold ml-4">Temple Management</h3>
                  </div>
                  <p className="text-gray-600">
                    Add, edit, or remove temple listings. Update temple information.
                  </p>
                </div>
              </Link>
              
              {/* User Management */}
              <Link href="/admin/users" className="block">
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300 border-t-4 border-purple-500">
                  <div className="flex items-center text-purple-500 mb-4">
                    <FaUsers className="text-3xl" />
                    <h3 className="text-xl font-bold ml-4">User Management</h3>
                  </div>
                  <p className="text-gray-600">
                    Manage admin users, permissions, and roles.
                  </p>
                </div>
              </Link>

              {/* Event Management */}
              <Link href="/admin/events" className="block">
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300 border-t-4 border-blue-500">
                  <div className="flex items-center text-blue-500 mb-4">
                    <FaCalendarAlt className="text-3xl" />
                    <h3 className="text-xl font-bold ml-4">Event Management</h3>
                  </div>
                  <p className="text-gray-600">
                    Create and manage temple events, festivals, and calendar.
                  </p>
                </div>
              </Link>

              {/* Content Management */}
              <Link href="/admin/content" className="block">
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300 border-t-4 border-green-500">
                  <div className="flex items-center text-green-500 mb-4">
                    <FaBookOpen className="text-3xl" />
                    <h3 className="text-xl font-bold ml-4">Content Management</h3>
                  </div>
                  <p className="text-gray-600">
                    Edit website content, pages, and blog posts.
                  </p>
                </div>
              </Link>
              
              {/* Courses */}
              <Link href="/admin/courses" className="block">
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300 border-t-4 border-indigo-500">
                  <div className="flex items-center text-indigo-500 mb-4">
                    <FaBookOpen className="text-3xl" />
                    <h3 className="text-xl font-bold ml-4">Courses</h3>
                  </div>
                  <p className="text-gray-600">
                    Manage courses and view student registrations.
                  </p>
                </div>
              </Link>

              {/* Retreats */}
              <Link href="/admin/retreats" className="block">
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300 border-t-4 border-pink-500">
                  <div className="flex items-center text-pink-500 mb-4">
                    <FaCalendarAlt className="text-3xl" />
                    <h3 className="text-xl font-bold ml-4">Spiritual Retreats</h3>
                  </div>
                  <p className="text-gray-600">
                    Manage spiritual retreats and tour reservations.
                  </p>
                </div>
              </Link>

              {/* Gallery */}
              <Link href="/admin/gallery" className="block">
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300 border-t-4 border-cyan-500">
                  <div className="flex items-center text-cyan-500 mb-4">
                    <FaImage className="text-3xl" />
                    <h3 className="text-xl font-bold ml-4">Gallery</h3>
                  </div>
                  <p className="text-gray-600">
                    Upload and manage temple gallery photos.
                  </p>
                </div>
              </Link>

              {/* Volunteers */}
              <Link href="/admin/volunteers" className="block">
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300 border-t-4 border-teal-500">
                  <div className="flex items-center text-teal-500 mb-4">
                    <FaHandsHelping className="text-3xl" />
                    <h3 className="text-xl font-bold ml-4">Volunteers</h3>
                  </div>
                  <p className="text-gray-600">
                    View and manage volunteer applications and service areas.
                  </p>
                </div>
              </Link>

              {/* Membership Levels */}
              <Link href="/admin/membership-levels" className="block">
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300 border-t-4 border-orange-500">
                  <div className="flex items-center text-orange-500 mb-4">
                    <FaStar className="text-3xl" />
                    <h3 className="text-xl font-bold ml-4">Membership Levels</h3>
                  </div>
                  <p className="text-gray-600">
                    Edit membership categories, prices, and spiritual benefits.
                  </p>
                </div>
              </Link>

              {/* Membership Requests */}
              <Link href="/admin/membership-requests" className="block">
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300 border-t-4 border-rose-500">
                  <div className="flex items-center text-rose-500 mb-4">
                    <FaAddressCard className="text-3xl" />
                    <h3 className="text-xl font-bold ml-4">Member Requests</h3>
                  </div>
                  <p className="text-gray-600">
                    Approve new members and track membership payments.
                  </p>
                </div>
              </Link>

              {/* Form Builder */}
              <Link href="/admin/forms" className="block">
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300 border-t-4 border-orange-600">
                  <div className="flex items-center text-orange-600 mb-4">
                    <FaWpforms className="text-3xl" />
                    <h3 className="text-xl font-bold ml-4">Form Builder</h3>
                  </div>
                  <p className="text-gray-600">
                    Create custom registration forms (like Google Forms) for temple activities.
                  </p>
                </div>
              </Link>
            </>
          )}

          {/* Prasadam Management (Visible to Both) */}
          <Link href="/admin/prasadam" className="block">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300 border-t-4 border-amber-500">
              <div className="flex items-center text-amber-500 mb-4">
                <FaUtensils className="text-3xl" />
                <h3 className="text-xl font-bold ml-4">Prasadam Management</h3>
              </div>
              <p className="text-gray-600">
                Update the menu, prices, and view prasadam bookings.
              </p>
            </div>
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-500 text-sm">Total Temples</p>
              <p className="text-3xl font-bold text-iskcon-orange">28</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-500 text-sm">Upcoming Events</p>
              <p className="text-3xl font-bold text-blue-500">12</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-500 text-sm">Admin Users</p>
              <p className="text-3xl font-bold text-purple-500">5</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-500 text-sm">Media Files</p>
              <p className="text-3xl font-bold text-yellow-500">143</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 