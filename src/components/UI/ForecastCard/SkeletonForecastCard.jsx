import { Skeleton } from 'components/UI';
import styles from './forecastCard.module.css';

export const SkeletonForecastCard = () => {
  return (
    <article className={styles.card}>
      <Skeleton className={styles.textSkeleton} />
      <Skeleton className={styles.iconSkeleton} />
      <Skeleton className={styles.textSkeleton} />
    </article>
  );
};
