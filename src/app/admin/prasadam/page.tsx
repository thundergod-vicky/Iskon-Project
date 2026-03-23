'use client';

import { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaCheck, FaUtensils, FaShoppingCart } from 'react-icons/fa';

export default function AdminPrasadamPage() {
  const [items, setItems] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('items'); 
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    name: '', description: '', price: 0, image: '', active: true
  });
  const [status, setStatus] = useState({ type: '', message: '' });

  useEffect(() => {
    fetchItems();
    fetchBookings();
  }, []);

  const fetchItems = async () => {
    const res = await fetch('/api/prasadam');
    if (res.ok) setItems(await res.json());
  };

  const fetchBookings = async () => {
    const res = await fetch('/api/prasadam-bookings');
    if (res.ok) setBookings(await res.json());
  };

  const handleInputChange = (e: any) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: 'Saving...' });

    try {
      const url = isEditing ? `/api/prasadam/${currentItem._id}` : '/api/prasadam';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, price: Number(formData.price) })
      });

      if (!res.ok) throw new Error('Failed to save item');

      setStatus({ type: 'success', message: 'Item saved successfully!' });
      setIsEditing(false);
      setCurrentItem(null);
      setFormData({ name: '', description: '', price: 0, image: '', active: true });
      fetchItems();
      setTimeout(() => setStatus({ type: '', message: '' }), 3000);
    } catch (err: any) {
      setStatus({ type: 'error', message: err.message });
    }
  };

  const editItem = (item: any) => {
    setIsEditing(true);
    setCurrentItem(item);
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price,
      image: item.image,
      active: item.active
    });
    setActiveTab('form');
  };

  const deleteItem = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      const res = await fetch(`/api/prasadam/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      fetchItems();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const updateBookingStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/prasadam-bookings/${id}`, { 
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) fetchBookings();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-8 pt-24 md:pt-32 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <FaUtensils className="text-amber-500" />
          Manage Prasadam
        </h1>
        <div className="flex gap-2">
          <button 
            onClick={() => { setActiveTab('items'); setIsEditing(false); }}
            className={`px-4 py-2 font-bold rounded-lg ${activeTab === 'items' ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-600'}`}
          >
            Menu Items
          </button>
          <button 
            onClick={() => setActiveTab('form')}
            className={`px-4 py-2 font-bold rounded-lg flex items-center gap-2 ${activeTab === 'form' ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-600'}`}
          >
            <FaPlus /> Add Item
          </button>
          <button 
            onClick={() => setActiveTab('bookings')}
            className={`px-4 py-2 font-bold rounded-lg flex items-center gap-2 ${activeTab === 'bookings' ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-600'}`}
          >
            <FaShoppingCart /> Bookings
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
          <h2 className="text-xl font-bold mb-6">{isEditing ? 'Edit Item' : 'Add New Item'}</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Item Name *</label>
                <input type="text" name="name" required value={formData.name} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-amber-500" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Image URL *</label>
                <input type="text" name="image" required value={formData.image} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-amber-500" placeholder="/images/prasadam/mahaprasad.jpg" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Price (₹) *</label>
                <input type="number" name="price" required value={formData.price} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-amber-500" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Description</label>
              <textarea name="description" value={formData.description} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg h-32 outline-none focus:ring-2 focus:ring-amber-500" />
            </div>
            <div className="flex items-center gap-2 mt-4">
              <input type="checkbox" id="active" name="active" checked={formData.active} onChange={handleInputChange} className="w-4 h-4 text-amber-500 rounded" />
              <label htmlFor="active" className="text-sm font-medium text-gray-700">Available (Active)</label>
            </div>
            <div className="flex gap-4">
              <button type="submit" className="bg-amber-500 text-white px-6 py-2 rounded-lg font-bold">
                {isEditing ? 'Update Item' : 'Create Item'}
              </button>
            </div>
          </form>
        </div>
      )}

      {activeTab === 'items' && (
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-4 font-semibold text-gray-600">Item</th>
                <th className="p-4 font-semibold text-gray-600">Price</th>
                <th className="p-4 font-semibold text-gray-600 text-center">Status</th>
                <th className="p-4 text-right font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-800">{item.name}</td>
                  <td className="p-4 text-gray-600">₹{item.price}</td>
                  <td className="p-4 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${item.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {item.active ? 'Available' : 'Unavailable'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button onClick={() => editItem(item)} className="text-blue-500 hover:text-blue-700 p-2 mr-2 bg-blue-50 rounded"><FaEdit /></button>
                    <button onClick={() => deleteItem(item._id)} className="text-red-500 hover:text-red-700 p-2 bg-red-50 rounded"><FaTrash /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'bookings' && (
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-4 font-semibold text-gray-600">Customer</th>
                <th className="p-4 font-semibold text-gray-600">Order Details</th>
                <th className="p-4 font-semibold text-gray-600">Total</th>
                <th className="p-4 font-semibold text-gray-600 text-center">Status</th>
                <th className="p-4 font-semibold text-gray-600 text-right">Date</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id} className="border-b border-gray-50">
                  <td className="p-4 text-gray-800">
                    <div className="font-medium">{booking.name}</div>
                    <div className="text-sm text-gray-500">{booking.phone}</div>
                    {booking.deliveryAddress && <div className="text-xs text-gray-400 max-w-[150px] truncate">{booking.deliveryAddress}</div>}
                  </td>
                  <td className="p-4 text-gray-600 text-sm">
                    {booking.items.map((i: any, idx: number) => (
                      <div key={idx}>{i.quantity}x {i.prasadamItemId?.name || 'Unknown Item'}</div>
                    ))}
                  </td>
                  <td className="p-4 font-bold text-gray-800">
                    ₹{booking.totalAmount}
                  </td>
                  <td className="p-4 text-center">
                    <select 
                      value={booking.status} 
                      onChange={(e) => updateBookingStatus(booking._id, e.target.value)}
                      className="bg-gray-50 border border-gray-200 text-sm rounded-lg outline-none focus:ring-2 focus:ring-amber-500 p-1"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="p-4 text-gray-500 text-sm text-right">
                    {new Date(booking.createdAt).toLocaleDateString()}
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
