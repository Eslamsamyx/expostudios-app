'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { type PriceRange } from '@/lib/pricing-calculator';

interface DistributionCurveProps {
  distribution: number[];
  priceRange: PriceRange;
  minPrice: number;
  maxPrice: number;
  className?: string;
}

export default function DistributionCurve({
  distribution,
  priceRange,
  minPrice,
  maxPrice,
  className = ''
}: DistributionCurveProps) {
  const { pathData, rangeArea, meanPosition } = useMemo(() => {
    const width = 300;
    const height = 100;
    const padding = 10;

    // Generate SVG path
    const points = distribution.map((y, i) => {
      const x = padding + (i / distribution.length) * (width - 2 * padding);
      const yPos = height - padding - y * (height - 2 * padding);
      return `${x},${yPos}`;
    });

    const path = `M ${points.join(' L ')}`;

    // Calculate range area positions
    const minRatio = (priceRange.min - minPrice) / (maxPrice - minPrice);
    const maxRatio = (priceRange.max - minPrice) / (maxPrice - minPrice);
    const meanRatio = (priceRange.mean - minPrice) / (maxPrice - minPrice);

    const minX = padding + minRatio * (width - 2 * padding);
    const maxX = padding + maxRatio * (width - 2 * padding);
    const meanX = padding + meanRatio * (width - 2 * padding);

    const meanIndex = Math.floor(meanRatio * distribution.length);
    const meanValue = distribution[meanIndex] ?? 0;
    const meanY = height - padding - meanValue * (height - 2 * padding);

    return {
      pathData: path,
      rangeArea: { minX, maxX },
      meanPosition: { x: meanX, y: meanY }
    };
  }, [distribution, priceRange, minPrice, maxPrice]);

  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox="0 0 300 100"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Gradient fill under curve */}
        <defs>
          <linearGradient id="curveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgb(147, 51, 234)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="rgb(147, 51, 234)" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* Fill area */}
        <motion.path
          d={`${pathData} L 290,90 L 10,90 Z`}
          fill="url(#curveGradient)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />

        {/* Curve line */}
        <motion.path
          d={pathData}
          fill="none"
          stroke="rgb(147, 51, 234)"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        />

        {/* Range area shading */}
        <motion.rect
          x={rangeArea.minX}
          y="10"
          width={rangeArea.maxX - rangeArea.minX}
          height="80"
          fill="rgb(147, 51, 234)"
          opacity="0.15"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ delay: 0.5 }}
        />

        {/* Min range line */}
        <motion.line
          x1={rangeArea.minX}
          y1="10"
          x2={rangeArea.minX}
          y2="90"
          stroke="rgb(147, 51, 234)"
          strokeWidth="1.5"
          strokeDasharray="3 2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 0.6 }}
        />

        {/* Max range line */}
        <motion.line
          x1={rangeArea.maxX}
          y1="10"
          x2={rangeArea.maxX}
          y2="90"
          stroke="rgb(147, 51, 234)"
          strokeWidth="1.5"
          strokeDasharray="3 2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 0.6 }}
        />

        {/* Mean marker */}
        <motion.g
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.7, type: 'spring', stiffness: 200 }}
        >
          {/* Vertical line */}
          <line
            x1={meanPosition.x}
            y1={meanPosition.y}
            x2={meanPosition.x}
            y2="90"
            stroke="rgb(234, 179, 8)"
            strokeWidth="2"
          />

          {/* Dot */}
          <circle
            cx={meanPosition.x}
            cy={meanPosition.y}
            r="4"
            fill="rgb(234, 179, 8)"
          />

          {/* Glow effect */}
          <circle
            cx={meanPosition.x}
            cy={meanPosition.y}
            r="6"
            fill="rgb(234, 179, 8)"
            opacity="0.3"
          />
        </motion.g>

        {/* X-axis labels */}
        <text
          x="10"
          y="95"
          fontSize="10"
          fill="currentColor"
          className="opacity-60"
        >
          {minPrice}
        </text>
        <text
          x="270"
          y="95"
          fontSize="10"
          fill="currentColor"
          className="opacity-60"
          textAnchor="end"
        >
          {maxPrice}
        </text>
      </svg>

      <div className="text-center mt-4">
        <div className="text-sm text-purple-600 dark:text-purple-400 font-medium mb-2">
          68% Confidence Interval
        </div>
        <div className="flex justify-center gap-4 text-xs text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <div className="w-3 h-0.5 bg-purple-500 opacity-50"></div>
            <span>Range bounds</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
            <span>Average</span>
          </div>
        </div>
      </div>
    </div>
  );
}
