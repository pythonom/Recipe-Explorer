import api from './api';

const RESULTS_PER_PAGE = 12;

/**
 * Search recipes by query with pagination support
 * @param {string} query - Search query
 * @param {number} offset - Pagination offset
 * @param {number} number - Number of results per page
 * @returns {Promise<{results: Array, totalResults: number}>}
 */
export const searchRecipes = async (query, offset = 0, number = RESULTS_PER_PAGE) => {
  const response = await api.get('/recipes/complexSearch', {
    params: {
      query,
      offset,
      number,
      addRecipeNutrition: true,
      addRecipeInformation: true,
      fillIngredients: true,
    },
  });
  return response;
};

/**
 * Get detailed recipe information including nutrition
 * @param {number} id - Recipe ID
 * @returns {Promise<Object>} Recipe details
 */
export const getRecipeDetails = async (id) => {
  const response = await api.get(`/recipes/${id}/information`, {
    params: {
      includeNutrition: true,
    },
  });
  return response;
};

/**
 * Get random recipes for the home page
 * @param {number} number - Number of random recipes
 * @returns {Promise<{recipes: Array}>}
 */
export const getRandomRecipes = async (number = 8) => {
  const response = await api.get('/recipes/random', {
    params: {
      number,
    },
  });
  return response;
};

/**
 * Search recipes by ingredients
 * @param {string} ingredients - Comma-separated ingredients
 * @param {number} number - Number of results
 * @returns {Promise<Array>}
 */
export const searchByIngredients = async (ingredients, number = 12) => {
  const response = await api.get('/recipes/findByIngredients', {
    params: {
      ingredients,
      number,
      ranking: 1,
    },
  });
  return response;
};
