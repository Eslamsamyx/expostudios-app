"use client";


import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const dynamic = 'force-dynamic';

interface Article {
  id: string;
  title: string;
  excerpt?: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  author: {
    name?: string;
    email: string;
  };
  views: number;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  category?: string;
  tags: string[];
}

export default function ArticlesManagementPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (session && !['ADMIN', 'WRITER'].includes(session.user.role)) {
      router.push("/dashboard");
    }
  }, [status, session, router]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('/api/dashboard/writer/articles');
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

    if (session && ['ADMIN', 'WRITER'].includes(session.user.role)) {
      fetchArticles();
    }
  }, [session]);

  const deleteArticle = async (articleId: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return;

    try {
      const response = await fetch(`/api/dashboard/writer/articles/${articleId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setArticles(articles.filter(article => article.id !== articleId));
      }
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };

  const updateArticleStatus = async (articleId: string, newStatus: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED') => {
    try {
      const response = await fetch(`/api/dashboard/writer/articles/${articleId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        const updatedArticle = await response.json();
        setArticles(articles.map(article =>
          article.id === articleId ? updatedArticle : article
        ));
      }
    } catch (error) {
      console.error('Error updating article status:', error);
    }
  };

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.author.name?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || article.status === statusFilter;
    const matchesCategory = categoryFilter === 'ALL' || article.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PUBLISHED': return '#4A8E55';
      case 'DRAFT': return '#C3A355';
      case 'ARCHIVED': return '#8A94A6';
      default: return '#8A94A6';
    }
  };

  const categories = [...new Set(articles.map(a => a.category).filter(Boolean))];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#121417' }}>
        <div className="text-white">Loading articles...</div>
      </div>
    );
  }

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
      <header className="relative z-10 p-6 border-b" style={{ borderColor: 'rgba(74, 142, 85, 0.2)' }}>
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
                Article Management
              </h1>
              <p className="text-sm mt-1" style={{ color: '#8A94A6' }}>
                Manage your content library
              </p>
            </div>

            <button
              onClick={() => router.push('/dashboard/writer/new')}
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
                border: '1px solid rgba(74, 142, 85, 0.2)',
                color: '#E8ECEF',
              }}
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 rounded-lg"
              style={{
                background: 'rgba(42, 46, 53, 0.8)',
                border: '1px solid rgba(74, 142, 85, 0.2)',
                color: '#E8ECEF',
              }}
            >
              <option value="ALL">All Status</option>
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
              <option value="ARCHIVED">Archived</option>
            </select>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 rounded-lg"
              style={{
                background: 'rgba(42, 46, 53, 0.8)',
                border: '1px solid rgba(74, 142, 85, 0.2)',
                color: '#E8ECEF',
              }}
            >
              <option value="ALL">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            <div className="text-sm flex items-center" style={{ color: '#8A94A6' }}>
              {filteredArticles.length} of {articles.length} articles
            </div>
          </div>
        </div>
      </header>

      {/* Articles Grid */}
      <main className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto">
          {filteredArticles.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-light mb-2" style={{ color: '#E8ECEF' }}>
                No articles found
              </h3>
              <p className="text-sm mb-6" style={{ color: '#8A94A6' }}>
                {articles.length === 0 ? 'Create your first article to get started' : 'Try adjusting your filters'}
              </p>
              {articles.length === 0 && (
                <button
                  onClick={() => router.push('/dashboard/writer/new')}
                  className="px-6 py-3 rounded-lg font-light transition-all duration-300 hover:opacity-80"
                  style={{
                    background: 'linear-gradient(135deg, #4A8E55 0%, #C3A355 100%)',
                    color: '#121417',
                  }}
                >
                  Create First Article
                </button>
              )}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              {filteredArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="rounded-xl p-6 relative overflow-hidden group hover:scale-105 transition-all duration-300"
                  style={{
                    background: 'linear-gradient(135deg, rgba(42, 46, 53, 0.8) 0%, rgba(42, 46, 53, 0.4) 100%)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(74, 142, 85, 0.2)',
                  }}
                >
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-light"
                      style={{
                        background: `${getStatusColor(article.status)}20`,
                        color: getStatusColor(article.status),
                        border: `1px solid ${getStatusColor(article.status)}40`,
                      }}
                    >
                      {article.status}
                    </span>
                  </div>

                  {/* Article Content */}
                  <div className="mb-4">
                    <h3 className="text-lg font-light tracking-wide mb-2 pr-20" style={{ color: '#E8ECEF' }}>
                      {article.title}
                    </h3>
                    {article.excerpt && (
                      <p className="text-sm line-clamp-2 mb-3" style={{ color: '#8A94A6' }}>
                        {article.excerpt}
                      </p>
                    )}

                    <div className="flex flex-wrap gap-1 mb-3">
                      {article.tags.slice(0, 3).map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-1 rounded text-xs"
                          style={{
                            background: 'rgba(74, 142, 85, 0.2)',
                            color: '#4A8E55',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                      {article.tags.length > 3 && (
                        <span className="text-xs" style={{ color: '#8A94A6' }}>
                          +{article.tags.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Author & Stats */}
                  <div className="text-xs mb-4" style={{ color: '#8A94A6' }}>
                    <div className="flex justify-between items-center mb-1">
                      <span>By {article.author.name || 'Unknown'}</span>
                      <span>{article.views} views</span>
                    </div>
                    <div>
                      {article.status === 'PUBLISHED' && article.publishedAt
                        ? `Published ${new Date(article.publishedAt).toLocaleDateString()}`
                        : `Created ${new Date(article.createdAt).toLocaleDateString()}`
                      }
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => router.push(`/dashboard/writer/articles/${article.id}/edit`)}
                      className="flex-1 px-3 py-2 rounded-lg text-sm transition-all duration-300 hover:opacity-80"
                      style={{
                        background: 'rgba(74, 142, 85, 0.2)',
                        border: '1px solid rgba(74, 142, 85, 0.3)',
                        color: '#4A8E55',
                      }}
                    >
                      Edit
                    </button>

                    {article.status === 'DRAFT' && (
                      <button
                        onClick={() => updateArticleStatus(article.id, 'PUBLISHED')}
                        className="flex-1 px-3 py-2 rounded-lg text-sm transition-all duration-300 hover:opacity-80"
                        style={{
                          background: 'rgba(195, 163, 85, 0.2)',
                          border: '1px solid rgba(195, 163, 85, 0.3)',
                          color: '#C3A355',
                        }}
                      >
                        Publish
                      </button>
                    )}

                    {article.status === 'PUBLISHED' && (
                      <button
                        onClick={() => updateArticleStatus(article.id, 'ARCHIVED')}
                        className="flex-1 px-3 py-2 rounded-lg text-sm transition-all duration-300 hover:opacity-80"
                        style={{
                          background: 'rgba(138, 148, 166, 0.2)',
                          border: '1px solid rgba(138, 148, 166, 0.3)',
                          color: '#8A94A6',
                        }}
                      >
                        Archive
                      </button>
                    )}

                    <button
                      onClick={() => deleteArticle(article.id)}
                      className="px-3 py-2 rounded-lg text-sm transition-all duration-300 hover:opacity-80"
                      style={{
                        background: 'rgba(220, 38, 38, 0.2)',
                        border: '1px solid rgba(220, 38, 38, 0.3)',
                        color: '#DC2626',
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4"
          >
            <div className="p-4 rounded-lg" style={{ background: 'rgba(42, 46, 53, 0.8)', border: '1px solid rgba(74, 142, 85, 0.2)' }}>
              <div className="text-2xl font-light" style={{ color: '#4A8E55' }}>
                {articles.filter(a => a.status === 'PUBLISHED').length}
              </div>
              <div className="text-sm" style={{ color: '#8A94A6' }}>Published Articles</div>
            </div>

            <div className="p-4 rounded-lg" style={{ background: 'rgba(42, 46, 53, 0.8)', border: '1px solid rgba(195, 163, 85, 0.2)' }}>
              <div className="text-2xl font-light" style={{ color: '#C3A355' }}>
                {articles.filter(a => a.status === 'DRAFT').length}
              </div>
              <div className="text-sm" style={{ color: '#8A94A6' }}>Draft Articles</div>
            </div>

            <div className="p-4 rounded-lg" style={{ background: 'rgba(42, 46, 53, 0.8)', border: '1px solid rgba(34, 211, 238, 0.2)' }}>
              <div className="text-2xl font-light" style={{ color: '#22D3EE' }}>
                {articles.reduce((sum, a) => sum + a.views, 0)}
              </div>
              <div className="text-sm" style={{ color: '#8A94A6' }}>Total Views</div>
            </div>

            <div className="p-4 rounded-lg" style={{ background: 'rgba(42, 46, 53, 0.8)', border: '1px solid rgba(138, 148, 166, 0.2)' }}>
              <div className="text-2xl font-light" style={{ color: '#E8ECEF' }}>
                {categories.length}
              </div>
              <div className="text-sm" style={{ color: '#8A94A6' }}>Categories</div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
