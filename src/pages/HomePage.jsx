import React, { useEffect, useCallback, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchRandomRecipes, searchRecipes } from "../redux/recipesSlice";
import PageContainer from "../components/layout/PageContainer";
import SearchBar from "../components/search/SearchBar";
import RecipeGrid from "../components/recipe/RecipeGrid";
import InfiniteScrollLoader from "../components/search/InfiniteScrollLoader";
import ErrorMessage from "../components/common/ErrorMessage";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import { HiSparkles, HiFire } from "react-icons/hi2";
import { GiCookingPot } from "react-icons/gi";

const HomePage = () => {
  const dispatch = useDispatch();
  const {
    results,
    status,
    error,
    query,
    offset,
    hasMore,
    randomRecipes,
    randomRecipesStatus,
  } = useSelector((state) => state.recipes);

  const [showResults, setShowResults] = useState(false);
  const resultsRef = useRef(null);

  const isLoading = status === "loading";
  const hasSearchResults = results.length > 0;
  const hasQuery = query && query.trim().length > 0;

  // Fetch random recipes on mount
  useEffect(() => {
    if (randomRecipes.length === 0 && randomRecipesStatus === "idle") {
      dispatch(fetchRandomRecipes(8));
    }
  }, [dispatch, randomRecipes.length, randomRecipesStatus]);

  // Load more for infinite scroll
  const loadMore = useCallback(() => {
    if (query && hasMore && !isLoading) {
      dispatch(searchRecipes({ query, offset }));
    }
  }, [dispatch, query, offset, hasMore, isLoading]);

  const sentinelRef = useInfiniteScroll(loadMore, hasMore, isLoading);

  const handleSearchStart = useCallback(() => {
    setShowResults(true);
    // Smooth scroll to results area
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 200);
  }, []);

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-500 to-accent-500 dark:from-surface-900 dark:via-surface-800 dark:to-surface-900">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse-slow" />
          <div
            className="absolute bottom-10 right-10 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl animate-pulse-slow"
            style={{ animationDelay: "1.5s" }}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-400/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center space-y-6 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium">
              <HiSparkles className="w-4 h-4" />
              Smart Recipe Explorer with Nutrition Insights
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight text-balance">
              Discover Delicious
              <br />
              <span className="text-accent-200">Recipes</span> for Every Mood
            </h1>

            <p className="max-w-2xl mx-auto text-lg text-white/80 leading-relaxed">
              Search thousands of recipes, explore detailed nutrition insights,
              and build your personal cookbook — all in one place.
            </p>

            <div className="pt-4">
              <SearchBar onSearchStart={handleSearchStart} />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              <span className="text-white/60 text-sm">Popular:</span>
              {["Pasta", "Chicken", "Salad", "Dessert", "Vegan"].map((term) => (
                <button
                  key={term}
                  onClick={() => {
                    dispatch(searchRecipes({ query: term, offset: 0 }));
                    setShowResults(true);
                    setTimeout(() => {
                      resultsRef.current?.scrollIntoView({
                        behavior: "smooth",
                      });
                    }, 200);
                  }}
                  className="px-3 py-1.5 bg-white/15 hover:bg-white/25 backdrop-blur-sm rounded-lg text-white/90 text-sm transition-all duration-200"
                  id={`quick-search-${term.toLowerCase()}`}
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
          >
            <path
              d="M0 80L48 74.7C96 69 192 59 288 53.3C384 48 480 48 576 50.7C672 53 768 59 864 58.7C960 59 1056 53 1152 50.7C1248 48 1344 48 1392 48L1440 48V80H1392C1344 80 1248 80 1152 80C1056 80 960 80 864 80C768 80 672 80 576 80C480 80 384 80 288 80C192 80 96 80 48 80H0Z"
              className="fill-surface-50 dark:fill-surface-950"
            />
          </svg>
        </div>
      </section>

      <PageContainer>
        <div ref={resultsRef}>
          {hasQuery && (
            <section
              className="space-y-6 animate-fade-in"
              id="search-results-section"
            >
              <div className="flex items-center justify-between">
                <h2 className="section-title">
                  Results for &ldquo;{query}&rdquo;
                </h2>
                {results.length > 0 && (
                  <span className="text-sm text-surface-500 dark:text-surface-400">
                    {results.length} recipes found
                  </span>
                )}
              </div>

              {error && (
                <ErrorMessage
                  message={error}
                  onRetry={() => dispatch(searchRecipes({ query, offset: 0 }))}
                />
              )}

              <RecipeGrid
                recipes={results}
                isLoading={isLoading && results.length === 0}
              />

              {hasSearchResults && (
                <InfiniteScrollLoader
                  ref={sentinelRef}
                  isLoading={isLoading && results.length > 0}
                  hasMore={hasMore}
                />
              )}

              {!isLoading && !error && results.length === 0 && hasQuery && (
                <div className="text-center py-12">
                  <GiCookingPot className="w-16 h-16 mx-auto text-surface-300 dark:text-surface-600 mb-4" />
                  <h3 className="text-lg font-semibold text-surface-600 dark:text-surface-400">
                    No recipes found
                  </h3>
                  <p className="text-surface-500 dark:text-surface-500 mt-1">
                    Try a different search term
                  </p>
                </div>
              )}
            </section>
          )}
        </div>

        {!hasQuery && (
          <section className="space-y-6 mt-8" id="trending-section">
            <div className="flex items-center gap-2">
              <HiFire className="w-6 h-6 text-accent-500" />
              <h2 className="section-title">Trending Recipes</h2>
            </div>
            <RecipeGrid
              recipes={randomRecipes}
              isLoading={randomRecipesStatus === "loading"}
            />
          </section>
        )}
      </PageContainer>
    </>
  );
};

export default HomePage;
