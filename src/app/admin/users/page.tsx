'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaPlus, FaEdit, FaTrash, FaSearch, FaArrowLeft, FaShieldAlt, FaUser } from 'react-icons/fa';
import { useAuth } from '@/context/auth/AuthContext';

interface User {
  _id: string;
  fullName: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: string;
}

export default function AdminUsersPage() {
  const router = useRouter();
  const { loading: authLoading, isAuthenticated } = useAuth();
  
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: 'user' as 'admin' | 'user'
  });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated) {
        router.push('/admin/login');
      } else {
        fetchUsers();
      }
    }
  }, [authLoading, isAuthenticated, router]);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/users');
      if (!res.ok) throw new Error('Failed to fetch users');
      
      const data = await res.json();
      setUsers(data);
      setFilteredUsers(data);
    } catch (err) {
      console.error(err);
      setError('Failed to load users');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    if (!term) {
      setFilteredUsers(users);
      return;
    }
    
    const filtered = users.filter(user => 
      user.fullName.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term) ||
      user.role.toLowerCase().includes(term)
    );
    setFilteredUsers(filtered);
  };

  const openModal = (user?: User) => {
    setError('');
    if (user) {
      setEditingUser(user);
      setFormData({
        fullName: user.fullName,
        email: user.email,
        password: '', // Don't populate password on edit
        role: user.role
      });
    } else {
      setEditingUser(null);
      setFormData({
        fullName: '',
        email: '',
        password: '',
        role: 'user'
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError('');

    try {
      const url = editingUser ? `/api/users/${editingUser._id}` : '/api/users';
      const method = editingUser ? 'PUT' : 'POST';
      
      // On edit, if password is empty, don't send it to preserve existing password
      const payload = { ...formData };
      if (editingUser && !payload.password) {
        delete (payload as any).password;
      }

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to save user');
      }

      await fetchUsers();
      closeModal();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string, role: string) => {
    if (role === 'admin') {
      const adminCount = users.filter(u => u.role === 'admin').length;
      if (adminCount <= 1) {
        alert('Cannot delete the only remaining admin account.');
        return;
      }
    }

    if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return;
    }

    try {
      const res = await fetch(`/api/users/${id}`, { method: 'DELETE' });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to delete user');
      }

      await fetchUsers();
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
        {/* Header section matching Temples/Prasadam */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center">
            <Link href="/admin" className="mr-4 p-2 bg-white rounded-full shadow hover:bg-gray-50 text-gray-600 transition-colors">
              <FaArrowLeft />
            </Link>
            <h1 className="text-3xl font-bold text-gray-800">Manage Users</h1>
          </div>
          <button 
            onClick={() => openModal()}
            className="flex items-center px-6 py-3 bg-iskcon-orange text-white rounded-lg shadow hover:bg-iskcon-orange/90 transition"
          >
            <FaPlus className="mr-2" /> Add New User
          </button>
        </div>

        {/* Main Content Card */}
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
                placeholder="Search users by name, email, or role..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>

          {/* Users Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left font-semibold text-gray-700">User</th>
                  <th scope="col" className="px-6 py-4 text-left font-semibold text-gray-700">Role</th>
                  <th scope="col" className="px-6 py-4 text-left font-semibold text-gray-700">Joined Date</th>
                  <th scope="col" className="px-6 py-4 text-right font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`h-10 w-10 flex-shrink-0 rounded-full flex items-center justify-center text-white ${user.role === 'admin' ? 'bg-indigo-500' : 'bg-green-500'}`}>
                            {user.role === 'admin' ? <FaShieldAlt size={18} /> : <FaUser size={18} />}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-bold text-gray-900">{user.fullName}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${
                          user.role === 'admin' 
                            ? 'bg-indigo-50 text-indigo-700 border-indigo-200' 
                            : 'bg-green-50 text-green-700 border-green-200'
                        }`}>
                          {user.role.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-3">
                          <button 
                            onClick={() => openModal(user)} 
                            className="text-iskcon-orange hover:text-orange-700 hover:bg-orange-50 p-2 rounded-full transition-colors" 
                            title="Edit user"
                          >
                            <FaEdit size={18} />
                          </button>
                          <button 
                            onClick={() => handleDelete(user._id, user.role)} 
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-full transition-colors" 
                            title="Delete user"
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
                      <p className="text-lg">No users found</p>
                      <p className="text-sm text-gray-400">Try adjusting your search query</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing <span className="font-semibold text-gray-900">{filteredUsers.length}</span> of <span className="font-semibold text-gray-900">{users.length}</span> users
            </div>
          </div>
        </div>
      </div>

      {/* Modal Tool */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-8 relative">
            <button 
              onClick={closeModal} 
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              {editingUser ? 'Edit User' : 'Add New User'}
            </h2>
            
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  required
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-iskcon-orange focus:border-iskcon-orange"
                  value={formData.fullName}
                  onChange={e => setFormData({...formData, fullName: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  required
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-iskcon-orange focus:border-iskcon-orange"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password {editingUser && <span className="text-gray-400 font-normal">(Leave blank to keep unchanged)</span>}
                </label>
                <input
                  required={!editingUser}
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-iskcon-orange focus:border-iskcon-orange"
                  value={formData.password}
                  onChange={e => setFormData({...formData, password: e.target.value})}
                  placeholder={editingUser ? "••••••••" : "Enter a strong password"}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-iskcon-orange focus:border-iskcon-orange bg-white"
                  value={formData.role}
                  onChange={e => setFormData({...formData, role: e.target.value as 'admin' | 'user'})}
                >
                  <option value="user">User</option>
                  <option value="admin">Administrator</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Administrators have full access to manage content. Users can only log in.
                </p>
              </div>

              <div className="pt-6 flex justify-end space-x-3">
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
                    editingUser ? 'Save Changes' : 'Create User'
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
