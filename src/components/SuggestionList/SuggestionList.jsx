import styles from './suggestionList.module.css';
import { DropdownSection, ErrorMessage, Suggestion } from 'components';
import { useSearchContext } from 'hooks';
import { useRef } from 'react';

export const SuggestionList = () => {
  const suggestionListRef = useRef(null);
  const { suggestions, suggestionsError } = useSearchContext();

  return (
    <>
      {suggestionsError ? (
        <div className={styles.contentWrapper}>
          <ErrorMessage
            title="Упс! Город не найден"
            descriptions={[suggestionsError]}
            size="medium"
            align="left"
            color="dark"
          />
        </div>
      ) : (
        suggestions && (
          <DropdownSection title="Города по запросу">
            <ul className={styles.list} ref={suggestionListRef}>
              {suggestions.map((city, index) => (
                <li key={`${city}-${index}`}>
                  <Suggestion
                    displayName={city.display_name}
                    name={city.name}
                    lat={city.lat}
                    lon={city.lon}
                  />
                </li>
              ))}
            </ul>
          </DropdownSection>
        )
      )}
    </>
  );
};
