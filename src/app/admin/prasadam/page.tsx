'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaPlus, FaEdit, FaTrash, FaCheck, FaTimes, FaRupeeSign, FaImage, FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';

interface PrasadamItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  isVegan: boolean;
  ingredients: string[];
  available: boolean;
}

export default function AdminPrasadamPage() {
  const [items, setItems] = useState<PrasadamItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PrasadamItem | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    image: '',
    category: 'Sweets',
    isVegan: false,
    ingredients: '',
    available: true
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/prasadam');
      if (response.ok) {
        const data = await response.json();
        setItems(data);
      }
    } catch (error) {
      console.error('Failed to fetch items:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (item: PrasadamItem | null = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        name: item.name,
        description: item.description,
        price: item.price,
        image: item.image,
        category: item.category,
        isVegan: item.isVegan,
        ingredients: item.ingredients.join(', '),
        available: item.available
      });
    } else {
      setEditingItem(null);
      setFormData({
        name: '',
        description: '',
        price: 0,
        image: '',
        category: 'Sweets',
        isVegan: false,
        ingredients: '',
        available: true
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingItem ? `/api/prasadam/${editingItem._id}` : '/api/prasadam';
    const method = editingItem ? 'PUT' : 'POST';
    
    const payload = {
      ...formData,
      ingredients: formData.ingredients.split(',').map(i => i.trim()).filter(i => i !== '')
    };

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setIsModalOpen(false);
        fetchItems();
      } else {
        alert('Failed to save item');
      }
    } catch (error) {
      console.error('Save error:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      const response = await fetch(`/api/prasadam/${id}`, { method: 'DELETE' });
      if (response.ok) {
        fetchItems();
      }
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center">
            <Link href="/admin" className="mr-4 p-2 bg-white rounded-full shadow hover:bg-gray-50 text-gray-600">
              <FaArrowLeft />
            </Link>
            <h1 className="text-3xl font-bold text-gray-800">Prasadam Management</h1>
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center px-6 py-3 bg-iskcon-orange text-white rounded-lg shadow hover:bg-iskcon-orange/90 transition"
          >
            <FaPlus className="mr-2" /> Add New Item
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-16 h-16 border-t-4 border-iskcon-orange border-solid rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 font-semibold text-gray-700">Item</th>
                  <th className="px-6 py-4 font-semibold text-gray-700">Category</th>
                  <th className="px-6 py-4 font-semibold text-gray-700">Price</th>
                  <th className="px-6 py-4 font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {items.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gray-200 rounded-lg mr-4 overflow-hidden">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="font-bold text-gray-800">{item.name}</p>
                          <p className="text-sm text-gray-500 truncate max-w-xs">{item.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{item.category}</td>
                    <td className="px-6 py-4 font-medium text-iskcon-orange">
                      ₹{item.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      {item.available ? (
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase tracking-wider">Available</span>
                      ) : (
                        <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold uppercase tracking-wider">Out of Stock</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <button onClick={() => handleOpenModal(item)} className="text-blue-500 hover:text-blue-700"><FaEdit size={18} /></button>
                        <button onClick={() => handleDelete(item._id)} className="text-red-500 hover:text-red-700"><FaTrash size={18} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Tool */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-8 relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <FaTimes size={24} />
            </button>
            <h2 className="text-2xl font-bold mb-6">{editingItem ? 'Edit Prasadam Item' : 'Add New Prasadam Item'}</h2>
            
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
                <input
                  required
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-iskcon-orange"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  required
                  rows={3}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-iskcon-orange"
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                <input
                  required
                  type="number"
                  step="0.01"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-iskcon-orange"
                  value={formData.price}
                  onChange={e => setFormData({...formData, price: parseFloat(e.target.value)})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-iskcon-orange"
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value})}
                >
                  <option>Sweets</option>
                  <option>Savory</option>
                  <option>Condiments</option>
                  <option>Main Course</option>
                  <option>Drinks</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input
                  required
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-iskcon-orange"
                  placeholder="/images/prasadam/custom.jpg"
                  value={formData.image}
                  onChange={e => setFormData({...formData, image: e.target.value})}
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Ingredients (comma separated)</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-iskcon-orange"
                  value={formData.ingredients}
                  onChange={e => setFormData({...formData, ingredients: e.target.value})}
                />
              </div>
              <div className="flex items-center space-x-6 py-2">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-iskcon-orange rounded"
                    checked={formData.isVegan}
                    onChange={e => setFormData({...formData, isVegan: e.target.checked})}
                  />
                  <span className="ml-2 text-sm text-gray-700">Vegan</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-green-600 rounded"
                    checked={formData.available}
                    onChange={e => setFormData({...formData, available: e.target.checked})}
                  />
                  <span className="ml-2 text-sm text-gray-700">Available</span>
                </label>
              </div>
              <div className="col-span-2 pt-4 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 border rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-iskcon-orange text-white rounded-lg hover:bg-iskcon-orange/90 shadow-lg transition"
                >
                  {editingItem ? 'Save Changes' : 'Add Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
