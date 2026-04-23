import { useState, useEffect } from 'react';

/**
 * Debounces a value by the specified delay.
 * Useful for delaying API calls on search input.
 * 
 * @param {*} value - The value to debounce
 * @param {number} delay - Delay in milliseconds (default: 300ms)
 * @returns {*} The debounced value
 */
const useDebounce = (value, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
