import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearAllBookmarks } from "../redux/bookmarksSlice";
import { addToast } from "../redux/uiSlice";
import PageContainer from "../components/layout/PageContainer";
import RecipeGrid from "../components/recipe/RecipeGrid";
import EmptyState from "../components/common/EmptyState";
import { HiBookmark, HiTrash } from "react-icons/hi2";

const BookmarksPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bookmarks = useSelector((state) => state.bookmarks.items);

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to remove all bookmarks?")) {
      dispatch(clearAllBookmarks());
      dispatch(addToast({ message: "All bookmarks cleared", type: "info" }));
    }
  };

  return (
    <PageContainer>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-surface-800 dark:text-surface-100">
              My <span className="gradient-text">Bookmarks</span>
            </h1>
            <p className="text-surface-500 dark:text-surface-400 mt-1">
              {bookmarks.length} saved recipe{bookmarks.length !== 1 ? "s" : ""}
            </p>
          </div>

          {bookmarks.length > 0 && (
            <button
              onClick={handleClearAll}
              className="btn-secondary gap-2 text-red-500 hover:text-red-600 border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/20"
              id="clear-bookmarks-btn"
            >
              <HiTrash className="w-4 h-4" />
              Clear All
            </button>
          )}
        </div>

        {bookmarks.length > 0 ? (
          <RecipeGrid recipes={bookmarks} isLoading={false} />
        ) : (
          <EmptyState
            icon={HiBookmark}
            title="No Bookmarks Yet"
            description="Start exploring recipes and bookmark your favorites to see them here."
            action={() => navigate("/")}
            actionLabel="Explore Recipes"
          />
        )}
      </div>
    </PageContainer>
  );
};

export default BookmarksPage;
