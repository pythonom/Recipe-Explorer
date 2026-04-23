import React, { useState, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { addToast } from '../redux/uiSlice';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../components/layout/PageContainer';
import { validateRecipeForm } from '../utils/validators';
import { RECIPE_FORM_STEPS } from '../utils/constants';
import {
  HiArrowLeft,
  HiArrowRight,
  HiCheck,
  HiTrash,
  HiPlus,
  HiClock,
  HiUsers,
  HiPhoto,
} from 'react-icons/hi2';

const initialFormData = {
  title: '',
  description: '',
  readyInMinutes: '',
  servings: '',
  ingredients: [{ name: '', amount: '', unit: '' }],
  instructions: '',
  image: '',
  diets: [],
};

const AddRecipePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const updateField = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: null }));
  }, []);

  const addIngredient = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, { name: '', amount: '', unit: '' }],
    }));
  }, []);

  const removeIngredient = useCallback((index) => {
    setFormData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index),
    }));
  }, []);

  const updateIngredient = useCallback((index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.map((ing, i) =>
        i === index ? { ...ing, [field]: value } : ing
      ),
    }));
    setErrors((prev) => ({ ...prev, ingredients: null }));
  }, []);

  const validateStep = useCallback(() => {
    const stepErrors = validateRecipeForm(formData, currentStep);
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  }, [formData, currentStep]);

  const handleNext = useCallback(() => {
    if (validateStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    }
  }, [validateStep]);

  const handlePrev = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  }, []);

  const handleSubmit = useCallback(() => {
    const allErrors = validateRecipeForm(formData);
    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);
      return;
    }

    // Save to localStorage as custom recipes
    const customRecipes = JSON.parse(localStorage.getItem('customRecipes') || '[]');
    const newRecipe = {
      ...formData,
      id: `custom-${Date.now()}`,
      createdAt: new Date().toISOString(),
      healthScore: Math.floor(Math.random() * 40) + 60,
    };
    customRecipes.push(newRecipe);
    localStorage.setItem('customRecipes', JSON.stringify(customRecipes));

    setSubmitted(true);
    dispatch(addToast({ message: 'Recipe added successfully! 🎉', type: 'success' }));
  }, [formData, dispatch]);

  const dietOptions = ['vegetarian', 'vegan', 'gluten-free', 'dairy-free', 'keto', 'paleo'];

  const progressPercent = useMemo(() => ((currentStep - 1) / 2) * 100, [currentStep]);

  if (submitted) {
    return (
      <PageContainer>
        <div className="max-w-lg mx-auto text-center py-16 space-y-6 animate-fade-in-up">
          <div className="w-20 h-20 mx-auto bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center animate-bounce-in">
            <HiCheck className="w-10 h-10 text-primary-500" />
          </div>
          <h1 className="text-3xl font-extrabold text-surface-800 dark:text-surface-100">
            Recipe Added!
          </h1>
          <p className="text-surface-500 dark:text-surface-400">
            Your recipe &ldquo;{formData.title}&rdquo; has been saved successfully.
          </p>
          <div className="flex gap-3 justify-center">
            <button onClick={() => { setFormData(initialFormData); setSubmitted(false); setCurrentStep(1); }} className="btn-secondary">
              Add Another
            </button>
            <button onClick={() => navigate('/')} className="btn-primary">
              Go Home
            </button>
          </div>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
      
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-surface-800 dark:text-surface-100">
            Add New <span className="gradient-text">Recipe</span>
          </h1>
          <p className="text-surface-500 dark:text-surface-400 mt-1">
            Share your culinary creation with the world
          </p>
        </div>

        
        <div className="space-y-3">
          <div className="flex justify-between">
            {RECIPE_FORM_STEPS.map((step) => (
              <div
                key={step.id}
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                  step.id <= currentStep
                    ? 'text-primary-500'
                    : 'text-surface-400 dark:text-surface-500'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                    step.id < currentStep
                      ? 'bg-primary-500 text-white'
                      : step.id === currentStep
                      ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 ring-2 ring-primary-500'
                      : 'bg-surface-200 dark:bg-surface-700 text-surface-500'
                  }`}
                >
                  {step.id < currentStep ? <HiCheck className="w-4 h-4" /> : step.id}
                </div>
                <span className="hidden sm:inline">{step.title}</span>
              </div>
            ))}
          </div>
          <div className="h-2 bg-surface-200 dark:bg-surface-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary-500 to-primary-400 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        
        <div className="glass-card p-6 md:p-8">
          
          {currentStep === 1 && (
            <div className="space-y-5 animate-fade-in">
              <h2 className="text-lg font-bold text-surface-800 dark:text-surface-100">
                {RECIPE_FORM_STEPS[0].title}
              </h2>
              <p className="text-sm text-surface-500 dark:text-surface-400">
                {RECIPE_FORM_STEPS[0].description}
              </p>

              <div className="space-y-4">
                <div>
                  <label htmlFor="recipe-title" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">
                    Recipe Title *
                  </label>
                  <input
                    id="recipe-title"
                    type="text"
                    value={formData.title}
                    onChange={(e) => updateField('title', e.target.value)}
                    placeholder="e.g., Creamy Garlic Pasta"
                    className={`input-field ${errors.title ? 'border-red-500 focus:ring-red-500/50' : ''}`}
                  />
                  {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                </div>

                <div>
                  <label htmlFor="recipe-description" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">
                    Description *
                  </label>
                  <textarea
                    id="recipe-description"
                    value={formData.description}
                    onChange={(e) => updateField('description', e.target.value)}
                    placeholder="A brief description of your recipe..."
                    rows={3}
                    className={`input-field resize-none ${errors.description ? 'border-red-500 focus:ring-red-500/50' : ''}`}
                  />
                  {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="cooking-time" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">
                      <HiClock className="inline w-4 h-4 mr-1" />
                      Cooking Time (min) *
                    </label>
                    <input
                      id="cooking-time"
                      type="number"
                      value={formData.readyInMinutes}
                      onChange={(e) => updateField('readyInMinutes', e.target.value)}
                      placeholder="30"
                      min="1"
                      className={`input-field ${errors.readyInMinutes ? 'border-red-500 focus:ring-red-500/50' : ''}`}
                    />
                    {errors.readyInMinutes && <p className="text-red-500 text-xs mt-1">{errors.readyInMinutes}</p>}
                  </div>
                  <div>
                    <label htmlFor="servings" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">
                      <HiUsers className="inline w-4 h-4 mr-1" />
                      Servings *
                    </label>
                    <input
                      id="servings"
                      type="number"
                      value={formData.servings}
                      onChange={(e) => updateField('servings', e.target.value)}
                      placeholder="4"
                      min="1"
                      className={`input-field ${errors.servings ? 'border-red-500 focus:ring-red-500/50' : ''}`}
                    />
                    {errors.servings && <p className="text-red-500 text-xs mt-1">{errors.servings}</p>}
                  </div>
                </div>

                
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                    Dietary Tags (optional)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {dietOptions.map((diet) => (
                      <button
                        key={diet}
                        type="button"
                        onClick={() => {
                          const newDiets = formData.diets.includes(diet)
                            ? formData.diets.filter((d) => d !== diet)
                            : [...formData.diets, diet];
                          updateField('diets', newDiets);
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all duration-200 ${
                          formData.diets.includes(diet)
                            ? 'bg-primary-500 text-white'
                            : 'bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-400 hover:bg-surface-200 dark:hover:bg-surface-600'
                        }`}
                      >
                        {diet}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

        
          {currentStep === 2 && (
            <div className="space-y-5 animate-fade-in">
              <h2 className="text-lg font-bold text-surface-800 dark:text-surface-100">
                {RECIPE_FORM_STEPS[1].title}
              </h2>
              <p className="text-sm text-surface-500 dark:text-surface-400">
                {RECIPE_FORM_STEPS[1].description}
              </p>

              {errors.ingredients && (
                <p className="text-red-500 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                  {errors.ingredients}
                </p>
              )}

              <div className="space-y-3">
                {formData.ingredients.map((ingredient, index) => (
                  <div key={index} className="flex items-center gap-2 animate-fade-in">
                    <input
                      type="text"
                      value={ingredient.amount}
                      onChange={(e) => updateIngredient(index, 'amount', e.target.value)}
                      placeholder="Qty"
                      className="input-field w-20"
                    />
                    <input
                      type="text"
                      value={ingredient.unit}
                      onChange={(e) => updateIngredient(index, 'unit', e.target.value)}
                      placeholder="Unit"
                      className="input-field w-24"
                    />
                    <input
                      type="text"
                      value={ingredient.name}
                      onChange={(e) => updateIngredient(index, 'name', e.target.value)}
                      placeholder="Ingredient name"
                      className="input-field flex-1"
                    />
                    {formData.ingredients.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeIngredient(index)}
                        className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors flex-shrink-0"
                        aria-label="Remove ingredient"
                      >
                        <HiTrash className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={addIngredient}
                className="btn-secondary gap-2 w-full"
                id="add-ingredient-btn"
              >
                <HiPlus className="w-4 h-4" />
                Add Ingredient
              </button>
            </div>
          )}

        
          {currentStep === 3 && (
            <div className="space-y-5 animate-fade-in">
              <h2 className="text-lg font-bold text-surface-800 dark:text-surface-100">
                {RECIPE_FORM_STEPS[2].title}
              </h2>
              <p className="text-sm text-surface-500 dark:text-surface-400">
                {RECIPE_FORM_STEPS[2].description}
              </p>

              <div className="space-y-4">
                <div>
                  <label htmlFor="instructions" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">
                    Instructions *
                  </label>
                  <textarea
                    id="instructions"
                    value={formData.instructions}
                    onChange={(e) => updateField('instructions', e.target.value)}
                    placeholder="Write step-by-step cooking instructions..."
                    rows={6}
                    className={`input-field resize-none ${errors.instructions ? 'border-red-500 focus:ring-red-500/50' : ''}`}
                  />
                  {errors.instructions && <p className="text-red-500 text-xs mt-1">{errors.instructions}</p>}
                </div>

                <div>
                  <label htmlFor="image-url" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">
                    <HiPhoto className="inline w-4 h-4 mr-1" />
                    Image URL (optional)
                  </label>
                  <input
                    id="image-url"
                    type="url"
                    value={formData.image}
                    onChange={(e) => updateField('image', e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className={`input-field ${errors.image ? 'border-red-500 focus:ring-red-500/50' : ''}`}
                  />
                  {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
                </div>

              
                <div className="glass-card p-4 bg-surface-50 dark:bg-surface-800/50">
                  <h3 className="text-sm font-semibold text-surface-700 dark:text-surface-300 mb-3">
                    📋 Recipe Preview
                  </h3>
                  <div className="space-y-2 text-sm text-surface-600 dark:text-surface-400">
                    <p><span className="font-medium">Title:</span> {formData.title || '—'}</p>
                    <p><span className="font-medium">Time:</span> {formData.readyInMinutes ? `${formData.readyInMinutes} min` : '—'}</p>
                    <p><span className="font-medium">Servings:</span> {formData.servings || '—'}</p>
                    <p><span className="font-medium">Ingredients:</span> {formData.ingredients.filter(i => i.name).length} items</p>
                    {formData.diets.length > 0 && (
                      <p><span className="font-medium">Diets:</span> {formData.diets.join(', ')}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          
          <div className="flex justify-between mt-8 pt-6 border-t border-surface-200 dark:border-surface-700">
            {currentStep > 1 ? (
              <button type="button" onClick={handlePrev} className="btn-secondary gap-2">
                <HiArrowLeft className="w-4 h-4" />
                Previous
              </button>
            ) : (
              <div />
            )}

            {currentStep < 3 ? (
              <button type="button" onClick={handleNext} className="btn-primary gap-2">
                Next
                <HiArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button type="button" onClick={handleSubmit} className="btn-accent gap-2" id="submit-recipe-btn">
                <HiCheck className="w-4 h-4" />
                Submit Recipe
              </button>
            )}
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default AddRecipePage;
