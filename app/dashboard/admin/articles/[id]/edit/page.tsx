"use client";

import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  content: string;
  coverImage?: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords: string[];
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  publishedAt?: string;
  featuredAt?: string;
  authorId: string;
  author: {
    id: string;
    name?: string;
    email: string;
  };
  views: number;
  shares: number;
  category?: string;
  tags: string[];
  allowComments: boolean;
  isPremium: boolean;
  createdAt: string;
  updatedAt: string;
}

const categories = [
  'Technology',
  'Design',
  'Business',
  'Marketing',
  'Development',
  'Innovation',
  'Case Study',
  'Tutorial',
  'News',
  'Announcement'
];

export default function EditArticlePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const articleId = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [article, setArticle] = useState<Article | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    coverImage: '',
    metaTitle: '',
    metaDescription: '',
    keywords: '',
    status: 'DRAFT' as 'DRAFT' | 'PUBLISHED' | 'ARCHIVED',
    category: '',
    tags: '',
    allowComments: true,
    isPremium: false,
    featuredAt: false,
    authorId: '',
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (session && session.user.role !== 'ADMIN') {
      router.push("/dashboard");
    }
  }, [status, session, router]);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`/api/dashboard/admin/articles/${articleId}`);
        if (response.ok) {
          const data = await response.json();
          setArticle(data);
          setFormData({
            title: data.title,
            slug: data.slug,
            excerpt: data.excerpt || '',
            content: data.content,
            coverImage: data.coverImage || '',
            metaTitle: data.metaTitle || '',
            metaDescription: data.metaDescription || '',
            keywords: data.keywords.join(', '),
            status: data.status,
            category: data.category || '',
            tags: data.tags.join(', '),
            allowComments: data.allowComments,
            isPremium: data.isPremium,
            featuredAt: !!data.featuredAt,
            authorId: data.authorId,
          });
        } else if (response.status === 404) {
          router.push('/dashboard/admin/articles');
        }
      } catch (error) {
        console.error('Error fetching article:', error);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user.role === 'ADMIN' && articleId) {
      fetchArticle();
    }
  }, [session, articleId, router]);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 100);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const updateData = {
        ...formData,
        keywords: formData.keywords.split(',').map(k => k.trim()).filter(Boolean),
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
        featuredAt: formData.featuredAt ? (article?.featuredAt || new Date().toISOString()) : null,
        publishedAt: formData.status === 'PUBLISHED' && !article?.publishedAt
          ? new Date().toISOString()
          : article?.publishedAt,
      };

      const response = await fetch(`/api/dashboard/admin/articles/${articleId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (response.ok) {
        router.push('/dashboard/admin/articles');
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to update article');
      }
    } catch (error) {
      console.error('Error updating article:', error);
      alert('Failed to update article');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#121417' }}>
        <div className="text-white">Loading article...</div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#121417' }}>
        <div className="text-white">Article not found</div>
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
                onClick={() => router.push('/dashboard/admin/articles')}
                className="text-sm mb-2 hover:opacity-80 transition-opacity"
                style={{ color: '#8A94A6' }}
              >
                ← Back to Articles
              </button>
              <h1 className="text-3xl font-light tracking-wider" style={{ color: '#E8ECEF' }}>
                Edit Article
              </h1>
              <p className="text-sm mt-1" style={{ color: '#8A94A6' }}>
                ID: {article.id}
              </p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => window.open(`/articles/${article.slug}`, '_blank')}
                className="px-6 py-3 rounded-lg font-light transition-all duration-300 hover:opacity-80"
                style={{
                  background: 'rgba(42, 46, 53, 0.8)',
                  border: '1px solid rgba(195, 163, 85, 0.2)',
                  color: '#E8ECEF',
                }}
              >
                Preview
              </button>
              <button
                onClick={handleSubmit}
                disabled={saving}
                className="px-6 py-3 rounded-lg font-light transition-all duration-300 hover:opacity-80 disabled:opacity-50"
                style={{
                  background: 'linear-gradient(135deg, #4A8E55 0%, #C3A355 100%)',
                  color: '#121417',
                }}
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Edit Form */}
      <main className="p-6">
        <div className="max-w-7xl mx-auto">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl p-6"
                style={{
                  background: 'linear-gradient(135deg, rgba(42, 46, 53, 0.8) 0%, rgba(42, 46, 53, 0.4) 100%)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(195, 163, 85, 0.2)',
                }}
              >
                <h2 className="text-xl font-light mb-4" style={{ color: '#C3A355' }}>
                  Basic Information
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm mb-2" style={{ color: '#8A94A6' }}>
                      Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          title: e.target.value,
                          slug: generateSlug(e.target.value)
                        });
                      }}
                      className="w-full px-4 py-2 rounded-lg"
                      style={{
                        background: 'rgba(42, 46, 53, 0.8)',
                        border: '1px solid rgba(195, 163, 85, 0.2)',
                        color: '#E8ECEF',
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-2" style={{ color: '#8A94A6' }}>
                      Slug *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg"
                      style={{
                        background: 'rgba(42, 46, 53, 0.8)',
                        border: '1px solid rgba(195, 163, 85, 0.2)',
                        color: '#E8ECEF',
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-2" style={{ color: '#8A94A6' }}>
                      Excerpt
                    </label>
                    <textarea
                      value={formData.excerpt}
                      onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-2 rounded-lg"
                      style={{
                        background: 'rgba(42, 46, 53, 0.8)',
                        border: '1px solid rgba(195, 163, 85, 0.2)',
                        color: '#E8ECEF',
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-2" style={{ color: '#8A94A6' }}>
                      Content *
                    </label>
                    <textarea
                      required
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      rows={15}
                      className="w-full px-4 py-2 rounded-lg font-mono text-sm"
                      style={{
                        background: 'rgba(42, 46, 53, 0.8)',
                        border: '1px solid rgba(195, 163, 85, 0.2)',
                        color: '#E8ECEF',
                      }}
                      placeholder="Write your article content here... (Supports Markdown)"
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-2" style={{ color: '#8A94A6' }}>
                      Cover Image URL
                    </label>
                    <input
                      type="url"
                      value={formData.coverImage}
                      onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg"
                      style={{
                        background: 'rgba(42, 46, 53, 0.8)',
                        border: '1px solid rgba(195, 163, 85, 0.2)',
                        color: '#E8ECEF',
                      }}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </div>
              </motion.div>

              {/* SEO Settings */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="rounded-xl p-6"
                style={{
                  background: 'linear-gradient(135deg, rgba(42, 46, 53, 0.8) 0%, rgba(42, 46, 53, 0.4) 100%)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(195, 163, 85, 0.2)',
                }}
              >
                <h2 className="text-xl font-light mb-4" style={{ color: '#C3A355' }}>
                  SEO Settings
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm mb-2" style={{ color: '#8A94A6' }}>
                      Meta Title
                    </label>
                    <input
                      type="text"
                      value={formData.metaTitle}
                      onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg"
                      style={{
                        background: 'rgba(42, 46, 53, 0.8)',
                        border: '1px solid rgba(195, 163, 85, 0.2)',
                        color: '#E8ECEF',
                      }}
                      placeholder={formData.title || 'Page title for search engines'}
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-2" style={{ color: '#8A94A6' }}>
                      Meta Description
                    </label>
                    <textarea
                      value={formData.metaDescription}
                      onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                      rows={3}
                      maxLength={160}
                      className="w-full px-4 py-2 rounded-lg"
                      style={{
                        background: 'rgba(42, 46, 53, 0.8)',
                        border: '1px solid rgba(195, 163, 85, 0.2)',
                        color: '#E8ECEF',
                      }}
                      placeholder={formData.excerpt || 'Description for search engines (max 160 chars)'}
                    />
                    <p className="text-xs mt-1" style={{ color: '#8A94A6' }}>
                      {formData.metaDescription.length}/160 characters
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm mb-2" style={{ color: '#8A94A6' }}>
                      Keywords (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={formData.keywords}
                      onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg"
                      style={{
                        background: 'rgba(42, 46, 53, 0.8)',
                        border: '1px solid rgba(195, 163, 85, 0.2)',
                        color: '#E8ECEF',
                      }}
                      placeholder="keyword1, keyword2, keyword3"
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Sidebar Column */}
            <div className="space-y-6">
              {/* Publishing Settings */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="rounded-xl p-6"
                style={{
                  background: 'linear-gradient(135deg, rgba(42, 46, 53, 0.8) 0%, rgba(42, 46, 53, 0.4) 100%)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(195, 163, 85, 0.2)',
                }}
              >
                <h2 className="text-xl font-light mb-4" style={{ color: '#C3A355' }}>
                  Publishing
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm mb-2" style={{ color: '#8A94A6' }}>
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                      className="w-full px-4 py-2 rounded-lg"
                      style={{
                        background: 'rgba(42, 46, 53, 0.8)',
                        border: '1px solid rgba(195, 163, 85, 0.2)',
                        color: '#E8ECEF',
                      }}
                    >
                      <option value="DRAFT">Draft</option>
                      <option value="PUBLISHED">Published</option>
                      <option value="ARCHIVED">Archived</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm mb-2" style={{ color: '#8A94A6' }}>
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg"
                      style={{
                        background: 'rgba(42, 46, 53, 0.8)',
                        border: '1px solid rgba(195, 163, 85, 0.2)',
                        color: '#E8ECEF',
                      }}
                    >
                      <option value="">Select a category</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm mb-2" style={{ color: '#8A94A6' }}>
                      Tags (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={formData.tags}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg"
                      style={{
                        background: 'rgba(42, 46, 53, 0.8)',
                        border: '1px solid rgba(195, 163, 85, 0.2)',
                        color: '#E8ECEF',
                      }}
                      placeholder="tag1, tag2, tag3"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.featuredAt}
                        onChange={(e) => setFormData({ ...formData, featuredAt: e.target.checked })}
                        className="w-4 h-4"
                      />
                      <span style={{ color: '#8A94A6' }}>Feature this article</span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.allowComments}
                        onChange={(e) => setFormData({ ...formData, allowComments: e.target.checked })}
                        className="w-4 h-4"
                      />
                      <span style={{ color: '#8A94A6' }}>Allow comments</span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.isPremium}
                        onChange={(e) => setFormData({ ...formData, isPremium: e.target.checked })}
                        className="w-4 h-4"
                      />
                      <span style={{ color: '#8A94A6' }}>Premium content</span>
                    </label>
                  </div>
                </div>
              </motion.div>

              {/* Article Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="rounded-xl p-6"
                style={{
                  background: 'linear-gradient(135deg, rgba(42, 46, 53, 0.8) 0%, rgba(42, 46, 53, 0.4) 100%)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(195, 163, 85, 0.2)',
                }}
              >
                <h2 className="text-xl font-light mb-4" style={{ color: '#C3A355' }}>
                  Article Info
                </h2>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span style={{ color: '#8A94A6' }}>Author:</span>
                    <span style={{ color: '#E8ECEF' }}>
                      {article.author.name || article.author.email}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: '#8A94A6' }}>Views:</span>
                    <span style={{ color: '#E8ECEF' }}>{article.views}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: '#8A94A6' }}>Shares:</span>
                    <span style={{ color: '#E8ECEF' }}>{article.shares}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: '#8A94A6' }}>Created:</span>
                    <span style={{ color: '#E8ECEF' }}>
                      {new Date(article.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: '#8A94A6' }}>Updated:</span>
                    <span style={{ color: '#E8ECEF' }}>
                      {new Date(article.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                  {article.publishedAt && (
                    <div className="flex justify-between">
                      <span style={{ color: '#8A94A6' }}>Published:</span>
                      <span style={{ color: '#E8ECEF' }}>
                        {new Date(article.publishedAt).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}