/**
 * Format cooking time into a human-readable string
 * @param {number} minutes - Time in minutes
 * @returns {string} Formatted time string
 */
export const formatCookingTime = (minutes) => {
  if (!minutes) return 'N/A';
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
};

/**
 * Format a number with commas for readability
 * @param {number} num - Number to format
 * @returns {string} Formatted number
 */
export const formatNumber = (num) => {
  if (!num && num !== 0) return 'N/A';
  return num.toLocaleString();
};

/**
 * Truncate text to a max length with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
};

/**
 * Strip HTML tags from a string
 * @param {string} html - HTML string
 * @returns {string} Plain text
 */
export const stripHtml = (html) => {
  if (!html) return '';
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
};

/**
 * Get difficulty level based on cooking time
 * @param {number} minutes - Cooking time in minutes
 * @returns {Object} Difficulty label and color
 */
export const getDifficulty = (minutes) => {
  if (!minutes) return { label: 'Unknown', color: 'text-surface-400' };
  if (minutes <= 30) return { label: 'Easy', color: 'text-green-500' };
  if (minutes <= 60) return { label: 'Medium', color: 'text-yellow-500' };
  return { label: 'Hard', color: 'text-red-500' };
};

/**
 * Format nutrient amount with unit
 * @param {number} amount - Nutrient amount
 * @param {string} unit - Unit string
 * @returns {string} Formatted string
 */
export const formatNutrient = (amount, unit) => {
  if (!amount && amount !== 0) return 'N/A';
  return `${Math.round(amount * 10) / 10}${unit}`;
};

/**
 * Get nutrition data from recipe for charts
 * @param {Object} recipe - Recipe object with nutrition data
 * @returns {Array} Array of {name, amount, unit, percentOfDailyNeeds}
 */
export const extractNutrition = (recipe) => {
  if (!recipe?.nutrition?.nutrients) return [];
  const targetNutrients = ['Calories', 'Fat', 'Protein', 'Carbohydrates', 'Fiber', 'Sugar', 'Sodium', 'Cholesterol'];
  return recipe.nutrition.nutrients
    .filter((n) => targetNutrients.includes(n.name))
    .map((n) => ({
      name: n.name,
      amount: Math.round(n.amount * 10) / 10,
      unit: n.unit,
      percentOfDailyNeeds: Math.round(n.percentOfDailyNeeds),
    }));
};

/**
 * Get macro breakdown for pie chart
 * @param {Object} recipe - Recipe object
 * @returns {Array} [{name, value}] for pie chart
 */
export const getMacroBreakdown = (recipe) => {
  if (!recipe?.nutrition?.nutrients) return [];
  const macros = ['Fat', 'Protein', 'Carbohydrates'];
  return recipe.nutrition.nutrients
    .filter((n) => macros.includes(n.name))
    .map((n) => ({
      name: n.name === 'Carbohydrates' ? 'Carbs' : n.name,
      value: Math.round(n.amount),
      unit: n.unit,
    }));
};

/**
 * Generate a placeholder image URL
 * @param {string} text - Text to display
 * @returns {string} Placeholder image URL
 */
export const getPlaceholderImage = (text = 'Recipe') => {
  return `https://via.placeholder.com/400x300/22c55e/ffffff?text=${encodeURIComponent(text)}`;
};
