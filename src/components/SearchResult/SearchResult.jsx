import styles from './searchResult.module.css';
import { DropdownSection, ErrorMessage, WeatherCard } from 'components';
import { useFetchPreview, useSearchContext } from 'hooks';

export const SearchResult = () => {
  const { searchResult, isSearchResultLoading, searchResultError } = useSearchContext();

  const { cityPreview, isCityPreviewLoading, cityPreviewError, fetchPreview } = useFetchPreview(searchResult);

  const isLoading = isSearchResultLoading || isCityPreviewLoading;

  return (
    <>
      {searchResultError ? (
        <div className={styles.contentWrapper}>
          <ErrorMessage
            title="Упс! Город не найден"
            descriptions={[searchResultError]}
            size="medium"
            align="left"
            color="dark"
          />
        </div>
      ) : (
        <DropdownSection title={isLoading ? 'Ищем...' : 'Результат поиска'}>
          <div className={styles.contentWrapper}>
            <WeatherCard
              data={{ ...cityPreview, name: searchResult?.name }}
              isLoading={isLoading}
              error={cityPreviewError}
              onReload={fetchPreview}
            />
          </div>
        </DropdownSection>
      )}
    </>
  );
};
