import { useRef } from 'react';
import styles from './dropdown.module.css';
import { Favorites, Location, RecentQueries, SearchResult, SuggestionList } from 'components';
import { useWeatherContext, useClickOutside, useSearchContext, useDropdownDisplayHelper } from 'hooks';

export const Dropdown = () => {
  const dropdownRef = useRef(null);
  const { setIsSearchOpen } = useWeatherContext();
  const {
    recentQueries,
    favorites,
    setSuggestions,
    setLocationCoords,
    setLocationPreview,
    setIsLocationPreviewLoading,
    setLocationPreviewError,
  } = useSearchContext();

  useClickOutside(dropdownRef, () => {
    setIsSearchOpen(false);
    setSuggestions(null);
    setLocationCoords(null);
    setLocationPreview(null);
    setIsLocationPreviewLoading(false);
    setLocationPreviewError(null);
  });

  const { showLocation, showSuggestions, showSearchResult, showFavorites, showRecentQueries } =
    useDropdownDisplayHelper();

  return (
    <div className={styles.dropdown} data="dropdown" ref={dropdownRef}>
      {showLocation && <Location />}
      {showSearchResult && <SearchResult />}
      {showSuggestions && <SuggestionList />}
      {showFavorites && <Favorites list={favorites} />}
      {showRecentQueries && <RecentQueries list={recentQueries} />}
    </div>
  );
};
