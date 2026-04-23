import React from 'react';
import RecipeCard from './RecipeCard';
import { RecipeCardSkeleton } from '../common/Skeleton';

const RecipeGrid = ({ recipes, isLoading, skeletonCount = 8 }) => {
  if (isLoading && recipes.length === 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <RecipeCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
      {isLoading &&
        Array.from({ length: 4 }).map((_, i) => (
          <RecipeCardSkeleton key={`skeleton-${i}`} />
        ))}
    </div>
  );
};

export default React.memo(RecipeGrid);
