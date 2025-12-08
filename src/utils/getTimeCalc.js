/**
 * Функция для рассчета времени до/после рассвета/заката
 * Учитывает оба показателя, чтобы корректно отображать данные
 * @param {string} func - Для чего рассчитываем
 * @param {number} sunriseTime - Cекунды рассвета в нашем часовом поясе
 * @param {number} sunsetTime - Cекунды заката в нашем часовом поясе
 * @param {number} timezone - Таймзона нужного города
 * @returns {object} {value, additional} - Объект с временем и дополнительным текстом
 */

import { getDatetimeParams } from './getDatetimeParams';

export const getTimeCalc = (func, sunriseTime, sunsetTime, timezone) => {
  const clientTimeZone = Math.abs(new Date().getTimezoneOffset()) * 60 * 1000;
  const timeUTC = Date.now() - clientTimeZone;
  const localMilliseconds = timeUTC + timezone * 1000;
  const sunrise = new Date(sunriseTime * 1000 - clientTimeZone + timezone * 1000);
  const sunset = new Date(sunsetTime * 1000 - clientTimeZone + timezone * 1000);
  const sunriseMilliseconds = sunrise.getTime();
  const sunsetMilliseconds = sunset.getTime();
  const sunriseTimeString = getDatetimeParams({ dt: sunriseTime, timezone: timezone }).time;
  const sunsetTimeString = getDatetimeParams({ dt: sunsetTime, timezone: timezone }).time;

  const singleNumCorrect = (number) => (number < 10 ? `0${number}` : number);

  switch (func) {
    case 'sunrise':
      // если рассвет уже наступил, а закат нет
      if (sunsetMilliseconds > localMilliseconds && localMilliseconds > sunriseMilliseconds) {
        const minutesAfterSunrise = localMilliseconds / 1000 / 60 - sunriseMilliseconds / 1000 / 60;
        const hour = singleNumCorrect(Math.floor(Math.abs(minutesAfterSunrise) / 60));
        const minute = singleNumCorrect(Math.round(Math.abs(minutesAfterSunrise) % 60));
        const additional = `Прошло: ${hour}:${minute}`;
        return { value: sunriseTimeString, additional: additional };

        // если закат уже наступил, а рассвет нет
      } else {
        let sum = sunriseMilliseconds / 1000 / 60 + (1440 - localMilliseconds / 1000 / 60);
        if (sum > 1440) {
          sum = sum - 1440;
        }
        const hour = singleNumCorrect(Math.floor(sum / 60));
        const minute = singleNumCorrect(Math.round(Math.abs(sum) % 60));
        const additional = `Осталось: ${hour}:${minute}`;
        return { value: sunriseTimeString, additional: additional };
      }
    case 'sunset':
      // если рассвет уже наступил, а закат нет
      if (sunsetMilliseconds > localMilliseconds && localMilliseconds > sunriseMilliseconds) {
        const minutesBeforeSunset = sunsetMilliseconds / 1000 / 60 - localMilliseconds / 1000 / 60;
        const hour = singleNumCorrect(Math.floor(minutesBeforeSunset / 60));
        const minute = singleNumCorrect(Math.round(minutesBeforeSunset % 60));
        const additional = `Осталось: ${hour}:${minute}`;
        return { value: sunsetTimeString, additional: additional };

        // если закат уже наступил, а рассвет нет
      } else {
        let sum = localMilliseconds / 1000 / 60 + (1440 - sunsetMilliseconds / 1000 / 60);
        if (sum > 1440) {
          sum = sum - 1440;
        }
        const hour = singleNumCorrect(Math.floor(sum / 60));
        const minute = singleNumCorrect(Math.round(Math.abs(sum) % 60));
        const additional = `Прошло: ${hour}:${minute}`;
        return { value: sunsetTimeString, additional: additional };
      }
    default:
      return { value: '00:00', additional: '00:00' };
  }
};
