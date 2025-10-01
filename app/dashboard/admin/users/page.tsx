"use client";


import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const dynamic = 'force-dynamic';

interface User {
  id: string;
  email: string;
  name?: string;
  role: string;
  isActive: boolean;
  emailVerified: boolean;
  createdAt: string;
  lastLoginAt?: string;
}

export default function UsersManagementPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // New user form state
  const [newUser, setNewUser] = useState({
    email: '',
    name: '',
    password: '',
    role: 'USER',
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (session && session.user.role !== 'ADMIN') {
      router.push("/dashboard");
    }
  }, [status, session, router]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/dashboard/admin/users');
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user.role === 'ADMIN') {
      fetchUsers();
    }
  }, [session]);

  const toggleUserStatus = async (userId: string, isActive: boolean) => {
    try {
      const response = await fetch(`/api/dashboard/admin/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isActive: !isActive }),
      });

      if (response.ok) {
        setUsers(users.map(user =>
          user.id === userId ? { ...user, isActive: !isActive } : user
        ));
      }
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  const createUser = async () => {
    try {
      const response = await fetch('/api/dashboard/admin/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        const createdUser = await response.json();
        setUsers([createdUser, ...users]);
        setShowCreateModal(false);
        setNewUser({ email: '', name: '', password: '', role: 'USER' });
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'ADMIN': return '#C3A355';
      case 'WRITER': return '#4A8E55';
      case 'SALES': return '#22D3EE';
      default: return '#8A94A6';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#121417' }}>
        <div className="text-white">Loading users...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#121417' }}>
      {/* Header */}
      <header className="p-6 border-b" style={{ borderColor: 'rgba(195, 163, 85, 0.2)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <button
                onClick={() => router.push('/dashboard')}
                className="text-sm mb-2 hover:opacity-80 transition-opacity"
                style={{ color: '#8A94A6' }}
              >
                ← Back to Dashboard
              </button>
              <h1 className="text-3xl font-light tracking-wider" style={{ color: '#E8ECEF' }}>
                User Management
              </h1>
              <p className="text-sm mt-1" style={{ color: '#8A94A6' }}>
                Manage system users and permissions
              </p>
            </div>

            <button
              onClick={() => setShowCreateModal(true)}
              className="px-6 py-3 rounded-lg font-light transition-all duration-300 hover:opacity-80"
              style={{
                background: 'linear-gradient(135deg, #C3A355 0%, #4A8E55 100%)',
                color: '#121417',
              }}
            >
              Add New User
            </button>
          </div>

          {/* Search */}
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 rounded-lg w-full max-w-md"
            style={{
              background: 'rgba(42, 46, 53, 0.8)',
              border: '1px solid rgba(195, 163, 85, 0.2)',
              color: '#E8ECEF',
            }}
          />
        </div>
      </header>

      {/* Users Table */}
      <main className="p-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(42, 46, 53, 0.8) 0%, rgba(42, 46, 53, 0.4) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(195, 163, 85, 0.2)',
            }}
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(195, 163, 85, 0.2)' }}>
                    <th className="text-left p-4 text-sm font-light" style={{ color: '#8A94A6' }}>
                      User
                    </th>
                    <th className="text-left p-4 text-sm font-light" style={{ color: '#8A94A6' }}>
                      Role
                    </th>
                    <th className="text-left p-4 text-sm font-light" style={{ color: '#8A94A6' }}>
                      Status
                    </th>
                    <th className="text-left p-4 text-sm font-light" style={{ color: '#8A94A6' }}>
                      Verified
                    </th>
                    <th className="text-left p-4 text-sm font-light" style={{ color: '#8A94A6' }}>
                      Last Login
                    </th>
                    <th className="text-left p-4 text-sm font-light" style={{ color: '#8A94A6' }}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <motion.tr
                      key={user.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      style={{ borderBottom: '1px solid rgba(195, 163, 85, 0.1)' }}
                      className="hover:bg-black/20 transition-colors"
                    >
                      <td className="p-4">
                        <div>
                          <div className="font-light" style={{ color: '#E8ECEF' }}>
                            {user.name || 'Unnamed User'}
                          </div>
                          <div className="text-sm" style={{ color: '#8A94A6' }}>
                            {user.email}
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span
                          className="px-3 py-1 rounded-full text-xs font-light"
                          style={{
                            background: `${getRoleColor(user.role)}20`,
                            color: getRoleColor(user.role),
                            border: `1px solid ${getRoleColor(user.role)}40`,
                          }}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => toggleUserStatus(user.id, user.isActive)}
                          className={`px-3 py-1 rounded-full text-xs transition-all ${
                            user.isActive
                              ? 'bg-green-500/20 text-green-500 border border-green-500/40'
                              : 'bg-red-500/20 text-red-500 border border-red-500/40'
                          }`}
                        >
                          {user.isActive ? 'Active' : 'Inactive'}
                        </button>
                      </td>
                      <td className="p-4">
                        {user.emailVerified ? (
                          <span className="text-green-500">✓</span>
                        ) : (
                          <span className="text-yellow-500">✗</span>
                        )}
                      </td>
                      <td className="p-4 text-sm" style={{ color: '#8A94A6' }}>
                        {user.lastLoginAt
                          ? new Date(user.lastLoginAt).toLocaleDateString()
                          : 'Never'}
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => router.push(`/dashboard/admin/users/${user.id}`)}
                            className="p-2 rounded hover:bg-black/20 transition-colors"
                            title="Edit User"
                          >
                            <svg className="w-4 h-4" style={{ color: '#C3A355' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4"
          >
            <div className="p-4 rounded-lg" style={{ background: 'rgba(42, 46, 53, 0.8)', border: '1px solid rgba(195, 163, 85, 0.2)' }}>
              <div className="text-2xl font-light" style={{ color: '#C3A355' }}>
                {users.filter(u => u.role === 'ADMIN').length}
              </div>
              <div className="text-sm" style={{ color: '#8A94A6' }}>Administrators</div>
            </div>
            <div className="p-4 rounded-lg" style={{ background: 'rgba(42, 46, 53, 0.8)', border: '1px solid rgba(74, 142, 85, 0.2)' }}>
              <div className="text-2xl font-light" style={{ color: '#4A8E55' }}>
                {users.filter(u => u.role === 'WRITER').length}
              </div>
              <div className="text-sm" style={{ color: '#8A94A6' }}>Writers</div>
            </div>
            <div className="p-4 rounded-lg" style={{ background: 'rgba(42, 46, 53, 0.8)', border: '1px solid rgba(34, 211, 238, 0.2)' }}>
              <div className="text-2xl font-light" style={{ color: '#22D3EE' }}>
                {users.filter(u => u.role === 'SALES').length}
              </div>
              <div className="text-sm" style={{ color: '#8A94A6' }}>Sales Team</div>
            </div>
            <div className="p-4 rounded-lg" style={{ background: 'rgba(42, 46, 53, 0.8)', border: '1px solid rgba(138, 148, 166, 0.2)' }}>
              <div className="text-2xl font-light" style={{ color: '#E8ECEF' }}>
                {users.filter(u => u.isActive).length}
              </div>
              <div className="text-sm" style={{ color: '#8A94A6' }}>Active Users</div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Create User Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md rounded-xl p-6"
            style={{
              background: 'linear-gradient(135deg, rgba(42, 46, 53, 0.95) 0%, rgba(42, 46, 53, 0.85) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(195, 163, 85, 0.3)',
            }}
          >
            <h2 className="text-2xl font-light tracking-wider mb-6" style={{ color: '#E8ECEF' }}>
              Create New User
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-light mb-2" style={{ color: '#8A94A6' }}>
                  Email
                </label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg"
                  style={{
                    background: 'rgba(0, 0, 0, 0.3)',
                    border: '1px solid rgba(195, 163, 85, 0.2)',
                    color: '#E8ECEF',
                  }}
                />
              </div>

              <div>
                <label className="block text-sm font-light mb-2" style={{ color: '#8A94A6' }}>
                  Name
                </label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg"
                  style={{
                    background: 'rgba(0, 0, 0, 0.3)',
                    border: '1px solid rgba(195, 163, 85, 0.2)',
                    color: '#E8ECEF',
                  }}
                />
              </div>

              <div>
                <label className="block text-sm font-light mb-2" style={{ color: '#8A94A6' }}>
                  Password
                </label>
                <input
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg"
                  style={{
                    background: 'rgba(0, 0, 0, 0.3)',
                    border: '1px solid rgba(195, 163, 85, 0.2)',
                    color: '#E8ECEF',
                  }}
                />
              </div>

              <div>
                <label className="block text-sm font-light mb-2" style={{ color: '#8A94A6' }}>
                  Role
                </label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg"
                  style={{
                    background: 'rgba(0, 0, 0, 0.3)',
                    border: '1px solid rgba(195, 163, 85, 0.2)',
                    color: '#E8ECEF',
                  }}
                >
                  <option value="USER">User</option>
                  <option value="ADMIN">Admin</option>
                  <option value="WRITER">Writer</option>
                  <option value="SALES">Sales</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-4 py-2 rounded-lg transition-all"
                style={{
                  background: 'rgba(138, 148, 166, 0.2)',
                  border: '1px solid rgba(138, 148, 166, 0.3)',
                  color: '#8A94A6',
                }}
              >
                Cancel
              </button>
              <button
                onClick={createUser}
                className="flex-1 px-4 py-2 rounded-lg transition-all"
                style={{
                  background: 'linear-gradient(135deg, #C3A355 0%, #4A8E55 100%)',
                  color: '#121417',
                }}
              >
                Create User
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
