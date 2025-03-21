import Geolocation from '@react-native-community/geolocation';
import {getWeather} from './Services';


interface WeatherApiResponse {
  error?: {message: string};
  temp?: number;
  location?: string;
  icon?: string;
  condition?: string;
}

export const checkWeatherNearMe = async (): Promise<WeatherApiResponse> => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      async info => {
        try {
          const location = `${info.coords.latitude},${info.coords.longitude}`;
          const res: WeatherApiResponse = await getWeather(location);
          resolve(res);
        } catch (error) {
          reject(error);
        }
      },
      error => {
        reject(error);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  });
};
