"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ServiceStatus {
  name: string;
  status: 'operational' | 'degraded' | 'down' | 'checking';
  responseTime?: number;
  lastChecked?: string;
  message?: string;
  category: 'core' | 'api' | 'database' | 'auth' | 'external';
}

interface SystemHealth {
  overall: 'healthy' | 'degraded' | 'critical';
  services: ServiceStatus[];
  database: {
    connected: boolean;
    latency: number;
    tables: number;
  };
  performance: {
    uptime: string;
    memoryUsage: number;
    activeUsers: number;
    requestsToday: number;
  };
}

export default function HealthPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [health, setHealth] = useState<SystemHealth | null>(null);
  const [loading, setLoading] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (session && session.user.role !== 'ADMIN') {
      router.push("/dashboard");
    }
  }, [status, session, router]);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await fetch('/api/dashboard/admin/health');
        if (response.ok) {
          const data = await response.json();
          setHealth(data);
        }
      } catch (error) {
        console.error('Error fetching health status:', error);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user.role === 'ADMIN') {
      checkHealth();

      // Auto-refresh every 30 seconds if enabled
      const interval = autoRefresh ? setInterval(checkHealth, 30000) : null;
      return () => {
        if (interval) clearInterval(interval);
      };
    }
  }, [session, autoRefresh]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
      case 'healthy':
        return '#4A8E55';
      case 'degraded':
        return '#C3A355';
      case 'down':
      case 'critical':
        return '#EF4444';
      case 'checking':
        return '#22D3EE';
      default:
        return '#8A94A6';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
      case 'healthy':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'degraded':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'down':
      case 'critical':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'checking':
        return (
          <motion.svg
            className="w-5 h-5"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </motion.svg>
        );
      default:
        return null;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'core':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
        );
      case 'api':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case 'database':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
          </svg>
        );
      case 'auth':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        );
      case 'external':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        );
    }
  };

  if (loading || !health) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#121417' }}>
        <div className="text-white">Checking system health...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#121417' }}>
      {/* Header */}
      <header className="p-6 border-b" style={{ borderColor: 'rgba(195, 163, 85, 0.2)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <button
                onClick={() => router.push('/dashboard')}
                className="text-sm mb-2 hover:opacity-80 transition-opacity"
                style={{ color: '#8A94A6' }}
              >
                ← Back to Dashboard
              </button>
              <h1 className="text-3xl font-light tracking-wider" style={{ color: '#E8ECEF' }}>
                System Health
              </h1>
              <p className="text-sm mt-1" style={{ color: '#8A94A6' }}>
                Real-time monitoring of all services
              </p>
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoRefresh}
                  onChange={(e) => setAutoRefresh(e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-sm" style={{ color: '#8A94A6' }}>
                  Auto-refresh (30s)
                </span>
              </label>

              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 rounded-lg transition-all duration-300 hover:opacity-80"
                style={{
                  background: 'rgba(42, 46, 53, 0.8)',
                  border: '1px solid rgba(195, 163, 85, 0.2)',
                  color: '#E8ECEF',
                }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Overall Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-xl p-6"
            style={{
              background: 'linear-gradient(135deg, rgba(42, 46, 53, 0.8) 0%, rgba(42, 46, 53, 0.4) 100%)',
              backdropFilter: 'blur(20px)',
              border: `1px solid ${getStatusColor(health.overall)}40`,
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div style={{ color: getStatusColor(health.overall) }}>
                  {getStatusIcon(health.overall)}
                </div>
                <div>
                  <h2 className="text-2xl font-light tracking-wider" style={{ color: '#E8ECEF' }}>
                    System Status: <span style={{ color: getStatusColor(health.overall) }}>
                      {health.overall.charAt(0).toUpperCase() + health.overall.slice(1)}
                    </span>
                  </h2>
                  <p className="text-sm mt-1" style={{ color: '#8A94A6' }}>
                    All services last checked: {new Date().toLocaleTimeString()}
                  </p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="flex gap-6">
                <div className="text-center">
                  <div className="text-2xl font-light" style={{ color: '#4A8E55' }}>
                    {health.services.filter(s => s.status === 'operational').length}
                  </div>
                  <div className="text-xs" style={{ color: '#8A94A6' }}>Operational</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-light" style={{ color: '#C3A355' }}>
                    {health.services.filter(s => s.status === 'degraded').length}
                  </div>
                  <div className="text-xs" style={{ color: '#8A94A6' }}>Degraded</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-light" style={{ color: '#EF4444' }}>
                    {health.services.filter(s => s.status === 'down').length}
                  </div>
                  <div className="text-xs" style={{ color: '#8A94A6' }}>Down</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {health.services.map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="rounded-lg p-4"
                style={{
                  background: 'linear-gradient(135deg, rgba(42, 46, 53, 0.8) 0%, rgba(42, 46, 53, 0.4) 100%)',
                  backdropFilter: 'blur(20px)',
                  border: `1px solid ${getStatusColor(service.status)}30`,
                }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div style={{ color: '#8A94A6' }}>{getCategoryIcon(service.category)}</div>
                    <div>
                      <h3 className="font-light" style={{ color: '#E8ECEF' }}>
                        {service.name}
                      </h3>
                      <p className="text-xs" style={{ color: '#8A94A6' }}>
                        {service.category}
                      </p>
                    </div>
                  </div>
                  <div style={{ color: getStatusColor(service.status) }}>
                    {getStatusIcon(service.status)}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs" style={{ color: '#8A94A6' }}>Status</span>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{
                        background: `${getStatusColor(service.status)}20`,
                        color: getStatusColor(service.status),
                      }}
                    >
                      {service.status}
                    </span>
                  </div>

                  {service.responseTime !== undefined && (
                    <div className="flex items-center justify-between">
                      <span className="text-xs" style={{ color: '#8A94A6' }}>Response</span>
                      <span className="text-xs" style={{ color: '#E8ECEF' }}>
                        {service.responseTime}ms
                      </span>
                    </div>
                  )}

                  {service.message && (
                    <div className="pt-2 border-t" style={{ borderColor: 'rgba(138, 148, 166, 0.2)' }}>
                      <p className="text-xs" style={{ color: '#8A94A6' }}>
                        {service.message}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Database Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-xl p-6"
              style={{
                background: 'linear-gradient(135deg, rgba(42, 46, 53, 0.8) 0%, rgba(42, 46, 53, 0.4) 100%)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(74, 142, 85, 0.2)',
              }}
            >
              <h2 className="text-xl font-light tracking-wider mb-4" style={{ color: '#4A8E55' }}>
                Database Status
              </h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm" style={{ color: '#8A94A6' }}>Connection</span>
                  <span className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{
                        background: health.database.connected ? '#4A8E55' : '#EF4444',
                      }}
                    />
                    <span className="text-sm" style={{ color: '#E8ECEF' }}>
                      {health.database.connected ? 'Connected' : 'Disconnected'}
                    </span>
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm" style={{ color: '#8A94A6' }}>Latency</span>
                  <span className="text-sm" style={{ color: '#E8ECEF' }}>
                    {health.database.latency}ms
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm" style={{ color: '#8A94A6' }}>Tables</span>
                  <span className="text-sm" style={{ color: '#E8ECEF' }}>
                    {health.database.tables}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Performance Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="rounded-xl p-6"
              style={{
                background: 'linear-gradient(135deg, rgba(42, 46, 53, 0.8) 0%, rgba(42, 46, 53, 0.4) 100%)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(34, 211, 238, 0.2)',
              }}
            >
              <h2 className="text-xl font-light tracking-wider mb-4" style={{ color: '#22D3EE' }}>
                Performance Metrics
              </h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm" style={{ color: '#8A94A6' }}>Uptime</span>
                  <span className="text-sm" style={{ color: '#E8ECEF' }}>
                    {health.performance.uptime}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm" style={{ color: '#8A94A6' }}>Memory Usage</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-1.5 rounded-full" style={{ background: 'rgba(138, 148, 166, 0.2)' }}>
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${health.performance.memoryUsage}%`,
                          background: health.performance.memoryUsage > 80 ? '#EF4444' :
                                     health.performance.memoryUsage > 60 ? '#C3A355' : '#4A8E55',
                        }}
                      />
                    </div>
                    <span className="text-sm" style={{ color: '#E8ECEF' }}>
                      {health.performance.memoryUsage}%
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm" style={{ color: '#8A94A6' }}>Active Users</span>
                  <span className="text-sm" style={{ color: '#E8ECEF' }}>
                    {health.performance.activeUsers}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm" style={{ color: '#8A94A6' }}>Requests Today</span>
                  <span className="text-sm" style={{ color: '#E8ECEF' }}>
                    {health.performance.requestsToday.toLocaleString()}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}