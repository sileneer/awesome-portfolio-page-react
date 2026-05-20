/**
 * Theme Context
 *
 * Two-level model:
 *   - `preference` is what the USER picked: 'light' | 'dark' | 'system'.
 *     Persisted to localStorage. Default 'system'.
 *   - `mode` is what gets RENDERED: 'light' | 'dark'. Derived from
 *     preference (and the OS, when preference === 'system').
 *
 * Consumers that pick colours read `mode`. The toggle UI reads
 * `preference` and calls `cyclePreference` / `setPreference`.
 *
 * `'system'` follows the OS theme live via `matchMedia`. Switching to
 * 'light' or 'dark' is an explicit override that ignores the OS until
 * the user picks 'system' again.
 */

import React, { createContext, useState, useMemo, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

const STORAGE_KEY = 'themeMode';
const SYSTEM_DARK_QUERY = '(prefers-color-scheme: dark)';
const PREFERENCE_CYCLE = ['light', 'dark', 'system'];
const VALID_PREFERENCES = new Set(PREFERENCE_CYCLE);

const getStoredPreference = () => {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return VALID_PREFERENCES.has(v) ? v : null;
  } catch {
    return null;
  }
};

const getSystemMode = () => {
  if (typeof window === 'undefined' || !window.matchMedia) return 'light';
  return window.matchMedia(SYSTEM_DARK_QUERY).matches ? 'dark' : 'light';
};

export const ThemeContext = createContext({
  mode: 'light',
  preference: 'system',
  setPreference: () => {},
  cyclePreference: () => {},
});

export const ThemeContextProvider = ({ children }) => {
  const [preference, setPreferenceState] = useState(() => getStoredPreference() ?? 'system');
  const [systemMode, setSystemMode] = useState(() => getSystemMode());

  // Always track the OS preference. We only USE it when preference === 'system',
  // but keeping the listener unconditional means no resubscribe churn on toggles.
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;
    const mq = window.matchMedia(SYSTEM_DARK_QUERY);
    const onChange = (e) => setSystemMode(e.matches ? 'dark' : 'light');
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const mode = preference === 'system' ? systemMode : preference;

  const setPreference = useCallback((next) => {
    if (!VALID_PREFERENCES.has(next)) return;
    setPreferenceState(next);
    try { localStorage.setItem(STORAGE_KEY, next); } catch { /* storage unavailable */ }
  }, []);

  const cyclePreference = useCallback(() => {
    setPreferenceState((prev) => {
      const idx = PREFERENCE_CYCLE.indexOf(prev);
      const next = PREFERENCE_CYCLE[(idx + 1) % PREFERENCE_CYCLE.length];
      try { localStorage.setItem(STORAGE_KEY, next); } catch { /* ignore */ }
      return next;
    });
  }, []);

  const contextValue = useMemo(
    () => ({ mode, preference, setPreference, cyclePreference }),
    [mode, preference, setPreference, cyclePreference],
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
