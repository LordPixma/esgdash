import React from 'react';

interface MetricCardProps {
  label: string;
  value: string | number;
  change?: {
    value: number;
    percentage: boolean;
  };
  format?: 'number' | 'currency' | 'percentage';
}

export const MetricCard: React.FC<MetricCardProps> = ({ 
  label, 
  value, 
  change, 
  format = 'number' 
}) => {
  const formatValue = (val: string | number) => {
    if (typeof val === 'string') return val;
    
    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(val);
      case 'percentage':
        return `${val.toFixed(2)}%`;
      default:
        return new Intl.NumberFormat('en-US').format(val);
    }
  };

  const formatChange = (changeVal: number, isPercentage: boolean) => {
    if (isPercentage) {
      return `${changeVal > 0 ? '+' : ''}${changeVal.toFixed(2)}%`;
    }
    return `${changeVal > 0 ? '+' : ''}${formatValue(changeVal)}`;
  };

  return (
    <div className="metric-card">
      <div className="metric-label">{label}</div>
      <div className="metric-value">{formatValue(value)}</div>
      {change && (
        <div className={`metric-change ${change.value >= 0 ? 'positive' : 'negative'}`}>
          <span>{change.value >= 0 ? '▲' : '▼'}</span>
          {formatChange(change.value, change.percentage)}
        </div>
      )}
    </div>
  );
};