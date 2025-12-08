import { useEffect, useState } from 'react';
import { getDatetimeParams } from 'utils';

export const useRunningClock = (initialState, timezone) => {
  const [currentDatetime, setCurrentDatetime] = useState(initialState);

  useEffect(() => {
    setCurrentDatetime(initialState);
  }, [initialState]);

  useEffect(() => {
    const interval = setInterval(() => {
      const datetimeParams = getDatetimeParams({ timezone: timezone });
      setCurrentDatetime(datetimeParams);
    }, 1000);

    return () => clearInterval(interval);
  }, [timezone, setCurrentDatetime]);

  return currentDatetime;
};
