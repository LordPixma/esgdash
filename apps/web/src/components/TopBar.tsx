import React from 'react';

interface TopBarProps {
  title: string;
  breadcrumb?: string;
}

export const TopBar: React.FC<TopBarProps> = ({ title, breadcrumb }) => {
  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });

  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <div className="page-title">{title}</div>
        {breadcrumb && <div className="breadcrumb">{breadcrumb}</div>}
      </div>
      
      <div className="top-bar-right">
        <div className="status-indicator">
          <div className="status-dot"></div>
          <span>Live Data</span>
        </div>
        <div className="status-indicator">
          <span>Last Update: {currentTime}</span>
        </div>
      </div>
    </div>
  );
};