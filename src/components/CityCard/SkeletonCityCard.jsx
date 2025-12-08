import { Skeleton } from 'components';
import styles from './cityCard.module.css';

export const SkeletonCityCard = () => {
  return (
    <section className={styles.cityCard}>
      <Skeleton className={styles.titleSkeleton} />
      <Skeleton className={styles.daySkeleton} />
      <Skeleton className={styles.timeSkeleton} />
      <Skeleton className={styles.degreeSkeleton} />
      <Skeleton className={styles.weatherSkeleton} />
      <Skeleton className={styles.feelingSkeleton} />
    </section>
  );
};
