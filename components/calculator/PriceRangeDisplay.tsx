'use client';

import { motion } from 'framer-motion';
import { type PriceRange } from '@/lib/pricing-calculator';
import { formatPrice } from '@/lib/pricing-calculator';

interface PriceRangeDisplayProps {
  range: PriceRange;
  className?: string;
  showBar?: boolean;
  label?: string;
}

export default function PriceRangeDisplay({
  range,
  className = '',
  showBar = false,
  label
}: PriceRangeDisplayProps) {
  const rangeSpan = range.max - range.min;
  const meanPosition = rangeSpan > 0 ? ((range.mean - range.min) / rangeSpan) * 100 : 50;

  return (
    <div className={className}>
      {label && (
        <div className="text-xs text-gray-600 dark:text-gray-400 mb-2 font-medium">
          {label}
        </div>
      )}

      {/* Range Text */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="font-semibold tabular-nums"
      >
        <span className="text-gray-700 dark:text-gray-300">
          {formatPrice(range.min)}
        </span>
        <span className="mx-2 text-gray-400 dark:text-gray-600">-</span>
        <span className="text-gray-700 dark:text-gray-300">
          {formatPrice(range.max)}
        </span>
      </motion.div>

      {/* Range Bar Visualization */}
      {showBar && rangeSpan > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-3 relative"
        >
          {/* Background bar */}
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            {/* Gradient fill */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-purple-500 via-purple-600 to-yellow-500 rounded-full"
            />
          </div>

          {/* Mean indicator */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
            className="absolute top-0 transform -translate-x-1/2"
            style={{ left: `${meanPosition}%` }}
          >
            <div className="w-4 h-4 -mt-1 bg-white dark:bg-gray-800 border-2 border-purple-600 dark:border-purple-400 rounded-full shadow-lg" />
            <div className="absolute top-5 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
              <div className="text-[10px] text-gray-600 dark:text-gray-400 font-medium">
                Avg
              </div>
            </div>
          </motion.div>

          {/* Min label */}
          <div className="absolute left-0 top-4 text-[10px] text-gray-500 dark:text-gray-400">
            Min
          </div>

          {/* Max label */}
          <div className="absolute right-0 top-4 text-[10px] text-gray-500 dark:text-gray-400">
            Max
          </div>
        </motion.div>
      )}
    </div>
  );
}
