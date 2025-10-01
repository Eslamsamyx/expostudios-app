import { useState, useMemo } from 'react';
import type { Article } from '@/lib/types/articles';

export function useArticlesFilters(articles: Article[]) {
  const [category, setCategory] = useState<string | 'all'>('all');
  const [tag, setTag] = useState<string | 'all'>('all');
  const [search, setSearch] = useState<string>('');
  const [featured, setFeatured] = useState<boolean>(false);

  // Filter articles based on current filters
  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      // Filter by category
      if (category !== 'all' && article.category !== category) {
        return false;
      }

      // Filter by tag
      if (tag !== 'all' && !article.tags.includes(tag)) {
        return false;
      }

      // Filter by featured
      if (featured && !article.featuredAt) {
        return false;
      }

      // Filter by search (title, excerpt, content)
      if (search) {
        const searchLower = search.toLowerCase();
        const matchesTitle = article.title.toLowerCase().includes(searchLower);
        const matchesExcerpt = article.excerpt?.toLowerCase().includes(searchLower);
        const matchesContent = article.content.toLowerCase().includes(searchLower);

        if (!matchesTitle && !matchesExcerpt && !matchesContent) {
          return false;
        }
      }

      return true;
    });
  }, [articles, category, tag, search, featured]);

  // Get unique categories from all articles
  const categories = useMemo(() => {
    const cats = articles
      .map((a) => a.category)
      .filter((c): c is string => c !== null);
    return Array.from(new Set(cats));
  }, [articles]);

  // Get unique tags from all articles
  const tags = useMemo(() => {
    const allTags = articles.flatMap((a) => a.tags);
    return Array.from(new Set(allTags));
  }, [articles]);

  const toggleCategory = (cat: string) => {
    setCategory(category === cat ? 'all' : cat);
  };

  const toggleTag = (t: string) => {
    setTag(tag === t ? 'all' : t);
  };

  const toggleFeatured = () => {
    setFeatured(!featured);
  };

  const clearFilters = () => {
    setCategory('all');
    setTag('all');
    setSearch('');
    setFeatured(false);
  };

  const hasActiveFilters = category !== 'all' || tag !== 'all' || search !== '' || featured;

  return {
    category,
    tag,
    search,
    featured,
    filteredArticles,
    categories,
    tags,
    setCategory,
    setTag,
    setSearch,
    toggleCategory,
    toggleTag,
    toggleFeatured,
    clearFilters,
    hasActiveFilters,
  };
}
