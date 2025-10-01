'use client';

import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import AnimatedSection from '../shared/AnimatedSection';

export default function ServicesCTA() {
  const t = useTranslations('services.cta');
  const locale = useLocale();

  return (
    <section className="py-32 px-4 md:px-8 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5" />

      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }}
      />

      <AnimatedSection>
        <div className="max-w-5xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              ease: [0.21, 0.47, 0.32, 0.98]
            }}
            className="relative p-12 md:p-20 rounded-3xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm overflow-hidden group"
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            {/* Animated gradient orbs */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-700" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-700" />

            {/* Content */}
            <div className="relative z-10 text-center">
              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight"
              >
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {t('title')}
                </span>
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-xl lg:text-2xl text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed"
              >
                {t('description')}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                {/* Primary Button */}
                <Link
                  href={`/${locale}/contact`}
                  className="group/btn relative px-10 py-5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/30 hover:scale-105"
                >
                  <span className="relative z-10">{t('primary')}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                </Link>

                {/* Secondary Button */}
                <Link
                  href={`/${locale}/portfolio`}
                  className="group/btn relative px-10 py-5 bg-white/[0.03] border-2 border-white/20 text-white font-bold rounded-xl hover:bg-white/[0.06] hover:border-white/30 transition-all duration-300 hover:scale-105"
                >
                  <span className="relative z-10">{t('secondary')}</span>
                </Link>
              </motion.div>
            </div>

            {/* Top gradient line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-30" />

            {/* Bottom gradient line */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-30" />
          </motion.div>
        </div>
      </AnimatedSection>
    </section>
  );
}
