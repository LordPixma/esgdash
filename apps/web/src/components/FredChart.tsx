import { useState, useEffect } from 'react';
import { fetchFredSeries } from '../api';
import { DataChart } from './DataChart';

interface FredChartProps {
  seriesId: string;
  title: string;
  color?: string;
}

export const FredChart = ({ seriesId, title, color }: FredChartProps) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cached, setCached] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetchFredSeries(seriesId);
        
        if (response.success && response.data?.observations) {
          const chartData = response.data.observations
            .filter((obs: any) => obs.value !== '.')
            .map((obs: any) => ({
              date: obs.date,
              value: parseFloat(obs.value),
            }));
          
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
  }, [seriesId]);

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
