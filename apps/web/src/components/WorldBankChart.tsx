import { useState, useEffect } from 'react';
import { fetchWorldBankIndicator } from '../api';
import { DataChart } from './DataChart';

interface WorldBankChartProps {
  indicatorId: string;
  countryCode: string;
  title: string;
  color?: string;
}

export const WorldBankChart = ({ 
  indicatorId, 
  countryCode, 
  title, 
  color 
}: WorldBankChartProps) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cached, setCached] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetchWorldBankIndicator(indicatorId, countryCode);
        
        if (response.success && response.data?.data) {
          const chartData = response.data.data
            .filter((item: any) => item.value !== null)
            .map((item: any) => ({
              date: item.date,
              value: item.value,
            }))
            .reverse(); // World Bank data comes in reverse chronological order
          
          setData(chartData);
          setCached(response.cached || false);
        } else {
          throw new Error(response.error || 'Failed to fetch data');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [indicatorId, countryCode]);

  if (loading) {
    return <div className="loading">Loading {title}...</div>;
  }

  if (error) {
    return <div className="error">Error loading {title}: {error}</div>;
  }

  return (
    <div>
      <DataChart data={data} title={title} color={color} />
      {cached && (
        <div style={{ fontSize: '0.8rem', opacity: 0.6, marginTop: '0.5rem' }}>
          (Cached data)
        </div>
      )}
    </div>
  );
};
