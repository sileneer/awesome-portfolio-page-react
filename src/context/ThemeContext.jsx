/**
 * Theme Context
 *
 * Provides theme mode state (light/dark) and toggle function to all components.
 * Uses React Context API to avoid prop drilling.
 */

import React, { createContext, useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';

// Create context with default values
export const ThemeContext = createContext({
  mode: 'light',
  toggleTheme: () => {},
});

/**
 * ThemeContextProvider Component
 *
 * Wraps the app and provides theme mode state to all children.
 * Persists theme preference in localStorage.
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 */
export const ThemeContextProvider = ({ children }) => {
  // Initialize theme from localStorage or default to 'dark'
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem('themeMode');
    return savedMode || 'dark';
  });

  // Save theme preference to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('themeMode', mode);
  }, [mode]);

  // Toggle between light and dark mode
  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      mode,
      toggleTheme,
    }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
