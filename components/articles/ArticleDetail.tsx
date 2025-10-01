'use client';

import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { Article } from '@/lib/types/articles';
import { formatReadingTime } from '@/lib/utils/readingTime';
import { HiEye, HiClock, HiCalendar, HiUser } from 'react-icons/hi';
import ShareButtons from './ShareButtons';
import '@/app/article-content.css';

interface ArticleDetailProps {
  article: Article;
}

export default function ArticleDetail({ article }: ArticleDetailProps) {
  const t = useTranslations('articles.detail');
  const locale = useLocale();

  const handleShare = async () => {
    try {
      await fetch(`/api/public/articles/${article.slug}/share`, {
        method: 'PATCH',
      });
    } catch (error) {
      console.error('Failed to track share:', error);
    }
  };

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString(locale === 'ar' ? 'ar-EG' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <article className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <ol className="flex items-center gap-2 text-sm text-white/60">
            <li>
              <Link
                href={`/${locale}`}
                className="hover:text-white transition-colors"
              >
                {t('home')}
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link
                href={`/${locale}/articles`}
                className="hover:text-white transition-colors"
              >
                {t('articles')}
              </Link>
            </li>
            <li>/</li>
            <li className="text-white/40 truncate max-w-[200px]">
              {article.title}
            </li>
          </ol>
        </motion.nav>

        {/* Article Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          {/* Category & Featured Badge */}
          <div className="flex items-center gap-3 mb-4">
            {article.category && (
              <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-[var(--consult)] to-[var(--amplify)] text-white">
                {article.category}
              </span>
            )}
            {article.featuredAt && (
              <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-[var(--create)] to-[var(--build)] text-white">
                {t('featured')}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {article.title}
          </h1>

          {/* Excerpt */}
          {article.excerpt && (
            <p className="text-xl md:text-2xl text-white/70 mb-8 leading-relaxed">
              {article.excerpt}
            </p>
          )}

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 pb-6 border-b border-white/10">
            {/* Author */}
            <div className="flex items-center gap-3">
              {article.author.avatar ? (
                <Image
                  src={article.author.avatar}
                  alt={article.author.name || 'Author'}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--consult)] to-[var(--amplify)] flex items-center justify-center">
                  <HiUser className="w-6 h-6 text-white" />
                </div>
              )}
              <div>
                <p className="text-white font-medium">
                  {article.author.name || t('author')}
                </p>
                <p className="text-white/60 text-sm">{article.author.bio}</p>
              </div>
            </div>

            <div className="h-8 w-px bg-white/10" />

            {/* Date */}
            <div className="flex items-center gap-2 text-white/60">
              <HiCalendar className="w-5 h-5" />
              <span className="text-sm">
                {t('publishedOn')} {formatDate(article.publishedAt)}
              </span>
            </div>

            <div className="h-8 w-px bg-white/10" />

            {/* Reading Time */}
            <div className="flex items-center gap-2 text-white/60">
              <HiClock className="w-5 h-5" />
              <span className="text-sm">
                {formatReadingTime(article.readingTime || 1, locale)}
              </span>
            </div>

            <div className="h-8 w-px bg-white/10" />

            {/* Views */}
            <div className="flex items-center gap-2 text-white/60">
              <HiEye className="w-5 h-5" />
              <span className="text-sm">
                {article.views.toLocaleString()} {t('views')}
              </span>
            </div>
          </div>
        </motion.header>

        {/* Cover Image */}
        {article.coverImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12 rounded-2xl overflow-hidden"
          >
            <Image
              src={article.coverImage}
              alt={article.title}
              width={1200}
              height={600}
              className="w-full h-auto object-cover"
              priority
            />
          </motion.div>
        )}

        {/* Share Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-end mb-12"
        >
          <ShareButtons
            url={currentUrl}
            title={article.title}
            excerpt={article.excerpt || undefined}
            onShare={handleShare}
          />
        </motion.div>

        {/* Article Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="article-content max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Tags */}
        {article.tags.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="pt-8 border-t border-white/10"
          >
            <h3 className="text-white/60 text-sm font-medium mb-4">
              {t('tags')}
            </h3>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/${locale}/articles?tag=${encodeURIComponent(tag)}`}
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-white/5 text-white hover:bg-white/10 transition-all border border-white/10"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </article>
  );
}
