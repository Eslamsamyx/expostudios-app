'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { HiArrowRight, HiFolder } from 'react-icons/hi';
import AnimatedSection from '../shared/AnimatedSection';

export default function AboutCTA() {
  const t = useTranslations('about.cta');

  return (
    <section className="py-20 px-4 md:px-8 bg-[var(--dark-bg-primary)]">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative bg-gradient-to-br from-[#00A6FB]/20 via-[#7C4DFF]/20 to-[#22D3EE]/20 backdrop-blur-sm rounded-3xl p-12 md:p-16 border border-white/10 overflow-hidden"
          >
            {/* Animated background shapes */}
            <div className="absolute inset-0 overflow-hidden">
              {[
                { color: '#00A6FB', size: 200, x: -50, y: -50 },
                { color: '#7C4DFF', size: 180, x: 100, y: 100 },
                { color: '#22D3EE', size: 160, x: -80, y: 120 },
              ].map((shape, index) => (
                <motion.div
                  key={index}
                  className="absolute rounded-full opacity-20 blur-3xl"
                  style={{
                    width: shape.size,
                    height: shape.size,
                    background: `radial-gradient(circle, ${shape.color} 0%, transparent 70%)`,
                  }}
                  animate={{
                    x: [shape.x, -shape.x, shape.x],
                    y: [shape.y, -shape.y, shape.y],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: index * 0.5,
                  }}
                />
              ))}
            </div>

            {/* Content */}
            <div className="relative z-10 text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-5xl font-bold mb-6"
              >
                <span className="gradient-text-service">{t('title')}</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-xl text-white/70 mb-10 max-w-2xl mx-auto"
              >
                {t('subtitle')}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                {/* Primary CTA */}
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group px-8 py-4 bg-gradient-to-r from-[#00A6FB] to-[#7C4DFF] rounded-full font-bold text-white flex items-center gap-2 justify-center shadow-lg hover:shadow-xl transition-shadow"
                  >
                    {t('button')}
                    <HiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </Link>

                {/* Secondary CTA */}
                <Link href="/portfolio">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group px-8 py-4 bg-white/10 backdrop-blur-sm rounded-full font-bold text-white flex items-center gap-2 justify-center border border-white/20 hover:bg-white/15 transition-colors"
                  >
                    {t('secondaryButton')}
                    <HiFolder className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
}
