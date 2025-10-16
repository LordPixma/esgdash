import React, { useState } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';

interface ChartData {
  date: string;
  value: number;
}

interface DataChartProps {
  data: ChartData[];
  title: string;
  color?: string;
  height?: number;
  type?: 'line' | 'area';
  showControls?: boolean;
}

export const DataChart: React.FC<DataChartProps> = ({ 
  data, 
  title, 
  color = '#3182ce', 
  height = 300,
  type = 'line',
  showControls = true
}) => {
  const [chartType, setChartType] = useState<'line' | 'area'>(type);
  const [timeframe, setTimeframe] = useState<'1M' | '3M' | '6M' | '1Y' | 'ALL'>('1Y');

  const filteredData = React.useMemo(() => {
    if (timeframe === 'ALL' || !data.length) return data;
    
    const now = new Date();
    const monthsBack = {
      '1M': 1,
      '3M': 3,
      '6M': 6,
      '1Y': 12
    }[timeframe];
    
    const cutoffDate = new Date(now.setMonth(now.getMonth() - monthsBack));
    return data.filter(item => new Date(item.date) >= cutoffDate);
  }, [data, timeframe]);

  const formatTooltipLabel = (value: string) => {
    return new Date(value).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTooltipValue = (value: number) => {
    return [new Intl.NumberFormat('en-US').format(value), title];
  };

  return (
    <div className="chart-container">
      <div className="chart-header">
        <div className="chart-title">{title}</div>
        {showControls && (
          <div className="chart-controls">
            <div className="flex gap-1">
              {['line', 'area'].map((t) => (
                <button
                  key={t}
                  className={`chart-control-btn ${chartType === t ? 'active' : ''}`}
                  onClick={() => setChartType(t as 'line' | 'area')}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
            <div className="flex gap-1">
              {(['1M', '3M', '6M', '1Y', 'ALL'] as const).map((tf) => (
                <button
                  key={tf}
                  className={`chart-control-btn ${timeframe === tf ? 'active' : ''}`}
                  onClick={() => setTimeframe(tf)}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <ResponsiveContainer width="100%" height={height}>
        {chartType === 'area' ? (
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id={`gradient-${title}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={color} stopOpacity={0.0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-primary)" />
            <XAxis 
              dataKey="date" 
              stroke="var(--text-muted)"
              tick={{ fill: 'var(--text-muted)', fontSize: 12 }}
              tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            />
            <YAxis 
              stroke="var(--text-muted)"
              tick={{ fill: 'var(--text-muted)', fontSize: 12 }}
              tickFormatter={(value) => new Intl.NumberFormat('en-US', { notation: 'compact' }).format(value)}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'var(--bg-card)', 
                border: '1px solid var(--border-secondary)',
                borderRadius: '6px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
              }}
              labelFormatter={formatTooltipLabel}
              formatter={formatTooltipValue}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke={color} 
              fill={`url(#gradient-${title})`}
              strokeWidth={2}
            />
          </AreaChart>
        ) : (
          <LineChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-primary)" />
            <XAxis 
              dataKey="date" 
              stroke="var(--text-muted)"
              tick={{ fill: 'var(--text-muted)', fontSize: 12 }}
              tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            />
            <YAxis 
              stroke="var(--text-muted)"
              tick={{ fill: 'var(--text-muted)', fontSize: 12 }}
              tickFormatter={(value) => new Intl.NumberFormat('en-US', { notation: 'compact' }).format(value)}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'var(--bg-card)', 
                border: '1px solid var(--border-secondary)',
                borderRadius: '6px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
              }}
              labelFormatter={formatTooltipLabel}
              formatter={formatTooltipValue}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={color} 
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: color }}
            />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};
