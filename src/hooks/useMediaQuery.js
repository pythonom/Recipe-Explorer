import { useState, useEffect } from 'react';

/**
 * Hook for detecting responsive breakpoints via CSS media queries.
 * 
 * @param {string} query - CSS media query string, e.g. '(min-width: 768px)'
 * @returns {boolean} Whether the media query matches
 */
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const handler = (event) => setMatches(event.matches);

    mediaQuery.addEventListener('change', handler);
    setMatches(mediaQuery.matches);

    return () => mediaQuery.removeEventListener('change', handler);
  }, [query]);

  return matches;
};

export default useMediaQuery;
