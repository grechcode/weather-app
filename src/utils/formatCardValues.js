import { getTimeCalc } from 'utils';
import { WIND_DIRECTIONS } from 'constants';

export const formatCardValues = (data) => {
  if (!data) return;
  const pressureValue = Math.round(data.main.pressure / 1.333);
  let pressureDescription = 'Нормальное';
  let visibilityDescription = 'Нормальная';

  if (pressureValue < 740) {
    pressureDescription = 'Низкое';
  } else if (pressureValue > 760) {
    pressureDescription = 'Повышенное';
  }

  const visibilityValue = Math.round(data.visibility / 1000);

  if (visibilityValue > 7) visibilityDescription = 'Отличная';
  else if (visibilityValue < 5) visibilityDescription = 'Низкая';

  const sunriseInfo = getTimeCalc('sunrise', data.sys.sunrise, data.sys.sunset, data.timezone);
  const sunsetInfo = getTimeCalc('sunset', data.sys.sunrise, data.sys.sunset, data.timezone);

  const windDescription = WIND_DIRECTIONS[Math.floor(data.wind.deg / 45)];

  const list = [
    {
      id: 'humidity',
      title: 'Влажность',
      value: data.main.humidity,
      pbValue: data.main.humidity,
      pbType: 'normal',
      units: '%',
    },
    {
      id: 'barometr',
      title: 'Давление',
      value: pressureValue,
      pbValue: pressureValue - 700,
      pbType: 'gradient',
      description: pressureDescription,
    },
    {
      id: 'visibility',
      title: 'Видимость',
      value: visibilityValue,
      pbValue: `${visibilityValue}0`,
      pbType: 'normal',

      units: 'км',
      description: visibilityDescription,
    },
    {
      id: 'sunrise',
      title: 'Рассвет',
      value: sunriseInfo.value,
      description: sunriseInfo.additional,
    },
    {
      id: 'sunset',
      title: 'Закат',
      value: sunsetInfo.value,
      description: sunsetInfo.additional,
    },
    {
      id: 'direction',
      title: 'Сила ветра',
      value: Math.ceil(data.wind.speed),
      units: 'м/с',
      description: windDescription,
      rotate: Math.ceil(data.wind.deg) + 45,
    },
  ];
  return list;
};
