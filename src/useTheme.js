import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'anbani:theme';

/** Read the theme that was set by the inline script in index.html so React
 *  starts in sync with what the user already sees. */
function readInitialTheme() {
  if (typeof document === 'undefined') return 'light';
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

export function useTheme() {
  const [theme, setTheme] = useState(readInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* storage blocked (private mode, etc.) — toggle still works in-session */
    }
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  }, []);

  return [theme, toggle];
}
