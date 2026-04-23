import React, { useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleBookmark } from '../../redux/bookmarksSlice';
import { addToast } from '../../redux/uiSlice';
import { formatCookingTime, getDifficulty, truncateText, stripHtml } from '../../utils/formatters';
import { HiClock, HiUsers, HiHeart, HiBookmark } from 'react-icons/hi2';

const RecipeCard = ({ recipe }) => {
  const dispatch = useDispatch();
  const isBookmarked = useSelector((state) =>
    state.bookmarks.items.some((item) => item.id === recipe.id)
  );

  const difficulty = useMemo(() => getDifficulty(recipe.readyInMinutes), [recipe.readyInMinutes]);

  const summary = useMemo(() => {
    return truncateText(stripHtml(recipe.summary), 80);
  }, [recipe.summary]);

  const handleBookmark = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleBookmark(recipe));
    dispatch(addToast({
      message: isBookmarked ? 'Removed from bookmarks' : 'Added to bookmarks!',
      type: isBookmarked ? 'info' : 'success',
    }));
  }, [dispatch, recipe, isBookmarked]);

  const healthScore = recipe.healthScore || recipe.spoonacularScore || 0;

  return (
    <Link
      to={`/recipe/${recipe.id}`}
      className="glass-card-hover group block overflow-hidden animate-fade-in"
      id={`recipe-card-${recipe.id}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={recipe.image || `https://via.placeholder.com/400x300/22c55e/ffffff?text=${encodeURIComponent(recipe.title)}`}
          alt={recipe.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        <button
          onClick={handleBookmark}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
            isBookmarked
              ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/40'
              : 'bg-black/30 text-white hover:bg-primary-500 hover:shadow-lg hover:shadow-primary-500/40'
          }`}
          aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
        >
          <HiBookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
        </button>

        {healthScore > 0 && (
          <div className="absolute top-3 left-3">
            <div className={`badge ${
              healthScore >= 70 ? 'bg-green-500' : healthScore >= 40 ? 'bg-yellow-500' : 'bg-red-500'
            } text-white shadow-md`}>
              <HiHeart className="w-3 h-3 mr-1" />
              {Math.round(healthScore)}
            </div>
          </div>
        )}


        <div className="absolute bottom-3 left-3">
          <span className={`badge bg-white/90 dark:bg-surface-800/90 backdrop-blur-sm ${difficulty.color} font-semibold`}>
            {difficulty.label}
          </span>
        </div>
      </div>

      
      <div className="p-4 space-y-3">
        <h3 className="text-base font-bold text-surface-800 dark:text-surface-100 line-clamp-2 group-hover:text-primary-500 transition-colors">
          {recipe.title}
        </h3>

        {summary && (
          <p className="text-sm text-surface-500 dark:text-surface-400 line-clamp-2">
            {summary}
          </p>
        )}

        <div className="flex items-center gap-4 text-xs text-surface-500 dark:text-surface-400">
          <span className="flex items-center gap-1">
            <HiClock className="w-3.5 h-3.5" />
            {formatCookingTime(recipe.readyInMinutes)}
          </span>
          <span className="flex items-center gap-1">
            <HiUsers className="w-3.5 h-3.5" />
            {recipe.servings || 'N/A'} servings
          </span>
        </div>
      </div>
    </Link>
  );
};

export default React.memo(RecipeCard);
