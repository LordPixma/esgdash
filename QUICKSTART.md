# ESGDash Quickstart Guide

Get ESGDash running in under 5 minutes!

## Prerequisites

- Node.js 18 or higher
- npm

## Installation

1. **Clone the repository:**
```bash
git clone https://github.com/LordPixma/esgdash.git
cd esgdash
```

2. **Run the setup script:**
```bash
chmod +x setup.sh
./setup.sh
```

Or manually:
```bash
npm install
cd packages/shared && npm run build && cd ../..
```

## Quick Start (Demo Mode)

ESGDash works out of the box with mock data - perfect for testing!

**Terminal 1 - Start the API:**
```bash
cd apps/api
npm run dev
```

The API will be available at http://localhost:8787

**Terminal 2 - Start the Web App:**
```bash
cd apps/web
npm run dev
```

The web app will be available at http://localhost:3000

Open your browser to http://localhost:3000 and you'll see the dashboard with demo data!

## Using Real Data

To fetch real data from FRED and World Bank APIs:

1. **Get a FREE FRED API key:**
   - Visit https://fred.stlouisfed.org/docs/api/api_key.html
   - Sign up and get your API key

2. **Add your API key:**
   Create or edit `apps/api/.dev.vars`:
   ```
   FRED_API_KEY=your_api_key_here
   CACHE_TTL_HOURS=24
   ```

3. **Restart the API:**
   ```bash
   cd apps/api
   npm run dev
   ```

The app will now fetch real data from FRED and World Bank APIs!

## Available Data Sources

### FRED (Federal Reserve Economic Data)
- GDP (Gross Domestic Product)
- UNRATE (Unemployment Rate)
- CPIAUCSL (Consumer Price Index)
- And thousands more series...

### World Bank
- EN.ATM.CO2E.PC (CO2 Emissions per capita)
- NY.GDP.MKTP.KD.ZG (GDP Growth)
- SP.POP.TOTL (Total Population)
- And many more indicators...

## Testing the API

Test the endpoints directly:

```bash
# Test root endpoint
curl http://localhost:8787/api

# Test FRED data
curl "http://localhost:8787/api/fred/series?series_id=GDP"

# Test World Bank data
curl "http://localhost:8787/api/worldbank/indicator?indicator_id=EN.ATM.CO2E.PC&country=USA"
```

## What's Next?

- **Customize Charts**: Edit `apps/web/src/App.tsx` to add your own data series
- **Add Data Sources**: Check `DEVELOPMENT.md` for how to add OECD or other sources
- **Deploy**: See `README.md` for deployment instructions to Cloudflare

## Troubleshooting

**Problem**: API returns errors
- Check if the API server is running on port 8787
- Verify your FRED_API_KEY if using real data
- Check console logs for detailed error messages

**Problem**: Web app can't connect to API
- Make sure both servers are running
- Check that the API is on port 8787
- Verify the proxy configuration in `apps/web/vite.config.ts`

**Problem**: Charts don't display
- Open browser console to see errors
- Verify that data is being returned from the API
- Check network tab to see API responses

## Features

✅ **Working out of the box** - No configuration needed for demo mode  
✅ **Real-time data** - Fetches latest economic data  
✅ **Cloudflare-native** - Built for edge computing  
✅ **Intelligent caching** - Reduces API calls  
✅ **Beautiful charts** - Interactive Recharts visualizations  
✅ **TypeScript** - Type-safe development  
✅ **Monorepo** - Well-organized codebase  

## Support

- Documentation: See `README.md` and `DEVELOPMENT.md`
- Issues: https://github.com/LordPixma/esgdash/issues

Happy analyzing! 📊
