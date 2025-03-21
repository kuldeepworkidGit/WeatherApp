import {API_ENDPOINT, API_KEY_WEATHER} from './Constants';

export const getWeather = async (location: string) => {
  const payload = {
    q: location || 'paris',
    key: API_KEY_WEATHER,
  };
  const res = await handleGetApi(API_ENDPOINT.weather, payload);
  if (res?.error) {
    return res;
  }
  let data = {
    temp: res?.current?.temp_c,
    location: `${res?.location?.name}, ${res?.location?.country}`,
    icon: res?.current?.condition?.icon,
    condition: res?.current?.condition?.text,
  };
  return data;
};

const handleGetApi = async (url: string, payload: any) => {
  try {
    const queryString = new URLSearchParams(payload).toString();
    const fullUrl = `${url}?${queryString}`;

    const res = await fetch(fullUrl, {method: 'GET'});

    return await res.json();
  } catch (error) {
    return null;
  }
};
