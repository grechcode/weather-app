import { FORECAST_TABS } from 'constants';
import { getDatetimeParams } from 'utils';

// Высчитывает самое частовстречающееся значение в массиве
const mostFrequent = (arr) => {
  let m = {};
  let maxCount = 0;
  let res = null;
  for (let x of arr) {
    m[x] = (m[x] || 0) + 1;
    if (m[x] > maxCount) {
      maxCount = m[x];
      res = x;
    }
  }
  return res;
};

export const formatForecastData = (data) => {
  const hoursList = [];
  const dailyObject = {};
  const daysList = [];
  data.list.forEach((forecast, index) => {
    const timezone = data.city.timezone;
    const currentCityDate = getDatetimeParams({ timezone: timezone, short: true });
    const forecastDate = getDatetimeParams({ dt: forecast.dt, timezone: timezone, short: true });
    const icon = forecast?.weather?.[0].icon;
    const temp = Math.round(forecast.main.temp);
    const minTemp = Math.round(forecast.main.temp_min);
    const maxTemp = Math.round(forecast.main.temp_max);
    const description = forecast?.weather?.[0].description;

    if (index < 8) {
      const hourData = {
        time: forecastDate.time,
        icon: icon,
        temp: `${temp}°`,
        description: description,
      };
      hoursList.push(hourData);
    }

    if (currentCityDate.date !== forecastDate.date) {
      if (!dailyObject.hasOwnProperty(forecastDate.date)) {
        dailyObject[forecastDate.date] = {
          dateString: forecastDate.dateString,
          icon: [],
          minTemp: [],
          maxTemp: [],
          description: [],
        };
      }
      dailyObject[forecastDate.date].icon.push(icon.slice(0, 2));
      dailyObject[forecastDate.date].minTemp.push(minTemp);
      dailyObject[forecastDate.date].maxTemp.push(maxTemp);
      dailyObject[forecastDate.date].description.push(description);
    }
  });
  Object.keys(dailyObject).forEach((date) => {
    const finalObject = {
      date: date,
      dateString: dailyObject[date].dateString,
      icon: `${mostFrequent(dailyObject[date].icon)}d`,
      temp: `от ${Math.min(...dailyObject[date].minTemp)}° до ${Math.max(...dailyObject[date].maxTemp)}°`,
      description: mostFrequent(dailyObject[date].description),
    };
    daysList.push(finalObject);
  });

  return { tabs: FORECAST_TABS, hours: hoursList, days: daysList };
};
