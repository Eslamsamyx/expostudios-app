"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ActivityLog {
  id: string;
  userId?: string;
  user?: {
    email: string;
    name?: string;
  };
  action: string;
  entity: string;
  entityId?: string;
  details?: any; // Changed to any since it's JSON
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
}

export default function ActivityLogsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');
  const [dateRange, setDateRange] = useState('7d');

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (session && session.user.role !== 'ADMIN') {
      router.push("/dashboard");
    }
  }, [status, session, router]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch(`/api/dashboard/admin/activity?range=${dateRange}`);
        if (response.ok) {
          const data = await response.json();
          setLogs(data);
        }
      } catch (error) {
        console.error('Error fetching activity logs:', error);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user.role === 'ADMIN') {
      fetchLogs();
    }
  }, [session, dateRange]);

  const getActionColor = (action: string) => {
    switch (action) {
      case 'CREATE': return '#4A8E55';
      case 'UPDATE': return '#22D3EE';
      case 'DELETE': return '#EF4444';
      case 'LOGIN': return '#C3A355';
      default: return '#8A94A6';
    }
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'CREATE':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
          </svg>
        );
      case 'UPDATE':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        );
      case 'DELETE':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        );
      case 'LOGIN':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  const filteredLogs = filter === 'ALL' ? logs : logs.filter(log => log.action === filter);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#121417' }}>
        <div className="text-white">Loading activity logs...</div>
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
                Activity Logs
              </h1>
              <p className="text-sm mt-1" style={{ color: '#8A94A6' }}>
                Monitor system activity and user actions
              </p>
            </div>

            <button
              className="px-6 py-3 rounded-lg font-light transition-all duration-300 hover:opacity-80"
              style={{
                background: 'linear-gradient(135deg, rgba(42, 46, 53, 0.8) 0%, rgba(42, 46, 53, 0.4) 100%)',
                border: '1px solid rgba(195, 163, 85, 0.2)',
                color: '#E8ECEF',
              }}
            >
              Export Logs
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 rounded-lg"
              style={{
                background: 'rgba(42, 46, 53, 0.8)',
                border: '1px solid rgba(195, 163, 85, 0.2)',
                color: '#E8ECEF',
              }}
            >
              <option value="1d">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="all">All Time</option>
            </select>

            <div className="flex gap-2">
              {['ALL', 'CREATE', 'UPDATE', 'DELETE', 'LOGIN'].map(action => (
                <button
                  key={action}
                  onClick={() => setFilter(action)}
                  className={`px-4 py-2 rounded-lg text-sm transition-all duration-300 ${
                    filter === action ? 'opacity-100' : 'opacity-60 hover:opacity-80'
                  }`}
                  style={{
                    background: filter === action
                      ? 'rgba(195, 163, 85, 0.2)'
                      : 'rgba(42, 46, 53, 0.8)',
                    border: '1px solid rgba(195, 163, 85, 0.2)',
                    color: '#E8ECEF',
                  }}
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Activity Feed */}
      <main className="p-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-3"
          >
            {filteredLogs.length === 0 ? (
              <div
                className="text-center py-12 rounded-xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(42, 46, 53, 0.8) 0%, rgba(42, 46, 53, 0.4) 100%)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(195, 163, 85, 0.2)',
                }}
              >
                <p style={{ color: '#8A94A6' }}>No activity logs found</p>
              </div>
            ) : (
              filteredLogs.map((log, index) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex items-start gap-4 p-4 rounded-lg hover:bg-black/20 transition-colors"
                  style={{
                    background: 'linear-gradient(135deg, rgba(42, 46, 53, 0.6) 0%, rgba(42, 46, 53, 0.3) 100%)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(195, 163, 85, 0.1)',
                  }}
                >
                  {/* Action Icon */}
                  <div
                    className="p-2 rounded-lg flex-shrink-0"
                    style={{
                      background: `${getActionColor(log.action)}20`,
                      color: getActionColor(log.action),
                    }}
                  >
                    {getActionIcon(log.action)}
                  </div>

                  {/* Log Details */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-light" style={{ color: '#E8ECEF' }}>
                          {log.user ? (
                            <>
                              <span style={{ color: '#C3A355' }}>
                                {log.user.name || log.user.email}
                              </span>
                              {' '}
                              <span style={{ color: getActionColor(log.action) }}>
                                {log.action.toLowerCase()}d
                              </span>
                              {' '}
                              <span>{log.entity.toLowerCase()}</span>
                              {/* Show target user info for User entity operations */}
                              {log.entity === 'User' && log.details && typeof log.details === 'object' && log.details.targetUser ? (
                                <>
                                  {': '}
                                  <span style={{ color: '#C3A355' }}>
                                    {log.details.targetUser.name || log.details.targetUser.email}
                                  </span>
                                  {' '}
                                  <span style={{ color: '#8A94A6' }}>
                                    ({log.details.targetUser.role})
                                  </span>
                                </>
                              ) : (
                                log.entityId && (
                                  <>
                                    {' '}
                                    <span style={{ color: '#8A94A6' }}>
                                      #{log.entityId.slice(-8)}
                                    </span>
                                  </>
                                )
                              )}
                            </>
                          ) : (
                            <>
                              <span style={{ color: getActionColor(log.action) }}>
                                {log.action}
                              </span>
                              {' '}
                              <span>{log.entity}</span>
                            </>
                          )}
                        </p>
                        {log.details && (
                          <p className="text-sm mt-1" style={{ color: '#8A94A6' }}>
                            {typeof log.details === 'string'
                              ? log.details
                              : typeof log.details === 'object' && log.details.message
                                ? log.details.message
                                : typeof log.details === 'object' && log.details.details
                                  ? log.details.details
                                  : typeof log.details === 'object' && log.details.targetUser
                                    ? '' // Don't show details if already displayed above
                                    : JSON.stringify(log.details)}
                          </p>
                        )}
                        {log.ipAddress && (
                          <p className="text-xs mt-2" style={{ color: '#8A94A6' }}>
                            IP: {log.ipAddress}
                          </p>
                        )}
                      </div>
                      <span className="text-xs font-light" style={{ color: '#8A94A6' }}>
                        {new Date(log.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>

          {/* Summary Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4"
          >
            <div className="p-4 rounded-lg" style={{ background: 'rgba(42, 46, 53, 0.8)', border: '1px solid rgba(74, 142, 85, 0.2)' }}>
              <div className="text-2xl font-light" style={{ color: '#4A8E55' }}>
                {logs.filter(l => l.action === 'CREATE').length}
              </div>
              <div className="text-sm" style={{ color: '#8A94A6' }}>Creates</div>
            </div>
            <div className="p-4 rounded-lg" style={{ background: 'rgba(42, 46, 53, 0.8)', border: '1px solid rgba(34, 211, 238, 0.2)' }}>
              <div className="text-2xl font-light" style={{ color: '#22D3EE' }}>
                {logs.filter(l => l.action === 'UPDATE').length}
              </div>
              <div className="text-sm" style={{ color: '#8A94A6' }}>Updates</div>
            </div>
            <div className="p-4 rounded-lg" style={{ background: 'rgba(42, 46, 53, 0.8)', border: '1px solid rgba(195, 163, 85, 0.2)' }}>
              <div className="text-2xl font-light" style={{ color: '#C3A355' }}>
                {logs.filter(l => l.action === 'LOGIN').length}
              </div>
              <div className="text-sm" style={{ color: '#8A94A6' }}>Logins</div>
            </div>
            <div className="p-4 rounded-lg" style={{ background: 'rgba(42, 46, 53, 0.8)', border: '1px solid rgba(138, 148, 166, 0.2)' }}>
              <div className="text-2xl font-light" style={{ color: '#E8ECEF' }}>
                {logs.length}
              </div>
              <div className="text-sm" style={{ color: '#8A94A6' }}>Total Actions</div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}