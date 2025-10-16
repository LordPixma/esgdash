/**
 * Format a date string to YYYY-MM-DD format
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toISOString().split('T')[0];
}

/**
 * Calculate cache expiration time
 * @param hours - Number of hours until expiration
 * @returns Timestamp in milliseconds
 */
export function getCacheExpiration(hours: number = 24): number {
  return Date.now() + hours * 60 * 60 * 1000;
}

/**
 * Check if a cache entry is expired
 */
export function isCacheExpired(expiresAt: number): boolean {
  return Date.now() > expiresAt;
}

/**
 * Parse numeric value safely
 */
export function parseNumericValue(value: string | number | null): number | null {
  if (value === null || value === undefined || value === '') {
    return null;
  }
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return isNaN(num) ? null : num;
}

/**
 * Build URL with query parameters
 */
export function buildUrl(base: string, params: Record<string, string | number>): string {
  const url = new URL(base);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, String(value));
  });
  return url.toString();
}

/**
 * Retry a function with exponential backoff
 */
export async function retry<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  let lastError: Error;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      if (i < maxRetries - 1) {
        const delay = baseDelay * Math.pow(2, i);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  throw lastError!;
}
