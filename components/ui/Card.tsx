import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'glass' | 'glass-light' | 'glass-dark' | 'solid';
  hover?: boolean;
  onClick?: () => void;
}

export default function Card({
  children,
  className = '',
  variant = 'glass-dark',
  hover = true,
  onClick,
}: CardProps) {
  const variants = {
    glass: 'glass',
    'glass-light': 'glass-light',
    'glass-dark': 'glass-dark',
    solid: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
  };

  const hoverStyles = hover
    ? 'hover:scale-105 hover:shadow-2xl cursor-pointer'
    : '';

  return (
    <div
      className={`${variants[variant]} rounded-xl p-6 transition-all duration-300 ${hoverStyles} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
