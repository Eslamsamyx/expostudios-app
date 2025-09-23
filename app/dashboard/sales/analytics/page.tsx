"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Analytics {
  leadMetrics: {
    total: number;
    new: number;
    contacted: number;
    qualified: number;
    converted: number;
    lost: number;
  };
  conversionRates: {
    newToContacted: number;
    contactedToQualified: number;
    qualifiedToConverted: number;
    overall: number;
  };
  sourcePerformance: {
    source: string;
    count: number;
    conversionRate: number;
  }[];
  monthlyTrends: {
    month: string;
    leads: number;
    conversions: number;
  }[];
  topPerformers: {
    leadId: string;
    email: string;
    score: number;
    dealValue?: number;
  }[];
}

export default function AnalyticsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('30d');

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (session && !['ADMIN', 'SALES'].includes(session.user.role)) {
      router.push("/dashboard");
    }
  }, [status, session, router]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch(`/api/dashboard/sales/analytics?range=${timeRange}`);
        if (response.ok) {
          const data = await response.json();
          setAnalytics(data);
        }
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      fetchAnalytics();
    }
  }, [session, timeRange]);

  if (loading || !analytics) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#121417' }}>
        <div className="text-white">Loading analytics...</div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return '#22D3EE';
      case 'contacted': return '#C3A355';
      case 'qualified': return '#4A8E55';
      case 'converted': return '#4A8E55';
      case 'lost': return '#EF4444';
      default: return '#8A94A6';
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#121417' }}>
      {/* Header */}
      <header className="p-6 border-b" style={{ borderColor: 'rgba(34, 211, 238, 0.2)' }}>
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
                Sales Analytics
              </h1>
              <p className="text-sm mt-1" style={{ color: '#8A94A6' }}>
                Performance metrics and conversion insights
              </p>
            </div>

            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 rounded-lg"
              style={{
                background: 'rgba(42, 46, 53, 0.8)',
                border: '1px solid rgba(34, 211, 238, 0.2)',
                color: '#E8ECEF',
              }}
            >
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
              <option value="365d">Last Year</option>
            </select>
          </div>
        </div>
      </header>

      <main className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Lead Pipeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-xl font-light tracking-wider mb-4" style={{ color: '#22D3EE' }}>
              Lead Pipeline
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {Object.entries(analytics.leadMetrics).map(([status, count], index) => (
                <motion.div
                  key={status}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="p-4 rounded-lg text-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(42, 46, 53, 0.8) 0%, rgba(42, 46, 53, 0.4) 100%)',
                    backdropFilter: 'blur(20px)',
                    border: `1px solid ${getStatusColor(status)}40`,
                  }}
                >
                  <div className="text-3xl font-light mb-2" style={{ color: getStatusColor(status) }}>
                    {count}
                  </div>
                  <div className="text-xs uppercase tracking-wider" style={{ color: '#8A94A6' }}>
                    {status}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Conversion Funnel */}
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
              Conversion Funnel
            </h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm" style={{ color: '#E8ECEF' }}>New → Contacted</span>
                  <span className="text-sm font-light" style={{ color: '#4A8E55' }}>
                    {analytics.conversionRates.newToContacted}%
                  </span>
                </div>
                <div className="w-full h-2 rounded-full" style={{ background: 'rgba(138, 148, 166, 0.2)' }}>
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${analytics.conversionRates.newToContacted}%`,
                      background: 'linear-gradient(90deg, #22D3EE 0%, #4A8E55 100%)',
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm" style={{ color: '#E8ECEF' }}>Contacted → Qualified</span>
                  <span className="text-sm font-light" style={{ color: '#C3A355' }}>
                    {analytics.conversionRates.contactedToQualified}%
                  </span>
                </div>
                <div className="w-full h-2 rounded-full" style={{ background: 'rgba(138, 148, 166, 0.2)' }}>
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${analytics.conversionRates.contactedToQualified}%`,
                      background: 'linear-gradient(90deg, #C3A355 0%, #4A8E55 100%)',
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm" style={{ color: '#E8ECEF' }}>Qualified → Converted</span>
                  <span className="text-sm font-light" style={{ color: '#4A8E55' }}>
                    {analytics.conversionRates.qualifiedToConverted}%
                  </span>
                </div>
                <div className="w-full h-2 rounded-full" style={{ background: 'rgba(138, 148, 166, 0.2)' }}>
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${analytics.conversionRates.qualifiedToConverted}%`,
                      background: '#4A8E55',
                    }}
                  />
                </div>
              </div>

              <div className="pt-4 border-t" style={{ borderColor: 'rgba(74, 142, 85, 0.2)' }}>
                <div className="flex justify-between">
                  <span className="text-lg font-light" style={{ color: '#E8ECEF' }}>Overall Conversion Rate</span>
                  <span className="text-2xl font-light" style={{ color: '#4A8E55' }}>
                    {analytics.conversionRates.overall}%
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Source Performance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-xl p-6"
              style={{
                background: 'linear-gradient(135deg, rgba(42, 46, 53, 0.8) 0%, rgba(42, 46, 53, 0.4) 100%)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(195, 163, 85, 0.2)',
              }}
            >
              <h2 className="text-xl font-light tracking-wider mb-6" style={{ color: '#C3A355' }}>
                Lead Sources
              </h2>
              <div className="space-y-3">
                {analytics.sourcePerformance.map((source, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm" style={{ color: '#E8ECEF' }}>
                          {source.source.replace('_', ' ')}
                        </span>
                        <span className="text-sm" style={{ color: '#8A94A6' }}>
                          {source.count} leads
                        </span>
                      </div>
                      <div className="w-full h-1.5 rounded-full" style={{ background: 'rgba(138, 148, 166, 0.2)' }}>
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${(source.count / analytics.leadMetrics.total) * 100}%`,
                            background: '#C3A355',
                          }}
                        />
                      </div>
                    </div>
                    <div className="ml-4 text-right">
                      <div className="text-sm font-light" style={{ color: '#4A8E55' }}>
                        {source.conversionRate}%
                      </div>
                      <div className="text-xs" style={{ color: '#8A94A6' }}>conv</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Top Performers */}
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
              <h2 className="text-xl font-light tracking-wider mb-6" style={{ color: '#22D3EE' }}>
                Top Performing Leads
              </h2>
              <div className="space-y-3">
                {analytics.topPerformers.map((lead, index) => (
                  <div
                    key={lead.leadId}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-black/20 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-light"
                        style={{
                          background: 'rgba(34, 211, 238, 0.2)',
                          color: '#22D3EE',
                        }}
                      >
                        {index + 1}
                      </div>
                      <div>
                        <div className="text-sm" style={{ color: '#E8ECEF' }}>
                          {lead.email}
                        </div>
                        {lead.dealValue && (
                          <div className="text-xs" style={{ color: '#4A8E55' }}>
                            ${lead.dealValue.toLocaleString()}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-light" style={{ color: '#22D3EE' }}>
                        {lead.score}
                      </div>
                      <div className="text-xs" style={{ color: '#8A94A6' }}>score</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Monthly Trends Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="rounded-xl p-6"
            style={{
              background: 'linear-gradient(135deg, rgba(42, 46, 53, 0.8) 0%, rgba(42, 46, 53, 0.4) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(138, 148, 166, 0.2)',
            }}
          >
            <h2 className="text-xl font-light tracking-wider mb-6" style={{ color: '#E8ECEF' }}>
              Monthly Trends
            </h2>
            <div className="space-y-4">
              {analytics.monthlyTrends.map((month, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm" style={{ color: '#8A94A6' }}>{month.month}</span>
                    <div className="flex gap-4 text-sm">
                      <span style={{ color: '#22D3EE' }}>{month.leads} leads</span>
                      <span style={{ color: '#4A8E55' }}>{month.conversions} conversions</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1 h-2 rounded-full" style={{ background: 'rgba(138, 148, 166, 0.2)' }}>
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${(month.leads / Math.max(...analytics.monthlyTrends.map(m => m.leads))) * 100}%`,
                          background: '#22D3EE',
                        }}
                      />
                    </div>
                    <div className="flex-1 h-2 rounded-full" style={{ background: 'rgba(138, 148, 166, 0.2)' }}>
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${(month.conversions / Math.max(...analytics.monthlyTrends.map(m => m.conversions))) * 100}%`,
                          background: '#4A8E55',
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}