import React from 'react';

const Skeleton = ({ className = '', variant = 'rectangular', width, height, count = 1 }) => {
  const baseClasses = 'skeleton animate-pulse';

  const variantClasses = {
    rectangular: 'rounded-lg',
    circular: 'rounded-full',
    text: 'rounded h-4',
    card: 'rounded-2xl',
  };

  const style = {
    width: width || '100%',
    height: height || (variant === 'text' ? '16px' : '200px'),
  };

  if (count > 1) {
    return (
      <div className="space-y-3">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className={`${baseClasses} ${variantClasses[variant]} ${className}`}
            style={style}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={style}
    />
  );
};

export const RecipeCardSkeleton = () => (
  <div className="glass-card overflow-hidden">
    <Skeleton variant="rectangular" height="200px" className="rounded-none" />
    <div className="p-4 space-y-3">
      <Skeleton variant="text" height="24px" width="80%" />
      <Skeleton variant="text" height="16px" width="60%" />
      <div className="flex gap-3">
        <Skeleton variant="text" height="28px" width="70px" />
        <Skeleton variant="text" height="28px" width="70px" />
        <Skeleton variant="text" height="28px" width="70px" />
      </div>
    </div>
  </div>
);

export const RecipeDetailsSkeleton = () => (
  <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
    <Skeleton variant="rectangular" height="400px" className="rounded-2xl" />
    <div className="space-y-4 px-4">
      <Skeleton variant="text" height="36px" width="70%" />
      <div className="flex gap-4">
        <Skeleton variant="text" height="32px" width="100px" />
        <Skeleton variant="text" height="32px" width="100px" />
        <Skeleton variant="text" height="32px" width="100px" />
      </div>
      <Skeleton variant="text" count={4} />
      <div className="grid grid-cols-2 gap-4 mt-6">
        <Skeleton variant="rectangular" height="250px" className="rounded-xl" />
        <Skeleton variant="rectangular" height="250px" className="rounded-xl" />
      </div>
    </div>
  </div>
);

export default React.memo(Skeleton);
