import React from "react";
import { Link } from "react-router-dom";
import { GiCookingPot } from "react-icons/gi";
import { HiHeart } from "react-icons/hi2";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-surface-900 border-t border-surface-200/50 dark:border-surface-700/50 mt-auto transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                <GiCookingPot className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-surface-800 dark:text-surface-100">
                Recipe<span className="gradient-text">Explorer</span>
              </span>
            </Link>
            <p className="text-sm text-surface-500 dark:text-surface-400 leading-relaxed">
              Discover delicious recipes, explore nutrition insights, and build
              your personal cookbook.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-surface-800 dark:text-surface-200 uppercase tracking-wider mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { to: "/", label: "Home" },
                { to: "/bookmarks", label: "Bookmarks" },
                { to: "/add-recipe", label: "Add Recipe" },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-sm text-surface-500 dark:text-surface-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-surface-800 dark:text-surface-200 uppercase tracking-wider mb-3">
              Powered By
            </h4>
            <p className="text-sm text-surface-500 dark:text-surface-400 leading-relaxed">
              Recipe data provided by{" "}
              <a
                href="https://spoonacular.com/food-api"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-500 hover:text-primary-600 transition-colors"
              >
                Spoonacular API
              </a>
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-surface-200/50 dark:border-surface-700/50 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-surface-400 dark:text-surface-500">
            © {currentYear} Om Mathur. All rights reserved.
          </p>
          <p className="text-xs text-surface-400 dark:text-surface-500 flex items-center gap-1">
            Made with <HiHeart className="w-3 h-3 text-red-500" /> for Capstone
            Project
          </p>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
