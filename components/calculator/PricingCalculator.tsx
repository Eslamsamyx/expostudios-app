'use client';

import { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { FaDna, FaBullseye, FaCheckCircle, FaChartBar, FaPalette } from 'react-icons/fa';
import {
  calculatePrice,
  getComplexityText,
  type PricingResult
} from '@/lib/pricing-calculator';
import PriceRangeDisplay from './PriceRangeDisplay';
import DistributionCurve from './DistributionCurve';
import MixRatioVisualization from './MixRatioVisualization';

export default function PricingCalculator() {
  const [minutes, setMinutes] = useState<number>(5);
  const [complexityFactor, setComplexityFactor] = useState<number>(0.5);
  const [pricingResult, setPricingResult] = useState<PricingResult | null>(null);

  // 3D tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [5, -5]);
  const rotateY = useTransform(mouseX, [-300, 300], [-5, 5]);

  // Calculate pricing when inputs change (deterministic, no randomness)
  useEffect(() => {
    const result = calculatePrice({
      minutes,
      complexityFactor
    });
    setPricingResult(result);
  }, [minutes, complexityFactor]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(event.clientX - centerX);
    mouseY.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-4xl mx-auto"
    >
      {/* Main Calculator Card */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-purple-200/50 dark:border-purple-800/50 p-8 md:p-12 overflow-hidden"
      >
        {/* Animated gradient background */}
        <motion.div
          className="absolute inset-0 opacity-30 dark:opacity-20"
          animate={{
            background: [
              'radial-gradient(circle at 0% 0%, rgb(147, 51, 234) 0%, transparent 50%)',
              'radial-gradient(circle at 100% 100%, rgb(234, 179, 8) 0%, transparent 50%)',
              'radial-gradient(circle at 0% 100%, rgb(147, 51, 234) 0%, transparent 50%)',
              'radial-gradient(circle at 100% 0%, rgb(234, 179, 8) 0%, transparent 50%)',
              'radial-gradient(circle at 0% 0%, rgb(147, 51, 234) 0%, transparent 50%)'
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-yellow-600 bg-clip-text text-transparent mb-2">
              Smart Blended Pricing Calculator
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Consistent pricing ranges based on complexity and duration
            </p>
          </motion.div>

          {/* Duration Input */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Duration (Minutes): <span className="text-purple-600 dark:text-purple-400 font-bold">{minutes}</span>
            </label>
            <div className="flex gap-4 items-center">
              <input
                type="number"
                min="1"
                value={minutes}
                onChange={(e) => setMinutes(Math.max(1, Number(e.target.value) || 1))}
                placeholder="Enter duration"
                className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg font-medium"
              />
              <div className="text-sm text-gray-500 dark:text-gray-400">minutes</div>
            </div>
          </motion.div>

          {/* Complexity Slider */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-8"
          >
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Project Complexity: <span className="text-yellow-600 dark:text-yellow-400 font-bold">{getComplexityText(complexityFactor)}</span>
            </label>
            <div className="relative">
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={complexityFactor}
                onChange={(e) => setComplexityFactor(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, rgb(34, 197, 94) 0%, rgb(234, 179, 8) 50%, rgb(239, 68, 68) 100%)`
                }}
              />
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
                <span>Simple</span>
                <span>Moderate</span>
                <span>Complex</span>
              </div>
            </div>
          </motion.div>

          {/* Mix Ratio Visualization */}
          {pricingResult && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="mb-8 p-6 bg-gradient-to-br from-purple-50 to-yellow-50 dark:from-purple-950/30 dark:to-yellow-950/30 rounded-2xl"
            >
              <MixRatioVisualization mixRatio={pricingResult.mixRatio} />
            </motion.div>
          )}

          {/* Distribution Visualization */}
          {pricingResult && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
              className="mb-8 p-6 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-950/30 dark:to-blue-950/30 rounded-2xl"
            >
              <DistributionCurve
                distribution={pricingResult.distribution}
                priceRange={pricingResult.pricePerMinuteRange}
                minPrice={pricingResult.baseRange.min}
                maxPrice={pricingResult.baseRange.max}
              />
            </motion.div>
          )}

          {/* Price Display */}
          {pricingResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-center"
            >
              {/* Individual Prices Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* Motion Graphics Price */}
                <div className="p-5 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/40 dark:to-purple-900/40 rounded-xl border border-purple-200 dark:border-purple-800">
                  <div className="text-xs text-purple-700 dark:text-purple-400 mb-3 font-semibold">Motion Graphics</div>
                  <div className="text-xs text-purple-600 dark:text-purple-300 mb-2">
                    {pricingResult.mixRatio.motionGraphicsMinutes.toFixed(1)} minutes
                  </div>
                  <PriceRangeDisplay
                    range={pricingResult.motionGraphicsPriceRange}
                    label="Per Minute"
                    className="mb-3"
                  />
                  <div className="pt-3 border-t border-purple-200 dark:border-purple-800">
                    <div className="text-xs text-purple-600 dark:text-purple-300 mb-1">Total</div>
                    <PriceRangeDisplay
                      range={pricingResult.motionGraphicsTotalRange}
                      className="text-lg"
                    />
                  </div>
                </div>

                {/* CGI/VFX Price */}
                <div className="p-5 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950/40 dark:to-yellow-900/40 rounded-xl border border-yellow-200 dark:border-yellow-800">
                  <div className="text-xs text-yellow-700 dark:text-yellow-400 mb-3 font-semibold">CGI / VFX / SFX</div>
                  <div className="text-xs text-yellow-600 dark:text-yellow-300 mb-2">
                    {pricingResult.mixRatio.cgfxMinutes.toFixed(1)} minutes
                  </div>
                  <PriceRangeDisplay
                    range={pricingResult.cgfxPriceRange}
                    label="Per Minute"
                    className="mb-3"
                  />
                  <div className="pt-3 border-t border-yellow-200 dark:border-yellow-800">
                    <div className="text-xs text-yellow-600 dark:text-yellow-300 mb-1">Total</div>
                    <PriceRangeDisplay
                      range={pricingResult.cgfxTotalRange}
                      className="text-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Blended Price Per Minute */}
              <div className="mb-6 p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-700">
                <PriceRangeDisplay
                  range={pricingResult.pricePerMinuteRange}
                  label="Weighted Average Per Minute"
                  showBar={true}
                  className="text-2xl md:text-3xl font-bold text-purple-600 dark:text-purple-400"
                />
              </div>

              {/* Total Price */}
              <div className="p-8 bg-gradient-to-br from-purple-600 to-yellow-600 rounded-2xl shadow-2xl">
                <div className="text-white/90 text-sm mb-4">Total Project Cost</div>
                <PriceRangeDisplay
                  range={pricingResult.totalPriceRange}
                  showBar={true}
                  className="text-4xl md:text-5xl font-bold text-white mb-4"
                />
                <div className="mt-4 pt-4 border-t border-white/20 text-white/70 text-sm space-y-1">
                  <div className="flex items-center gap-2">
                    <FaChartBar className="text-white" />
                    <span>{minutes} minute{minutes !== 1 ? 's' : ''} of blended content</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaPalette className="text-white" />
                    <span>{(pricingResult.mixRatio.motionGraphicsRatio * 100).toFixed(0)}% Motion Graphics + {(pricingResult.mixRatio.cgfxRatio * 100).toFixed(0)}% CGI/VFX</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Floating particles */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-400/30 rounded-full"
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.5
            }}
            style={{
              left: `${20 + i * 15}%`,
              top: `${20 + (i % 3) * 20}%`
            }}
          />
        ))}
      </motion.div>

      {/* Info Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center"
      >
        <div className="p-4 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl">
          <div className="text-2xl mb-2 text-white">
            <FaDna className="mx-auto text-purple-600 dark:text-purple-400" />
          </div>
          <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Scientific Mix Ratio</div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Complexity<sup>1.5</sup> algorithm</div>
        </div>
        <div className="p-4 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl">
          <div className="text-2xl mb-2 text-white">
            <FaBullseye className="mx-auto text-purple-600 dark:text-purple-400" />
          </div>
          <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Blended Pricing</div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">MG + CGI/VFX weighted</div>
        </div>
        <div className="p-4 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl">
          <div className="text-2xl mb-2 text-white">
            <FaCheckCircle className="mx-auto text-purple-600 dark:text-purple-400" />
          </div>
          <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Consistent Results</div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">No randomness, same every time</div>
        </div>
      </motion.div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          background: rgb(147, 51, 234);
          cursor: pointer;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(147, 51, 234, 0.4);
        }

        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: rgb(147, 51, 234);
          cursor: pointer;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(147, 51, 234, 0.4);
          border: none;
        }
      `}</style>
    </motion.div>
  );
}
