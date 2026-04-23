import React, { useState, useMemo } from 'react';
import { HiCheck } from 'react-icons/hi2';

const IngredientList = ({ ingredients }) => {
  const [checkedItems, setCheckedItems] = useState(new Set());

  const toggleItem = (index) => {
    setCheckedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const progress = useMemo(() => {
    if (!ingredients?.length) return 0;
    return Math.round((checkedItems.size / ingredients.length) * 100);
  }, [checkedItems.size, ingredients?.length]);

  if (!ingredients || ingredients.length === 0) {
    return (
      <p className="text-surface-500 dark:text-surface-400 italic">
        No ingredients listed.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm">
          <span className="text-surface-600 dark:text-surface-400">
            Ingredients checklist
          </span>
          <span className="text-primary-500 font-medium">
            {checkedItems.size}/{ingredients.length}
          </span>
        </div>
        <div className="h-2 bg-surface-200 dark:bg-surface-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary-500 to-primary-400 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Ingredients list */}
      <ul className="space-y-2">
        {ingredients.map((ingredient, index) => (
          <li
            key={index}
            onClick={() => toggleItem(index)}
            className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 ${
              checkedItems.has(index)
                ? 'bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800'
                : 'bg-surface-50 dark:bg-surface-800/50 border border-surface-200 dark:border-surface-700 hover:bg-surface-100 dark:hover:bg-surface-800'
            }`}
          >
            {/* Checkbox */}
            <div className={`flex-shrink-0 w-5 h-5 mt-0.5 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${
              checkedItems.has(index)
                ? 'bg-primary-500 border-primary-500'
                : 'border-surface-300 dark:border-surface-600'
            }`}>
              {checkedItems.has(index) && <HiCheck className="w-3 h-3 text-white" />}
            </div>

            {/* Ingredient info */}
            <div className={`flex-1 text-sm transition-all duration-200 ${
              checkedItems.has(index)
                ? 'text-surface-500 dark:text-surface-400 line-through'
                : 'text-surface-700 dark:text-surface-300'
            }`}>
              {ingredient.original || `${ingredient.amount || ''} ${ingredient.unit || ''} ${ingredient.name || ''}`}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default React.memo(IngredientList);
