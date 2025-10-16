const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export interface FetchOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: string;
}

export async function fetchApi<T>(endpoint: string, options?: FetchOptions): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }

  return response.json();
}

export async function fetchFredSeries(
  seriesId: string,
  startDate?: string,
  endDate?: string
): Promise<any> {
  const params = new URLSearchParams({ series_id: seriesId });
  if (startDate) params.append('start_date', startDate);
  if (endDate) params.append('end_date', endDate);

  return fetchApi(`/fred/series?${params.toString()}`);
}

export async function fetchWorldBankIndicator(
  indicatorId: string,
  country?: string,
  startDate?: string,
  endDate?: string
): Promise<any> {
  const params = new URLSearchParams({ indicator_id: indicatorId });
  if (country) params.append('country', country);
  if (startDate) params.append('start_date', startDate);
  if (endDate) params.append('end_date', endDate);

  return fetchApi(`/worldbank/indicator?${params.toString()}`);
}
