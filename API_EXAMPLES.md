# Example API responses for reference

## FRED API Response

GET http://localhost:8787/api/fred/series?series_id=GDP

```json
{
  "success": true,
  "data": {
    "observations": [
      {
        "date": "2020-01-01",
        "value": "21427.7"
      },
      {
        "date": "2020-04-01",
        "value": "19520.1"
      }
    ]
  },
  "cached": false,
  "demo": true,
  "timestamp": "2024-10-16T08:00:00.000Z"
}
```

## World Bank API Response

GET http://localhost:8787/api/worldbank/indicator?indicator_id=EN.ATM.CO2E.PC&country=USA

```json
{
  "success": true,
  "data": {
    "metadata": {
      "page": 1,
      "pages": 1,
      "per_page": 50,
      "total": 24
    },
    "data": [
      {
        "date": "2020",
        "value": 13.76,
        "indicator": {
          "id": "EN.ATM.CO2E.PC",
          "value": "CO2 emissions"
        },
        "country": {
          "id": "US",
          "value": "United States"
        },
        "countryiso3code": "USA"
      }
    ]
  },
  "cached": false,
  "demo": true,
  "timestamp": "2024-10-16T08:00:00.000Z"
}
```

## API Root Endpoint

GET http://localhost:8787/api

```json
{
  "success": true,
  "message": "ESGDash API - Cloudflare Workers",
  "version": "1.0.0",
  "endpoints": [
    {
      "path": "/api/fred/series",
      "method": "GET",
      "params": ["series_id", "start_date?", "end_date?"],
      "description": "Fetch FRED economic data series"
    },
    {
      "path": "/api/worldbank/indicator",
      "method": "GET",
      "params": ["indicator_id", "country?", "start_date?", "end_date?"],
      "description": "Fetch World Bank indicator data"
    }
  ],
  "timestamp": "2024-10-16T08:00:00.000Z"
}
```

## Common FRED Series IDs

- `GDP` - Gross Domestic Product
- `UNRATE` - Unemployment Rate
- `CPIAUCSL` - Consumer Price Index
- `DFF` - Federal Funds Rate
- `DEXUSEU` - USD/EUR Exchange Rate
- `T10YIE` - 10-Year Breakeven Inflation Rate

## Common World Bank Indicators

- `EN.ATM.CO2E.PC` - CO2 emissions (metric tons per capita)
- `NY.GDP.MKTP.KD.ZG` - GDP growth (annual %)
- `SP.POP.TOTL` - Population, total
- `NY.GDP.PCAP.CD` - GDP per capita (current US$)
- `SE.PRM.ENRR` - School enrollment, primary (% gross)
- `SH.DYN.MORT` - Mortality rate, under-5 (per 1,000 live births)
