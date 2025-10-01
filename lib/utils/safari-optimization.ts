import { CSSProperties } from 'react';

/**
 * Safari optimization styles for hardware-accelerated animations
 * Prevents animation glitching and stuttering in Safari browser
 */
export const safariOptimization: CSSProperties = {
  willChange: 'transform, opacity',
  backfaceVisibility: 'hidden',
  WebkitBackfaceVisibility: 'hidden',
  transform: 'translateZ(0)',
};

/**
 * Minimal Safari optimization for simple animations
 */
export const safariOptimizationMinimal: CSSProperties = {
  backfaceVisibility: 'hidden',
  WebkitBackfaceVisibility: 'hidden',
};
