# ESGDash AI Coding Instructions

## Project Architecture

ESGDash is a **Cloudflare-native monorepo** providing ESG and macroeconomic data through a serverless architecture:

- **API (`apps/api`)**: Cloudflare Workers serverless API with KV/R2 caching
- **Web (`apps/web`)**: React/Vite frontend deployed on Cloudflare Pages  
- **Shared (`packages/shared`)**: Common TypeScript types and utilities

## Development Workflow

**Start development servers:**
```bash
# From root - runs both API and web concurrently
npm run dev

# Or individually:
cd apps/api && npm run dev     # Wrangler dev on :8787
cd apps/web && npm run dev     # Vite dev on :3000 with proxy to API
```

**Build pattern:**
Always build shared package first, then other packages depend on it:
```bash
cd packages/shared && npm run build
npm run build  # Builds all workspaces
```

## Key Patterns

### API Routing Pattern
All API handlers follow this structure in `apps/api/src/index.ts`:
- Route matching by `url.pathname.startsWith()`
- CORS preflight handling with `handleOptions()`
- Consistent error responses with timestamps

### Caching Strategy
Use `getCachedData()` from `cache.ts` for all external API calls:
- KV storage with configurable TTL (default 24h)
- Graceful degradation when KV unavailable
- Cache keys format: `source:identifier:params`

### Mock Data Mode
API automatically uses mock data when `FRED_API_KEY` is empty - check `getMockFredData()` in `mock-data.ts`

### Chart Component Pattern
All chart components in `apps/web/src/components/` follow this structure:
- Hook-based data fetching with loading/error states
- Transform API responses to `{date, value}` format for Recharts
- Display cache status to users
- Use shared `DataChart` component for rendering

### Environment Configuration
- **Development**: Use `.dev.vars` in `apps/api/` for Worker env vars
- **Production**: Configure in `wrangler.toml` or Cloudflare dashboard
- **Frontend**: Use `VITE_API_URL` env var (defaults to `/api` with proxy)

## Data Sources Integration

### FRED (Federal Reserve)
- Endpoint: `/api/fred/series?series_id=GDP&start_date=2020-01-01`
- Handler: `handleFredSeriesRequest()` in `fred.ts`
- Types: `FredSeries`, `FredObservation` in shared package

### World Bank
- Endpoint: `/api/worldbank/indicator?indicator_id=EN.ATM.CO2E.PC&country=USA`
- Handler: `handleWorldBankRequest()` in `worldbank.ts`
- Types: `WorldBankIndicator`, `WorldBankDataPoint` in shared package

## Cloudflare-Specific Conventions

### Worker Environment Interface
```typescript
interface Env {
  CACHE?: KVNamespace;     // Optional KV namespace
  DATA_STORAGE?: R2Bucket; // Optional R2 bucket  
  FRED_API_KEY?: string;
  CACHE_TTL_HOURS?: string;
}
```

### Deployment Commands
- API: `cd apps/api && wrangler deploy` 
- Web: `cd apps/web && wrangler pages deploy dist`
- Use `wrangler kv:namespace create "CACHE"` for KV setup

## TypeScript Workspace Setup

- Root `tsconfig.json` with workspace references
- Each app has own `tsconfig.json` extending base config
- Shared package must be built before dependent packages
- Use `@esgdash/shared` import in all packages

## Error Handling Conventions

- API responses always include `success: boolean`
- Include `timestamp` in all API responses
- Frontend shows loading states and cache indicators
- Use `parseNumericValue()` utility for data transformation

## Adding New Data Sources

1. Add types to `packages/shared/src/types.ts`
2. Create handler in `apps/api/src/[source].ts`
3. Add route to `index.ts`
4. Create chart component following existing pattern
5. Add to main dashboard in `App.tsx`