'use client';

import { motion } from 'framer-motion';

interface FilterChipProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
  count?: number;
  color?: string;
}

export default function FilterChip({
  label,
  active = false,
  onClick,
  count,
  color = 'var(--consult)',
}: FilterChipProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`
        px-4 py-2 rounded-lg font-medium transition-all
        ${
          active
            ? 'text-white shadow-lg'
            : 'glass-dark text-white/70 hover:text-white hover:bg-white/10'
        }
      `}
      style={
        active
          ? {
              background: `linear-gradient(135deg, ${color} 0%, ${color}CC 100%)`,
            }
          : undefined
      }
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      {label}
      {count !== undefined && (
        <span className={`ml-2 ${active ? 'opacity-100' : 'opacity-50'}`}>
          ({count})
        </span>
      )}
    </motion.button>
  );
}
