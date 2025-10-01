'use client';

import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { ReactNode } from 'react';

interface HeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  primaryCta?: {
    text: string;
    onClick: () => void;
  };
  secondaryCta?: {
    text: string;
    onClick: () => void;
  };
  children?: ReactNode;
  variant?: 'default' | 'centered' | 'split';
}

export default function Hero({
  title,
  subtitle,
  description,
  primaryCta,
  secondaryCta,
  children,
  variant = 'centered',
}: HeroProps) {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 sm:px-8 lg:px-12 pb-32 md:pb-40 overflow-hidden">
      {/* Subtle noise texture overlay for depth */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <motion.div
        className={`relative z-10 w-full max-w-6xl mx-auto ${
          variant === 'centered' ? 'text-center' : ''
        }`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="mb-8">
          <motion.div
            className="inline-flex items-center px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/5 backdrop-blur-sm"
            whileHover={{ scale: 1.05, borderColor: 'rgba(99, 102, 241, 0.5)' }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mr-2 animate-pulse" />
            <span className="text-sm font-medium bg-gradient-to-r from-indigo-200 to-purple-200 bg-clip-text text-transparent">
              Crafting Physical & Digital Experiences
            </span>
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-8 leading-[0.9] tracking-tight"
          variants={itemVariants}
        >
          <span className="block bg-gradient-to-br from-white via-white to-white/70 bg-clip-text text-transparent">
            {title}
          </span>
          <motion.div
            className="h-1 mt-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 rounded-full mx-auto"
            style={{ width: variant === 'centered' ? '30%' : '100%' }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.h1>

        {/* Subtitle */}
        {subtitle && (
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light mb-8 tracking-tight"
            variants={itemVariants}
          >
            <span className="bg-gradient-to-r from-slate-200 to-slate-400 bg-clip-text text-transparent">
              {subtitle}
            </span>
          </motion.h2>
        )}

        {/* Description */}
        {description && (
          <motion.p
            className="text-lg sm:text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            {description}
          </motion.p>
        )}

        {/* CTAs */}
        {(primaryCta || secondaryCta) && (
          <motion.div
            className="flex flex-wrap gap-4 justify-center items-center"
            variants={itemVariants}
          >
            {primaryCta && (
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" onClick={primaryCta.onClick}>
                  {primaryCta.text}
                </Button>
              </motion.div>
            )}
            {secondaryCta && (
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="ghost" size="lg" onClick={secondaryCta.onClick}>
                  {secondaryCta.text}
                </Button>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Children */}
        {children && (
          <motion.div variants={itemVariants} className="mt-16">
            {children}
          </motion.div>
        )}
      </motion.div>

      {/* Refined scroll indicator - positioned with proper spacing */}
      <motion.div
        className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { delay: 1.5, duration: 0.5 },
          y: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <div className="w-5 h-8 border border-slate-600/50 rounded-full flex items-start justify-center p-1 backdrop-blur-sm">
          <motion.div
            className="w-1 h-2 bg-indigo-400/80 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.6)]"
            animate={{
              y: [0, 10, 0],
              opacity: [1, 0.3, 1],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>
        <span className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-medium">
          Scroll
        </span>
      </motion.div>
    </section>
  );
}
