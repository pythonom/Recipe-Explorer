/**
 * Validate required field
 * @param {string} value - Field value
 * @param {string} fieldName - Name of the field for error message
 * @returns {string|null} Error message or null
 */
export const validateRequired = (value, fieldName) => {
  if (!value || (typeof value === 'string' && !value.trim())) {
    return `${fieldName} is required`;
  }
  return null;
};

/**
 * Validate minimum length
 * @param {string} value - Field value
 * @param {number} min - Minimum length
 * @param {string} fieldName - Name of the field
 * @returns {string|null} Error message or null
 */
export const validateMinLength = (value, min, fieldName) => {
  if (value && value.trim().length < min) {
    return `${fieldName} must be at least ${min} characters`;
  }
  return null;
};

/**
 * Validate a positive number
 * @param {*} value - Value to validate
 * @param {string} fieldName - Name of the field
 * @returns {string|null} Error message or null
 */
export const validatePositiveNumber = (value, fieldName) => {
  const num = Number(value);
  if (isNaN(num) || num <= 0) {
    return `${fieldName} must be a positive number`;
  }
  return null;
};

/**
 * Validate URL format
 * @param {string} url - URL to validate
 * @returns {string|null} Error message or null
 */
export const validateUrl = (url) => {
  if (!url) return null; // URL is optional
  try {
    new URL(url);
    return null;
  } catch {
    return 'Please enter a valid URL';
  }
};

/**
 * Validate the entire recipe form
 * @param {Object} formData - Form data object
 * @param {number} step - Current step (1, 2, or 3)
 * @returns {Object} Object with field-level errors
 */
export const validateRecipeForm = (formData, step) => {
  const errors = {};

  if (step === 1 || step === undefined) {
    const titleError = validateRequired(formData.title, 'Recipe title');
    if (titleError) errors.title = titleError;
    else {
      const minError = validateMinLength(formData.title, 3, 'Recipe title');
      if (minError) errors.title = minError;
    }

    const descError = validateRequired(formData.description, 'Description');
    if (descError) errors.description = descError;

    const timeError = validatePositiveNumber(formData.readyInMinutes, 'Cooking time');
    if (timeError) errors.readyInMinutes = timeError;

    const servingsError = validatePositiveNumber(formData.servings, 'Servings');
    if (servingsError) errors.servings = servingsError;
  }

  if (step === 2 || step === undefined) {
    if (!formData.ingredients || formData.ingredients.length === 0) {
      errors.ingredients = 'Add at least one ingredient';
    } else {
      const emptyIngredients = formData.ingredients.some(
        (ing) => !ing.name || !ing.name.trim()
      );
      if (emptyIngredients) {
        errors.ingredients = 'All ingredients must have a name';
      }
    }
  }

  if (step === 3 || step === undefined) {
    if (!formData.instructions || !formData.instructions.trim()) {
      errors.instructions = 'Instructions are required';
    }

    const urlError = validateUrl(formData.image);
    if (urlError) errors.image = urlError;
  }

  return errors;
};
