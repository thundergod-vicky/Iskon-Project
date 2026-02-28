'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaPlus, FaEdit, FaTrash, FaSearch, FaArrowLeft, FaCalendarAlt, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { useAuth } from '@/context/auth/AuthContext';

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: string;
  isUpcoming: boolean;
}

export default function AdminEventsPage() {
  const router = useRouter();
  const { loading: authLoading, isAuthenticated } = useAuth();
  
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  
  const d = new Date();
  const dStr = d.toISOString().split('T')[0]; // YYYY-MM-DD
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: dStr,
    time: '18:00',
    location: 'ISKCON Durgapur Temple',
    image: '/images/events-and-festival.jpg',
    isUpcoming: true
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated) {
        router.push('/admin/login');
      } else {
        fetchEvents();
      }
    }
  }, [authLoading, isAuthenticated, router]);

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/events');
      if (!res.ok) throw new Error('Failed to fetch events');
      
      const data = await res.json();
      setEvents(data);
      setFilteredEvents(data);
    } catch (err) {
      console.error(err);
      setError('Failed to load events');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    if (!term) {
      setFilteredEvents(events);
      return;
    }
    
    const filtered = events.filter(evt => 
      evt.title.toLowerCase().includes(term) ||
      evt.location.toLowerCase().includes(term) ||
      evt.description.toLowerCase().includes(term)
    );
    setFilteredEvents(filtered);
  };

  const openModal = (event?: Event) => {
    setError('');
    if (event) {
      setEditingEvent(event);
      // Convert ISO string back to YYYY-MM-DD for the date input
      const dateVal = new Date(event.date).toISOString().split('T')[0];
      setFormData({
        title: event.title,
        description: event.description,
        date: dateVal,
        time: event.time,
        location: event.location,
        image: event.image,
        isUpcoming: event.isUpcoming
      });
    } else {
      setEditingEvent(null);
      setFormData({
        title: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
        time: '18:00',
        location: 'ISKCON Durgapur Temple',
        image: '/images/events-and-festival.jpg',
        isUpcoming: true
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingEvent(null);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError('');

    try {
      const url = editingEvent ? `/api/events/${editingEvent._id}` : '/api/events';
      const method = editingEvent ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to save event');
      }

      await fetchEvents();
      closeModal();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this event? This action cannot be undone.')) {
      return;
    }

    try {
      const res = await fetch(`/api/events/${id}`, { method: 'DELETE' });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to delete event');
      }

      await fetchEvents();
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-16 h-16 border-t-4 border-iskcon-orange border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 pt-24 md:p-8 md:pt-32">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center">
            <Link href="/admin" className="mr-4 p-2 bg-white rounded-full shadow hover:bg-gray-50 text-gray-600 transition-colors">
              <FaArrowLeft />
            </Link>
            <h1 className="text-3xl font-bold text-gray-800">Manage Events</h1>
          </div>
          <button 
            onClick={() => openModal()}
            className="flex items-center px-6 py-3 bg-iskcon-orange text-white rounded-lg shadow hover:bg-iskcon-orange/90 transition"
          >
            <FaPlus className="mr-2" /> Add New Event
          </button>
        </div>

        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <div className="relative max-w-lg">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-iskcon-orange focus:border-iskcon-orange sm:text-sm transition-shadow"
                placeholder="Search events by title, location, or description..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left font-semibold text-gray-700">Event Details</th>
                  <th scope="col" className="px-6 py-4 text-left font-semibold text-gray-700">Date & Time</th>
                  <th scope="col" className="px-6 py-4 text-left font-semibold text-gray-700">Location</th>
                  <th scope="col" className="px-6 py-4 text-right font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredEvents.length > 0 ? (
                  filteredEvents.map((evt) => (
                    <tr key={evt._id} className={`hover:bg-gray-50 transition-colors ${!evt.isUpcoming ? 'opacity-60' : ''}`}>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-14 w-14 flex-shrink-0 bg-gray-200 rounded-lg overflow-hidden border border-gray-100 mr-4">
                            <img src={evt.image} alt={evt.title} className="h-full w-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = '/images/placeholder.jpg'; }} />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-gray-900 flex items-center gap-2">
                              {evt.title}
                              {!evt.isUpcoming && <span className="px-2 py-0.5 text-[10px] bg-red-100 text-red-700 rounded-full font-bold uppercase">Past</span>}
                              {evt.isUpcoming && <span className="px-2 py-0.5 text-[10px] bg-green-100 text-green-700 rounded-full font-bold uppercase">Upcoming</span>}
                            </div>
                            <div className="text-sm text-gray-500 truncate max-w-xs">{evt.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 flex items-center mb-1">
                          <FaCalendarAlt className="w-3 h-3 justify-center text-iskcon-orange mr-2" />
                          {new Date(evt.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <FaClock className="w-3 h-3 justify-center text-gray-400 mr-2" />
                          {evt.time}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-700 flex items-center">
                          <FaMapMarkerAlt className="w-3 h-3 justify-center text-blue-500 mr-2" />
                          <span className="truncate max-w-[200px]">{evt.location}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-3">
                          <button 
                            onClick={() => openModal(evt)} 
                            className="text-iskcon-orange hover:text-orange-700 hover:bg-orange-50 p-2 rounded-full transition-colors" 
                            title="Edit event"
                          >
                            <FaEdit size={18} />
                          </button>
                          <button 
                            onClick={() => handleDelete(evt._id)} 
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-full transition-colors" 
                            title="Delete event"
                          >
                            <FaTrash size={18} />
                          </button>
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
                      <p className="text-lg">No events found</p>
                      <p className="text-sm text-gray-400">Try adjusting your search query, or add a new event.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing <span className="font-semibold text-gray-900">{filteredEvents.length}</span> of <span className="font-semibold text-gray-900">{events.length}</span> events
            </div>
          </div>
        </div>
      </div>

      {/* Modal Tool */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-8 relative">
            <button 
              onClick={closeModal} 
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              {editingEvent ? 'Edit Event' : 'Add New Event'}
            </h2>
            
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
                <input
                  required
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-iskcon-orange focus:border-iskcon-orange"
                  placeholder="e.g. Gaura Purnima Festival"
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                />
              </div>
              
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  required
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-iskcon-orange focus:border-iskcon-orange"
                  placeholder="Details about the event..."
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  required
                  type="date"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-iskcon-orange focus:border-iskcon-orange"
                  value={formData.date}
                  onChange={e => setFormData({...formData, date: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                <input
                  required
                  type="time"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-iskcon-orange focus:border-iskcon-orange"
                  value={formData.time}
                  onChange={e => setFormData({...formData, time: e.target.value})}
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaMapMarkerAlt className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    required
                    type="text"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-iskcon-orange focus:border-iskcon-orange"
                    value={formData.location}
                    onChange={e => setFormData({...formData, location: e.target.value})}
                  />
                </div>
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input
                  required
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-iskcon-orange focus:border-iskcon-orange"
                  placeholder="/images/events/custom.jpg"
                  value={formData.image}
                  onChange={e => setFormData({...formData, image: e.target.value})}
                />
              </div>

              <div className="col-span-2 flex items-center mt-2">
                <input
                  type="checkbox"
                  id="isUpcomingCheckbox"
                  className="w-5 h-5 text-iskcon-orange focus:ring-iskcon-orange border-gray-300 rounded"
                  checked={formData.isUpcoming}
                  onChange={e => setFormData({...formData, isUpcoming: e.target.checked})}
                />
                <label htmlFor="isUpcomingCheckbox" className="ml-3 block text-sm font-medium text-gray-700">
                  This is an upcoming event (mark unchecked for past events)
                </label>
              </div>

              <div className="col-span-2 pt-6 flex justify-end space-x-3 border-t border-gray-100 mt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition"
                  disabled={isSaving}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-iskcon-orange text-white rounded-lg hover:bg-iskcon-orange/90 shadow-md font-medium transition flex items-center"
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                      Saving...
                    </>
                  ) : (
                    editingEvent ? 'Save Changes' : 'Create Event'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
