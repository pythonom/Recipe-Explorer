import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ErrorBoundary from './components/common/ErrorBoundary';
import ToastContainer from './components/common/Toast';
import { RecipeDetailsSkeleton } from './components/common/Skeleton';

// Lazy-loaded pages for code splitting
const HomePage = lazy(() => import('./pages/HomePage'));
const RecipeDetailsPage = lazy(() => import('./pages/RecipeDetailsPage'));
const BookmarksPage = lazy(() => import('./pages/BookmarksPage'));
const AddRecipePage = lazy(() => import('./pages/AddRecipePage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Loading fallback
const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin" />
      <p className="text-surface-500 dark:text-surface-400 text-sm font-medium">Loading...</p>
    </div>
  </div>
);

const App = () => {
  const darkMode = useSelector((state) => state.ui.darkMode);

  // Apply dark mode class on mount and changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-surface-50 dark:bg-surface-950 transition-colors duration-300">
        <Navbar />

        <ErrorBoundary>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/recipe/:id" element={<RecipeDetailsPage />} />
              <Route path="/bookmarks" element={<BookmarksPage />} />
              <Route path="/add-recipe" element={<AddRecipePage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>

        <Footer />
        <ToastContainer />
      </div>
    </Router>
  );
};

export default App;
