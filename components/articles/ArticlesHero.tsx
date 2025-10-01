'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function ArticlesHero() {
  const t = useTranslations('articles.hero');

  const floatingShapes = [
    { color: '#00A6FB', size: 200, x: -100, y: -50, delay: 0, duration: 15 },
    { color: '#7C4DFF', size: 180, x: 100, y: 80, delay: 0.5, duration: 18 },
    { color: '#4A8E55', size: 160, x: -80, y: 100, delay: 1, duration: 16 },
    { color: '#22D3EE', size: 190, x: 120, y: -80, delay: 1.5, duration: 20 },
  ];

  return (
    <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden py-20">
      {/* Animated Background Shapes */}
      {floatingShapes.map((shape, index) => (
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
            duration: shape.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: shape.delay,
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl font-bold mb-6"
        >
          <span className="gradient-text-service">{t('title')}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-2xl text-white/70 mb-8"
        >
          {t('subtitle')}
        </motion.p>
      </div>
    </section>
  );
}
