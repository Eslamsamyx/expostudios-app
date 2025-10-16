'use client';

import { motion, useSpring, useTransform } from 'framer-motion';
import { useEffect } from 'react';

interface AnimatedCounterProps {
  value: number;
  className?: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

export default function AnimatedCounter({
  value,
  className = '',
  prefix = '',
  suffix = '',
  decimals = 0
}: AnimatedCounterProps) {
  const spring = useSpring(0, {
    stiffness: 100,
    damping: 30,
    mass: 0.8
  });

  const display = useTransform(spring, (current) =>
    current.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  );

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return (
    <div className={`tabular-nums ${className}`}>
      {prefix}
      <motion.span>{display}</motion.span>
      {suffix}
    </div>
  );
}
