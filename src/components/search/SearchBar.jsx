import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchRecipes, clearResults, setQuery } from '../../redux/recipesSlice';
import useDebounce from '../../hooks/useDebounce';
import { HiMagnifyingGlass, HiXMark } from 'react-icons/hi2';
import { DEBOUNCE_DELAY } from '../../utils/constants';

const SearchBar = ({ onSearchStart }) => {
  const dispatch = useDispatch();
  const storedQuery = useSelector((state) => state.recipes.query);
  const [inputValue, setInputValue] = useState(storedQuery || '');
  const debouncedValue = useDebounce(inputValue, DEBOUNCE_DELAY);

  useEffect(() => {
    if (debouncedValue && debouncedValue.trim().length >= 2) {
      dispatch(clearResults());
      dispatch(searchRecipes({ query: debouncedValue.trim(), offset: 0 }));
      dispatch(setQuery(debouncedValue.trim()));
      onSearchStart?.();
    } else if (!debouncedValue || debouncedValue.trim().length === 0) {
      dispatch(clearResults());
      dispatch(setQuery(''));
    }
  }, [debouncedValue, dispatch, onSearchStart]);

  const handleClear = useCallback(() => {
    setInputValue('');
    dispatch(clearResults());
    dispatch(setQuery(''));
  }, [dispatch]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (inputValue.trim().length >= 2) {
      dispatch(clearResults());
      dispatch(searchRecipes({ query: inputValue.trim(), offset: 0 }));
      dispatch(setQuery(inputValue.trim()));
      onSearchStart?.();
    }
  }, [dispatch, inputValue, onSearchStart]);

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto" id="search-form">
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-2xl blur-xl group-focus-within:blur-2xl transition-all duration-300 opacity-0 group-focus-within:opacity-100" />

        <div className="relative flex items-center">
          <HiMagnifyingGlass className="absolute left-4 w-5 h-5 text-surface-400 group-focus-within:text-primary-500 transition-colors" />

          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Search for recipes... (e.g., pasta, chicken, vegan)"
            className="w-full pl-12 pr-12 py-4 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-2xl text-surface-800 dark:text-surface-200 placeholder-surface-400 dark:placeholder-surface-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 shadow-lg shadow-surface-200/50 dark:shadow-surface-900/50 transition-all duration-300 text-base"
            id="search-input"
            autoComplete="off"
          />

          {inputValue && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-4 p-1 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-400 hover:text-surface-600 dark:hover:text-surface-300 transition-all"
              aria-label="Clear search"
              id="search-clear-btn"
            >
              <HiXMark className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {inputValue && inputValue.trim().length < 2 && (
        <p className="text-xs text-surface-400 mt-2 text-center">
          Type at least 2 characters to search
        </p>
      )}
    </form>
  );
};

export default React.memo(SearchBar);
