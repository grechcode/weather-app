export const getDatetimeParams = ({ dt, timezone, short = false }) => {
  const getLocalDate = (timezone) => {
    const clientTimeZone = Math.abs(new Date().getTimezoneOffset()) * 60 * 1000;
    const timeUTC = Date.now() - clientTimeZone;
    const localDate = new Date(timeUTC + timezone * 1000);
    return localDate;
  };

  const getDateByMS = (dt, timezone) => {
    const clientTimeZone = Math.abs(new Date().getTimezoneOffset()) * 60 * 1000;
    const localDate = new Date(dt * 1000 - clientTimeZone + timezone * 1000);
    return localDate;
  };

  const dateOptions = {
    weekday: short ? 'short' : 'long',
    month: short ? 'short' : 'long',
    day: 'numeric',
  };

  const timeOptions = {
    hour: '2-digit',
    minute: '2-digit',
  };

  let date = new Date();
  if (timezone) {
    date = getLocalDate(timezone);
  }
  if (dt) {
    date = getDateByMS(dt, timezone);
  }
  const res = {
    date: date.toLocaleDateString('ru-RU', dateOptions),
    time: date.toLocaleTimeString('ru-RU', timeOptions),
    dateString: date.toLocaleDateString(),
  };
  return res;
};
