'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface IconBoxProps {
  icon: ReactNode;
  color: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  animated?: boolean;
}

const sizeClasses = {
  sm: 'w-12 h-12 text-2xl',
  md: 'w-16 h-16 text-3xl',
  lg: 'w-20 h-20 text-4xl',
};

export default function IconBox({
  icon,
  color,
  size = 'md',
  className = '',
  animated = true,
}: IconBoxProps) {
  const Container = animated ? motion.div : 'div';

  return (
    <Container
      className={`${sizeClasses[size]} rounded-xl flex items-center justify-center glass-dark ${className}`}
      style={{
        background: `linear-gradient(135deg, ${color}20 0%, transparent 100%)`,
        borderColor: `${color}40`,
        borderWidth: '1px',
        borderStyle: 'solid',
      }}
      {...(animated && {
        whileHover: {
          scale: 1.05,
          background: `linear-gradient(135deg, ${color}40 0%, ${color}20 100%)`,
          borderColor: `${color}80`,
        },
        transition: { duration: 0.3 },
      })}
    >
      <div style={{ color }}>{icon}</div>
    </Container>
  );
}
