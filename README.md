# ESGDash

ESG, macroeconomic & risk analytics accessible to everyone through a Cloudflare-native SaaS platform.

## Overview

ESGDash is a modern, serverless SaaS dashboard built on Cloudflare's infrastructure for displaying ESG (Environmental, Social, and Governance) and macroeconomic data. It fetches data from authoritative sources like FRED (Federal Reserve Economic Data) and the World Bank, caches it efficiently using Cloudflare KV/R2, and presents it through an intuitive React-based interface.

## Features

- **Cloudflare Workers API**: Serverless API endpoints for data fetching and caching
- **Multiple Data Sources**: 
  - FRED (Federal Reserve Economic Data)
  - World Bank Open Data
  - Extensible for OECD and other sources
- **Intelligent Caching**: KV/R2 storage for efficient data retrieval
- **Modern React Frontend**: Built with Vite and deployed on Cloudflare Pages
- **Interactive Charts**: Powered by Recharts and D3.js
- **TypeScript Monorepo**: Well-structured codebase with shared types and utilities

## Project Structure

```
esgdash/
├── apps/
│   ├── api/              # Cloudflare Workers API
│   │   ├── src/
│   │   │   ├── index.ts      # Main worker entry
│   │   │   ├── fred.ts       # FRED API integration
│   │   │   ├── worldbank.ts  # World Bank API integration
│   │   │   └── cache.ts      # KV/R2 caching utilities
│   │   ├── wrangler.toml     # Cloudflare Workers config
│   │   └── package.json
│   │
│   └── web/              # React frontend (Vite)
│       ├── src/
│       │   ├── components/   # React components
│       │   ├── App.tsx       # Main app component
│       │   ├── api.ts        # API client
│       │   └── main.tsx      # Entry point
│       ├── vite.config.ts    # Vite configuration
│       └── package.json
│
├── packages/
│   └── shared/           # Shared types and utilities
│       ├── src/
│       │   ├── types.ts      # TypeScript types
│       │   ├── utils.ts      # Utility functions
│       │   └── index.ts      # Package exports
│       └── package.json
│
├── package.json          # Root package.json (workspace)
├── tsconfig.json         # Root TypeScript config
└── README.md
```

## Getting Started

**New to ESGDash?** Check out our [Quickstart Guide](QUICKSTART.md) to get running in under 5 minutes!

### Prerequisites

- Node.js 18+ and npm
- Cloudflare account (for deployment)
- FRED API key (free from https://fred.stlouisfed.org/docs/api/api_key.html)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/LordPixma/esgdash.git
cd esgdash
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables for the API:
```bash
cd apps/api
cp .dev.vars.example .dev.vars
# Edit .dev.vars and add your FRED_API_KEY
```

### Development

#### Running the API locally:
```bash
cd apps/api
npm run dev
# API will be available at http://localhost:8787
```

#### Running the web frontend:
```bash
cd apps/web
npm run dev
# Web app will be available at http://localhost:3000
```

#### Running everything (from root):
```bash
npm run dev
```

### Building

Build all packages:
```bash
npm run build
```

## API Endpoints

### FRED Data
```
GET /api/fred/series?series_id=GDP&start_date=2020-01-01&end_date=2023-12-31
```

Parameters:
- `series_id` (required): FRED series ID (e.g., GDP, UNRATE)
- `start_date` (optional): Start date in YYYY-MM-DD format
- `end_date` (optional): End date in YYYY-MM-DD format

### World Bank Data
```
GET /api/worldbank/indicator?indicator_id=EN.ATM.CO2E.PC&country=USA&start_date=2000&end_date=2020
```

Parameters:
- `indicator_id` (required): World Bank indicator ID
- `country` (optional): Country code (default: all)
- `start_date` (optional): Start year
- `end_date` (optional): End year

## Deployment

Ready to deploy to production? See our comprehensive [Deployment Guide](DEPLOYMENT.md).

### Deploying the API (Cloudflare Workers)

1. Configure wrangler.toml with your account details
2. Create KV namespace:
```bash
wrangler kv:namespace create "CACHE"
```
3. Create R2 bucket:
```bash
wrangler r2 bucket create esgdash-data
```
4. Deploy:
```bash
cd apps/api
npm run deploy
```

### Deploying the Frontend (Cloudflare Pages)

1. Build the frontend:
```bash
cd apps/web
npm run build
```

2. Deploy to Cloudflare Pages:
```bash
wrangler pages deploy dist
```

Or connect your GitHub repository to Cloudflare Pages for automatic deployments.

## Technologies

- **Cloudflare Workers**: Serverless API runtime
- **Cloudflare Pages**: Static site hosting
- **Cloudflare KV**: Key-value storage for caching
- **Cloudflare R2**: Object storage
- **TypeScript**: Type-safe development
- **React**: UI framework
- **Vite**: Build tool and dev server
- **Recharts**: Charting library
- **D3.js**: Data visualization
- **Wrangler**: Cloudflare CLI tool

## Data Sources

- **FRED (Federal Reserve Economic Data)**: Economic indicators, GDP, unemployment, inflation, etc.
- **World Bank Open Data**: Global development indicators, ESG metrics, demographic data
- **OECD** (Extensible): Additional economic and social indicators

## Documentation

- **[Quickstart Guide](QUICKSTART.md)** - Get started in 5 minutes
- **[Development Guide](DEVELOPMENT.md)** - Detailed development documentation
- **[Deployment Guide](DEPLOYMENT.md)** - Production deployment instructions

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

## Acknowledgments

- Federal Reserve Economic Data (FRED)
- World Bank Open Data
- Cloudflare for their excellent developer platform
