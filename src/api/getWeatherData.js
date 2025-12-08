import { REQUEST_TIMEOUT, ERROR_TITLE, MAIN_WEATHER_URL } from 'constants';

export const getWeatherData = async (lat, lon) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

  try {
    if (!lat || !lon) return null;
    const res = await fetch(
      `${MAIN_WEATHER_URL}?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric&lang=ru`,
      { signal: controller.signal }
    );
    const data = await res.json();
    if (+data.cod !== 200) {
      throw Error(ERROR_TITLE);
    }
    return data;
  } catch (error) {
    throw Error(ERROR_TITLE);
  } finally {
    clearTimeout(timeout);
  }
};
