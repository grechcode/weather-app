import styles from './cardList.module.css';
import { SkeletonCardList } from './SkeletonCardList';
import { Card } from 'components';

export const CardList = ({ mainWeather, isMainWeatherLoading }) => {
  return (
    <section className={styles.detail}>
      <h2 className="hidden">Дополнительные сведения о погоде</h2>
      {isMainWeatherLoading && <SkeletonCardList />}
      {mainWeather && (
        <ul className={styles.list}>
          {mainWeather.details.map((cardData) => (
            <li key={`detailCard-${cardData.id}`}>
              <Card data={cardData} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
