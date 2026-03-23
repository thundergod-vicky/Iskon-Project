'use client';

import { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaCheck, FaTimes, FaBook, FaUsers } from 'react-icons/fa';

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('courses'); // 'courses' or 'registrations'
  const [isEditing, setIsEditing] = useState(false);
  const [currentCourse, setCurrentCourse] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    title: '', description: '', price: 0, image: '', duration: '1 Month', active: true
  });
  const [status, setStatus] = useState({ type: '', message: '' });

  useEffect(() => {
    fetchCourses();
    fetchRegistrations();
  }, []);

  const fetchCourses = async () => {
    const res = await fetch('/api/courses');
    if (res.ok) setCourses(await res.json());
  };

  const fetchRegistrations = async () => {
    const res = await fetch('/api/course-registrations');
    if (res.ok) setRegistrations(await res.json());
  };

  const handleInputChange = (e: any) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: 'Saving...' });

    try {
      const url = isEditing ? `/api/courses/${currentCourse._id}` : '/api/courses';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, price: Number(formData.price) })
      });

      if (!res.ok) throw new Error('Failed to save course');

      setStatus({ type: 'success', message: 'Course saved successfully!' });
      setIsEditing(false);
      setCurrentCourse(null);
      setFormData({ title: '', description: '', price: 0, image: '', duration: '1 Month', active: true });
      fetchCourses();
      setTimeout(() => setStatus({ type: '', message: '' }), 3000);
    } catch (err: any) {
      setStatus({ type: 'error', message: err.message });
    }
  };

  const editCourse = (course: any) => {
    setIsEditing(true);
    setCurrentCourse(course);
    setFormData({
      title: course.title,
      description: course.description,
      price: course.price,
      image: course.image,
      duration: course.duration,
      active: course.active
    });
    setActiveTab('form');
  };

  const deleteCourse = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;
    try {
      const res = await fetch(`/api/courses/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      fetchCourses();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="p-8 pt-24 md:pt-32 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <FaBook className="text-iskcon-orange" />
          Manage Courses
        </h1>
        <div className="flex gap-2">
          <button 
            onClick={() => { setActiveTab('courses'); setIsEditing(false); }}
            className={`px-4 py-2 font-bold rounded-lg ${activeTab === 'courses' ? 'bg-iskcon-orange text-white' : 'bg-gray-100 text-gray-600'}`}
          >
            Courses
          </button>
          <button 
            onClick={() => setActiveTab('form')}
            className={`px-4 py-2 font-bold rounded-lg flex items-center gap-2 ${activeTab === 'form' ? 'bg-iskcon-orange text-white' : 'bg-gray-100 text-gray-600'}`}
          >
            <FaPlus /> Add Course
          </button>
          <button 
            onClick={() => setActiveTab('registrations')}
            className={`px-4 py-2 font-bold rounded-lg flex items-center gap-2 ${activeTab === 'registrations' ? 'bg-iskcon-orange text-white' : 'bg-gray-100 text-gray-600'}`}
          >
            <FaUsers /> Registrations
          </button>
        </div>
      </div>

      {status.message && (
        <div className={`p-4 rounded-lg mb-6 flex items-center gap-2 ${
          status.type === 'error' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'
        }`}>
          {status.message}
        </div>
      )}

      {activeTab === 'form' && (
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-100">
          <h2 className="text-xl font-bold mb-6">{isEditing ? 'Edit Course' : 'Add New Course'}</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Course Title *</label>
                <input type="text" name="title" required value={formData.title} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-iskcon-orange" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Image URL *</label>
                <input type="text" name="image" required value={formData.image} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-iskcon-orange" placeholder="/images/placeholder.jpg" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Price (₹) *</label>
                <input type="number" name="price" required value={formData.price} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-iskcon-orange" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Duration *</label>
                <input type="text" name="duration" required value={formData.duration} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-iskcon-orange" placeholder="e.g. 1 Month, 2 Days" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Description *</label>
              <textarea name="description" required value={formData.description} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg h-32 outline-none focus:ring-2 focus:ring-iskcon-orange" />
            </div>
            <div className="flex items-center gap-2 mt-4">
              <input type="checkbox" id="active" name="active" checked={formData.active} onChange={handleInputChange} className="w-4 h-4 text-iskcon-orange rounded" />
              <label htmlFor="active" className="text-sm font-medium text-gray-700">Status Active</label>
            </div>
            <div className="flex gap-4">
              <button type="submit" className="bg-iskcon-orange text-white px-6 py-2 rounded-lg font-bold">
                {isEditing ? 'Update Course' : 'Create Course'}
              </button>
            </div>
          </form>
        </div>
      )}

      {activeTab === 'courses' && (
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-4 font-semibold text-gray-600">Course</th>
                <th className="p-4 font-semibold text-gray-600">Price</th>
                <th className="p-4 font-semibold text-gray-600">Duration</th>
                <th className="p-4 text-right font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course._id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-800">{course.title}</td>
                  <td className="p-4 text-gray-600">₹{course.price}</td>
                  <td className="p-4 text-gray-600">{course.duration}</td>
                  <td className="p-4 text-right">
                    <button onClick={() => editCourse(course)} className="text-blue-500 hover:text-blue-700 p-2 mr-2 bg-blue-50 rounded"><FaEdit /></button>
                    <button onClick={() => deleteCourse(course._id)} className="text-red-500 hover:text-red-700 p-2 bg-red-50 rounded"><FaTrash /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'registrations' && (
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-4 font-semibold text-gray-600">User</th>
                <th className="p-4 font-semibold text-gray-600">Course</th>
                <th className="p-4 font-semibold text-gray-600">Contact</th>
                <th className="p-4 font-semibold text-gray-600 text-center">Payment</th>
                <th className="p-4 font-semibold text-gray-600 text-right">Date</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((reg) => (
                <tr key={reg._id} className="border-b border-gray-50">
                  <td className="p-4 font-medium text-gray-800">{reg.name}</td>
                  <td className="p-4 text-gray-600">{reg.courseId?.title || 'Unknown Course'}</td>
                  <td className="p-4 text-gray-600 max-w-[150px] truncate">{reg.phone}<br/>{reg.email}</td>
                  <td className="p-4 text-center">
                    <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-bold">
                      {reg.paymentStatus}
                    </span>
                  </td>
                  <td className="p-4 text-gray-500 text-sm text-right">
                    {new Date(reg.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
