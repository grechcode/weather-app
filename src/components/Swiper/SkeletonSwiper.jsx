import styles from './swiper.module.css';
import { SkeletonForecastCard, Button } from 'components';
import { cn } from 'utils';

export const SkeletonSwiper = () => {
  return (
    <div className={cn(styles.swiper, styles.visible)}>
      <Button icon="chevron" disabled={true} />
      <div className={cn(styles.content, styles.leftShadow)}>
        <ul className={styles.wrapper} role="tabpanel">
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <li key={index}>
                <SkeletonForecastCard />
              </li>
            ))}
        </ul>
      </div>
      <Button icon="chevron" style={{ rotate: '180deg' }} disabled={true} />
    </div>
  );
};
