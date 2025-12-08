import { Skeleton } from 'components';
import styles from './card.module.css';

export const SkeletonCard = () => {
  return (
    <article className={styles.card}>
      <Skeleton className={styles.titleSkeleton} />
      <Skeleton className={styles.iconSkeleton} />
      <Skeleton className={styles.valueSkeleton} />
      <Skeleton className={styles.barSkeleton} />
    </article>
  );
};
