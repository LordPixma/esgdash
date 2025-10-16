# ESGDash Development Guide

## Project Architecture

ESGDash is built as a monorepo with the following components:

### 1. Shared Package (`packages/shared`)
Contains TypeScript types and utility functions used across the API and frontend.

**Key Files:**
- `types.ts`: Type definitions for FRED, World Bank, API responses, and charts
- `utils.ts`: Helper functions for date formatting, caching, and API utilities

### 2. API (`apps/api`)
Cloudflare Workers-based serverless API that fetches data from external sources and caches it.

**Key Features:**
- Routes for FRED and World Bank data
- KV-based caching with configurable TTL
- CORS-enabled responses
- Error handling and retry logic

**Endpoints:**
- `/api/fred/series` - Fetch FRED economic data
- `/api/worldbank/indicator` - Fetch World Bank indicators

### 3. Web Frontend (`apps/web`)
React application built with Vite, displaying data through interactive charts.

**Key Components:**
- `DataChart`: Recharts-based line chart component
- `FredChart`: Chart wrapper for FRED data
- `WorldBankChart`: Chart wrapper for World Bank data

## Development Workflow

### Setting Up Development Environment

1. Install dependencies:
```bash
npm install
```

2. Build shared package:
```bash
cd packages/shared
npm run build
```

3. Set up API environment:
```bash
cd apps/api
cp .dev.vars.example .dev.vars
# Edit .dev.vars with your FRED API key
```

4. Set up web environment:
```bash
cd apps/web
cp .env.example .env.local
```

### Running in Development

**Terminal 1 - API:**
```bash
cd apps/api
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd apps/web
npm run dev
```

The frontend will proxy API requests to the Workers dev server.

### Building for Production

```bash
# Build everything
npm run build

# Or build individually
cd packages/shared && npm run build
cd apps/api && npm run build
cd apps/web && npm run build
```

## Adding New Data Sources

### 1. Add Types to Shared Package

Edit `packages/shared/src/types.ts`:
```typescript
export interface NewSourceDataPoint {
  // Define your data structure
}
```

### 2. Create Source Handler in API

Create `apps/api/src/newsource.ts`:
```typescript
import { Env, getCachedData } from './cache';

export async function fetchNewSourceData(params: any): Promise<any> {
  // Implement data fetching
}

export async function handleNewSourceRequest(
  request: Request,
  env: Env
): Promise<Response> {
  // Implement request handling with caching
}
```

### 3. Add Route in API Index

Edit `apps/api/src/index.ts`:
```typescript
import { handleNewSourceRequest } from './newsource';

// In fetch handler:
if (url.pathname.startsWith('/api/newsource')) {
  return handleNewSourceRequest(request, env);
}
```

### 4. Add Frontend Component

Create `apps/web/src/components/NewSourceChart.tsx`:
```typescript
export const NewSourceChart: React.FC<Props> = (props) => {
  // Implement chart component
};
```

### 5. Update App

Add your new chart to `apps/web/src/App.tsx`.

## Caching Strategy

The API uses Cloudflare KV for caching with the following strategy:

- Cache keys: `source:id:params`
- Default TTL: 24 hours (configurable)
- Cache miss: Fetch from source and store
- Cache hit: Return cached data with `cached: true` flag

### Cache Utilities

```typescript
// Get with automatic caching
const { data, cached } = await getCachedData(
  env.CACHE,
  'cache-key',
  async () => fetchData(),
  24 // TTL in hours
);
```

## Error Handling

All API endpoints follow a consistent error response format:

```json
{
  "success": false,
  "error": "Error message",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

Frontend components handle errors gracefully with error states.

## Testing

### API Testing

Use curl or tools like Postman:

```bash
# Test FRED endpoint
curl "http://localhost:8787/api/fred/series?series_id=GDP"

# Test World Bank endpoint
curl "http://localhost:8787/api/worldbank/indicator?indicator_id=EN.ATM.CO2E.PC&country=USA"
```

### Frontend Testing

1. Start dev servers
2. Open browser to http://localhost:3000
3. Check browser console for errors
4. Verify charts render correctly

## Deployment

### Prerequisites

- Cloudflare account
- Wrangler CLI configured
- FRED API key

### Deploy API

```bash
cd apps/api

# Create KV namespace
wrangler kv:namespace create "CACHE"

# Create R2 bucket
wrangler r2 bucket create esgdash-data

# Update wrangler.toml with namespace IDs

# Set production secrets
wrangler secret put FRED_API_KEY

# Deploy
npm run deploy
```

### Deploy Frontend

```bash
cd apps/web

# Build
npm run build

# Deploy to Cloudflare Pages
wrangler pages deploy dist

# Or connect to GitHub for automatic deployments
```

## Performance Optimization

1. **Caching**: All API responses are cached in KV
2. **Edge Computing**: Runs on Cloudflare's global network
3. **Bundle Optimization**: Vite optimizes frontend bundle
4. **Code Splitting**: React components are code-split
5. **Chart Performance**: Recharts uses canvas for large datasets

## Security Considerations

1. **API Keys**: Never commit API keys - use `.dev.vars` and Wrangler secrets
2. **CORS**: Configured for public access (adjust as needed)
3. **Rate Limiting**: Consider adding rate limiting for production
4. **Input Validation**: Validate all user inputs and parameters
5. **Error Messages**: Don't expose sensitive information in errors

## Monitoring

Use Cloudflare Analytics to monitor:
- Request volume
- Error rates
- Cache hit rates
- Geographic distribution
- Performance metrics

## Troubleshooting

### Common Issues

**Issue**: API returns 500 errors
- Check FRED_API_KEY is set correctly
- Verify external APIs are accessible
- Check Cloudflare Workers logs

**Issue**: Frontend can't connect to API
- Verify API is running
- Check proxy configuration in vite.config.ts
- Ensure CORS is enabled

**Issue**: Charts don't render
- Check browser console for errors
- Verify data format matches expected structure
- Ensure data is not empty

**Issue**: Build fails
- Run `npm install` in all packages
- Build shared package first
- Check TypeScript errors

## Resources

- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [FRED API Docs](https://fred.stlouisfed.org/docs/api/)
- [World Bank API Docs](https://datahelpdesk.worldbank.org/knowledgebase/articles/889392)
- [Recharts Docs](https://recharts.org/)
- [Vite Docs](https://vitejs.dev/)
