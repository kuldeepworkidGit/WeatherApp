export interface WeatherData {
  temp: number;
  location: string;
  icon: string;
  condition: string;
}

// Define API response type
export interface WeatherApiResponse {
  error?: {message: string};
  temp?: number;
  location?: string;
  icon?: string;
  condition?: string;
}
