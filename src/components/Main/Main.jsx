import styles from './main.module.css';
import { CityCard, CardList, ErrorMessage } from 'components';
import { useMainWeather } from 'hooks';
import { cn } from 'utils';

export const Main = () => {
  const { mainWeather, isMainWeatherLoading, mainWeatherError, fetchMainWeather } = useMainWeather();

  return (
    <main className={cn(styles.main, mainWeatherError && styles.error)}>
      {!mainWeatherError ? (
        <>
          <CityCard mainWeather={mainWeather} isMainWeatherLoading={isMainWeatherLoading} />
          <CardList mainWeather={mainWeather} isMainWeatherLoading={isMainWeatherLoading} />
        </>
      ) : (
        <ErrorMessage title={mainWeatherError} onReload={fetchMainWeather} />
      )}
    </main>
  );
};
