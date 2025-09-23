"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  author: {
    id: string;
    name?: string;
    email: string;
    role: string;
  };
  views: number;
  shares: number;
  publishedAt?: string;
  featuredAt?: string;
  createdAt: string;
  updatedAt: string;
  category?: string;
  tags: string[];
  allowComments: boolean;
  isPremium: boolean;
}

export default function AdminArticlesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [authorFilter, setAuthorFilter] = useState<string>('ALL');

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (session && session.user.role !== 'ADMIN') {
      router.push("/dashboard");
    }
  }, [status, session, router]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('/api/dashboard/admin/articles');
        if (response.ok) {
          const data = await response.json();
          setArticles(data);
        }
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user.role === 'ADMIN') {
      fetchArticles();
    }
  }, [session]);

  const deleteArticle = async (articleId: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return;

    try {
      const response = await fetch(`/api/dashboard/admin/articles/${articleId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setArticles(articles.filter(article => article.id !== articleId));
      }
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };

  const toggleFeatured = async (articleId: string, currentlyFeatured: boolean) => {
    try {
      const response = await fetch(`/api/dashboard/admin/articles/${articleId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          featuredAt: currentlyFeatured ? null : new Date().toISOString()
        }),
      });

      if (response.ok) {
        const updatedArticle = await response.json();
        setArticles(articles.map(article =>
          article.id === articleId ? updatedArticle : article
        ));
      }
    } catch (error) {
      console.error('Error updating article:', error);
    }
  };

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.author.name?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || article.status === statusFilter;
    const matchesAuthor = authorFilter === 'ALL' || article.author.id === authorFilter;

    return matchesSearch && matchesStatus && matchesAuthor;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PUBLISHED': return '#4A8E55';
      case 'DRAFT': return '#C3A355';
      case 'ARCHIVED': return '#8A94A6';
      default: return '#8A94A6';
    }
  };

  const uniqueAuthors = [...new Map(articles.map(a => [a.author.id, a.author])).values()];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#121417' }}>
        <div className="text-white">Loading articles...</div>
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
                onClick={() => router.push('/dashboard/admin')}
                className="text-sm mb-2 hover:opacity-80 transition-opacity"
                style={{ color: '#8A94A6' }}
              >
                ← Back to Admin Dashboard
              </button>
              <h1 className="text-3xl font-light tracking-wider" style={{ color: '#E8ECEF' }}>
                Articles Management
              </h1>
              <p className="text-sm mt-1" style={{ color: '#8A94A6' }}>
                Manage all articles across the platform
              </p>
            </div>

            <button
              onClick={() => router.push('/dashboard/admin/articles/new')}
              className="px-6 py-3 rounded-lg font-light transition-all duration-300 hover:opacity-80"
              style={{
                background: 'linear-gradient(135deg, #4A8E55 0%, #C3A355 100%)',
                color: '#121417',
              }}
            >
              Create New Article
            </button>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 rounded-lg"
              style={{
                background: 'rgba(42, 46, 53, 0.8)',
                border: '1px solid rgba(195, 163, 85, 0.2)',
                color: '#E8ECEF',
              }}
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 rounded-lg"
              style={{
                background: 'rgba(42, 46, 53, 0.8)',
                border: '1px solid rgba(195, 163, 85, 0.2)',
                color: '#E8ECEF',
              }}
            >
              <option value="ALL">All Status</option>
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
              <option value="ARCHIVED">Archived</option>
            </select>

            <select
              value={authorFilter}
              onChange={(e) => setAuthorFilter(e.target.value)}
              className="px-4 py-2 rounded-lg"
              style={{
                background: 'rgba(42, 46, 53, 0.8)',
                border: '1px solid rgba(195, 163, 85, 0.2)',
                color: '#E8ECEF',
              }}
            >
              <option value="ALL">All Authors</option>
              {uniqueAuthors.map(author => (
                <option key={author.id} value={author.id}>
                  {author.name || author.email} ({author.role})
                </option>
              ))}
            </select>

            <div className="text-sm flex items-center" style={{ color: '#8A94A6' }}>
              {filteredArticles.length} of {articles.length} articles
            </div>
          </div>
        </div>
      </header>

      {/* Articles Table */}
      <main className="p-6">
        <div className="max-w-7xl mx-auto">
          {filteredArticles.length === 0 ? (
            <div
              className="text-center py-12 rounded-xl"
              style={{
                background: 'linear-gradient(135deg, rgba(42, 46, 53, 0.8) 0%, rgba(42, 46, 53, 0.4) 100%)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(195, 163, 85, 0.2)',
              }}
            >
              <p style={{ color: '#8A94A6' }}>No articles found</p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="overflow-x-auto rounded-xl"
              style={{
                background: 'linear-gradient(135deg, rgba(42, 46, 53, 0.8) 0%, rgba(42, 46, 53, 0.4) 100%)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(195, 163, 85, 0.2)',
              }}
            >
              <table className="w-full">
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(195, 163, 85, 0.2)' }}>
                    <th className="text-left p-4 font-light" style={{ color: '#C3A355' }}>Title</th>
                    <th className="text-left p-4 font-light" style={{ color: '#C3A355' }}>Author</th>
                    <th className="text-left p-4 font-light" style={{ color: '#C3A355' }}>Status</th>
                    <th className="text-left p-4 font-light" style={{ color: '#C3A355' }}>Views</th>
                    <th className="text-left p-4 font-light" style={{ color: '#C3A355' }}>Featured</th>
                    <th className="text-left p-4 font-light" style={{ color: '#C3A355' }}>Published</th>
                    <th className="text-left p-4 font-light" style={{ color: '#C3A355' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredArticles.map((article) => (
                    <tr
                      key={article.id}
                      className="hover:bg-black/20 transition-colors"
                      style={{ borderBottom: '1px solid rgba(195, 163, 85, 0.1)' }}
                    >
                      <td className="p-4">
                        <div>
                          <p className="font-light" style={{ color: '#E8ECEF' }}>
                            {article.title}
                          </p>
                          {article.excerpt && (
                            <p className="text-xs mt-1 line-clamp-1" style={{ color: '#8A94A6' }}>
                              {article.excerpt}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="text-sm" style={{ color: '#8A94A6' }}>
                          {article.author.name || article.author.email}
                        </p>
                        <p className="text-xs" style={{ color: '#8A94A6' }}>
                          {article.author.role}
                        </p>
                      </td>
                      <td className="p-4">
                        <span
                          className="px-2 py-1 rounded-full text-xs"
                          style={{
                            background: `${getStatusColor(article.status)}20`,
                            color: getStatusColor(article.status),
                            border: `1px solid ${getStatusColor(article.status)}40`,
                          }}
                        >
                          {article.status}
                        </span>
                      </td>
                      <td className="p-4 text-sm" style={{ color: '#8A94A6' }}>
                        {article.views}
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => toggleFeatured(article.id, !!article.featuredAt)}
                          className="text-2xl"
                          title={article.featuredAt ? 'Unfeature article' : 'Feature article'}
                        >
                          {article.featuredAt ? '⭐' : '☆'}
                        </button>
                      </td>
                      <td className="p-4 text-sm" style={{ color: '#8A94A6' }}>
                        {article.publishedAt
                          ? new Date(article.publishedAt).toLocaleDateString()
                          : '-'}
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => router.push(`/dashboard/admin/articles/${article.id}/edit`)}
                            className="px-3 py-1 rounded text-xs transition-colors hover:opacity-80"
                            style={{
                              background: 'rgba(74, 142, 85, 0.2)',
                              color: '#4A8E55',
                            }}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteArticle(article.id)}
                            className="px-3 py-1 rounded text-xs transition-colors hover:opacity-80"
                            style={{
                              background: 'rgba(220, 38, 38, 0.2)',
                              color: '#DC2626',
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 grid grid-cols-1 md:grid-cols-5 gap-4"
          >
            <div className="p-4 rounded-lg" style={{ background: 'rgba(42, 46, 53, 0.8)', border: '1px solid rgba(74, 142, 85, 0.2)' }}>
              <div className="text-2xl font-light" style={{ color: '#4A8E55' }}>
                {articles.filter(a => a.status === 'PUBLISHED').length}
              </div>
              <div className="text-sm" style={{ color: '#8A94A6' }}>Published</div>
            </div>
            <div className="p-4 rounded-lg" style={{ background: 'rgba(42, 46, 53, 0.8)', border: '1px solid rgba(195, 163, 85, 0.2)' }}>
              <div className="text-2xl font-light" style={{ color: '#C3A355' }}>
                {articles.filter(a => a.status === 'DRAFT').length}
              </div>
              <div className="text-sm" style={{ color: '#8A94A6' }}>Drafts</div>
            </div>
            <div className="p-4 rounded-lg" style={{ background: 'rgba(42, 46, 53, 0.8)', border: '1px solid rgba(34, 211, 238, 0.2)' }}>
              <div className="text-2xl font-light" style={{ color: '#22D3EE' }}>
                {articles.reduce((sum, a) => sum + a.views, 0)}
              </div>
              <div className="text-sm" style={{ color: '#8A94A6' }}>Total Views</div>
            </div>
            <div className="p-4 rounded-lg" style={{ background: 'rgba(42, 46, 53, 0.8)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
              <div className="text-2xl font-light" style={{ color: '#EF4444' }}>
                {articles.filter(a => a.featuredAt).length}
              </div>
              <div className="text-sm" style={{ color: '#8A94A6' }}>Featured</div>
            </div>
            <div className="p-4 rounded-lg" style={{ background: 'rgba(42, 46, 53, 0.8)', border: '1px solid rgba(138, 148, 166, 0.2)' }}>
              <div className="text-2xl font-light" style={{ color: '#E8ECEF' }}>
                {uniqueAuthors.length}
              </div>
              <div className="text-sm" style={{ color: '#8A94A6' }}>Authors</div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}