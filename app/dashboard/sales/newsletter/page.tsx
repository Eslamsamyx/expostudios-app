"use client";


import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const dynamic = 'force-dynamic';

interface Subscriber {
  id: string;
  email: string;
  name?: string;
  isSubscribed: boolean;
  subscribedAt?: string;
  unsubscribedAt?: string;
  source: string;
  emailsReceived: number;
  emailsOpened: number;
  linksClicked: number;
  tags: string[];
  createdAt: string;
}

export default function NewsletterPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('ALL');
  const [selectedSubscribers, setSelectedSubscribers] = useState<string[]>([]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (session && !['ADMIN', 'SALES'].includes(session.user.role)) {
      router.push("/dashboard");
    }
  }, [status, session, router]);

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const response = await fetch('/api/dashboard/sales/newsletter');
        if (response.ok) {
          const data = await response.json();
          setSubscribers(data);
        }
      } catch (error) {
        console.error('Error fetching subscribers:', error);
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      fetchSubscribers();
    }
  }, [session]);

  const toggleSubscription = async (subscriberId: string, isSubscribed: boolean) => {
    try {
      const response = await fetch(`/api/dashboard/sales/newsletter/${subscriberId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isSubscribed: !isSubscribed }),
      });

      if (response.ok) {
        setSubscribers(subscribers.map(sub =>
          sub.id === subscriberId ? { ...sub, isSubscribed: !isSubscribed } : sub
        ));
      }
    } catch (error) {
      console.error('Error updating subscription:', error);
    }
  };

  const exportSubscribers = () => {
    const csv = [
      ['Email', 'Name', 'Status', 'Source', 'Tags', 'Subscribed Date'],
      ...filteredSubscribers.map(s => [
        s.email,
        s.name || '',
        s.isSubscribed ? 'Active' : 'Unsubscribed',
        s.source,
        s.tags.join(';'),
        s.subscribedAt || s.createdAt,
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `subscribers-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const filteredSubscribers = subscribers.filter(sub => {
    const matchesSearch = searchTerm === '' ||
      sub.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.name?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filter === 'ALL' ||
      (filter === 'ACTIVE' && sub.isSubscribed) ||
      (filter === 'UNSUBSCRIBED' && !sub.isSubscribed);

    return matchesSearch && matchesFilter;
  });

  const engagementRate = (opened: number, received: number) => {
    if (received === 0) return 0;
    return Math.round((opened / received) * 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#121417' }}>
        <div className="text-white">Loading subscribers...</div>
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
                Newsletter Subscribers
              </h1>
              <p className="text-sm mt-1" style={{ color: '#8A94A6' }}>
                Manage email subscribers and engagement
              </p>
            </div>

            <button
              onClick={exportSubscribers}
              className="px-6 py-3 rounded-lg font-light transition-all duration-300 hover:opacity-80"
              style={{
                background: 'linear-gradient(135deg, #22D3EE 0%, #4A8E55 100%)',
                color: '#121417',
              }}
            >
              Export CSV
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            <input
              type="text"
              placeholder="Search subscribers..."
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
              {['ALL', 'ACTIVE', 'UNSUBSCRIBED'].map(status => (
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

      {/* Subscribers Table */}
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
                      <input
                        type="checkbox"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedSubscribers(filteredSubscribers.map(s => s.id));
                          } else {
                            setSelectedSubscribers([]);
                          }
                        }}
                      />
                    </th>
                    <th className="text-left p-4 text-sm font-light" style={{ color: '#8A94A6' }}>
                      Subscriber
                    </th>
                    <th className="text-left p-4 text-sm font-light" style={{ color: '#8A94A6' }}>
                      Source
                    </th>
                    <th className="text-left p-4 text-sm font-light" style={{ color: '#8A94A6' }}>
                      Status
                    </th>
                    <th className="text-left p-4 text-sm font-light" style={{ color: '#8A94A6' }}>
                      Engagement
                    </th>
                    <th className="text-left p-4 text-sm font-light" style={{ color: '#8A94A6' }}>
                      Tags
                    </th>
                    <th className="text-left p-4 text-sm font-light" style={{ color: '#8A94A6' }}>
                      Subscribed
                    </th>
                    <th className="text-left p-4 text-sm font-light" style={{ color: '#8A94A6' }}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSubscribers.map((subscriber) => (
                    <motion.tr
                      key={subscriber.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      style={{ borderBottom: '1px solid rgba(34, 211, 238, 0.1)' }}
                      className="hover:bg-black/20 transition-colors"
                    >
                      <td className="p-4">
                        <input
                          type="checkbox"
                          checked={selectedSubscribers.includes(subscriber.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedSubscribers([...selectedSubscribers, subscriber.id]);
                            } else {
                              setSelectedSubscribers(selectedSubscribers.filter(id => id !== subscriber.id));
                            }
                          }}
                        />
                      </td>
                      <td className="p-4">
                        <div>
                          <div className="font-light" style={{ color: '#E8ECEF' }}>
                            {subscriber.name || 'Unknown'}
                          </div>
                          <div className="text-sm" style={{ color: '#8A94A6' }}>
                            {subscriber.email}
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-sm" style={{ color: '#E8ECEF' }}>
                        {subscriber.source.replace('_', ' ')}
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => toggleSubscription(subscriber.id, subscriber.isSubscribed)}
                          className={`px-3 py-1 rounded-full text-xs transition-all ${
                            subscriber.isSubscribed
                              ? 'bg-green-500/20 text-green-500 border border-green-500/40'
                              : 'bg-red-500/20 text-red-500 border border-red-500/40'
                          }`}
                        >
                          {subscriber.isSubscribed ? 'Active' : 'Unsubscribed'}
                        </button>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-16 h-1.5 rounded-full overflow-hidden"
                            style={{ background: 'rgba(138, 148, 166, 0.2)' }}
                          >
                            <div
                              className="h-full rounded-full transition-all duration-300"
                              style={{
                                width: `${engagementRate(subscriber.emailsOpened, subscriber.emailsReceived)}%`,
                                background: '#22D3EE',
                              }}
                            />
                          </div>
                          <span className="text-xs" style={{ color: '#22D3EE' }}>
                            {engagementRate(subscriber.emailsOpened, subscriber.emailsReceived)}%
                          </span>
                        </div>
                        <div className="text-xs mt-1" style={{ color: '#8A94A6' }}>
                          {subscriber.emailsOpened}/{subscriber.emailsReceived} opened
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-wrap gap-1">
                          {subscriber.tags.slice(0, 3).map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-0.5 rounded-full text-xs"
                              style={{
                                background: 'rgba(74, 142, 85, 0.2)',
                                color: '#4A8E55',
                                border: '1px solid rgba(74, 142, 85, 0.3)',
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                          {subscriber.tags.length > 3 && (
                            <span className="text-xs" style={{ color: '#8A94A6' }}>
                              +{subscriber.tags.length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-4 text-sm" style={{ color: '#8A94A6' }}>
                        {new Date(subscriber.subscribedAt || subscriber.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        <button
                          className="p-2 rounded hover:bg-black/20 transition-colors"
                          title="Send Email"
                        >
                          <svg className="w-4 h-4" style={{ color: '#22D3EE' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </button>
                      </td>
                    </motion.tr>
                  ))}
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
                {subscribers.filter(s => s.isSubscribed).length}
              </div>
              <div className="text-sm" style={{ color: '#8A94A6' }}>Active Subscribers</div>
            </div>
            <div className="p-4 rounded-lg" style={{ background: 'rgba(42, 46, 53, 0.8)', border: '1px solid rgba(74, 142, 85, 0.2)' }}>
              <div className="text-2xl font-light" style={{ color: '#4A8E55' }}>
                {Math.round(
                  subscribers.reduce((acc, s) =>
                    acc + engagementRate(s.emailsOpened, s.emailsReceived), 0
                  ) / subscribers.length
                ) || 0}%
              </div>
              <div className="text-sm" style={{ color: '#8A94A6' }}>Avg Engagement</div>
            </div>
            <div className="p-4 rounded-lg" style={{ background: 'rgba(42, 46, 53, 0.8)', border: '1px solid rgba(195, 163, 85, 0.2)' }}>
              <div className="text-2xl font-light" style={{ color: '#C3A355' }}>
                {subscribers.filter(s => s.source === 'COMING_SOON').length}
              </div>
              <div className="text-sm" style={{ color: '#8A94A6' }}>Coming Soon Signups</div>
            </div>
            <div className="p-4 rounded-lg" style={{ background: 'rgba(42, 46, 53, 0.8)', border: '1px solid rgba(138, 148, 166, 0.2)' }}>
              <div className="text-2xl font-light" style={{ color: '#E8ECEF' }}>
                {subscribers.length}
              </div>
              <div className="text-sm" style={{ color: '#8A94A6' }}>Total Subscribers</div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
