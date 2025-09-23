"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

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

export default function EditUserPage({ params }: { params: Promise<{ id: string }> }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userId, setUserId] = useState<string>('');
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const [showActivityLog, setShowActivityLog] = useState(false);
  const [activityLogs, setActivityLogs] = useState<any[]>([]);
  const [exportingData, setExportingData] = useState(false);
  const [sendingResetEmail, setSendingResetEmail] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'USER',
    isActive: true,
    emailVerified: false,
    newPassword: '',
  });

  // Resolve params promise
  useEffect(() => {
    params.then((resolvedParams) => {
      setUserId(resolvedParams.id);
    });
  }, [params]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (session && session.user.role !== 'ADMIN') {
      router.push("/dashboard");
    }
  }, [status, session, router]);

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) return;

      try {
        const response = await fetch(`/api/dashboard/admin/users/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setUser(data);
          setFormData({
            name: data.name || '',
            email: data.email,
            role: data.role,
            isActive: data.isActive,
            emailVerified: data.emailVerified,
            newPassword: '',
          });
        } else if (response.status === 404) {
          router.push('/dashboard/admin/users');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user.role === 'ADMIN' && userId) {
      fetchUser();
    }
  }, [session, userId, router]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const updateData: any = {
        name: formData.name,
        email: formData.email,
        role: formData.role,
        isActive: formData.isActive,
        emailVerified: formData.emailVerified,
      };

      if (formData.newPassword) {
        updateData.password = formData.newPassword;
      }

      const response = await fetch(`/api/dashboard/admin/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        setFormData(prev => ({ ...prev, newPassword: '' }));
        setShowPasswordReset(false);

        // Show success message (you could add a toast here)
        router.push('/dashboard/admin/users');
      }
    } catch (error) {
      console.error('Error saving user:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/dashboard/admin/users/${userId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        router.push('/dashboard/admin/users');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleViewActivityLog = async () => {
    try {
      const response = await fetch(`/api/dashboard/admin/users/${userId}/activity`);
      if (response.ok) {
        const data = await response.json();
        setActivityLogs(data);
        setShowActivityLog(true);
      }
    } catch (error) {
      console.error('Error fetching activity logs:', error);
    }
  };

  const handleSendPasswordReset = async () => {
    setSendingResetEmail(true);
    try {
      const response = await fetch(`/api/dashboard/admin/users/${userId}/reset-password`, {
        method: 'POST',
      });

      if (response.ok) {
        // Show success message (in production, this would actually send an email)
        alert(`Password reset email sent to ${formData.email}`);
      }
    } catch (error) {
      console.error('Error sending reset email:', error);
    } finally {
      setSendingResetEmail(false);
    }
  };

  const handleExportUserData = async () => {
    setExportingData(true);
    try {
      const response = await fetch(`/api/dashboard/admin/users/${userId}/export`);
      if (response.ok) {
        const data = await response.json();

        // Create CSV content
        const csvContent = [
          ['Field', 'Value'],
          ['ID', data.id],
          ['Email', data.email],
          ['Name', data.name || ''],
          ['Role', data.role],
          ['Active', data.isActive],
          ['Email Verified', data.emailVerified],
          ['Created', new Date(data.createdAt).toLocaleString()],
          ['Last Login', data.lastLoginAt ? new Date(data.lastLoginAt).toLocaleString() : 'Never'],
        ].map(row => row.join(',')).join('\n');

        // Download CSV
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `user-${data.id}-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Error exporting user data:', error);
    } finally {
      setExportingData(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#121417' }}>
        <div className="text-white">Loading user...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#121417' }}>
        <div className="text-white">User not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#121417' }}>
      {/* Header */}
      <header className="p-6 border-b" style={{ borderColor: 'rgba(195, 163, 85, 0.2)' }}>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <button
                onClick={() => router.push('/dashboard/admin/users')}
                className="text-sm mb-2 hover:opacity-80 transition-opacity"
                style={{ color: '#8A94A6' }}
              >
                ← Back to Users
              </button>
              <h1 className="text-3xl font-light tracking-wider" style={{ color: '#E8ECEF' }}>
                Edit User
              </h1>
              <p className="text-sm mt-1" style={{ color: '#8A94A6' }}>
                Update user information and permissions
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="px-6 py-3 rounded-lg font-light transition-all duration-300 hover:opacity-80"
                style={{
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  color: '#EF4444',
                }}
              >
                Delete User
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-6 py-3 rounded-lg font-light transition-all duration-300 hover:opacity-80 disabled:opacity-50"
                style={{
                  background: 'linear-gradient(135deg, #C3A355 0%, #4A8E55 100%)',
                  color: '#121417',
                }}
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* User Edit Form */}
      <main className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Basic Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="rounded-xl p-6"
              style={{
                background: 'linear-gradient(135deg, rgba(42, 46, 53, 0.8) 0%, rgba(42, 46, 53, 0.4) 100%)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(195, 163, 85, 0.2)',
              }}
            >
              <h2 className="text-xl font-light tracking-wider mb-6" style={{ color: '#C3A355' }}>
                Basic Information
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-light mb-2" style={{ color: '#8A94A6' }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg"
                    style={{
                      background: 'rgba(0, 0, 0, 0.3)',
                      border: '1px solid rgba(195, 163, 85, 0.2)',
                      color: '#E8ECEF',
                    }}
                    placeholder="Enter full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-light mb-2" style={{ color: '#8A94A6' }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                    User ID
                  </label>
                  <input
                    type="text"
                    value={user.id}
                    disabled
                    className="w-full px-4 py-2 rounded-lg opacity-50"
                    style={{
                      background: 'rgba(0, 0, 0, 0.3)',
                      border: '1px solid rgba(195, 163, 85, 0.2)',
                      color: '#8A94A6',
                    }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-light mb-2" style={{ color: '#8A94A6' }}>
                    Created Date
                  </label>
                  <input
                    type="text"
                    value={new Date(user.createdAt).toLocaleString()}
                    disabled
                    className="w-full px-4 py-2 rounded-lg opacity-50"
                    style={{
                      background: 'rgba(0, 0, 0, 0.3)',
                      border: '1px solid rgba(195, 163, 85, 0.2)',
                      color: '#8A94A6',
                    }}
                  />
                </div>

                {user.lastLoginAt && (
                  <div>
                    <label className="block text-sm font-light mb-2" style={{ color: '#8A94A6' }}>
                      Last Login
                    </label>
                    <input
                      type="text"
                      value={new Date(user.lastLoginAt).toLocaleString()}
                      disabled
                      className="w-full px-4 py-2 rounded-lg opacity-50"
                      style={{
                        background: 'rgba(0, 0, 0, 0.3)',
                        border: '1px solid rgba(195, 163, 85, 0.2)',
                        color: '#8A94A6',
                      }}
                    />
                  </div>
                )}
              </div>
            </motion.div>

            {/* Security & Permissions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="rounded-xl p-6"
              style={{
                background: 'linear-gradient(135deg, rgba(42, 46, 53, 0.8) 0%, rgba(42, 46, 53, 0.4) 100%)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(74, 142, 85, 0.2)',
              }}
            >
              <h2 className="text-xl font-light tracking-wider mb-6" style={{ color: '#4A8E55' }}>
                Security & Permissions
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-light mb-2" style={{ color: '#8A94A6' }}>
                    Role
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg"
                    style={{
                      background: 'rgba(0, 0, 0, 0.3)',
                      border: '1px solid rgba(74, 142, 85, 0.2)',
                      color: '#E8ECEF',
                    }}
                  >
                    <option value="USER">User</option>
                    <option value="ADMIN">Admin</option>
                    <option value="WRITER">Writer</option>
                    <option value="SALES">Sales</option>
                  </select>
                </div>

                <div>
                  <label className="flex items-center justify-between p-3 rounded-lg hover:bg-black/20 transition-colors cursor-pointer">
                    <div>
                      <span className="block text-sm font-light" style={{ color: '#E8ECEF' }}>
                        Account Active
                      </span>
                      <span className="text-xs" style={{ color: '#8A94A6' }}>
                        User can login to the system
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="w-5 h-5"
                    />
                  </label>
                </div>

                <div>
                  <label className="flex items-center justify-between p-3 rounded-lg hover:bg-black/20 transition-colors cursor-pointer">
                    <div>
                      <span className="block text-sm font-light" style={{ color: '#E8ECEF' }}>
                        Email Verified
                      </span>
                      <span className="text-xs" style={{ color: '#8A94A6' }}>
                        Email address has been verified
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      checked={formData.emailVerified}
                      onChange={(e) => setFormData({ ...formData, emailVerified: e.target.checked })}
                      className="w-5 h-5"
                    />
                  </label>
                </div>

                {/* Password Reset Section */}
                <div className="pt-4 border-t" style={{ borderColor: 'rgba(74, 142, 85, 0.2)' }}>
                  {!showPasswordReset ? (
                    <button
                      onClick={() => setShowPasswordReset(true)}
                      className="w-full px-4 py-3 rounded-lg text-sm transition-all duration-300 hover:opacity-80"
                      style={{
                        background: 'rgba(74, 142, 85, 0.1)',
                        border: '1px solid rgba(74, 142, 85, 0.3)',
                        color: '#4A8E55',
                      }}
                    >
                      Reset Password
                    </button>
                  ) : (
                    <div className="space-y-3">
                      <label className="block text-sm font-light" style={{ color: '#8A94A6' }}>
                        New Password
                      </label>
                      <input
                        type="password"
                        value={formData.newPassword}
                        onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg"
                        style={{
                          background: 'rgba(0, 0, 0, 0.3)',
                          border: '1px solid rgba(74, 142, 85, 0.2)',
                          color: '#E8ECEF',
                        }}
                        placeholder="Enter new password"
                      />
                      <button
                        onClick={() => {
                          setShowPasswordReset(false);
                          setFormData({ ...formData, newPassword: '' });
                        }}
                        className="text-sm hover:opacity-80 transition-opacity"
                        style={{ color: '#8A94A6' }}
                      >
                        Cancel password reset
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Activity Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 rounded-xl p-6"
            style={{
              background: 'linear-gradient(135deg, rgba(42, 46, 53, 0.8) 0%, rgba(42, 46, 53, 0.4) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(34, 211, 238, 0.2)',
            }}
          >
            <h2 className="text-xl font-light tracking-wider mb-4" style={{ color: '#22D3EE' }}>
              Quick Actions
            </h2>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleViewActivityLog}
                className="px-4 py-2 rounded-lg text-sm transition-all duration-300 hover:opacity-80"
                style={{
                  background: 'rgba(34, 211, 238, 0.1)',
                  border: '1px solid rgba(34, 211, 238, 0.3)',
                  color: '#22D3EE',
                }}
              >
                View Activity Log
              </button>
              <button
                onClick={handleSendPasswordReset}
                disabled={sendingResetEmail}
                className="px-4 py-2 rounded-lg text-sm transition-all duration-300 hover:opacity-80 disabled:opacity-50"
                style={{
                  background: 'rgba(34, 211, 238, 0.1)',
                  border: '1px solid rgba(34, 211, 238, 0.3)',
                  color: '#22D3EE',
                }}
              >
                {sendingResetEmail ? 'Sending...' : 'Send Password Reset Email'}
              </button>
              <button
                onClick={handleExportUserData}
                disabled={exportingData}
                className="px-4 py-2 rounded-lg text-sm transition-all duration-300 hover:opacity-80 disabled:opacity-50"
                style={{
                  background: 'rgba(34, 211, 238, 0.1)',
                  border: '1px solid rgba(34, 211, 238, 0.3)',
                  color: '#22D3EE',
                }}
              >
                {exportingData ? 'Exporting...' : 'Export User Data'}
              </button>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md rounded-xl p-6"
            style={{
              background: 'linear-gradient(135deg, rgba(42, 46, 53, 0.95) 0%, rgba(42, 46, 53, 0.85) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
            }}
          >
            <h2 className="text-2xl font-light tracking-wider mb-4" style={{ color: '#E8ECEF' }}>
              Delete User?
            </h2>
            <p className="mb-6" style={{ color: '#8A94A6' }}>
              Are you sure you want to delete <strong>{formData.email}</strong>? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
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
                onClick={handleDelete}
                className="flex-1 px-4 py-2 rounded-lg transition-all"
                style={{
                  background: 'rgba(239, 68, 68, 0.2)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  color: '#EF4444',
                }}
              >
                Delete User
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Activity Log Modal */}
      {showActivityLog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-4xl rounded-xl p-6 my-8"
            style={{
              background: 'linear-gradient(135deg, rgba(42, 46, 53, 0.95) 0%, rgba(42, 46, 53, 0.85) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(34, 211, 238, 0.3)',
            }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-light tracking-wider" style={{ color: '#E8ECEF' }}>
                Activity Log for {formData.email}
              </h2>
              <button
                onClick={() => setShowActivityLog(false)}
                className="p-2 rounded-lg hover:bg-black/20 transition-colors"
              >
                <svg className="w-5 h-5" style={{ color: '#8A94A6' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-3 max-h-[60vh] overflow-y-auto">
              {activityLogs.length === 0 ? (
                <p style={{ color: '#8A94A6' }}>No activity logs found for this user.</p>
              ) : (
                activityLogs.map((log, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg"
                    style={{
                      background: 'rgba(34, 211, 238, 0.1)',
                      border: '1px solid rgba(34, 211, 238, 0.2)',
                    }}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-light" style={{ color: '#E8ECEF' }}>
                          <span style={{ color: '#22D3EE' }}>{log.action}</span> {log.entity}
                          {log.entityId && (
                            <span style={{ color: '#8A94A6' }}> #{log.entityId.slice(-8)}</span>
                          )}
                        </div>
                        {log.details && (
                          <p className="text-sm mt-1" style={{ color: '#8A94A6' }}>{log.details}</p>
                        )}
                      </div>
                      <span className="text-xs" style={{ color: '#8A94A6' }}>
                        {new Date(log.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}