import { Env, handleOptions } from './cache';
import { handleFredSeriesRequest } from './fred';
import { handleWorldBankRequest } from './worldbank';

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return handleOptions();
    }

    // Route handling
    if (url.pathname.startsWith('/api/fred/series')) {
      return handleFredSeriesRequest(request, env);
    }

    if (url.pathname.startsWith('/api/worldbank/indicator')) {
      return handleWorldBankRequest(request, env);
    }

    // Root endpoint
    if (url.pathname === '/' || url.pathname === '/api') {
      return new Response(
        JSON.stringify({
          success: true,
          message: 'ESGDash API - Cloudflare Workers',
          version: '1.0.0',
          endpoints: [
            {
              path: '/api/fred/series',
              method: 'GET',
              params: ['series_id', 'start_date?', 'end_date?'],
              description: 'Fetch FRED economic data series',
            },
            {
              path: '/api/worldbank/indicator',
              method: 'GET',
              params: ['indicator_id', 'country?', 'start_date?', 'end_date?'],
              description: 'Fetch World Bank indicator data',
            },
          ],
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
    }

    // 404 for unknown routes
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Not found',
        timestamp: new Date().toISOString(),
      }),
      {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  },
};
