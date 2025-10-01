"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const dynamic = 'force-dynamic';


export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState({
    totalSubscribers: 0,
    newLeads: 0,
    articlesPublished: 0,
    recentActivity: 0,
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    // Fetch dashboard stats
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/dashboard/stats");
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    if (session) {
      fetchStats();
    }
  }, [session]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#121417' }}>
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const roleColor = {
    ADMIN: '#C3A355',
    WRITER: '#4A8E55',
    SALES: '#22D3EE',
    USER: '#8A94A6',
  };

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ backgroundColor: '#121417' }}>
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-[20%] w-[400px] h-[400px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, #4A8E55 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
          animate={{
            x: [0, 30, -30, 0],
            y: [0, -20, 20, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-[20%] w-[350px] h-[350px] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, #C3A355 0%, transparent 70%)',
            filter: 'blur(100px)',
          }}
          animate={{
            x: [0, -30, 30, 0],
            y: [0, 20, -20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Header */}
      <div className="relative z-10">
        <header className="p-6 border-b" style={{ borderColor: 'rgba(195, 163, 85, 0.2)' }}>
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div>
              <h1
                className="text-2xl font-thin tracking-[0.1em]"
                style={{
                  background: 'linear-gradient(135deg, #E8ECEF 0%, #C3A355 50%, #E8ECEF 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                EXPOSTUDIOS
              </h1>
              <p className="text-sm mt-1" style={{ color: '#8A94A6' }}>Admin Portal</p>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-sm font-light" style={{ color: '#E8ECEF' }}>
                  {session.user.name || session.user.email}
                </p>
                <p
                  className="text-xs font-light"
                  style={{ color: roleColor[session.user.role] }}
                >
                  {session.user.role}
                </p>
              </div>

              <button
                onClick={() => {
                  const currentOrigin = window.location.origin;
                  signOut({ callbackUrl: `${currentOrigin}/login` });
                }}
                className="px-4 py-2 rounded-lg text-sm font-light transition-all duration-300 hover:opacity-80"
                style={{
                  background: 'linear-gradient(135deg, rgba(42, 46, 53, 0.8) 0%, rgba(42, 46, 53, 0.4) 100%)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(195, 163, 85, 0.2)',
                  color: '#E8ECEF',
                }}
              >
                Sign Out
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6">
          <div className="max-w-7xl mx-auto">
            {/* Welcome Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <h2 className="text-3xl font-light tracking-wider mb-2" style={{ color: '#E8ECEF' }}>
                Welcome Back
              </h2>
              <p className="text-lg" style={{ color: '#8A94A6' }}>
                Here&apos;s what&apos;s happening with your platform today
              </p>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`grid ${session.user.role === 'WRITER' ? 'grid-cols-1 md:grid-cols-1 lg:grid-cols-1 max-w-md' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'} gap-6 mb-8`}
            >
              {/* Newsletter Subscribers - Only show for ADMIN and SALES */}
              {['ADMIN', 'SALES'].includes(session.user.role) && (
                <div
                  className="p-6 rounded-xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(42, 46, 53, 0.8) 0%, rgba(42, 46, 53, 0.4) 100%)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(195, 163, 85, 0.2)',
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-light" style={{ color: '#8A94A6' }}>
                      Newsletter Subscribers
                    </span>
                    <svg className="w-5 h-5" style={{ color: '#4A8E55' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div className="text-3xl font-light mb-1" style={{ color: '#E8ECEF' }}>
                    {stats.totalSubscribers}
                  </div>
                  <div className="text-xs" style={{ color: '#4A8E55' }}>
                    +12% from last month
                  </div>
                </div>
              )}

              {/* New Leads - Only show for ADMIN and SALES */}
              {['ADMIN', 'SALES'].includes(session.user.role) && (
                <div
                  className="p-6 rounded-xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(42, 46, 53, 0.8) 0%, rgba(42, 46, 53, 0.4) 100%)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(195, 163, 85, 0.2)',
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-light" style={{ color: '#8A94A6' }}>
                      New Leads
                    </span>
                    <svg className="w-5 h-5" style={{ color: '#22D3EE' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div className="text-3xl font-light mb-1" style={{ color: '#E8ECEF' }}>
                    {stats.newLeads}
                  </div>
                  <div className="text-xs" style={{ color: '#22D3EE' }}>
                    This week
                  </div>
                </div>
              )}

              {/* Articles Published - Show for ADMIN and WRITER only */}
              {['ADMIN', 'WRITER'].includes(session.user.role) && (
                <div
                  className="p-6 rounded-xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(42, 46, 53, 0.8) 0%, rgba(42, 46, 53, 0.4) 100%)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(195, 163, 85, 0.2)',
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-light" style={{ color: '#8A94A6' }}>
                      Articles Published
                    </span>
                    <svg className="w-5 h-5" style={{ color: '#C3A355' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="text-3xl font-light mb-1" style={{ color: '#E8ECEF' }}>
                    {stats.articlesPublished}
                  </div>
                  <div className="text-xs" style={{ color: '#C3A355' }}>
                    Total articles
                  </div>
                </div>
              )}

              {/* Recent Activity - Only show for ADMIN */}
              {session.user.role === 'ADMIN' && (
                <div
                  className="p-6 rounded-xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(42, 46, 53, 0.8) 0%, rgba(42, 46, 53, 0.4) 100%)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(195, 163, 85, 0.2)',
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-light" style={{ color: '#8A94A6' }}>
                      Recent Activity
                    </span>
                    <svg className="w-5 h-5" style={{ color: '#8A94A6' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="text-3xl font-light mb-1" style={{ color: '#E8ECEF' }}>
                    {stats.recentActivity}
                  </div>
                  <div className="text-xs" style={{ color: '#8A94A6' }}>
                    Last 24 hours
                  </div>
                </div>
              )}
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {/* Admin Actions */}
              {session.user.role === 'ADMIN' && (
                <div
                  className="p-6 rounded-xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(42, 46, 53, 0.8) 0%, rgba(42, 46, 53, 0.4) 100%)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(195, 163, 85, 0.2)',
                  }}
                >
                  <h3 className="text-lg font-light tracking-wider mb-4" style={{ color: '#C3A355' }}>
                    Admin Tools
                  </h3>
                  <div className="space-y-3">
                    <button
                      onClick={() => router.push('/dashboard/admin/users')}
                      className="w-full text-left px-4 py-3 rounded-lg transition-all duration-300 hover:opacity-80"
                      style={{
                        background: 'rgba(195, 163, 85, 0.1)',
                        border: '1px solid rgba(195, 163, 85, 0.3)',
                        color: '#E8ECEF',
                      }}
                    >
                      <span className="text-sm">Manage Users</span>
                    </button>
                    <button
                      onClick={() => router.push('/dashboard/admin/settings')}
                      className="w-full text-left px-4 py-3 rounded-lg transition-all duration-300 hover:opacity-80"
                      style={{
                        background: 'rgba(195, 163, 85, 0.1)',
                        border: '1px solid rgba(195, 163, 85, 0.3)',
                        color: '#E8ECEF',
                      }}
                    >
                      <span className="text-sm">System Settings</span>
                    </button>
                    <button
                      onClick={() => router.push('/dashboard/admin/activity')}
                      className="w-full text-left px-4 py-3 rounded-lg transition-all duration-300 hover:opacity-80"
                      style={{
                        background: 'rgba(195, 163, 85, 0.1)',
                        border: '1px solid rgba(195, 163, 85, 0.3)',
                        color: '#E8ECEF',
                      }}
                    >
                      <span className="text-sm">Activity Logs</span>
                    </button>
                    <button
                      onClick={() => router.push('/dashboard/admin/health')}
                      className="w-full text-left px-4 py-3 rounded-lg transition-all duration-300 hover:opacity-80"
                      style={{
                        background: 'rgba(195, 163, 85, 0.1)',
                        border: '1px solid rgba(195, 163, 85, 0.3)',
                        color: '#E8ECEF',
                      }}
                    >
                      <span className="text-sm">System Health</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Writer Actions */}
              {['ADMIN', 'WRITER'].includes(session.user.role) && (
                <div
                  className="p-6 rounded-xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(42, 46, 53, 0.8) 0%, rgba(42, 46, 53, 0.4) 100%)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(74, 142, 85, 0.2)',
                  }}
                >
                  <h3 className="text-lg font-light tracking-wider mb-4" style={{ color: '#4A8E55' }}>
                    Content Management
                  </h3>
                  <div className="space-y-3">
                    <button
                      onClick={() => router.push('/dashboard/writer/articles')}
                      className="w-full text-left px-4 py-3 rounded-lg transition-all duration-300 hover:opacity-80"
                      style={{
                        background: 'rgba(74, 142, 85, 0.1)',
                        border: '1px solid rgba(74, 142, 85, 0.3)',
                        color: '#E8ECEF',
                      }}
                    >
                      <span className="text-sm">Manage Articles</span>
                    </button>
                    <button
                      onClick={() => router.push('/dashboard/writer/new')}
                      className="w-full text-left px-4 py-3 rounded-lg transition-all duration-300 hover:opacity-80"
                      style={{
                        background: 'rgba(74, 142, 85, 0.1)',
                        border: '1px solid rgba(74, 142, 85, 0.3)',
                        color: '#E8ECEF',
                      }}
                    >
                      <span className="text-sm">Create New Article</span>
                    </button>
                    <button
                      onClick={() => router.push('/dashboard/writer/media')}
                      className="w-full text-left px-4 py-3 rounded-lg transition-all duration-300 hover:opacity-80"
                      style={{
                        background: 'rgba(74, 142, 85, 0.1)',
                        border: '1px solid rgba(74, 142, 85, 0.3)',
                        color: '#E8ECEF',
                      }}
                    >
                      <span className="text-sm">Media Library</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Sales Actions */}
              {['ADMIN', 'SALES'].includes(session.user.role) && (
                <div
                  className="p-6 rounded-xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(42, 46, 53, 0.8) 0%, rgba(42, 46, 53, 0.4) 100%)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(34, 211, 238, 0.2)',
                  }}
                >
                  <h3 className="text-lg font-light tracking-wider mb-4" style={{ color: '#22D3EE' }}>
                    Sales Tools
                  </h3>
                  <div className="space-y-3">
                    <button
                      onClick={() => router.push('/dashboard/sales/leads')}
                      className="w-full text-left px-4 py-3 rounded-lg transition-all duration-300 hover:opacity-80"
                      style={{
                        background: 'rgba(34, 211, 238, 0.1)',
                        border: '1px solid rgba(34, 211, 238, 0.3)',
                        color: '#E8ECEF',
                      }}
                    >
                      <span className="text-sm">Lead Management</span>
                    </button>
                    <button
                      onClick={() => router.push('/dashboard/sales/newsletter')}
                      className="w-full text-left px-4 py-3 rounded-lg transition-all duration-300 hover:opacity-80"
                      style={{
                        background: 'rgba(34, 211, 238, 0.1)',
                        border: '1px solid rgba(34, 211, 238, 0.3)',
                        color: '#E8ECEF',
                      }}
                    >
                      <span className="text-sm">Newsletter Subscribers</span>
                    </button>
                    <button
                      onClick={() => router.push('/dashboard/sales/analytics')}
                      className="w-full text-left px-4 py-3 rounded-lg transition-all duration-300 hover:opacity-80"
                      style={{
                        background: 'rgba(34, 211, 238, 0.1)',
                        border: '1px solid rgba(34, 211, 238, 0.3)',
                        color: '#E8ECEF',
                      }}
                    >
                      <span className="text-sm">Analytics</span>
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
