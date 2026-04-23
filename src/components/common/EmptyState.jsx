import React from 'react';

const EmptyState = ({ icon: Icon, title, description, action, actionLabel, className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center py-16 px-4 ${className}`}>
      <div className="animate-fade-in-up text-center space-y-4 max-w-md">
        {Icon && (
          <div className="w-20 h-20 mx-auto bg-surface-100 dark:bg-surface-800 rounded-full flex items-center justify-center">
            <Icon className="w-10 h-10 text-surface-400 dark:text-surface-500" />
          </div>
        )}
        <h3 className="text-xl font-bold text-surface-700 dark:text-surface-300">
          {title}
        </h3>
        {description && (
          <p className="text-surface-500 dark:text-surface-400 leading-relaxed">
            {description}
          </p>
        )}
        {action && actionLabel && (
          <button onClick={action} className="btn-primary mx-auto mt-2">
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default React.memo(EmptyState);
