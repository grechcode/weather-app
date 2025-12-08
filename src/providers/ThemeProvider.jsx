import { useState } from 'react';
import { ThemeContext } from 'context';
import { getInitialTheme } from 'utils';

export const ThemeProvider = ({ children }) => {
  // INITIAL_STATES
  const initialTheme = getInitialTheme();

  const [currentTheme, setCurrentTheme] = useState(initialTheme);

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        setCurrentTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
