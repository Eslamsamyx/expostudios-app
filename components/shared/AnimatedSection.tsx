'use client';

import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';
import {
  fadeInUp,
  fadeIn,
  fadeInLeft,
  fadeInRight,
  staggerContainer
} from '@/lib/utils/animations';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animation?: 'fadeInUp' | 'fadeIn' | 'fadeInLeft' | 'fadeInRight' | 'staggerContainer' | Variants;
  delay?: number;
  viewport?: {
    once?: boolean;
    margin?: string;
    amount?: number | 'some' | 'all';
  };
}

const animationPresets = {
  fadeInUp,
  fadeIn,
  fadeInLeft,
  fadeInRight,
  staggerContainer,
};

export default function AnimatedSection({
  children,
  className = '',
  animation = 'fadeInUp',
  delay = 0,
  viewport = { once: true, margin: '-100px' },
}: AnimatedSectionProps) {
  const variants: Variants =
    typeof animation === 'string' ? animationPresets[animation] : animation;

  // Safety check for variants
  if (!variants || !variants.visible) {
    console.warn('AnimatedSection: Invalid animation variant provided, using default fadeInUp');
    return <div className={className}>{children}</div>;
  }

  // Apply delay to the visible state
  const delayedVariants: Variants = {
    ...variants,
    visible: {
      ...((variants.visible as any) || {}),
      transition: {
        ...((variants.visible as any)?.transition || {}),
        delay,
      },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={delayedVariants}
    >
      {children}
    </motion.div>
  );
}
