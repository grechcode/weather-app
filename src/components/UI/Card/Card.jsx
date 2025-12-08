import { Icon, ProgressBar } from 'components';
import styles from './card.module.css';

export const Card = ({ data }) => {
  return (
    <article className={styles.card}>
      <h3 className={styles.title}>{data.title}</h3>
      <Icon
        icon={data.id}
        alt={`Иконка ${data.title}`}
        className={styles.icon}
        style={{
          transform: data.rotate && `rotate(${data.rotate}deg`,
        }}
      />
      <span className={styles.data}>
        {data.value}
        {data.units && ` ${data.units}`}
      </span>
      <div className={styles.barWrapper}>
        {data.pbValue && <ProgressBar current={data.pbValue} type={data.pbType} />}
        {data.id === 'humidity' ? (
          <div className={`${styles.description} ${styles.descriptionBarVal}`}>
            <span>0%</span>
            <span>100%</span>
          </div>
        ) : (
          <span className={styles.description}>{data.description}</span>
        )}
      </div>
    </article>
  );
};
