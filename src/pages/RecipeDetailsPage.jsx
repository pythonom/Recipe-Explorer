import React, { useEffect, useMemo, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchRecipeDetails, clearSelectedRecipe } from "../redux/recipesSlice";
import { toggleBookmark } from "../redux/bookmarksSlice";
import { addToast } from "../redux/uiSlice";
import PageContainer from "../components/layout/PageContainer";
import IngredientList from "../components/recipe/IngredientList";
import NutritionChart from "../components/recipe/NutritionChart";
import { RecipeDetailsSkeleton } from "../components/common/Skeleton";
import ErrorMessage from "../components/common/ErrorMessage";
import {
  formatCookingTime,
  getDifficulty,
  stripHtml,
} from "../utils/formatters";
import {
  HiClock,
  HiUsers,
  HiHeart,
  HiBookmark,
  HiArrowLeft,
  HiGlobeAlt,
  HiCheckBadge,
} from "react-icons/hi2";

const RecipeDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    selectedRecipe: recipe,
    selectedRecipeStatus: status,
    selectedRecipeError: error,
  } = useSelector((state) => state.recipes);

  const isBookmarked = useSelector((state) =>
    state.bookmarks.items.some((item) => item.id === Number(id)),
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchRecipeDetails(id));
    }
    return () => {
      dispatch(clearSelectedRecipe());
    };
  }, [id, dispatch]);

  const difficulty = useMemo(
    () => getDifficulty(recipe?.readyInMinutes),
    [recipe?.readyInMinutes],
  );

  const cleanSummary = useMemo(
    () => stripHtml(recipe?.summary),
    [recipe?.summary],
  );

  const handleBookmark = useCallback(() => {
    if (recipe) {
      dispatch(toggleBookmark(recipe));
      dispatch(
        addToast({
          message: isBookmarked
            ? "Removed from bookmarks"
            : "Added to bookmarks!",
          type: isBookmarked ? "info" : "success",
        }),
      );
    }
  }, [dispatch, recipe, isBookmarked]);

  if (status === "loading") {
    return (
      <PageContainer>
        <RecipeDetailsSkeleton />
      </PageContainer>
    );
  }

  if (status === "failed") {
    return (
      <PageContainer>
        <ErrorMessage
          message={error}
          onRetry={() => dispatch(fetchRecipeDetails(id))}
        />
      </PageContainer>
    );
  }

  if (!recipe) {
    return null;
  }

  const diets = recipe.diets || [];
  const healthScore = recipe.healthScore || 0;
  const instructions = recipe.analyzedInstructions?.[0]?.steps || [];

  return (
    <>
      <div className="relative h-[300px] md:h-[450px] overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 p-2.5 rounded-xl bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 transition-all"
          id="back-button"
        >
          <HiArrowLeft className="w-5 h-5" />
        </button>

        <button
          onClick={handleBookmark}
          className={`absolute top-4 right-4 p-2.5 rounded-xl backdrop-blur-sm transition-all duration-300 ${
            isBookmarked
              ? "bg-primary-500 text-white shadow-lg shadow-primary-500/40"
              : "bg-black/30 text-white hover:bg-primary-500"
          }`}
          id="bookmark-button"
        >
          <HiBookmark className="w-5 h-5" />
        </button>

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl md:text-4xl font-extrabold text-white leading-tight mb-3">
              {recipe.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3">
              {diets.slice(0, 4).map((diet) => (
                <span
                  key={diet}
                  className="badge bg-white/20 text-white backdrop-blur-sm text-xs capitalize"
                >
                  {diet}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <PageContainer>
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up -mt-6 relative z-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              {
                icon: HiClock,
                label: "Cook Time",
                value: formatCookingTime(recipe.readyInMinutes),
                color: "text-blue-500",
              },
              {
                icon: HiUsers,
                label: "Servings",
                value: `${recipe.servings}`,
                color: "text-purple-500",
              },
              {
                icon: HiHeart,
                label: "Health Score",
                value: `${healthScore}/100`,
                color: "text-red-500",
              },
              {
                icon: HiCheckBadge,
                label: "Difficulty",
                value: difficulty.label,
                color: difficulty.color,
              },
            ].map(({ icon: Icon, label, value, color }) => (
              <div key={label} className="glass-card p-4 text-center">
                <Icon className={`w-6 h-6 mx-auto mb-1 ${color}`} />
                <p className="text-lg font-bold text-surface-800 dark:text-surface-100">
                  {value}
                </p>
                <p className="text-xs text-surface-500 dark:text-surface-400">
                  {label}
                </p>
              </div>
            ))}
          </div>

          {cleanSummary && (
            <div className="glass-card p-6">
              <h2 className="text-lg font-bold text-surface-800 dark:text-surface-100 mb-3">
                About
              </h2>
              <p className="text-surface-600 dark:text-surface-400 leading-relaxed text-sm">
                {cleanSummary}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="glass-card p-6">
              <h2 className="text-lg font-bold text-surface-800 dark:text-surface-100 mb-4">
                Ingredients
              </h2>
              <IngredientList ingredients={recipe.extendedIngredients} />
            </div>

            <div className="glass-card p-6">
              <h2 className="text-lg font-bold text-surface-800 dark:text-surface-100 mb-4">
                Instructions
              </h2>
              {instructions.length > 0 ? (
                <ol className="space-y-4">
                  {instructions.map((step) => (
                    <li key={step.number} className="flex gap-3">
                      <div className="flex-shrink-0 w-7 h-7 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-primary-600 dark:text-primary-400">
                          {step.number}
                        </span>
                      </div>
                      <p className="text-sm text-surface-600 dark:text-surface-400 leading-relaxed pt-0.5">
                        {step.step}
                      </p>
                    </li>
                  ))}
                </ol>
              ) : (
                <div className="space-y-3">
                  <p className="text-sm text-surface-600 dark:text-surface-400 leading-relaxed whitespace-pre-line">
                    {recipe.instructions
                      ? stripHtml(recipe.instructions)
                      : "No instructions available."}
                  </p>
                  {recipe.sourceUrl && (
                    <a
                      href={recipe.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-primary-500 hover:text-primary-600 transition-colors"
                    >
                      <HiGlobeAlt className="w-4 h-4" />
                      View full instructions
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-bold text-surface-800 dark:text-surface-100 mb-4">
              Nutrition Insights
            </h2>
            <NutritionChart recipe={recipe} />
          </div>

          {recipe.sourceUrl && (
            <div className="text-center pb-4">
              <a
                href={recipe.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary gap-2"
                id="source-link"
              >
                <HiGlobeAlt className="w-4 h-4" />
                View Original Recipe
              </a>
            </div>
          )}
        </div>
      </PageContainer>
    </>
  );
};

export default RecipeDetailsPage;
