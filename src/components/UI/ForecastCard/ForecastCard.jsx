import styles from './forecastCard.module.css';
import { Icon } from 'components';
import { memo } from 'react';

export const ForecastCard = memo(({ data }) => {
  return (
    <div className={styles.card}>
      <time dateTime={data.date ? data.dateString : data.time} className={styles.cardTitle}>
        {data.date || data.time}
      </time>
      <Icon icon={data.icon} className={styles.icon} alt={`иконка ${data.description}`} />
      <p className={styles.cardTemp}>{data.temp}</p>
    </div>
  );
});
