import React from 'react';
import { HiExclamationCircle, HiArrowPath } from 'react-icons/hi2';

const ErrorMessage = ({ message, onRetry, className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 ${className}`}>
      <div className="glass-card p-8 max-w-md w-full text-center space-y-4 animate-fade-in">
        <div className="w-14 h-14 mx-auto bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
          <HiExclamationCircle className="w-7 h-7 text-red-500" />
        </div>
        <h3 className="text-lg font-semibold text-surface-800 dark:text-surface-200">
          Something went wrong
        </h3>
        <p className="text-surface-500 dark:text-surface-400 text-sm leading-relaxed">
          {message || 'An error occurred while loading data. Please try again.'}
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="btn-primary gap-2 mx-auto"
            id="error-message-retry-btn"
          >
            <HiArrowPath className="w-4 h-4" />
            Retry
          </button>
        )}
      </div>
    </div>
  );
};

export default React.memo(ErrorMessage);
