import { buildUrl } from '@esgdash/shared';
import { Env, getCachedData } from './cache';
import { getMockWorldBankData } from './mock-data';

const WORLDBANK_BASE_URL = 'https://api.worldbank.org/v2';

/**
 * Fetch World Bank indicator data
 */
export async function fetchWorldBankIndicator(
  indicatorId: string,
  countryCode: string = 'all',
  startDate?: string,
  endDate?: string
): Promise<any> {
  let url = `${WORLDBANK_BASE_URL}/country/${countryCode}/indicator/${indicatorId}?format=json&per_page=1000`;

  if (startDate) {
    url += `&date=${startDate}:${endDate || new Date().getFullYear()}`;
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`World Bank API error: ${response.statusText}`);
  }

  const data = await response.json();
  
  // World Bank API returns an array where first element is metadata and second is data
  if (Array.isArray(data) && data.length > 1) {
    return {
      metadata: data[0],
      data: data[1],
    };
  }

  return data;
}

/**
 * Handle World Bank indicator API request with caching
 */
export async function handleWorldBankRequest(
  request: Request,
  env: Env
): Promise<Response> {
  const url = new URL(request.url);
  const indicatorId = url.searchParams.get('indicator_id');
  const countryCode = url.searchParams.get('country') || 'all';
  const startDate = url.searchParams.get('start_date');
  const endDate = url.searchParams.get('end_date');

  if (!indicatorId) {
    return new Response(
      JSON.stringify({ success: false, error: 'indicator_id parameter is required' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Use mock data if API key is not configured (World Bank doesn't require key but may be unavailable)
  const useMockData = !env.FRED_API_KEY || env.FRED_API_KEY === '';

  if (useMockData) {
    console.log('Using mock data for World Bank (demo mode)');
  }

  try {
    const cacheKey = `worldbank:${indicatorId}:${countryCode}:${startDate || 'all'}:${endDate || 'all'}`;
    const ttlHours = parseInt(env.CACHE_TTL_HOURS || '24');

    let data;
    let cached = false;

    if (useMockData) {
      // Return mock data in demo mode
      data = getMockWorldBankData(indicatorId);
    } else {
      // Use real API with caching
      const result = await getCachedData(
        env.CACHE,
        cacheKey,
        () => fetchWorldBankIndicator(indicatorId, countryCode, startDate || undefined, endDate || undefined),
        ttlHours
      );
      data = result.data;
      cached = result.cached;
    }

    return new Response(
      JSON.stringify({
        success: true,
        data,
        cached,
        demo: useMockData,
        timestamp: new Date().toISOString(),
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
}
