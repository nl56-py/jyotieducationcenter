// Simple in-memory rate limiter for server actions and public API routes

interface RateLimitRecord {
  hits: number;
  resetTime: number;
}

const cache = new Map<string, RateLimitRecord>();

// Clean up stale cache records periodically
if (typeof globalThis !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of cache.entries()) {
      if (now > record.resetTime) {
        cache.delete(key);
      }
    }
  }, 60000).unref?.(); // Every 1 minute
}

export interface RateLimitOptions {
  limit: number;      // Max allowed hits
  windowMs: number;   // Time window in milliseconds
}

export function isRateLimited(key: string, options: RateLimitOptions): { limited: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const record = cache.get(key);

  if (!record || now > record.resetTime) {
    // New window or fresh record
    const newRecord: RateLimitRecord = {
      hits: 1,
      resetTime: now + options.windowMs,
    };
    cache.set(key, newRecord);
    return {
      limited: false,
      remaining: options.limit - 1,
      resetTime: newRecord.resetTime,
    };
  }

  // Increment hits
  record.hits += 1;

  if (record.hits > options.limit) {
    return {
      limited: true,
      remaining: 0,
      resetTime: record.resetTime,
    };
  }

  return {
    limited: false,
    remaining: options.limit - record.hits,
    resetTime: record.resetTime,
  };
}
