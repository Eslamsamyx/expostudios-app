'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Article } from '@/lib/types/articles';
import ArticleCard from './ArticleCard';

interface RelatedArticlesProps {
  articles: Article[];
}

export default function RelatedArticles({ articles }: RelatedArticlesProps) {
  const t = useTranslations('articles.detail');

  if (articles.length === 0) {
    return null;
  }

  return (
    <section className="py-20 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('relatedArticles')}
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            {t('relatedArticlesSubtitle')}
          </p>
        </motion.div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <ArticleCard key={article.id} article={article} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
