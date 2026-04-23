import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { searchRecipes as searchRecipesAPI, getRecipeDetails as getRecipeDetailsAPI, getRandomRecipes as getRandomRecipesAPI } from '../services/recipeService';

export const searchRecipes = createAsyncThunk(
  'recipes/searchRecipes',
  async ({ query, offset = 0 }, { rejectWithValue }) => {
    try {
      const data = await searchRecipesAPI(query, offset);
      return { ...data, offset, query };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to search recipes');
    }
  }
);

export const fetchRecipeDetails = createAsyncThunk(
  'recipes/fetchRecipeDetails',
  async (id, { rejectWithValue }) => {
    try {
      const data = await getRecipeDetailsAPI(id);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch recipe details');
    }
  }
);

export const fetchRandomRecipes = createAsyncThunk(
  'recipes/fetchRandomRecipes',
  async (number = 8, { rejectWithValue }) => {
    try {
      const data = await getRandomRecipesAPI(number);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch random recipes');
    }
  }
);

const initialState = {
  results: [],
  query: '',
  totalResults: 0,
  offset: 0,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  selectedRecipe: null,
  selectedRecipeStatus: 'idle',
  selectedRecipeError: null,
  randomRecipes: [],
  randomRecipesStatus: 'idle',
  hasMore: true,
};

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    clearResults: (state) => {
      state.results = [];
      state.offset = 0;
      state.totalResults = 0;
      state.hasMore = true;
      state.status = 'idle';
      state.error = null;
    },
    clearSelectedRecipe: (state) => {
      state.selectedRecipe = null;
      state.selectedRecipeStatus = 'idle';
      state.selectedRecipeError = null;
    },
    setQuery: (state, action) => {
      state.query = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Search Recipes
      .addCase(searchRecipes.pending, (state, action) => {
        if (action.meta.arg.offset === 0) {
          state.status = 'loading';
          state.results = [];
        } else {
          state.status = 'loading';
        }
        state.error = null;
      })
      .addCase(searchRecipes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { results, totalResults, offset, query } = action.payload;
        if (offset === 0) {
          state.results = results;
        } else {
          state.results = [...state.results, ...results];
        }
        state.totalResults = totalResults;
        state.offset = offset + results.length;
        state.query = query;
        state.hasMore = state.results.length < totalResults;
      })
      .addCase(searchRecipes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Fetch Recipe Details
      .addCase(fetchRecipeDetails.pending, (state) => {
        state.selectedRecipeStatus = 'loading';
        state.selectedRecipeError = null;
      })
      .addCase(fetchRecipeDetails.fulfilled, (state, action) => {
        state.selectedRecipeStatus = 'succeeded';
        state.selectedRecipe = action.payload;
      })
      .addCase(fetchRecipeDetails.rejected, (state, action) => {
        state.selectedRecipeStatus = 'failed';
        state.selectedRecipeError = action.payload;
      })
      // Random Recipes
      .addCase(fetchRandomRecipes.pending, (state) => {
        state.randomRecipesStatus = 'loading';
      })
      .addCase(fetchRandomRecipes.fulfilled, (state, action) => {
        state.randomRecipesStatus = 'succeeded';
        state.randomRecipes = action.payload.recipes;
      })
      .addCase(fetchRandomRecipes.rejected, (state) => {
        state.randomRecipesStatus = 'failed';
      });
  },
});

export const { clearResults, clearSelectedRecipe, setQuery } = recipesSlice.actions;
export default recipesSlice.reducer;
