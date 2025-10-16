/**
 * Pricing Calculator Utilities
 * Implements normal distribution-based pricing for video production services
 * with scientific mix ratio calculation
 */

export type AnimationType = 'normal' | 'high-level';

export interface PricingConfig {
  minutes: number;
  complexityFactor: number; // 0 (simple) to 1 (complex)
}

export interface MixRatio {
  motionGraphicsRatio: number; // 0-1
  cgfxRatio: number; // 0-1
  motionGraphicsMinutes: number;
  cgfxMinutes: number;
}

export interface PriceRange {
  min: number;
  max: number;
  mean: number;
}

export interface PricingResult {
  // Range per minute
  pricePerMinuteRange: PriceRange;

  // Total range
  totalPriceRange: PriceRange;

  // Mix ratio
  mixRatio: MixRatio;

  // Individual content type ranges
  motionGraphicsPriceRange: PriceRange;
  cgfxPriceRange: PriceRange;
  motionGraphicsTotalRange: PriceRange;
  cgfxTotalRange: PriceRange;

  // For visualization
  distribution: number[];
  baseRange: { min: number; max: number; mean: number };
}

/**
 * Calculate price range using mean ± 1 standard deviation (68% confidence interval)
 */
function calculatePriceRangeFromDistribution(
  mean: number,
  standardDeviation: number,
  absoluteMin: number,
  absoluteMax: number
): PriceRange {
  // Calculate range using 1 standard deviation (68% confidence interval)
  let min = mean - standardDeviation;
  let max = mean + standardDeviation;

  // Clamp to absolute bounds
  min = clamp(min, absoluteMin, absoluteMax);
  max = clamp(max, absoluteMin, absoluteMax);

  // Round to nearest 10
  min = Math.round(min / 10) * 10;
  max = Math.round(max / 10) * 10;

  return {
    min,
    max,
    mean: Math.round(mean / 10) * 10
  };
}

/**
 * Clamp a value between min and max
 */
function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Get pricing configuration based on animation type
 */
function getPricingBounds(animationType: AnimationType) {
  if (animationType === 'high-level') {
    return {
      min: 3500,
      max: 4000,
      mean: 3750,
      range: 500
    };
  }

  return {
    min: 2000,
    max: 3000,
    mean: 2500,
    range: 1000
  };
}

/**
 * Calculate mix ratio based on complexity and duration
 * Uses non-linear relationship (complexity^1.5) with duration adjustment
 */
export function calculateMixRatio(minutes: number, complexityFactor: number): MixRatio {
  // Base CGI/VFX ratio using power function (non-linear relationship)
  const baseCGFXRatio = Math.pow(complexityFactor, 1.5);

  // Duration factor: longer videos have slight reduction in CGI ratio due to budget constraints
  const durationFactor = 1 / (1 + minutes / 100);

  // Adjusted ratio: 80% complexity-driven, 20% duration-influenced
  const cgfxRatio = baseCGFXRatio * (0.8 + 0.2 * durationFactor);
  const motionGraphicsRatio = 1 - cgfxRatio;

  return {
    motionGraphicsRatio,
    cgfxRatio,
    motionGraphicsMinutes: motionGraphicsRatio * minutes,
    cgfxMinutes: cgfxRatio * minutes
  };
}

/**
 * Calculate deterministic price ranges (no randomness)
 */
export function calculatePrice(config: PricingConfig): PricingResult {
  const { minutes, complexityFactor } = config;

  // Calculate mix ratio scientifically
  const mixRatio = calculateMixRatio(minutes, complexityFactor);

  // Get bounds for both animation types
  const mgBounds = getPricingBounds('normal');
  const cgfxBounds = getPricingBounds('high-level');

  // Adjust means based on complexity
  const mgComplexityShift = (complexityFactor - 0.5) * mgBounds.range * 0.6;
  const cgfxComplexityShift = (complexityFactor - 0.5) * cgfxBounds.range * 0.6;

  const mgAdjustedMean = mgBounds.mean + mgComplexityShift;
  const cgfxAdjustedMean = cgfxBounds.mean + cgfxComplexityShift;

  // Standard deviations: 10% of range for precise estimates
  const mgStdDev = mgBounds.range * 0.10;
  const cgfxStdDev = cgfxBounds.range * 0.10;

  // Calculate price ranges using 1 standard deviation (68% confidence interval)
  const mgPriceRange = calculatePriceRangeFromDistribution(
    mgAdjustedMean,
    mgStdDev,
    mgBounds.min,
    mgBounds.max
  );

  const cgfxPriceRange = calculatePriceRangeFromDistribution(
    cgfxAdjustedMean,
    cgfxStdDev,
    cgfxBounds.min,
    cgfxBounds.max
  );

  // Calculate blended price range
  const blendedMinPerMinute = Math.round(
    (mixRatio.motionGraphicsRatio * mgPriceRange.min +
     mixRatio.cgfxRatio * cgfxPriceRange.min) / 10
  ) * 10;

  const blendedMaxPerMinute = Math.round(
    (mixRatio.motionGraphicsRatio * mgPriceRange.max +
     mixRatio.cgfxRatio * cgfxPriceRange.max) / 10
  ) * 10;

  const blendedMeanPerMinute = Math.round(
    (mixRatio.motionGraphicsRatio * mgPriceRange.mean +
     mixRatio.cgfxRatio * cgfxPriceRange.mean) / 10
  ) * 10;

  // Calculate total price ranges
  const mgTotalRange: PriceRange = {
    min: Math.round(mgPriceRange.min * mixRatio.motionGraphicsMinutes),
    max: Math.round(mgPriceRange.max * mixRatio.motionGraphicsMinutes),
    mean: Math.round(mgPriceRange.mean * mixRatio.motionGraphicsMinutes)
  };

  const cgfxTotalRange: PriceRange = {
    min: Math.round(cgfxPriceRange.min * mixRatio.cgfxMinutes),
    max: Math.round(cgfxPriceRange.max * mixRatio.cgfxMinutes),
    mean: Math.round(cgfxPriceRange.mean * mixRatio.cgfxMinutes)
  };

  const totalPriceRange: PriceRange = {
    min: Math.round(blendedMinPerMinute * minutes),
    max: Math.round(blendedMaxPerMinute * minutes),
    mean: Math.round(blendedMeanPerMinute * minutes)
  };

  // Generate distribution curve for visualization
  const blendedMean = mixRatio.motionGraphicsRatio * mgAdjustedMean +
                      mixRatio.cgfxRatio * cgfxAdjustedMean;
  const blendedStdDev = mixRatio.motionGraphicsRatio * mgStdDev +
                        mixRatio.cgfxRatio * cgfxStdDev;

  const distribution = generateDistributionCurve(
    blendedMean,
    blendedStdDev,
    mgBounds.min,
    cgfxBounds.max
  );

  return {
    pricePerMinuteRange: {
      min: blendedMinPerMinute,
      max: blendedMaxPerMinute,
      mean: blendedMeanPerMinute
    },
    totalPriceRange,
    mixRatio,
    motionGraphicsPriceRange: mgPriceRange,
    cgfxPriceRange: cgfxPriceRange,
    motionGraphicsTotalRange: mgTotalRange,
    cgfxTotalRange: cgfxTotalRange,
    baseRange: {
      min: mgBounds.min,
      max: cgfxBounds.max,
      mean: blendedMean
    },
    distribution
  };
}

/**
 * Generate normal distribution curve data for visualization
 */
function generateDistributionCurve(
  mean: number,
  stdDev: number,
  min: number,
  max: number
): number[] {
  const points: number[] = [];
  const steps = 100;

  for (let i = 0; i <= steps; i++) {
    const x = min + (max - min) * (i / steps);
    // Normal distribution PDF
    const exponent = -Math.pow(x - mean, 2) / (2 * Math.pow(stdDev, 2));
    const y = Math.exp(exponent) / (stdDev * Math.sqrt(2 * Math.PI));
    points.push(y);
  }

  // Normalize to 0-1 range
  const maxY = Math.max(...points);
  return points.map(y => y / maxY);
}

/**
 * Format price in AED currency
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-AE', {
    style: 'currency',
    currency: 'AED',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
}

/**
 * Get price range text
 */
export function getPriceRangeText(animationType: AnimationType): string {
  const bounds = getPricingBounds(animationType);
  return `${formatPrice(bounds.min)} - ${formatPrice(bounds.max)} per minute`;
}

/**
 * Get animation type display name
 */
export function getAnimationTypeName(animationType: AnimationType): string {
  return animationType === 'high-level'
    ? 'CGI / VFX / SFX'
    : 'Motion Graphics';
}

/**
 * Get complexity level text
 */
export function getComplexityText(complexityFactor: number): string {
  if (complexityFactor < 0.3) return 'Simple';
  if (complexityFactor < 0.7) return 'Moderate';
  return 'Complex';
}
