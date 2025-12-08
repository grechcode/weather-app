import { LS_FAVORITE_KEY } from 'constants';
import { LS_RECENT_KEY } from 'constants';
import { SearchContext } from 'context';
import { useState } from 'react';
import { LS } from 'utils';

export const SearchProvider = ({ children }) => {
  // INITIAL_STATES
  const LSRecentQueries = LS.getArray(LS_RECENT_KEY);
  const LSFavorites = LS.getArray(LS_FAVORITE_KEY);

  const [inputValue, setInputValue] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [isSearchResultLoading, setIsSearchResultLoading] = useState(false);
  const [searchResultError, setSearchResultError] = useState(null);
  const [recentQueries, setRecentQueries] = useState(LSRecentQueries);
  const [locationCoords, setLocationCoords] = useState(null);
  const [locationPreview, setLocationPreview] = useState(null);
  const [isLocationPreviewLoading, setIsLocationPreviewLoading] = useState(false);
  const [locationPreviewError, setLocationPreviewError] = useState(null);
  const [favorites, setFavorites] = useState(LSFavorites);
  const [suggestions, setSuggestions] = useState(null);
  const [isSuggestionsLoading, setIsSuggestionsLoading] = useState(false);
  const [suggestionsError, setSuggestionsError] = useState(null);

  return (
    <SearchContext.Provider
      value={{
        inputValue,
        setInputValue,
        searchResult,
        setSearchResult,
        isSearchResultLoading,
        setIsSearchResultLoading,
        searchResultError,
        setSearchResultError,
        recentQueries,
        setRecentQueries,
        locationCoords,
        setLocationCoords,
        locationPreview,
        setLocationPreview,
        isLocationPreviewLoading,
        setIsLocationPreviewLoading,
        locationPreviewError,
        setLocationPreviewError,
        favorites,
        setFavorites,
        suggestions,
        setSuggestions,
        isSuggestionsLoading,
        setIsSuggestionsLoading,
        suggestionsError,
        setSuggestionsError,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
