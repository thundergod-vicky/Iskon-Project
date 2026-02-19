'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaUsers, FaCalendarAlt, FaBookOpen, FaImage, FaSignOutAlt, FaHome } from 'react-icons/fa';

import { useAuth } from '@/context/auth/AuthContext';

export default function AdminDashboard() {
  const router = useRouter();
  const { user, loading, logout } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin/login');
    }
  }, [user, loading, router]);

  const handleLogout = () => {
    logout();
  };

  if (loading || !user) {
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
          {/* Temple Management */}
          <Link href="/admin/temples" className="block">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300 border-t-4 border-iskcon-orange">
              <div className="flex items-center text-iskcon-orange mb-4">
                <FaHome className="text-3xl" />
                <h3 className="text-xl font-bold ml-4">Temple Management</h3>
              </div>
              <p className="text-gray-600">
                Add, edit, or remove temple listings. Update temple information, schedules, and contact details.
              </p>
              <div className="mt-4 flex justify-end">
                <span className="text-iskcon-orange hover:underline">Manage temples →</span>
              </div>
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
                Manage admin users, permissions, and roles. Control who has access to the administrative functions.
              </p>
              <div className="mt-4 flex justify-end">
                <span className="text-purple-500 hover:underline">Manage users →</span>
              </div>
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
                Create and manage temple events, festivals, and programs. Set dates, locations, and event details.
              </p>
              <div className="mt-4 flex justify-end">
                <span className="text-blue-500 hover:underline">Manage events →</span>
              </div>
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
                Edit website content, pages, and blog posts. Update philosophical texts and spiritual resources.
              </p>
              <div className="mt-4 flex justify-end">
                <span className="text-green-500 hover:underline">Manage content →</span>
              </div>
            </div>
          </Link>

          {/* Media Library */}
          <Link href="/admin/media" className="block">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300 border-t-4 border-yellow-500">
              <div className="flex items-center text-yellow-500 mb-4">
                <FaImage className="text-3xl" />
                <h3 className="text-xl font-bold ml-4">Media Library</h3>
              </div>
              <p className="text-gray-600">
                Upload and manage images, videos, and audio files. Organize media content for use across the website.
              </p>
              <div className="mt-4 flex justify-end">
                <span className="text-yellow-500 hover:underline">Manage media →</span>
              </div>
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