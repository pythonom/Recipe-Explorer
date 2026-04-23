import { configureStore } from '@reduxjs/toolkit';
import recipesReducer from './recipesSlice';
import bookmarksReducer from './bookmarksSlice';
import uiReducer from './uiSlice';

export const store = configureStore({
  reducer: {
    recipes: recipesReducer,
    bookmarks: bookmarksReducer,
    ui: uiReducer,
  },
  devTools: import.meta.env.DEV,
});

export default store;
