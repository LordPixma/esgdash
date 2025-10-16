import { ApiResponse, CacheEntry, getCacheExpiration, isCacheExpired } from '@esgdash/shared';

export interface Env {
  CACHE: KVNamespace;
  DATA_STORAGE: R2Bucket;
  FRED_API_KEY: string;
  CACHE_TTL_HOURS: string;
}

/**
 * Get data from cache or fetch from source
 */
export async function getCachedData<T>(
  cache: KVNamespace,
  key: string,
  fetcher: () => Promise<T>,
  ttlHours: number = 24
): Promise<{ data: T; cached: boolean }> {
  // Try to get from cache
  const cached = await cache.get<CacheEntry<T>>(key, 'json');
  
  if (cached && !isCacheExpired(cached.expiresAt)) {
    return { data: cached.data, cached: true };
  }
  
  // Fetch fresh data
  const data = await fetcher();
  
  // Store in cache
  const cacheEntry: CacheEntry<T> = {
    data,
    timestamp: Date.now(),
    expiresAt: getCacheExpiration(ttlHours)
  };
  
  await cache.put(key, JSON.stringify(cacheEntry));
  
  return { data, cached: false };
}

/**
 * CORS headers for API responses
 */
export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

/**
 * Create a JSON response with CORS headers
 */
export function jsonResponse<T>(data: ApiResponse<T>, status: number = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders,
    },
  });
}

/**
 * Handle CORS preflight requests
 */
export function handleOptions(): Response {
  return new Response(null, {
    headers: corsHeaders,
  });
}

/**
 * Create error response
 */
export function errorResponse(message: string, statusCode: number = 500): Response {
  const response: ApiResponse<never> = {
    success: false,
    error: message,
    timestamp: new Date().toISOString(),
  };
  return jsonResponse(response, statusCode);
}

/**
 * Create success response
 */
export function successResponse<T>(data: T, cached: boolean = false): Response {
  const response: ApiResponse<T> = {
    success: true,
    data,
    cached,
    timestamp: new Date().toISOString(),
  };
  return jsonResponse(response);
}
