import { FredChart } from './components/FredChart';
import { WorldBankChart } from './components/WorldBankChart';
import './index.css';

function App() {
  return (
    <div className="container">
      <header className="header">
        <h1>ESGDash</h1>
        <p>ESG, Macroeconomic & Risk Analytics Platform</p>
        <p style={{ fontSize: '1rem', opacity: 0.7, marginTop: '0.5rem' }}>
          Powered by Cloudflare Workers, Pages, and leading economic data sources
        </p>
      </header>

      <div className="dashboard">
        <div className="card">
          <h2>Economic Indicators - FRED</h2>
          <div className="card-content">
            <FredChart 
              seriesId="GDP" 
              title="US Gross Domestic Product"
              color="#8884d8"
            />
          </div>
        </div>

        <div className="card">
          <h2>Unemployment Rate - FRED</h2>
          <div className="card-content">
            <FredChart 
              seriesId="UNRATE" 
              title="US Unemployment Rate"
              color="#82ca9d"
            />
          </div>
        </div>

        <div className="card">
          <h2>CO2 Emissions - World Bank</h2>
          <div className="card-content">
            <WorldBankChart 
              indicatorId="EN.ATM.CO2E.PC" 
              countryCode="USA"
              title="CO2 Emissions (metric tons per capita)"
              color="#ffc658"
            />
          </div>
        </div>

        <div className="card">
          <h2>GDP Growth - World Bank</h2>
          <div className="card-content">
            <WorldBankChart 
              indicatorId="NY.GDP.MKTP.KD.ZG" 
              countryCode="USA"
              title="GDP Growth (annual %)"
              color="#ff8042"
            />
          </div>
        </div>
      </div>

      <footer style={{ textAlign: 'center', padding: '2rem', opacity: 0.6 }}>
        <p>
          Data sources: Federal Reserve Economic Data (FRED), World Bank Open Data
        </p>
        <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
          Built with React, Vite, Recharts, and Cloudflare Workers
        </p>
      </footer>
    </div>
  );
}

export default App;
