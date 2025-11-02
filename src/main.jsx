// src/main.jsx
import { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import SplashScreen from './pages/SplashScreen';
import HomePage from './pages/HomePage';
import RecipesPage from './pages/RecipesPage';
import ProfilePage from './pages/ProfilePage';
import FavoritesPage from './pages/FavoritesPage';
import DesktopNavbar from './components/navbar/DesktopNavbar';
import MobileNavbar from './components/navbar/MobileNavbar';
import './index.css'
import PWABadge from './PWABadge';

function AppRoot() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState(() => {
    try {
      const raw = localStorage.getItem('favorites');
      return raw ? JSON.parse(raw) : [];
    } catch {
      // If parsing fails or localStorage is unavailable, fallback to empty array
      return [];
    }
  });

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  const handleFavoriteToggle = (recipe) => {
    setFavorites(prev => {
      if (prev.includes(recipe.id)) {
        return prev.filter(id => id !== recipe.id);
      } else {
        return [...prev, recipe.id];
      }
    });
  };

  // Persist favorites to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    } catch {
      // ignore write errors (e.g., storage quota, privacy settings)
    }
  }, [favorites]);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigation} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />;
      case 'resep':
        return <RecipesPage searchQuery={searchQuery} setSearchQuery={setSearchQuery} favorites={favorites} onFavoriteToggle={handleFavoriteToggle} />;
      case 'favorites':
        return <FavoritesPage favorites={favorites} onRecipeClick={() => {}} onFavoriteToggle={handleFavoriteToggle} />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <HomePage onNavigate={handleNavigation} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />;
    }
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Navbar */}
      <DesktopNavbar currentPage={currentPage} onNavigate={handleNavigation} onSearch={setSearchQuery} />
      
      {/* Main Content */}
      <main className="min-h-screen">
        {renderCurrentPage()}
      </main>
      
      {/* Mobile Navbar */}
      <MobileNavbar currentPage={currentPage} onNavigate={handleNavigation} />

      <PWABadge />
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppRoot />
  </StrictMode>,
)
