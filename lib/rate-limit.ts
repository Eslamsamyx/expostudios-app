/**
 * Simple in-memory rate limiter for API endpoints
 *
 * IMPORTANT: This is a basic rate limiter using in-memory storage.
 * For production with multiple instances, use Redis-based solution like @upstash/ratelimit
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

class RateLimiter {
  private requests: Map<string, RateLimitEntry>;
  private cleanupInterval: NodeJS.Timeout | null;

  constructor() {
    this.requests = new Map();
    // Clean up expired entries every minute
    this.cleanupInterval = setInterval(() => this.cleanup(), 60000);
  }

  private cleanup() {
    const now = Date.now();
    for (const [key, entry] of this.requests.entries()) {
      if (now > entry.resetTime) {
        this.requests.delete(key);
      }
    }
  }

  /**
   * Check if a request should be rate limited
   * @param identifier - Unique identifier (IP, user ID, etc.)
   * @param limit - Maximum number of requests
   * @param windowMs - Time window in milliseconds
   * @returns true if request should be allowed, false if rate limited
   */
  check(identifier: string, limit: number, windowMs: number): { success: boolean; remaining: number; reset: Date } {
    const now = Date.now();
    const entry = this.requests.get(identifier);

    if (!entry || now > entry.resetTime) {
      // First request or window expired, create new entry
      this.requests.set(identifier, {
        count: 1,
        resetTime: now + windowMs,
      });
      return {
        success: true,
        remaining: limit - 1,
        reset: new Date(now + windowMs),
      };
    }

    if (entry.count >= limit) {
      // Rate limit exceeded
      return {
        success: false,
        remaining: 0,
        reset: new Date(entry.resetTime),
      };
    }

    // Increment count
    entry.count++;
    this.requests.set(identifier, entry);

    return {
      success: true,
      remaining: limit - entry.count,
      reset: new Date(entry.resetTime),
    };
  }

  destroy() {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = null;
    }
    this.requests.clear();
  }
}

// Singleton instance
const rateLimiter = new RateLimiter();

/**
 * Rate limit configurations for different endpoint types
 */
export const RATE_LIMITS = {
  // Public endpoints
  PUBLIC_API: { limit: 10, windowMs: 60000 }, // 10 requests per minute
  AUTH_LOGIN: { limit: 5, windowMs: 300000 }, // 5 attempts per 5 minutes
  NEWSLETTER: { limit: 3, windowMs: 3600000 }, // 3 requests per hour

  // Authenticated endpoints
  AUTHENTICATED: { limit: 60, windowMs: 60000 }, // 60 requests per minute
  ADMIN_WRITE: { limit: 30, windowMs: 60000 }, // 30 write operations per minute
} as const;

/**
 * Get identifier for rate limiting from request
 * Priority: User ID > IP address
 */
export function getRateLimitIdentifier(request: Request, userId?: string): string {
  if (userId) {
    return `user:${userId}`;
  }

  // Try to get IP from various headers
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const ip = forwarded?.split(',')[0] || realIp || 'unknown';

  return `ip:${ip}`;
}

/**
 * Check rate limit for a request
 */
export function checkRateLimit(
  identifier: string,
  limitType: keyof typeof RATE_LIMITS = 'PUBLIC_API'
): { success: boolean; remaining: number; reset: Date } {
  const { limit, windowMs } = RATE_LIMITS[limitType];
  return rateLimiter.check(identifier, limit, windowMs);
}

/**
 * Create rate limit headers for response
 */
export function createRateLimitHeaders(result: { remaining: number; reset: Date }) {
  return {
    'X-RateLimit-Remaining': result.remaining.toString(),
    'X-RateLimit-Reset': result.reset.toISOString(),
  };
}

export default rateLimiter;
