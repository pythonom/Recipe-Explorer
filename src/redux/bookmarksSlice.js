import { createSlice } from '@reduxjs/toolkit';

const loadBookmarksFromStorage = () => {
  try {
    const stored = localStorage.getItem('recipeBookmarks');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveBookmarksToStorage = (bookmarks) => {
  try {
    localStorage.setItem('recipeBookmarks', JSON.stringify(bookmarks));
  } catch (error) {
    console.error('Failed to save bookmarks:', error);
  }
};

const initialState = {
  items: loadBookmarksFromStorage(),
};

const bookmarksSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {
    toggleBookmark: (state, action) => {
      const recipe = action.payload;
      const existingIndex = state.items.findIndex((item) => item.id === recipe.id);
      if (existingIndex >= 0) {
        state.items.splice(existingIndex, 1);
      } else {
        state.items.push({
          id: recipe.id,
          title: recipe.title,
          image: recipe.image,
          readyInMinutes: recipe.readyInMinutes,
          servings: recipe.servings,
          healthScore: recipe.healthScore,
          sourceUrl: recipe.sourceUrl,
        });
      }
      saveBookmarksToStorage(state.items);
    },
    removeBookmark: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveBookmarksToStorage(state.items);
    },
    clearAllBookmarks: (state) => {
      state.items = [];
      saveBookmarksToStorage(state.items);
    },
  },
});

export const { toggleBookmark, removeBookmark, clearAllBookmarks } = bookmarksSlice.actions;

export const selectIsBookmarked = (state, recipeId) =>
  state.bookmarks.items.some((item) => item.id === recipeId);

export default bookmarksSlice.reducer;
