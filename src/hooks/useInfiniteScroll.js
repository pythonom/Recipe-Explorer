import { useEffect, useRef, useCallback } from 'react';

/**
 * Hook that triggers a callback when the user scrolls near the bottom.
 * Uses IntersectionObserver for efficient scroll detection.
 *
 * @param {Function} callback - Function to call when sentinel is visible
 * @param {boolean} hasMore - Whether there are more items to load
 * @param {boolean} isLoading - Whether items are currently being loaded
 * @returns {Object} ref - Ref to attach to the sentinel element
 */
const useInfiniteScroll = (callback, hasMore, isLoading) => {
  const observer = useRef(null);

  const sentinelRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore && !isLoading) {
            callback();
          }
        },
        { threshold: 0.1, rootMargin: '100px' }
      );

      if (node) observer.current.observe(node);
    },
    [callback, hasMore, isLoading]
  );

  useEffect(() => {
    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, []);

  return sentinelRef;
};

export default useInfiniteScroll;
