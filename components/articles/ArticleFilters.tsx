'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { HiSearch, HiX } from 'react-icons/hi';
import FilterChip from '../shared/FilterChip';
import { useDebounce } from '@/lib/hooks/useDebounce';

interface ArticleFiltersProps {
  categories: string[];
  tags: string[];
  activeCategory: string;
  activeTag: string;
  onCategoryChange: (category: string) => void;
  onTagChange: (tag: string) => void;
  onSearchChange: (search: string) => void;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
}

export default function ArticleFilters({
  categories,
  tags,
  activeCategory,
  activeTag,
  onCategoryChange,
  onTagChange,
  onSearchChange,
  hasActiveFilters,
  onClearFilters,
}: ArticleFiltersProps) {
  const t = useTranslations('articles.filters');
  const [searchInput, setSearchInput] = useState('');
  const debouncedSearch = useDebounce(searchInput, 300);

  // Update parent when debounced search changes
  useState(() => {
    onSearchChange(debouncedSearch);
  });

  return (
    <div className="sticky top-20 z-40 bg-[var(--dark-bg-primary)]/95 backdrop-blur-lg border-b border-white/10 py-6">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-xl mx-auto">
            <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
                onSearchChange(e.target.value);
              }}
              placeholder={t('searchPlaceholder')}
              className="w-full pl-12 pr-12 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--accent-teal)] transition-colors"
            />
            {searchInput && (
              <button
                onClick={() => {
                  setSearchInput('');
                  onSearchChange('');
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
              >
                <HiX className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Categories */}
        {categories.length > 0 && (
          <div className="mb-4">
            <p className="text-sm text-white/50 mb-3">{t('category')}</p>
            <div className="flex flex-wrap gap-2">
              <FilterChip
                label={t('all')}
                active={activeCategory === 'all'}
                onClick={() => onCategoryChange('all')}
              />
              {categories.map((category) => (
                <FilterChip
                  key={category}
                  label={category}
                  active={activeCategory === category}
                  onClick={() => onCategoryChange(category)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div className="mb-4">
            <p className="text-sm text-white/50 mb-3">{t('tag')}</p>
            <div className="flex flex-wrap gap-2">
              <FilterChip
                label={t('all')}
                active={activeTag === 'all'}
                onClick={() => onTagChange('all')}
              />
              {tags.slice(0, 10).map((tag) => (
                <FilterChip
                  key={tag}
                  label={`#${tag}`}
                  active={activeTag === tag}
                  onClick={() => onTagChange(tag)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Clear Filters */}
        <AnimatePresence>
          {hasActiveFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4"
            >
              <button
                onClick={onClearFilters}
                className="text-sm text-[var(--accent-teal)] hover:underline flex items-center gap-2"
              >
                <HiX className="w-4 h-4" />
                {t('clearFilters')}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
