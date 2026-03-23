'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaCheck, FaTimes, FaCalendarAlt } from 'react-icons/fa';

export default function AdminEventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '', date: '', time: '', description: '', active: true
  });
  const [status, setStatus] = useState({ type: '', message: '' });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await fetch('/api/events');
      if (res.ok) {
        const data = await res.json();
        setEvents(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (e: any) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: 'Saving...' });

    try {
      const url = isEditing ? `/api/events/${currentEvent._id}` : '/api/events';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!res.ok) throw new Error('Failed to save event');

      setStatus({ type: 'success', message: 'Event saved successfully!' });
      setIsEditing(false);
      setCurrentEvent(null);
      setFormData({ title: '', date: '', time: '', description: '', active: true });
      fetchEvents();

      setTimeout(() => setStatus({ type: '', message: '' }), 3000);
    } catch (err: any) {
      setStatus({ type: 'error', message: err.message });
    }
  };

  const editEvent = (event: any) => {
    setIsEditing(true);
    setCurrentEvent(event);
    setFormData({
      title: event.title,
      date: new Date(event.date).toISOString().split('T')[0],
      time: event.time,
      description: event.description,
      active: event.active
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const deleteEvent = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    
    try {
      const res = await fetch(`/api/events/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      fetchEvents();
      setStatus({ type: 'success', message: 'Event deleted' });
      setTimeout(() => setStatus({ type: '', message: '' }), 3000);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setCurrentEvent(null);
    setFormData({ title: '', date: '', time: '', description: '', active: true });
  };

  return (
    <div className="p-8 pt-24 md:pt-32 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <FaCalendarAlt className="text-iskcon-orange" />
          Manage Festivals & Events
        </h1>
      </div>

      {status.message && (
        <div className={`p-4 rounded-lg mb-6 flex items-center gap-2 ${
          status.type === 'error' ? 'bg-red-50 text-red-600' :
          status.type === 'success' ? 'bg-green-50 text-green-600' :
          'bg-blue-50 text-blue-600'
        }`}>
          {status.type === 'success' && <FaCheck />}
          {status.type === 'error' && <FaTimes />}
          {status.message}
        </div>
      )}

      {/* Form */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-100">
        <h2 className="text-xl font-bold mb-6">{isEditing ? 'Edit Event' : 'Add New Event'}</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Event Title *</label>
              <input type="text" name="title" required value={formData.title} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-iskcon-orange outline-none" placeholder="e.g. Janmashtami" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Date *</label>
              <input type="date" name="date" required value={formData.date} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-iskcon-orange outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Time *</label>
              <input type="text" name="time" required value={formData.time} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-iskcon-orange outline-none" placeholder="e.g. 4:30 AM or Full Day" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Description *</label>
            <textarea name="description" required value={formData.description} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg h-32 focus:ring-2 focus:ring-iskcon-orange outline-none" placeholder="Event details..." />
          </div>
          <div className="flex items-center gap-2 mt-4">
            <input type="checkbox" id="active" name="active" checked={formData.active} onChange={handleInputChange} className="w-4 h-4 text-iskcon-orange rounded focus:ring-iskcon-orange" />
            <label htmlFor="active" className="text-sm font-medium text-gray-700">Status Active</label>
          </div>

          <div className="flex gap-4">
            <button type="submit" className="flex items-center gap-2 bg-iskcon-orange text-white px-6 py-2 rounded-lg font-bold hover:bg-orange-600 transition-colors">
              {isEditing ? <FaEdit /> : <FaPlus />} {isEditing ? 'Update Event' : 'Add Event'}
            </button>
            {isEditing && (
              <button type="button" onClick={cancelEdit} className="bg-gray-100 text-gray-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-200 transition-colors">
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* List */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="p-4 font-semibold text-gray-600">Title</th>
              <th className="p-4 font-semibold text-gray-600">Date & Time</th>
              <th className="p-4 font-semibold text-gray-600 text-center">Status</th>
              <th className="p-4 text-right font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.length === 0 ? (
              <tr><td colSpan={4} className="p-8 text-center text-gray-500">No events found. Add one above.</td></tr>
            ) : (
              events.map((evt) => (
                <tr key={evt._id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="p-4 font-medium text-gray-800">{evt.title}</td>
                  <td className="p-4 text-gray-600">
                    {new Date(evt.date).toLocaleDateString()} at {evt.time}
                  </td>
                  <td className="p-4 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${evt.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {evt.active ? 'Active' : 'Hidden'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button onClick={() => editEvent(evt)} className="text-blue-500 hover:text-blue-700 p-2 mr-2 bg-blue-50 rounded"><FaEdit /></button>
                    <button onClick={() => deleteEvent(evt._id)} className="text-red-500 hover:text-red-700 p-2 bg-red-50 rounded"><FaTrash /></button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
