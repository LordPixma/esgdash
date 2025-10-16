import { buildUrl, FredObservationsResponse, FredSeriesResponse } from '@esgdash/shared';
import { Env, getCachedData } from './cache';

const FRED_BASE_URL = 'https://api.stlouisfed.org/fred';

/**
 * Fetch FRED series information
 */
export async function fetchFredSeries(
  seriesId: string,
  apiKey: string
): Promise<FredSeriesResponse> {
  const url = buildUrl(`${FRED_BASE_URL}/series`, {
    series_id: seriesId,
    api_key: apiKey,
    file_type: 'json',
  });

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`FRED API error: ${response.statusText}`);
  }

  return await response.json();
}

/**
 * Fetch FRED series observations (data points)
 */
export async function fetchFredObservations(
  seriesId: string,
  apiKey: string,
  startDate?: string,
  endDate?: string
): Promise<FredObservationsResponse> {
  const params: Record<string, string> = {
    series_id: seriesId,
    api_key: apiKey,
    file_type: 'json',
  };

  if (startDate) params.observation_start = startDate;
  if (endDate) params.observation_end = endDate;

  const url = buildUrl(`${FRED_BASE_URL}/series/observations`, params);

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`FRED API error: ${response.statusText}`);
  }

  return await response.json();
}

/**
 * Handle FRED series API request with caching
 */
export async function handleFredSeriesRequest(
  request: Request,
  env: Env
): Promise<Response> {
  const url = new URL(request.url);
  const seriesId = url.searchParams.get('series_id');
  const startDate = url.searchParams.get('start_date');
  const endDate = url.searchParams.get('end_date');

  if (!seriesId) {
    return new Response(
      JSON.stringify({ success: false, error: 'series_id parameter is required' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  if (!env.FRED_API_KEY) {
    return new Response(
      JSON.stringify({ success: false, error: 'FRED API key not configured' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const cacheKey = `fred:${seriesId}:${startDate || 'all'}:${endDate || 'all'}`;
    const ttlHours = parseInt(env.CACHE_TTL_HOURS || '24');

    const { data, cached } = await getCachedData(
      env.CACHE,
      cacheKey,
      () => fetchFredObservations(seriesId, env.FRED_API_KEY, startDate || undefined, endDate || undefined),
      ttlHours
    );

    return new Response(
      JSON.stringify({
        success: true,
        data,
        cached,
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
