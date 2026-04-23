import React from 'react';

const InfiniteScrollLoader = React.forwardRef(({ isLoading, hasMore }, ref) => {
  return (
    <div ref={ref} className="py-8 flex justify-center">
      {isLoading && (
        <div className="flex items-center gap-3 text-surface-500 dark:text-surface-400">
          <div className="flex gap-1">
            <div className="w-2.5 h-2.5 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2.5 h-2.5 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2.5 h-2.5 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
          <span className="text-sm font-medium">Loading more recipes...</span>
        </div>
      )}
      {!isLoading && !hasMore && (
        <p className="text-sm text-surface-400 dark:text-surface-500">
          You&apos;ve seen all the recipes! 🎉
        </p>
      )}
    </div>
  );
});

InfiniteScrollLoader.displayName = 'InfiniteScrollLoader';

export default React.memo(InfiniteScrollLoader);
