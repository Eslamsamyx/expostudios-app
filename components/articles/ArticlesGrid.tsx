'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import ArticleCard from './ArticleCard';
import ArticleFilters from './ArticleFilters';
import Pagination from '../shared/Pagination';
import type { Article, ArticlesResponse } from '@/lib/types/articles';

export default function ArticlesGrid() {
  const t = useTranslations('articles');
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Filters
  const [category, setCategory] = useState<string>('all');
  const [tag, setTag] = useState<string>('all');
  const [search, setSearch] = useState<string>('');

  const hasActiveFilters = category !== 'all' || tag !== 'all' || search !== '';

  const clearFilters = () => {
    setCategory('all');
    setTag('all');
    setSearch('');
    setPage(1);
  };

  // Fetch articles
  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: '9',
          ...(category !== 'all' && { category }),
          ...(tag !== 'all' && { tag }),
          ...(search && { search }),
        });

        const response = await fetch(`/api/public/articles?${params}`);
        if (!response.ok) throw new Error('Failed to fetch articles');

        const data: ArticlesResponse = await response.json();
        setArticles(data.articles);
        setCategories(data.categories);
        setTags(data.tags);
        setTotal(data.total);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [page, category, tag, search]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="py-20">
      {/* Filters */}
      <ArticleFilters
        categories={categories}
        tags={tags}
        activeCategory={category}
        activeTag={tag}
        onCategoryChange={(cat) => {
          setCategory(cat);
          setPage(1);
        }}
        onTagChange={(t) => {
          setTag(t);
          setPage(1);
        }}
        onSearchChange={(s) => {
          setSearch(s);
          setPage(1);
        }}
        hasActiveFilters={hasActiveFilters}
        onClearFilters={clearFilters}
      />

      {/* Articles Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-12">
        {loading ? (
          /* Loading State */
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-[var(--consult)] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-white/70">Loading articles...</p>
            </div>
          </div>
        ) : articles.length === 0 ? (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="glass-dark rounded-2xl p-12 max-w-lg mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">
                {t('empty.title')}
              </h3>
              <p className="text-white/70 mb-6">{t('empty.description')}</p>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 bg-gradient-to-r from-[var(--consult)] to-[var(--amplify)] text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
                >
                  {t('empty.button')}
                </button>
              )}
            </div>
          </motion.div>
        ) : (
          <>
            {/* Results Count */}
            <div className="mb-6 text-white/60 text-sm">
              Showing {articles.length} of {total} articles
            </div>

            {/* Grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${page}-${category}-${tag}-${search}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {articles.map((article, index) => (
                  <ArticleCard key={article.id} article={article} index={index} />
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Pagination */}
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </div>
  );
}
