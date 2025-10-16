// FRED (Federal Reserve Economic Data) types
export interface FredSeries {
  id: string;
  title: string;
  observation_start: string;
  observation_end: string;
  frequency: string;
  units: string;
  seasonal_adjustment: string;
  last_updated: string;
}

export interface FredObservation {
  date: string;
  value: string;
  realtime_start?: string;
  realtime_end?: string;
}

export interface FredSeriesResponse {
  seriess: FredSeries[];
}

export interface FredObservationsResponse {
  observations: FredObservation[];
}

// World Bank types
export interface WorldBankIndicator {
  id: string;
  name: string;
  sourceNote: string;
  sourceOrganization: string;
}

export interface WorldBankDataPoint {
  indicator: {
    id: string;
    value: string;
  };
  country: {
    id: string;
    value: string;
  };
  countryiso3code: string;
  date: string;
  value: number | null;
  unit: string;
  obs_status: string;
  decimal: number;
}

export interface WorldBankResponse {
  page: number;
  pages: number;
  per_page: number;
  total: number;
  data: WorldBankDataPoint[];
}

// OECD types
export interface OECDIndicator {
  id: string;
  name: string;
  description: string;
}

export interface OECDDataPoint {
  indicator: string;
  country: string;
  date: string;
  value: number;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  cached?: boolean;
  timestamp: string;
}

// Chart data types
export interface ChartDataPoint {
  date: string;
  value: number;
  label?: string;
}

export interface ChartSeries {
  id: string;
  name: string;
  data: ChartDataPoint[];
  color?: string;
}

// ESG Score types
export interface ESGScore {
  environmental: number;
  social: number;
  governance: number;
  overall: number;
  date: string;
}

// Cache types
export interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

// Error types
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}
