import { DropdownSection, FetchPreviewWrapper } from 'components';
import styles from './weatherCardList.module.css';

export const WeatherCardList = ({
  title,
  list,
  hideEmptyList = false,
  emptyMessage = 'Список пуст',
  widget,
}) => {
  const isListEmpty = !Object.keys(list).length;

  return (
    <>
      {!isListEmpty && (
        <DropdownSection title={title} widget={widget}>
          <ul className={styles.list}>
            {Object.values(list).map((city, index) => (
              <li key={`${city}-${index}`}>
                <FetchPreviewWrapper cityData={city} />
              </li>
            ))}
          </ul>
        </DropdownSection>
      )}
      {!hideEmptyList && isListEmpty && (
        <DropdownSection title={title} widget={widget}>
          <span className={styles.emptyMessage}>{emptyMessage}</span>
        </DropdownSection>
      )}
    </>
  );
};
