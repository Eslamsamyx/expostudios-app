"use client";


import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const dynamic = 'force-dynamic';

interface Lead {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  company?: string;
  source: string;
  status: string;
  score: number;
  notes?: string;
  createdAt: string;
  lastContactAt?: string;
}

export default function LeadsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (session && !['ADMIN', 'SALES'].includes(session.user.role)) {
      router.push("/dashboard");
    }
  }, [status, session, router]);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await fetch('/api/dashboard/sales/leads');
        if (response.ok) {
          const data = await response.json();
          setLeads(data);
        }
      } catch (error) {
        console.error('Error fetching leads:', error);
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      fetchLeads();
    }
  }, [session]);

  const updateLeadStatus = async (leadId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/dashboard/sales/leads/${leadId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setLeads(leads.map(lead =>
          lead.id === leadId ? { ...lead, status: newStatus } : lead
        ));
      }
    } catch (error) {
      console.error('Error updating lead status:', error);
    }
  };

  const filteredLeads = leads.filter(lead => {
    const matchesFilter = filter === 'ALL' || lead.status === filter;
    const matchesSearch = searchTerm === '' ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.company?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'NEW': return '#22D3EE';
      case 'CONTACTED': return '#4A8E55';
      case 'QUALIFIED': return '#C3A355';
      case 'CONVERTED': return '#4A8E55';
      case 'LOST': return '#8A94A6';
      default: return '#8A94A6';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#4A8E55';
    if (score >= 60) return '#C3A355';
    if (score >= 40) return '#22D3EE';
    return '#8A94A6';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#121417' }}>
        <div className="text-white">Loading leads...</div>
      </div>
    );
  }

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
                Lead Management
              </h1>
              <p className="text-sm mt-1" style={{ color: '#8A94A6' }}>
                Track and manage your sales pipeline
              </p>
            </div>

            <button
              className="px-6 py-3 rounded-lg font-light transition-all duration-300 hover:opacity-80"
              style={{
                background: 'linear-gradient(135deg, #22D3EE 0%, #4A8E55 100%)',
                color: '#121417',
              }}
            >
              Export Leads
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            <input
              type="text"
              placeholder="Search leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 rounded-lg flex-1 min-w-[200px]"
              style={{
                background: 'rgba(42, 46, 53, 0.8)',
                border: '1px solid rgba(34, 211, 238, 0.2)',
                color: '#E8ECEF',
              }}
            />

            <div className="flex gap-2">
              {['ALL', 'NEW', 'CONTACTED', 'QUALIFIED', 'CONVERTED', 'LOST'].map(status => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-2 rounded-lg text-sm transition-all duration-300 ${
                    filter === status ? 'opacity-100' : 'opacity-60 hover:opacity-80'
                  }`}
                  style={{
                    background: filter === status
                      ? 'rgba(34, 211, 238, 0.2)'
                      : 'rgba(42, 46, 53, 0.8)',
                    border: '1px solid rgba(34, 211, 238, 0.2)',
                    color: '#E8ECEF',
                  }}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Leads Table */}
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
              border: '1px solid rgba(34, 211, 238, 0.2)',
            }}
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(34, 211, 238, 0.2)' }}>
                    <th className="text-left p-4 text-sm font-light" style={{ color: '#8A94A6' }}>
                      Contact
                    </th>
                    <th className="text-left p-4 text-sm font-light" style={{ color: '#8A94A6' }}>
                      Source
                    </th>
                    <th className="text-left p-4 text-sm font-light" style={{ color: '#8A94A6' }}>
                      Score
                    </th>
                    <th className="text-left p-4 text-sm font-light" style={{ color: '#8A94A6' }}>
                      Status
                    </th>
                    <th className="text-left p-4 text-sm font-light" style={{ color: '#8A94A6' }}>
                      Created
                    </th>
                    <th className="text-left p-4 text-sm font-light" style={{ color: '#8A94A6' }}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center p-8" style={{ color: '#8A94A6' }}>
                        No leads found
                      </td>
                    </tr>
                  ) : (
                    filteredLeads.map((lead) => (
                      <motion.tr
                        key={lead.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{ borderBottom: '1px solid rgba(34, 211, 238, 0.1)' }}
                        className="hover:bg-black/20 transition-colors"
                      >
                        <td className="p-4">
                          <div>
                            <div className="font-light" style={{ color: '#E8ECEF' }}>
                              {lead.name || 'Unknown'}
                            </div>
                            <div className="text-sm" style={{ color: '#8A94A6' }}>
                              {lead.email}
                            </div>
                            {lead.company && (
                              <div className="text-xs mt-1" style={{ color: '#8A94A6' }}>
                                {lead.company}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="text-sm" style={{ color: '#E8ECEF' }}>
                            {lead.source.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-12 h-1.5 rounded-full overflow-hidden"
                              style={{ background: 'rgba(138, 148, 166, 0.2)' }}
                            >
                              <div
                                className="h-full rounded-full transition-all duration-300"
                                style={{
                                  width: `${lead.score}%`,
                                  background: getScoreColor(lead.score),
                                }}
                              />
                            </div>
                            <span className="text-sm" style={{ color: getScoreColor(lead.score) }}>
                              {lead.score}
                            </span>
                          </div>
                        </td>
                        <td className="p-4">
                          <select
                            value={lead.status}
                            onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                            className="px-3 py-1 rounded text-sm"
                            style={{
                              background: 'rgba(42, 46, 53, 0.8)',
                              border: `1px solid ${getStatusColor(lead.status)}40`,
                              color: getStatusColor(lead.status),
                            }}
                          >
                            <option value="NEW">New</option>
                            <option value="CONTACTED">Contacted</option>
                            <option value="QUALIFIED">Qualified</option>
                            <option value="CONVERTED">Converted</option>
                            <option value="LOST">Lost</option>
                          </select>
                        </td>
                        <td className="p-4 text-sm" style={{ color: '#8A94A6' }}>
                          {new Date(lead.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => router.push(`/dashboard/sales/leads/${lead.id}`)}
                              className="p-2 rounded hover:bg-black/20 transition-colors"
                              title="View Details"
                            >
                              <svg className="w-4 h-4" style={{ color: '#22D3EE' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            </button>
                            <button
                              className="p-2 rounded hover:bg-black/20 transition-colors"
                              title="Add Note"
                            >
                              <svg className="w-4 h-4" style={{ color: '#4A8E55' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Stats Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4"
          >
            <div className="p-4 rounded-lg" style={{ background: 'rgba(42, 46, 53, 0.8)', border: '1px solid rgba(34, 211, 238, 0.2)' }}>
              <div className="text-2xl font-light" style={{ color: '#22D3EE' }}>
                {leads.filter(l => l.status === 'NEW').length}
              </div>
              <div className="text-sm" style={{ color: '#8A94A6' }}>New Leads</div>
            </div>
            <div className="p-4 rounded-lg" style={{ background: 'rgba(42, 46, 53, 0.8)', border: '1px solid rgba(74, 142, 85, 0.2)' }}>
              <div className="text-2xl font-light" style={{ color: '#4A8E55' }}>
                {leads.filter(l => l.status === 'QUALIFIED').length}
              </div>
              <div className="text-sm" style={{ color: '#8A94A6' }}>Qualified</div>
            </div>
            <div className="p-4 rounded-lg" style={{ background: 'rgba(42, 46, 53, 0.8)', border: '1px solid rgba(195, 163, 85, 0.2)' }}>
              <div className="text-2xl font-light" style={{ color: '#C3A355' }}>
                {leads.filter(l => l.score >= 70).length}
              </div>
              <div className="text-sm" style={{ color: '#8A94A6' }}>Hot Leads (70+)</div>
            </div>
            <div className="p-4 rounded-lg" style={{ background: 'rgba(42, 46, 53, 0.8)', border: '1px solid rgba(138, 148, 166, 0.2)' }}>
              <div className="text-2xl font-light" style={{ color: '#E8ECEF' }}>
                {Math.round(leads.reduce((acc, l) => acc + l.score, 0) / leads.length) || 0}
              </div>
              <div className="text-sm" style={{ color: '#8A94A6' }}>Avg Score</div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
