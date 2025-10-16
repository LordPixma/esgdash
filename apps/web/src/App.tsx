import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { MetricCard } from './components/MetricCard';
import { DataTable, TableColumn } from './components/DataTable';
import { FredChart } from './components/FredChart';
import { WorldBankChart } from './components/WorldBankChart';
import './index.css';

function App() {
  const [activeSection, setActiveSection] = useState('overview');

  // Key ESG and Economic metrics - in real app, this would come from APIs
  const keyMetrics = [
    { label: 'US GDP (Q3)', value: 27000000000000, change: { value: 2.1, percentage: true }, format: 'currency' as const },
    { label: 'Unemployment Rate', value: 3.7, change: { value: -0.2, percentage: true }, format: 'percentage' as const },
    { label: 'CO2 Emissions (US)', value: 14.7, change: { value: -2.8, percentage: true } },
    { label: 'Inflation Rate', value: 3.2, change: { value: 0.1, percentage: true }, format: 'percentage' as const },
    { label: 'Renewable Energy %', value: 12.8, change: { value: 1.5, percentage: true }, format: 'percentage' as const },
    { label: 'Federal Funds Rate', value: 5.25, change: { value: 0.25, percentage: true }, format: 'percentage' as const },
  ];

  // Economic and ESG indicator data
  const economicData = [
    { indicator: 'GDP Growth Rate', current: 2.1, previous: 2.0, change: 0.1, unit: '%' },
    { indicator: 'Unemployment Rate', current: 3.7, previous: 3.9, change: -0.2, unit: '%' },
    { indicator: 'Inflation Rate (CPI)', current: 3.2, previous: 3.1, change: 0.1, unit: '%' },
    { indicator: 'Federal Funds Rate', current: 5.25, previous: 5.0, change: 0.25, unit: '%' },
    { indicator: 'Consumer Confidence', current: 102.6, previous: 101.3, change: 1.3, unit: 'Index' },
  ];

  const esgData = [
    { indicator: 'CO2 Emissions per Capita', current: 14.7, previous: 15.1, change: -2.6, unit: 'tons' },
    { indicator: 'Renewable Energy Share', current: 12.8, previous: 11.9, change: 7.6, unit: '%' },
    { indicator: 'Forest Coverage', current: 33.9, previous: 34.0, change: -0.3, unit: '%' },
    { indicator: 'Energy Intensity', current: 5.8, previous: 6.1, change: -4.9, unit: 'MJ/$' },
    { indicator: 'Access to Electricity', current: 100.0, previous: 100.0, change: 0.0, unit: '%' },
  ];

  const globalComparisonData = [
    { country: 'United States', gdp_per_capita: 63543, co2_emissions: 14.7, renewable_energy: 12.8 },
    { country: 'Germany', gdp_per_capita: 46259, co2_emissions: 8.1, renewable_energy: 19.3 },
    { country: 'China', gdp_per_capita: 10500, co2_emissions: 7.4, renewable_energy: 12.7 },
    { country: 'Brazil', gdp_per_capita: 8717, co2_emissions: 2.3, renewable_energy: 45.3 },
    { country: 'India', gdp_per_capita: 1927, co2_emissions: 1.9, renewable_energy: 9.4 },
  ];

  const economicColumns: TableColumn[] = [
    { key: 'indicator', label: 'Indicator', type: 'text' },
    { key: 'current', label: 'Current', type: 'number', align: 'right' },
    { key: 'previous', label: 'Previous', type: 'number', align: 'right' },
    { key: 'change', label: 'Change %', type: 'change', align: 'right' },
    { key: 'unit', label: 'Unit', type: 'text', align: 'center' },
  ];

  const esgColumns: TableColumn[] = [
    { key: 'indicator', label: 'ESG Indicator', type: 'text' },
    { key: 'current', label: 'Current', type: 'number', align: 'right' },
    { key: 'previous', label: 'Previous', type: 'number', align: 'right' },
    { key: 'change', label: 'Change %', type: 'change', align: 'right' },
    { key: 'unit', label: 'Unit', type: 'text', align: 'center' },
  ];

  const globalColumns: TableColumn[] = [
    { key: 'country', label: 'Country', type: 'text' },
    { key: 'gdp_per_capita', label: 'GDP per Capita', type: 'currency', align: 'right' },
    { key: 'co2_emissions', label: 'CO2 per Capita', type: 'number', align: 'right' },
    { key: 'renewable_energy', label: 'Renewable %', type: 'percentage', align: 'right' },
  ];

  const getSectionTitle = () => {
    switch (activeSection) {
      case 'overview': return 'ESG & Economic Overview';
      case 'economic-summary': return 'Economic Summary';
      case 'gdp': return 'GDP & Growth Analysis';
      case 'employment': return 'Employment & Labor Statistics';
      case 'inflation': return 'Inflation & Price Trends';
      case 'interest-rates': return 'Interest Rates & Monetary Policy';
      case 'environmental': return 'Environmental Impact Metrics';
      case 'climate-change': return 'Climate Change Indicators';
      case 'energy': return 'Energy & Resources';
      case 'social-development': return 'Social Development Index';
      case 'country-comparison': return 'Global Country Comparison';
      case 'fred-explorer': return 'FRED Data Explorer';
      case 'worldbank-explorer': return 'World Bank Data Explorer';
      default: return 'ESGDash Analytics';
    }
  };

  const getBreadcrumb = () => {
    switch (activeSection) {
      case 'overview': return 'Dashboard > Overview';
      case 'economic-summary': return 'Dashboard > Economic Summary';
      case 'gdp': return 'Economic Data > GDP & Growth';
      case 'employment': return 'Economic Data > Employment';
      case 'inflation': return 'Economic Data > Inflation';
      case 'interest-rates': return 'Economic Data > Interest Rates';
      case 'environmental': return 'ESG > Environmental';
      case 'climate-change': return 'ESG > Climate Change';
      case 'energy': return 'ESG > Energy & Resources';
      case 'social-development': return 'ESG > Social Development';
      case 'country-comparison': return 'Global > Country Comparison';
      case 'fred-explorer': return 'Data Sources > FRED';
      case 'worldbank-explorer': return 'Data Sources > World Bank';
      default: return 'Dashboard';
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
      case 'economic-summary':
        return (
          <div className="main-panel">
            <div className="metrics-grid">
              {keyMetrics.map((metric, index) => (
                <MetricCard
                  key={index}
                  label={metric.label}
                  value={metric.value}
                  change={metric.change}
                  format={metric.format}
                />
              ))}
            </div>

            <div className="card">
              <div className="card-header">
                <div className="card-title">US GDP Growth Trends</div>
                <div className="card-subtitle">Quarterly data from FRED</div>
              </div>
              <div className="card-content">
                <FredChart 
                  seriesId="GDP" 
                  title="US Gross Domestic Product"
                  color="var(--accent-blue)"
                />
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <div className="card-title">Key Economic Indicators</div>
                <div className="card-subtitle">Latest available data</div>
              </div>
              <div className="card-content">
                <DataTable
                  columns={economicColumns}
                  data={economicData}
                />
              </div>
            </div>
          </div>
        );

      case 'gdp':
        return (
          <div className="main-panel">
            <div className="card">
              <div className="card-header">
                <div className="card-title">US Gross Domestic Product</div>
                <div className="card-subtitle">Quarterly data, seasonally adjusted</div>
              </div>
              <div className="card-content">
                <FredChart 
                  seriesId="GDP" 
                  title="US GDP (Billions of Dollars)"
                  color="var(--accent-blue)"
                />
              </div>
            </div>
          </div>
        );
      
      case 'employment':
        return (
          <div className="main-panel">
            <div className="card">
              <div className="card-header">
                <div className="card-title">US Unemployment Rate</div>
                <div className="card-subtitle">Monthly data, seasonally adjusted</div>
              </div>
              <div className="card-content">
                <FredChart 
                  seriesId="UNRATE" 
                  title="US Unemployment Rate (%)"
                  color="var(--accent-yellow)"
                />
              </div>
            </div>
          </div>
        );

      case 'environmental':
      case 'climate-change':
        return (
          <div className="main-panel">
            <div className="card">
              <div className="card-header">
                <div className="card-title">CO2 Emissions Per Capita</div>
                <div className="card-subtitle">United States - World Bank Data</div>
              </div>
              <div className="card-content">
                <WorldBankChart 
                  indicatorId="EN.ATM.CO2E.PC" 
                  countryCode="USA"
                  title="CO2 Emissions (metric tons per capita)"
                  color="var(--accent-red)"
                />
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <div className="card-title">ESG Indicators Summary</div>
                <div className="card-subtitle">Environmental metrics</div>
              </div>
              <div className="card-content">
                <DataTable
                  columns={esgColumns}
                  data={esgData}
                />
              </div>
            </div>
          </div>
        );

      case 'country-comparison':
        return (
          <div className="main-panel">
            <div className="card">
              <div className="card-header">
                <div className="card-title">Global Country Comparison</div>
                <div className="card-subtitle">GDP, CO2, and Renewable Energy metrics</div>
              </div>
              <div className="card-content">
                <DataTable
                  columns={globalColumns}
                  data={globalComparisonData}
                />
              </div>
            </div>
          </div>
        );

      case 'fred-explorer':
        return (
          <div className="main-panel">
            <div className="card">
              <div className="card-content">
                <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                  <h3>FRED Data Explorer</h3>
                  <p>Federal Reserve Economic Data integration</p>
                  <p style={{ marginTop: '1rem' }}>Available series: GDP, UNRATE, CPIAUCSL, FEDFUNDS, and more</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'worldbank-explorer':
        return (
          <div className="main-panel">
            <div className="card">
              <div className="card-content">
                <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                  <h3>World Bank Data Explorer</h3>
                  <p>Global development and ESG indicators</p>
                  <p style={{ marginTop: '1rem' }}>Available indicators: CO2 emissions, GDP growth, renewable energy, and more</p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="main-panel">
            <div className="card">
              <div className="card-content">
                <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                  <h3>Feature Coming Soon</h3>
                  <p>This section is under development</p>
                  <p style={{ marginTop: '1rem' }}>Select another section to explore available data</p>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <>
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      
      <div className="main-content">
        <TopBar 
          title={getSectionTitle()} 
          breadcrumb={getBreadcrumb()} 
        />
        
        <div className="dashboard">
          {renderContent()}
          
          <div className="side-panel">
            <DataTable
              title="Global ESG Leaders"
              columns={globalColumns}
              data={globalComparisonData.slice(0, 5)}
              maxRows={5}
            />
            
            <div className="card">
              <div className="card-header">
                <div className="card-title">ESG & Economic Updates</div>
              </div>
              <div className="card-content">
                <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  <p style={{ marginBottom: '0.5rem' }}>• US CO2 emissions decline 2.8% year-over-year</p>
                  <p style={{ marginBottom: '0.5rem' }}>• Q3 GDP growth exceeds expectations at 2.1%</p>
                  <p style={{ marginBottom: '0.5rem' }}>• Renewable energy adoption accelerates globally</p>
                  <p style={{ marginBottom: '0.5rem' }}>• Fed maintains current interest rate policy</p>
                  <p>• Employment remains strong with 3.7% unemployment</p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <div className="card-title">Data Status</div>
              </div>
              <div className="card-content">
                <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  <div style={{ marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                    <span>FRED API:</span>
                    <span style={{ color: 'var(--accent-green)' }}>Connected</span>
                  </div>
                  <div style={{ marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                    <span>World Bank:</span>
                    <span style={{ color: 'var(--accent-green)' }}>Connected</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Cache:</span>
                    <span style={{ color: 'var(--accent-blue)' }}>24h TTL</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
