import { formatCardValues } from './formatCardValues';
import { getDatetimeParams } from './getDatetimeParams';

export const formatMainData = (data, cityName) => {
  const datetimeParams = getDatetimeParams({ timezone: data.timezone });
  return {
    main: {
      name: cityName || data.name,
      temp: Math.round(data.main.temp),
      text: data.weather[0].description,
      icon: data.weather[0].icon,
      tempFeels: Math.round(data.main.feels_like),
      timezone: data.timezone,
      datetimeParams: datetimeParams,
    },
    details: formatCardValues(data),
    lat: data?.coord?.lat,
    lon: data?.coord?.lon,
    timestamp: Date.now(),
  };
};
