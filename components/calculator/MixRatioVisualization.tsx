'use client';

import { motion } from 'framer-motion';
import { FaFlask } from 'react-icons/fa';
import { type MixRatio } from '@/lib/pricing-calculator';

interface MixRatioVisualizationProps {
  mixRatio: MixRatio;
  className?: string;
}

export default function MixRatioVisualization({
  mixRatio,
  className = ''
}: MixRatioVisualizationProps) {
  const mgPercentage = Math.round(mixRatio.motionGraphicsRatio * 100);
  const cgfxPercentage = Math.round(mixRatio.cgfxRatio * 100);

  return (
    <div className={`${className}`}>
      {/* Title */}
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-1">
          Content Mix Analysis
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Scientifically calculated based on complexity and duration
        </p>
      </div>

      {/* Percentage Bars */}
      <div className="space-y-4 mb-6">
        {/* Motion Graphics Bar */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-purple-700 dark:text-purple-400">
              Motion Graphics
            </span>
            <span className="text-sm font-bold text-purple-700 dark:text-purple-400">
              {mgPercentage}%
            </span>
          </div>
          <div className="relative h-8 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${mgPercentage}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-end pr-3"
            >
              {mgPercentage > 15 && (
                <span className="text-xs font-semibold text-white">
                  {mixRatio.motionGraphicsMinutes.toFixed(1)} min
                </span>
              )}
            </motion.div>
            {mgPercentage <= 15 && (
              <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-xs font-semibold text-gray-700 dark:text-gray-300">
                {mixRatio.motionGraphicsMinutes.toFixed(1)} min
              </span>
            )}
          </div>
        </div>

        {/* CGI/VFX/SFX Bar */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-yellow-700 dark:text-yellow-400">
              CGI / VFX / SFX
            </span>
            <span className="text-sm font-bold text-yellow-700 dark:text-yellow-400">
              {cgfxPercentage}%
            </span>
          </div>
          <div className="relative h-8 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${cgfxPercentage}%` }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-end pr-3"
            >
              {cgfxPercentage > 15 && (
                <span className="text-xs font-semibold text-white">
                  {mixRatio.cgfxMinutes.toFixed(1)} min
                </span>
              )}
            </motion.div>
            {cgfxPercentage <= 15 && (
              <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-xs font-semibold text-gray-700 dark:text-gray-300">
                {mixRatio.cgfxMinutes.toFixed(1)} min
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Donut Chart Visualization */}
      <div className="flex justify-center">
        <svg width="200" height="200" viewBox="0 0 200 200" className="transform -rotate-90">
          <defs>
            <linearGradient id="mgGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgb(168, 85, 247)" />
              <stop offset="100%" stopColor="rgb(147, 51, 234)" />
            </linearGradient>
            <linearGradient id="cgfxGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgb(234, 179, 8)" />
              <stop offset="100%" stopColor="rgb(202, 138, 4)" />
            </linearGradient>
          </defs>

          {/* Background circle */}
          <circle
            cx="100"
            cy="100"
            r="70"
            fill="none"
            stroke="rgb(229, 231, 235)"
            strokeWidth="30"
            className="dark:stroke-gray-700"
          />

          {/* Motion Graphics arc */}
          <motion.circle
            cx="100"
            cy="100"
            r="70"
            fill="none"
            stroke="url(#mgGradient)"
            strokeWidth="30"
            strokeDasharray={`${2 * Math.PI * 70 * mixRatio.motionGraphicsRatio} ${2 * Math.PI * 70}`}
            initial={{ strokeDasharray: `0 ${2 * Math.PI * 70}` }}
            animate={{ strokeDasharray: `${2 * Math.PI * 70 * mixRatio.motionGraphicsRatio} ${2 * Math.PI * 70}` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            strokeLinecap="round"
          />

          {/* CGI/VFX/SFX arc */}
          <motion.circle
            cx="100"
            cy="100"
            r="70"
            fill="none"
            stroke="url(#cgfxGradient)"
            strokeWidth="30"
            strokeDasharray={`${2 * Math.PI * 70 * mixRatio.cgfxRatio} ${2 * Math.PI * 70}`}
            strokeDashoffset={-2 * Math.PI * 70 * mixRatio.motionGraphicsRatio}
            initial={{
              strokeDasharray: `0 ${2 * Math.PI * 70}`,
              strokeDashoffset: -2 * Math.PI * 70 * mixRatio.motionGraphicsRatio
            }}
            animate={{
              strokeDasharray: `${2 * Math.PI * 70 * mixRatio.cgfxRatio} ${2 * Math.PI * 70}`,
              strokeDashoffset: -2 * Math.PI * 70 * mixRatio.motionGraphicsRatio
            }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
            strokeLinecap="round"
          />

          {/* Center circle */}
          <circle
            cx="100"
            cy="100"
            r="55"
            fill="white"
            className="dark:fill-gray-800"
          />
        </svg>

        {/* Center text overlay */}
        <div className="absolute w-[200px] h-[200px] flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">Mixed</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Content</div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 mt-6 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-purple-600"></div>
          <span className="text-gray-700 dark:text-gray-300">Motion Graphics</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600"></div>
          <span className="text-gray-700 dark:text-gray-300">CGI/VFX/SFX</span>
        </div>
      </div>

      {/* Scientific explanation */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800"
      >
        <p className="text-xs text-blue-800 dark:text-blue-300 text-center flex items-center justify-center gap-2">
          <FaFlask className="text-blue-600 dark:text-blue-400 flex-shrink-0" />
          <span>
            <strong>Algorithm:</strong> Mix ratio calculated using complexity<sup>1.5</sup> with duration-based adjustment for realistic project composition
          </span>
        </p>
      </motion.div>
    </div>
  );
}
