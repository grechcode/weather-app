import styles from './cardList.module.css';
import { SkeletonCard } from 'components';

export const SkeletonCardList = () => {
  return (
    <ul className={styles.list}>
      {Array(6)
        .fill(0)
        .map((card, _index) => (
          <li key={_index}>
            <SkeletonCard />
          </li>
        ))}
    </ul>
  );
};
