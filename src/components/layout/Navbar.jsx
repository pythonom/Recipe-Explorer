import React, { useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleDarkMode,
  toggleMobileMenu,
  closeMobileMenu,
} from "../../redux/uiSlice";
import {
  HiSun,
  HiMoon,
  HiBars3,
  HiXMark,
  HiBookmark,
  HiHome,
  HiPlusCircle,
} from "react-icons/hi2";
import { GiCookingPot } from "react-icons/gi";

const navItems = [
  { path: "/", label: "Home", icon: HiHome },
  { path: "/bookmarks", label: "Bookmarks", icon: HiBookmark },
  { path: "/add-recipe", label: "Add Recipe", icon: HiPlusCircle },
];

const Navbar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { darkMode, mobileMenuOpen } = useSelector((state) => state.ui);
  const bookmarkCount = useSelector((state) => state.bookmarks.items.length);

  // Close mobile menu on route change
  useEffect(() => {
    dispatch(closeMobileMenu());
  }, [location, dispatch]);

  const getLinkClasses = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
      isActive
        ? "bg-primary-500/10 text-primary-600 dark:text-primary-400"
        : "text-surface-600 dark:text-surface-400 hover:text-surface-800 dark:hover:text-surface-200 hover:bg-surface-100 dark:hover:bg-surface-800"
    }`;

  return (
    <nav className="sticky top-0 z-40 bg-white/80 dark:bg-surface-900/80 backdrop-blur-xl border-b border-surface-200/50 dark:border-surface-700/50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group" id="nav-logo">
            <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/20 group-hover:shadow-primary-500/40 transition-shadow">
              <GiCookingPot className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-surface-800 dark:text-surface-100 hidden sm:block">
              Recipe<span className="gradient-text">Explorer</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map(({ path, label, icon: Icon }) => (
              <NavLink
                key={path}
                to={path}
                className={getLinkClasses}
                id={`nav-${label.toLowerCase().replace(" ", "-")}`}
              >
                <Icon className="w-4 h-4" />
                {label}
                {label === "Bookmarks" && bookmarkCount > 0 && (
                  <span className="ml-1 px-2 py-0.5 text-xs bg-primary-500 text-white rounded-full">
                    {bookmarkCount}
                  </span>
                )}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => dispatch(toggleDarkMode())}
              className="p-2.5 rounded-xl bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 text-surface-600 dark:text-surface-400 transition-all duration-300"
              aria-label="Toggle dark mode"
              id="dark-mode-toggle"
            >
              {darkMode ? (
                <HiSun className="w-5 h-5" />
              ) : (
                <HiMoon className="w-5 h-5" />
              )}
            </button>

            <button
              onClick={() => dispatch(toggleMobileMenu())}
              className="md:hidden p-2.5 rounded-xl bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 text-surface-600 dark:text-surface-400 transition-all duration-300"
              aria-label="Toggle mobile menu"
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? (
                <HiXMark className="w-5 h-5" />
              ) : (
                <HiBars3 className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          mobileMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pb-4 space-y-1 bg-white dark:bg-surface-900 border-t border-surface-200/50 dark:border-surface-700/50">
          {navItems.map(({ path, label, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              className={getLinkClasses}
              id={`mobile-nav-${label.toLowerCase().replace(" ", "-")}`}
            >
              <Icon className="w-5 h-5" />
              {label}
              {label === "Bookmarks" && bookmarkCount > 0 && (
                <span className="ml-1 px-2 py-0.5 text-xs bg-primary-500 text-white rounded-full">
                  {bookmarkCount}
                </span>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
