import Geolocation from '@react-native-community/geolocation';
import {getWeather} from './Services';

export const checkWeatherNearMe = async () => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      async info => {
        try {
          console.log(info);
          const location = `${info.coords.latitude},${info.coords.longitude}`;
          const res = await getWeather(location);

          resolve(res);
        } catch (error) {
          reject(error);
        }
      },
      error => {
        reject(error);
      },
    );
  });
};
