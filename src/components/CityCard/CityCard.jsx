import styles from './cityCard.module.css';
import { SkeletonCityCard } from './SkeletonCityCard';
import { useRunningClock } from 'hooks';
import { Icon } from 'components';

export const CityCard = ({ mainWeather, isMainWeatherLoading }) => {
  const currentDatetime = useRunningClock(mainWeather?.main?.datetimeParams, mainWeather?.main?.timezone);

  if (!mainWeather || !currentDatetime || isMainWeatherLoading) {
    return <SkeletonCityCard />;
  }
  const { name, temp, text, icon, tempFeels } = mainWeather?.main;

  return (
    <section className={styles.cityCard}>
      <h2 className="hidden">Основные сведения о погоде</h2>
      <span className={styles.title}>{name}</span>
      <time dateTime={currentDatetime?.dateString} className={styles.day}>
        {currentDatetime?.date}
      </time>
      <time className={styles.time}>{currentDatetime?.time}</time>
      <span className={styles?.degree}>{temp}°</span>
      <div className={styles.weather}>
        <Icon icon={icon} className={styles.icon} alt="Иконка погоды" />
        <span className={styles.description}>{text}</span>
      </div>
      <span className={styles.feeling}>Ощущается как {tempFeels}°</span>
    </section>
  );
};
