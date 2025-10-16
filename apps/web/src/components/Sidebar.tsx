import React from 'react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
  const navSections = [
    {
      title: 'Dashboard',
      items: [
        { id: 'overview', label: 'Overview' },
        { id: 'economic-summary', label: 'Economic Summary' },
      ]
    },
    {
      title: 'Economic Data (FRED)',
      items: [
        { id: 'gdp', label: 'GDP & Growth' },
        { id: 'employment', label: 'Employment & Labor' },
        { id: 'inflation', label: 'Inflation & Prices' },
        { id: 'interest-rates', label: 'Interest Rates' },
        { id: 'trade', label: 'Trade & Balance' },
      ]
    },
    {
      title: 'ESG & Sustainability',
      items: [
        { id: 'environmental', label: 'Environmental Impact' },
        { id: 'climate-change', label: 'Climate Change' },
        { id: 'energy', label: 'Energy & Resources' },
        { id: 'social-development', label: 'Social Development' },
      ]
    },
    {
      title: 'Global Indicators',
      items: [
        { id: 'country-comparison', label: 'Country Comparison' },
        { id: 'development', label: 'Development Metrics' },
        { id: 'demographics', label: 'Demographics' },
      ]
    },
    {
      title: 'Data Sources',
      items: [
        { id: 'fred-explorer', label: 'FRED Data Explorer' },
        { id: 'worldbank-explorer', label: 'World Bank Explorer' },
      ]
    }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1>ESGDash</h1>
        <p>Analytics Platform</p>
      </div>
      
      {navSections.map((section) => (
        <div key={section.title} className="nav-section">
          <div className="nav-section-title">{section.title}</div>
          {section.items.map((item) => (
            <div
              key={item.id}
              className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => onSectionChange(item.id)}
            >
              {item.label}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};