export const formatSuggestionString = (name, inputValue) => {
  const cleanName = name.toLowerCase().trim();
  const cleanInputValue = inputValue.toLowerCase().trim();

  if (cleanName.includes(cleanInputValue)) {
    const indexOfSuggestion = cleanName.indexOf(cleanInputValue);
    const start = name.slice(0, indexOfSuggestion);
    const center = cleanInputValue;
    const end = name.slice(indexOfSuggestion + cleanInputValue.length);

    return { start, center, end };
  }
  return { start: name, center: '', end: '' };
};
