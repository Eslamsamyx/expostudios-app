'use client';

import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { HiClock, HiEye, HiUser } from 'react-icons/hi';
import type { Article } from '@/lib/types/articles';
import { formatReadingTime } from '@/lib/utils/readingTime';

interface ArticleCardProps {
  article: Article;
  index?: number;
}

export default function ArticleCard({ article, index = 0 }: ArticleCardProps) {
  const locale = useLocale();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group h-full"
    >
      <Link
        href={`/${locale}/articles/${article.slug}`}
        className="block h-full bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300"
      >
        {/* Cover Image */}
        {article.coverImage && (
          <div className="relative h-48 overflow-hidden">
            <Image
              src={article.coverImage}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

            {/* Featured Badge */}
            {article.featuredAt && (
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 bg-gradient-to-r from-[var(--consult)] to-[var(--amplify)] text-white text-xs font-bold rounded-full">
                  Featured
                </span>
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {/* Category & Date */}
          <div className="flex items-center gap-3 mb-3 text-sm">
            {article.category && (
              <span className="px-3 py-1 rounded-full bg-[var(--consult)]/20 text-[var(--consult)] font-medium">
                {article.category}
              </span>
            )}
            {article.publishedAt && (
              <span className="text-white/50">
                {new Date(article.publishedAt).toLocaleDateString(locale, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-[var(--accent-teal)] transition-colors">
            {article.title}
          </h3>

          {/* Excerpt */}
          {article.excerpt && (
            <p className="text-white/70 text-sm line-clamp-3 mb-4">
              {article.excerpt}
            </p>
          )}

          {/* Meta Info */}
          <div className="flex items-center gap-4 pt-4 border-t border-white/10 text-xs text-white/50">
            {/* Author */}
            <div className="flex items-center gap-1">
              <HiUser className="w-4 h-4" />
              <span>{article.author.name || 'Anonymous'}</span>
            </div>

            {/* Reading Time */}
            {article.readingTime && (
              <div className="flex items-center gap-1">
                <HiClock className="w-4 h-4" />
                <span>{formatReadingTime(article.readingTime, locale)}</span>
              </div>
            )}

            {/* Views */}
            <div className="flex items-center gap-1">
              <HiEye className="w-4 h-4" />
              <span>{article.views}</span>
            </div>
          </div>

          {/* Tags */}
          {article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {article.tags.slice(0, 3).map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-white/5 text-white/60 text-xs rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
