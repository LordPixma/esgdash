# ESGDash Deployment Guide

This guide covers deploying ESGDash to Cloudflare Workers and Pages.

## Prerequisites

- Cloudflare account (free tier works!)
- Wrangler CLI installed (`npm install -g wrangler`)
- FRED API key (optional, but recommended for production)

## 1. Setup Cloudflare Authentication

```bash
wrangler login
```

This will open a browser window to authenticate with Cloudflare.

## 2. Deploy the API (Cloudflare Workers)

### Step 2.1: Create KV Namespace for Caching

```bash
cd apps/api

# Create production KV namespace
wrangler kv:namespace create "CACHE"

# Create preview KV namespace for testing
wrangler kv:namespace create "CACHE" --preview
```

Take note of the IDs returned. Update `wrangler.toml`:

```toml
[[kv_namespaces]]
binding = "CACHE"
id = "your-namespace-id-here"
preview_id = "your-preview-namespace-id-here"
```

### Step 2.2: Create R2 Bucket (Optional)

For larger data storage:

```bash
# Create production bucket
wrangler r2 bucket create esgdash-data

# Create preview bucket
wrangler r2 bucket create esgdash-data-preview
```

Update `wrangler.toml`:

```toml
[[r2_buckets]]
binding = "DATA_STORAGE"
bucket_name = "esgdash-data"
preview_bucket_name = "esgdash-data-preview"
```

### Step 2.3: Set API Secrets

```bash
# Set FRED API key
wrangler secret put FRED_API_KEY
# Enter your FRED API key when prompted
```

### Step 2.4: Deploy the Worker

```bash
npm run deploy
```

Your API will be deployed to: `https://esgdash-api.<your-subdomain>.workers.dev`

### Step 2.5: Test the Deployment

```bash
curl https://esgdash-api.<your-subdomain>.workers.dev/api
```

## 3. Deploy the Frontend (Cloudflare Pages)

### Option A: Deploy via Wrangler (Quick)

```bash
cd apps/web

# Build the application
npm run build

# Deploy to Cloudflare Pages
wrangler pages deploy dist --project-name=esgdash
```

### Option B: Connect GitHub Repository (Recommended)

This enables automatic deployments on every push.

1. **Go to Cloudflare Dashboard:**
   - Navigate to Pages
   - Click "Create a project"
   - Connect to your GitHub account
   - Select the `esgdash` repository

2. **Configure Build Settings:**
   ```
   Build command: cd apps/web && npm install && npm run build
   Build output directory: apps/web/dist
   Root directory: /
   ```

3. **Set Environment Variables:**
   ```
   VITE_API_URL=https://esgdash-api.<your-subdomain>.workers.dev/api
   ```

4. **Deploy:**
   Click "Save and Deploy"

Your site will be available at: `https://esgdash.pages.dev`

### Option C: Using GitHub Actions (Advanced)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy ESGDash

on:
  push:
    branches: [main]

jobs:
  deploy-api:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: cd packages/shared && npm run build
      - run: cd apps/api && npm run deploy
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}

  deploy-web:
    runs-on: ubuntu-latest
    needs: deploy-api
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: cd packages/shared && npm run build
      - run: cd apps/web && npm run build
      - run: cd apps/web && npx wrangler pages deploy dist --project-name=esgdash
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
```

## 4. Custom Domain (Optional)

### For the API (Workers):

1. Go to Workers & Pages in Cloudflare Dashboard
2. Select your worker
3. Go to "Triggers" tab
4. Click "Add Custom Domain"
5. Enter your domain (e.g., `api.yourdomain.com`)

### For the Frontend (Pages):

1. Go to your Pages project
2. Click "Custom domains"
3. Click "Set up a custom domain"
4. Enter your domain (e.g., `esgdash.yourdomain.com`)

## 5. Environment Configuration

### Production Environment Variables

Update environment variables in Cloudflare Dashboard:

**For Workers (API):**
- `FRED_API_KEY`: Your FRED API key
- `CACHE_TTL_HOURS`: Cache duration (default: 24)

**For Pages (Web):**
- `VITE_API_URL`: Your worker URL (e.g., `https://api.yourdomain.com/api`)

## 6. Monitoring and Analytics

### Enable Analytics

1. **Workers Analytics:**
   - Automatic for all Workers
   - View in Cloudflare Dashboard > Workers & Pages

2. **Pages Analytics:**
   - Automatic for all Pages projects
   - View in Cloudflare Dashboard > Web Analytics

### Set Up Alerts

1. Go to Notifications in Cloudflare Dashboard
2. Create alerts for:
   - Worker errors
   - High CPU usage
   - Failed deployments

## 7. Performance Optimization

### API Optimization

1. **Adjust Cache TTL:**
   ```bash
   wrangler secret put CACHE_TTL_HOURS
   # Enter desired hours (e.g., 24)
   ```

2. **Monitor Cache Hit Rate:**
   - Check Cloudflare Analytics
   - Adjust TTL based on data freshness needs

### Frontend Optimization

1. **Enable Compression:**
   Already enabled by Cloudflare Pages

2. **Optimize Bundle Size:**
   ```bash
   cd apps/web
   npm run build -- --mode production
   ```

3. **Use CDN:**
   Cloudflare automatically CDN-enables all assets

## 8. Rollback and Versioning

### Rollback a Worker Deployment

```bash
cd apps/api
wrangler rollback
```

### Rollback a Pages Deployment

1. Go to Cloudflare Dashboard > Pages
2. Select your project
3. Click "View build history"
4. Select a previous deployment
5. Click "Rollback to this deployment"

## 9. Scaling

ESGDash automatically scales with Cloudflare:

- **Workers:** 10ms CPU time per request (free tier), unlimited requests
- **KV:** 100,000 reads/day (free tier)
- **R2:** 10M requests/month (free tier)
- **Pages:** Unlimited bandwidth

For higher limits, upgrade to Cloudflare Workers Paid plan.

## 10. Security Best Practices

1. **Never commit secrets:**
   - Use `wrangler secret` for API keys
   - Use `.dev.vars` for local development

2. **Enable Rate Limiting:**
   Consider adding rate limiting to prevent abuse:
   ```typescript
   // In your worker
   if (requests > 100) {
     return new Response('Rate limit exceeded', { status: 429 });
   }
   ```

3. **CORS Configuration:**
   Adjust CORS headers in `apps/api/src/cache.ts` as needed

4. **Environment Variables:**
   Never expose secrets in frontend code

## 11. Cost Estimation

Cloudflare's free tier is generous:

**Workers:**
- 100,000 requests/day FREE
- After: $0.50/million requests

**KV:**
- 100,000 reads/day FREE
- 1,000 writes/day FREE
- After: $0.50/million reads, $5/million writes

**R2:**
- 10 GB storage FREE
- 10M Class A requests/month FREE
- After: $0.015/GB/month

**Pages:**
- Unlimited bandwidth FREE
- 500 builds/month FREE

**Expected monthly cost for small to medium traffic:** $0 - $5

## 12. Troubleshooting

### API Returns 500 Errors

- Check Cloudflare Dashboard logs
- Verify FRED_API_KEY is set correctly
- Check external API availability

### Frontend Can't Connect to API

- Verify `VITE_API_URL` is set correctly
- Check CORS configuration
- Verify API is deployed and accessible

### Build Failures

- Check build logs in Cloudflare Dashboard
- Verify all dependencies are listed in package.json
- Ensure Node.js version is compatible (18+)

## Support

For issues or questions:
- Check the logs in Cloudflare Dashboard
- Review documentation at https://developers.cloudflare.com
- Open an issue on GitHub

## Next Steps

- Set up monitoring and alerts
- Configure custom domains
- Add more data sources
- Implement user authentication (if needed)
- Set up CI/CD with GitHub Actions

Happy deploying! 🚀
