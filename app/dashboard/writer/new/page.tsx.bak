"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ArticleForm {
  title: string;
  excerpt: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  tags: string[];
  category: string;
  coverImage?: string;
  allowComments: boolean;
  isPremium: boolean;
}

export default function NewArticlePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [keywordInput, setKeywordInput] = useState('');
  const [tagInput, setTagInput] = useState('');

  const [article, setArticle] = useState<ArticleForm>({
    title: '',
    excerpt: '',
    content: '',
    metaTitle: '',
    metaDescription: '',
    keywords: [],
    tags: [],
    category: '',
    allowComments: true,
    isPremium: false,
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (session && !['ADMIN', 'WRITER'].includes(session.user.role)) {
      router.push("/dashboard");
    }
  }, [status, session, router]);

  const handleInputChange = (field: keyof ArticleForm, value: any) => {
    setArticle(prev => ({ ...prev, [field]: value }));
  };

  const addKeyword = () => {
    if (keywordInput.trim() && !article.keywords.includes(keywordInput.trim())) {
      setArticle(prev => ({
        ...prev,
        keywords: [...prev.keywords, keywordInput.trim()]
      }));
      setKeywordInput('');
    }
  };

  const removeKeyword = (keyword: string) => {
    setArticle(prev => ({
      ...prev,
      keywords: prev.keywords.filter(k => k !== keyword)
    }));
  };

  const addTag = () => {
    if (tagInput.trim() && !article.tags.includes(tagInput.trim())) {
      setArticle(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setArticle(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const saveArticle = async (status: 'DRAFT' | 'PUBLISHED') => {
    if (!article.title.trim()) {
      alert('Please enter a title for your article');
      return;
    }

    setSaving(true);

    try {
      const slug = generateSlug(article.title);
      const articleData = {
        ...article,
        slug,
        status,
        metaTitle: article.metaTitle || article.title,
        metaDescription: article.metaDescription || article.excerpt,
        publishedAt: status === 'PUBLISHED' ? new Date().toISOString() : null,
      };

      const response = await fetch('/api/dashboard/writer/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(articleData),
      });

      if (response.ok) {
        const createdArticle = await response.json();
        router.push('/dashboard/writer/articles');
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to save article');
      }
    } catch (error) {
      console.error('Error saving article:', error);
      alert('Failed to save article');
    } finally {
      setSaving(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#121417' }}>
        <div className="text-white">Loading...</div>
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
          <div className="flex items-center justify-between">
            <div>
              <button
                onClick={() => router.push('/dashboard/writer/articles')}
                className="text-sm mb-2 hover:opacity-80 transition-opacity"
                style={{ color: '#8A94A6' }}
              >
                ← Back to Articles
              </button>
              <h1 className="text-3xl font-light tracking-wider" style={{ color: '#E8ECEF' }}>
                Create New Article
              </h1>
              <p className="text-sm mt-1" style={{ color: '#8A94A6' }}>
                Write and publish your content
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => saveArticle('DRAFT')}
                disabled={saving}
                className="px-6 py-3 rounded-lg font-light transition-all duration-300 hover:opacity-80 disabled:opacity-50"
                style={{
                  background: 'rgba(195, 163, 85, 0.2)',
                  border: '1px solid rgba(195, 163, 85, 0.3)',
                  color: '#C3A355',
                }}
              >
                {saving ? 'Saving...' : 'Save Draft'}
              </button>

              <button
                onClick={() => saveArticle('PUBLISHED')}
                disabled={saving}
                className="px-6 py-3 rounded-lg font-light transition-all duration-300 hover:opacity-80 disabled:opacity-50"
                style={{
                  background: 'linear-gradient(135deg, #4A8E55 0%, #C3A355 100%)',
                  color: '#121417',
                }}
              >
                {saving ? 'Publishing...' : 'Publish Article'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Title */}
              <div
                className="p-6 rounded-xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(42, 46, 53, 0.8) 0%, rgba(42, 46, 53, 0.4) 100%)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(74, 142, 85, 0.2)',
                }}
              >
                <label className="block text-sm font-light mb-2" style={{ color: '#8A94A6' }}>
                  Article Title *
                </label>
                <input
                  type="text"
                  value={article.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter your article title..."
                  className="w-full px-4 py-3 rounded-lg text-lg"
                  style={{
                    background: 'rgba(0, 0, 0, 0.3)',
                    border: '1px solid rgba(74, 142, 85, 0.2)',
                    color: '#E8ECEF',
                  }}
                />
              </div>

              {/* Excerpt */}
              <div
                className="p-6 rounded-xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(42, 46, 53, 0.8) 0%, rgba(42, 46, 53, 0.4) 100%)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(74, 142, 85, 0.2)',
                }}
              >
                <label className="block text-sm font-light mb-2" style={{ color: '#8A94A6' }}>
                  Excerpt
                </label>
                <textarea
                  value={article.excerpt}
                  onChange={(e) => handleInputChange('excerpt', e.target.value)}
                  placeholder="Write a brief summary of your article..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg resize-none"
                  style={{
                    background: 'rgba(0, 0, 0, 0.3)',
                    border: '1px solid rgba(74, 142, 85, 0.2)',
                    color: '#E8ECEF',
                  }}
                />
              </div>

              {/* Content */}
              <div
                className="p-6 rounded-xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(42, 46, 53, 0.8) 0%, rgba(42, 46, 53, 0.4) 100%)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(74, 142, 85, 0.2)',
                }}
              >
                <label className="block text-sm font-light mb-2" style={{ color: '#8A94A6' }}>
                  Content *
                </label>
                <textarea
                  value={article.content}
                  onChange={(e) => handleInputChange('content', e.target.value)}
                  placeholder="Write your article content here..."
                  rows={20}
                  className="w-full px-4 py-3 rounded-lg resize-none"
                  style={{
                    background: 'rgba(0, 0, 0, 0.3)',
                    border: '1px solid rgba(74, 142, 85, 0.2)',
                    color: '#E8ECEF',
                  }}
                />
                <p className="text-xs mt-2" style={{ color: '#8A94A6' }}>
                  You can use Markdown formatting in your content
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Category & Tags */}
              <div
                className="p-6 rounded-xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(42, 46, 53, 0.8) 0%, rgba(42, 46, 53, 0.4) 100%)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(74, 142, 85, 0.2)',
                }}
              >
                <h3 className="text-lg font-light tracking-wider mb-4" style={{ color: '#4A8E55' }}>
                  Organization
                </h3>

                {/* Category */}
                <div className="mb-4">
                  <label className="block text-sm font-light mb-2" style={{ color: '#8A94A6' }}>
                    Category
                  </label>
                  <input
                    type="text"
                    value={article.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    placeholder="e.g., Exhibition Design"
                    className="w-full px-3 py-2 rounded-lg"
                    style={{
                      background: 'rgba(0, 0, 0, 0.3)',
                      border: '1px solid rgba(74, 142, 85, 0.2)',
                      color: '#E8ECEF',
                    }}
                  />
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-light mb-2" style={{ color: '#8A94A6' }}>
                    Tags
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                      placeholder="Add tags..."
                      className="flex-1 px-3 py-2 rounded-lg"
                      style={{
                        background: 'rgba(0, 0, 0, 0.3)',
                        border: '1px solid rgba(74, 142, 85, 0.2)',
                        color: '#E8ECEF',
                      }}
                    />
                    <button
                      onClick={addTag}
                      className="px-3 py-2 rounded-lg"
                      style={{
                        background: 'rgba(74, 142, 85, 0.2)',
                        border: '1px solid rgba(74, 142, 85, 0.3)',
                        color: '#4A8E55',
                      }}
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-1 rounded text-sm flex items-center gap-1"
                        style={{
                          background: 'rgba(74, 142, 85, 0.2)',
                          color: '#4A8E55',
                        }}
                      >
                        {tag}
                        <button
                          onClick={() => removeTag(tag)}
                          className="ml-1 text-xs hover:opacity-70"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* SEO Settings */}
              <div
                className="p-6 rounded-xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(42, 46, 53, 0.8) 0%, rgba(42, 46, 53, 0.4) 100%)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(195, 163, 85, 0.2)',
                }}
              >
                <h3 className="text-lg font-light tracking-wider mb-4" style={{ color: '#C3A355' }}>
                  SEO Settings
                </h3>

                {/* Meta Title */}
                <div className="mb-4">
                  <label className="block text-sm font-light mb-2" style={{ color: '#8A94A6' }}>
                    Meta Title
                  </label>
                  <input
                    type="text"
                    value={article.metaTitle}
                    onChange={(e) => handleInputChange('metaTitle', e.target.value)}
                    placeholder="SEO title (optional, uses article title if empty)"
                    className="w-full px-3 py-2 rounded-lg"
                    style={{
                      background: 'rgba(0, 0, 0, 0.3)',
                      border: '1px solid rgba(195, 163, 85, 0.2)',
                      color: '#E8ECEF',
                    }}
                  />
                </div>

                {/* Meta Description */}
                <div className="mb-4">
                  <label className="block text-sm font-light mb-2" style={{ color: '#8A94A6' }}>
                    Meta Description
                  </label>
                  <textarea
                    value={article.metaDescription}
                    onChange={(e) => handleInputChange('metaDescription', e.target.value)}
                    placeholder="SEO description (optional, uses excerpt if empty)"
                    rows={3}
                    className="w-full px-3 py-2 rounded-lg resize-none"
                    style={{
                      background: 'rgba(0, 0, 0, 0.3)',
                      border: '1px solid rgba(195, 163, 85, 0.2)',
                      color: '#E8ECEF',
                    }}
                  />
                </div>

                {/* Keywords */}
                <div>
                  <label className="block text-sm font-light mb-2" style={{ color: '#8A94A6' }}>
                    SEO Keywords
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={keywordInput}
                      onChange={(e) => setKeywordInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addKeyword())}
                      placeholder="Add keywords..."
                      className="flex-1 px-3 py-2 rounded-lg"
                      style={{
                        background: 'rgba(0, 0, 0, 0.3)',
                        border: '1px solid rgba(195, 163, 85, 0.2)',
                        color: '#E8ECEF',
                      }}
                    />
                    <button
                      onClick={addKeyword}
                      className="px-3 py-2 rounded-lg"
                      style={{
                        background: 'rgba(195, 163, 85, 0.2)',
                        border: '1px solid rgba(195, 163, 85, 0.3)',
                        color: '#C3A355',
                      }}
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {article.keywords.map(keyword => (
                      <span
                        key={keyword}
                        className="px-2 py-1 rounded text-sm flex items-center gap-1"
                        style={{
                          background: 'rgba(195, 163, 85, 0.2)',
                          color: '#C3A355',
                        }}
                      >
                        {keyword}
                        <button
                          onClick={() => removeKeyword(keyword)}
                          className="ml-1 text-xs hover:opacity-70"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Article Settings */}
              <div
                className="p-6 rounded-xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(42, 46, 53, 0.8) 0%, rgba(42, 46, 53, 0.4) 100%)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(34, 211, 238, 0.2)',
                }}
              >
                <h3 className="text-lg font-light tracking-wider mb-4" style={{ color: '#22D3EE' }}>
                  Article Settings
                </h3>

                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={article.allowComments}
                      onChange={(e) => handleInputChange('allowComments', e.target.checked)}
                      className="w-4 h-4 rounded"
                      style={{ accentColor: '#22D3EE' }}
                    />
                    <span className="text-sm" style={{ color: '#E8ECEF' }}>
                      Allow Comments
                    </span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={article.isPremium}
                      onChange={(e) => handleInputChange('isPremium', e.target.checked)}
                      className="w-4 h-4 rounded"
                      style={{ accentColor: '#22D3EE' }}
                    />
                    <span className="text-sm" style={{ color: '#E8ECEF' }}>
                      Premium Content
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}