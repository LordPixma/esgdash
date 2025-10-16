# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-10-16

### Added
- Initial release of ESGDash
- Cloudflare Workers API with FRED and World Bank integrations
- React frontend with Recharts data visualization
- Monorepo structure with TypeScript
- Demo mode with mock data for testing
- KV/R2 caching support
- Comprehensive documentation:
  - README with project overview
  - QUICKSTART guide for new users
  - DEVELOPMENT guide for contributors
  - DEPLOYMENT guide for production
- Setup script for easy installation
- Example dashboards with 4 charts:
  - US GDP (FRED)
  - US Unemployment Rate (FRED)
  - CO2 Emissions per capita (World Bank)
  - GDP Growth (World Bank)
- CORS support for API endpoints
- Configurable cache TTL
- Error handling and logging

### Features
- `/api/fred/series` - Fetch FRED economic data
- `/api/worldbank/indicator` - Fetch World Bank indicators
- Automatic data caching with configurable TTL
- Responsive dashboard layout
- Interactive charts with tooltips
- Dark mode UI

[1.0.0]: https://github.com/LordPixma/esgdash/releases/tag/v1.0.0
