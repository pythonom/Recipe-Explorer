export const APP_NAME = 'Smart Recipe Explorer';
export const APP_DESCRIPTION = 'Search recipes, view nutrition insights, bookmark favorites, and upload your own recipes.';

export const RESULTS_PER_PAGE = 12;
export const DEBOUNCE_DELAY = 400;
export const TOAST_DURATION = 3000;

export const ROUTES = {
  HOME: '/',
  RECIPE_DETAILS: '/recipe/:id',
  BOOKMARKS: '/bookmarks',
  ADD_RECIPE: '/add-recipe',
};

export const NAV_LINKS = [
  { path: '/', label: 'Home', icon: 'HiHome' },
  { path: '/bookmarks', label: 'Bookmarks', icon: 'HiBookmark' },
  { path: '/add-recipe', label: 'Add Recipe', icon: 'HiPlus' },
];

export const NUTRITION_COLORS = {
  Calories: '#f97316',
  Fat: '#eab308',
  Protein: '#22c55e',
  Carbohydrates: '#3b82f6',
  Fiber: '#8b5cf6',
  Sugar: '#ec4899',
  Sodium: '#6366f1',
  Cholesterol: '#f43f5e',
};

export const DIFFICULTY_LEVELS = {
  EASY: { label: 'Easy', maxTime: 30, color: 'text-green-500' },
  MEDIUM: { label: 'Medium', maxTime: 60, color: 'text-yellow-500' },
  HARD: { label: 'Hard', maxTime: Infinity, color: 'text-red-500' },
};

export const RECIPE_FORM_STEPS = [
  { id: 1, title: 'Basic Info', description: 'Recipe name, description, and timing' },
  { id: 2, title: 'Ingredients', description: 'Add your ingredients list' },
  { id: 3, title: 'Instructions', description: 'Step-by-step instructions and review' },
];
