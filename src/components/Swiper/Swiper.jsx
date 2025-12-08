import { useRef } from 'react';
import { Button, ForecastCard } from 'components';
import { useSliderScroll } from 'hooks';
import { cn } from 'utils';
import styles from './swiper.module.css';

export const Swiper = ({ cards, isVisible, isSearchOpen }) => {
  const swiperRef = useRef(null);

  const { scrollLeft, scrollRight, isButtonsDisabled } = useSliderScroll(swiperRef);

  return (
    <div className={cn(styles.swiper, !isVisible && 'hidden')}>
      <Button
        icon="chevron"
        onClick={scrollLeft}
        disabled={isVisible ? isButtonsDisabled.left : true}
        aria-label="Промотать назад"
        tabIndex={isSearchOpen ? -1 : undefined}
      />
      <div
        className={cn(
          styles.content,
          isButtonsDisabled.right && styles.leftShadow,
          isButtonsDisabled.left && styles.rightShadow
        )}
      >
        <ul ref={swiperRef} className={styles.wrapper} role="tabpanel" tabIndex={-1}>
          {cards.map((card) => (
            <li key={card.date || card.time}>
              <ForecastCard data={card} />
            </li>
          ))}
        </ul>
      </div>
      <Button
        icon="chevron"
        className={styles.rightButton}
        onClick={scrollRight}
        disabled={isVisible ? isButtonsDisabled.right : true}
        aria-label="Промотать вперед"
        tabIndex={isSearchOpen ? -1 : undefined}
      />
    </div>
  );
};
