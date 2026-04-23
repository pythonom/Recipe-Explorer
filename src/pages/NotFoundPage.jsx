import React from 'react';
import { Link } from 'react-router-dom';
import { HiHome } from 'react-icons/hi2';

const NotFoundPage = () => {
  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4">
      <div className="text-center space-y-6 animate-fade-in-up">
        <div className="text-8xl md:text-9xl font-extrabold gradient-text">404</div>
        <h1 className="text-2xl md:text-3xl font-bold text-surface-800 dark:text-surface-100">
          Page Not Found
        </h1>
        <p className="text-surface-500 dark:text-surface-400 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link to="/" className="btn-primary gap-2 inline-flex" id="go-home-btn">
          <HiHome className="w-4 h-4" />
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
