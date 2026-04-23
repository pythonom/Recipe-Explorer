import { createSlice } from '@reduxjs/toolkit';

const loadDarkMode = () => {
  try {
    const stored = localStorage.getItem('darkMode');
    if (stored !== null) return JSON.parse(stored);
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  } catch {
    return false;
  }
};

const initialState = {
  darkMode: loadDarkMode(),
  sidebarOpen: false,
  toasts: [],
  mobileMenuOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem('darkMode', JSON.stringify(state.darkMode));
      if (state.darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
      localStorage.setItem('darkMode', JSON.stringify(state.darkMode));
      if (state.darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    toggleMobileMenu: (state) => {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },
    closeMobileMenu: (state) => {
      state.mobileMenuOpen = false;
    },
    addToast: (state, action) => {
      const id = Date.now() + Math.random();
      state.toasts.push({
        id,
        message: action.payload.message,
        type: action.payload.type || 'info', // 'success' | 'error' | 'info' | 'warning'
        duration: action.payload.duration || 3000,
      });
    },
    removeToast: (state, action) => {
      state.toasts = state.toasts.filter((toast) => toast.id !== action.payload);
    },
  },
});

export const {
  toggleDarkMode,
  setDarkMode,
  toggleSidebar,
  toggleMobileMenu,
  closeMobileMenu,
  addToast,
  removeToast,
} = uiSlice.actions;

export default uiSlice.reducer;
