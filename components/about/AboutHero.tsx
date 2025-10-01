'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function AboutHero() {
  const t = useTranslations('about.hero');

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[var(--dark-bg-primary)]">
      {/* Floating background shapes */}
      {[
        { color: '#00A6FB', size: 300, x: -100, y: -100, delay: 0 },
        { color: '#7C4DFF', size: 250, x: 100, y: 100, delay: 0.5 },
        { color: '#4A8E55', size: 280, x: -80, y: 120, delay: 1 },
        { color: '#22D3EE', size: 260, x: 120, y: -80, delay: 1.5 },
      ].map((shape, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full opacity-10 blur-3xl"
          style={{
            width: shape.size,
            height: shape.size,
            background: `radial-gradient(circle, ${shape.color} 0%, transparent 70%)`,
          }}
          animate={{
            x: [shape.x, -shape.x, shape.x],
            y: [shape.y, -shape.y, shape.y],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: shape.delay,
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-8">
            <span className="gradient-text-service">{t('title')}</span>
            <br />
            <span className="text-white/90">{t('subtitle')}</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto"
        >
          {t('subtitle')}
        </motion.p>
      </div>

      {/* Scroll indicator - repositioned outside content container */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2"
        >
          <div className="w-1 h-2 bg-white/50 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
