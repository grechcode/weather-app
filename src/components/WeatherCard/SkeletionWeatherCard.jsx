import { Skeleton } from 'components';
import styles from './weatherCard.module.css';

export const SkeletionWeatherCard = () => {
  return (
    <div className={styles.weatherPreviewCard} data="skeleton">
      <div className={styles.searchButton}>
        <div className={styles.mainInfo}>
          <Skeleton className={styles.nameSkeleton} />
          <Skeleton className={styles.tempSkeleton} />
        </div>
        <div className={styles.description}>
          <Skeleton className={styles.timeSkeleton} />
          <Skeleton className={styles.descriptionSkeleton} />
        </div>
      </div>
    </div>
  );
};
