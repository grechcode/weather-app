import { useSearchContext } from './useSearchContext';

export const useDropdownDisplayHelper = () => {
  const {
    searchResult,
    isSearchResultLoading,
    searchResultError,
    suggestions,
    suggestionsError,
    isLocationPreviewLoading,
    locationPreviewError,
    locationPreview,
  } = useSearchContext();

  const showLocation = isLocationPreviewLoading || locationPreview || locationPreviewError;

  const showSearchResult = !showLocation && (searchResult || isSearchResultLoading || searchResultError);

  const showSuggestions = !showLocation && !showSearchResult && (suggestions || suggestionsError);

  const showFavorites = !showLocation && !showSuggestions && !showSearchResult;

  const showRecentQueries = !showLocation && !showSuggestions && !showSearchResult;

  return { showLocation, showSuggestions, showSearchResult, showFavorites, showRecentQueries };
};
