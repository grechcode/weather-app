import { useEffect, useState } from 'react';
import styles from './progressBar.module.css';

export const ProgressBar = ({ type = 'normal', current = 0 }) => {
  const [correctCurrent, setCorrectCurrent] = useState(Number(current));

  useEffect(() => {
    if (current > 100) setCorrectCurrent(100);
    else if (current < 0) setCorrectCurrent(0);
    else setCorrectCurrent(current);
  }, [current]);

  const progressPosition = `calc(${correctCurrent}% - (var(--size) + 2px) * ${correctCurrent}/100)`;

  return (
    <div className={styles.block} style={{ '--progress': progressPosition }}>
      <div className={`${styles.circle}`}></div>
      <div className={`${styles.line} ${styles[type]}`}></div>
    </div>
  );
};
