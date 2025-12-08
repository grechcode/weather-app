import { useEffect, useRef } from 'react';
import { useSearchContext } from './useSearchContext';
import { isUserQueryValid } from 'utils';
import { useFetchCityData } from './useFetchCityData';
import { useWeatherContext } from './useWeatherContext';

export const useForm = () => {
  const inputRef = useRef(null);

  const {
    setLocationPreview,
    setLocationPreviewError,
    setIsLocationPreviewLoading,
    inputValue,
    setInputValue,
    searchResult,
    setSearchResult,
    isSearchResultLoading,
    setIsSearchResultLoading,
    searchResultError,
    setSearchResultError,
    setSuggestions,
    setSuggestionsError,
    setIsSuggestionsLoading,
  } = useSearchContext();

  const { setIsSearchOpen } = useWeatherContext();

  const fetchSearchResult = useFetchCityData(
    'searchResult',
    setSearchResult,
    setIsSearchResultLoading,
    setSearchResultError
  );

  const fetchSuggestions = useFetchCityData(
    'suggestions',
    setSuggestions,
    setIsSuggestionsLoading,
    setSuggestionsError
  );

  const onInputChange = (e) => {
    const newValue = e.target.value.trim();
    if (!newValue) {
      setSuggestions(null);
      setIsSuggestionsLoading(false);
      setSuggestionsError(null);
    }
    const { message } = isUserQueryValid(newValue);
    inputRef.current.setCustomValidity(message);
    setInputValue(newValue);
    setSearchResult(null);
    setIsSearchResultLoading(false);
    setSearchResultError(null);
    setLocationPreview(null);
    setLocationPreviewError(null);
    setIsLocationPreviewLoading(false);
  };

  const onInputClear = () => {
    setInputValue('');
    setSearchResult(null);
    setIsSearchResultLoading(false);
    setSearchResultError(null);
    setSuggestions(null);
    setIsSuggestionsLoading(false);
    setSuggestionsError(null);
    setLocationPreview(null);
    setLocationPreviewError(null);
    setIsLocationPreviewLoading(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSearchOpen(true);
    const { isValid, message } = isUserQueryValid(inputValue.trim());
    inputRef.current.setCustomValidity(message);
    if (!isValid || isSearchResultLoading) return;
    setSuggestions(null);
    fetchSearchResult(inputValue);
  };

  useEffect(() => {
    const controller = new AbortController();

    const timeout = setTimeout(() => {
      const { isValid } = isUserQueryValid(inputValue.trim());
      if (!isValid || searchResult || isSearchResultLoading || searchResultError) return;
      fetchSuggestions(inputValue, controller.signal);
    }, 1000);

    return () => {
      controller.abort();
      clearTimeout(timeout);
    };
  }, [inputValue, searchResult, searchResultError, isSearchResultLoading, fetchSuggestions]);

  return { inputRef, onInputChange, onInputClear, onSubmit };
};
