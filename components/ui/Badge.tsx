import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'consult' | 'create' | 'build' | 'amplify' | 'default';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function Badge({
  children,
  variant = 'default',
  size = 'md',
  className = '',
}: BadgeProps) {
  const variants = {
    consult: 'bg-[var(--consult)]/10 text-[var(--consult)] border-[var(--consult)]/20',
    create: 'bg-[var(--create)]/10 text-[var(--create)] border-[var(--create)]/20',
    build: 'bg-[var(--build)]/10 text-[var(--build)] border-[var(--build)]/20',
    amplify: 'bg-[var(--amplify)]/10 text-[var(--amplify)] border-[var(--amplify)]/20',
    default: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </span>
  );
}
