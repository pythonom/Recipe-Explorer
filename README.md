# 🍳 Smart Recipe Explorer with Nutrition Insights

A modern, production-ready recipe search and management web application built with React. Search thousands of recipes, explore detailed nutrition breakdowns, bookmark your favorites, and upload your own recipes — all with a beautiful, responsive interface.

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-5-purple?logo=vite)
![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-2-purple?logo=redux)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3-blue?logo=tailwindcss)

---

## ✨ Features

### Core Features
- **🔍 Recipe Search** — Search recipes using the Spoonacular API with debounced input (400ms delay)
- **📖 Recipe Details** — View ingredients, cooking instructions, health score, and detailed nutrition breakdown
- **♾️ Infinite Scroll** — Seamlessly load more recipes as you scroll using IntersectionObserver
- **📌 Bookmarks** — Save favorite recipes to Redux store with localStorage persistence
- **✏️ Add Recipe** — Multi-step form (3 steps) with validation to upload your own recipes
- **🌙 Dark Mode** — Toggle dark/light theme with system preference detection and persistence

### Advanced Features
- **📊 Nutrition Dashboard** — Interactive charts (Pie + Bar) using Recharts for macro and nutrient breakdown
- **⚡ Performance** — Lazy-loaded routes, React.memo, useMemo for optimized rendering
- **🛡️ Error Handling** — Error boundaries, API error UI with retry, and toast notifications
- **💀 Loading Skeletons** — Animated placeholder UI matching card/detail layout
- **📱 Mobile-First** — Fully responsive design with mobile hamburger menu

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| React 18 | UI Framework |
| Vite 5 | Build Tool |
| React Router v6 | Client-side Routing |
| Redux Toolkit | Global State Management |
| Axios | HTTP Client |
| Tailwind CSS v3 | Utility-first Styling |
| Recharts | Data Visualization |
| React Icons | Icon Library |
| Spoonacular API | Recipe & Nutrition Data |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── common/          # Skeleton, ErrorBoundary, ErrorMessage, Toast, EmptyState
│   ├── layout/          # Navbar, Footer, PageContainer
│   ├── recipe/          # RecipeCard, RecipeGrid, IngredientList, NutritionChart
│   └── search/          # SearchBar, InfiniteScrollLoader
├── pages/
│   ├── HomePage.jsx
│   ├── RecipeDetailsPage.jsx
│   ├── BookmarksPage.jsx
│   ├── AddRecipePage.jsx
│   └── NotFoundPage.jsx
├── redux/
│   ├── store.js         # Redux store configuration
│   ├── recipesSlice.js  # Search, details, random recipes
│   ├── bookmarksSlice.js # Bookmark management with localStorage
│   └── uiSlice.js       # Dark mode, toasts, mobile menu
├── hooks/
│   ├── useDebounce.js
│   ├── useInfiniteScroll.js
│   ├── useLocalStorage.js
│   └── useMediaQuery.js
├── services/
│   ├── api.js           # Axios instance with interceptors
│   └── recipeService.js # Spoonacular API endpoints
├── utils/
│   ├── constants.js     # App constants, routes, colors
│   ├── formatters.js    # Data formatting utilities
│   └── validators.js    # Form validation
├── App.jsx              # Router + Layout
├── main.jsx             # Entry point
└── index.css            # Global styles + Tailwind
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm 9+
- A free [Spoonacular API key](https://spoonacular.com/food-api) (150 requests/day on free tier)

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd capstone-frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```
Edit `.env` and add your Spoonacular API key:
```
VITE_SPOONACULAR_API_KEY=your_api_key_here
```

4. **Start development server**
```bash
npm run dev
```

5. **Open in browser**
```
http://localhost:5173
```

---

## 🏗️ Build for Production

```bash
npm run build
```

The output will be in the `dist/` directory.

### Preview production build locally
```bash
npm run preview
```

---

## 🌐 Deployment (Vercel)

This project includes a `vercel.json` configuration for SPA routing.

1. Push to GitHub
2. Import project in [Vercel Dashboard](https://vercel.com/dashboard)
3. Add environment variable: `VITE_SPOONACULAR_API_KEY`
4. Deploy!

---

## 📊 Redux State Shape

```javascript
{
  recipes: {
    results: [],          // Search results array
    query: '',            // Current search query
    totalResults: 0,      // Total available results
    offset: 0,            // Pagination offset
    status: 'idle',       // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    selectedRecipe: null, // Currently viewed recipe
    randomRecipes: [],    // Trending recipes for home page
    hasMore: true,        // Whether more results are available
  },
  bookmarks: {
    items: [],            // Saved recipes (persisted in localStorage)
  },
  ui: {
    darkMode: false,      // Theme preference (persisted)
    mobileMenuOpen: false,
    toasts: [],           // Notification queue
  }
}
```

---

## 🔑 API Endpoints Used

| Endpoint | Purpose |
|----------|---------|
| `GET /recipes/complexSearch` | Search recipes with nutrition data |
| `GET /recipes/{id}/information` | Get recipe details with nutrition |
| `GET /recipes/random` | Get random trending recipes |

---

## 📝 License

This project is built for educational purposes as a university capstone project.

---

## 🙏 Credits

- Recipe data by [Spoonacular API](https://spoonacular.com/food-api)
- Icons by [React Icons](https://react-icons.github.io/react-icons/)
- Charts by [Recharts](https://recharts.org/)
