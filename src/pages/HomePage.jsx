// src/pages/HomePage.jsx
import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { ResepMakanan } from '../data/makanan';
import { ResepMinuman } from '../data/minuman';
import HeroSection from '../components/home/HeroSection';
import FeaturedMakananSection from '../components/home/FeaturedMakananSection';
import FeaturedMinumanSection from '../components/home/FeaturedMinumanSection';
import SearchResults from '../components/home/SearchResults';

export default function HomePage({ onNavigate, searchQuery, setSearchQuery }) {
  const isSearching = searchQuery.trim().length > 0;

  const featuredMakanan = Object.values(ResepMakanan.resep).slice(0, 3);
  const featuredMinuman = Object.values(ResepMinuman.resep).slice(0, 2);

  // Combine all recipes for search
  const allRecipes = useMemo(() => {
    const makananRecipes = Object.values(ResepMakanan.resep).map(recipe => ({
      ...recipe,
      category: 'makanan'
    }));
    const minumanRecipes = Object.values(ResepMinuman.resep).map(recipe => ({
      ...recipe,
      category: 'minuman'
    }));
    return [...makananRecipes, ...minumanRecipes];
  }, []);

  // Filter recipes based on search query
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const lowercasedQuery = searchQuery.toLowerCase();
    return allRecipes.filter(recipe =>
      recipe.name.toLowerCase().includes(lowercasedQuery) ||
      recipe.ingredients.some(ingredient =>
        ingredient.toLowerCase().includes(lowercasedQuery)
      )
    );
  }, [searchQuery, allRecipes]);

  const handleRecipeClick = (recipe) => {
    // Navigate to the recipes page
    onNavigate('resep');
  };

  const handleBackToHome = () => {
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pb-20 md:pb-8">
      <HeroSection />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 space-y-12 md:space-y-16">
        {isSearching ? (
          <SearchResults
            results={searchResults}
            onRecipeClick={handleRecipeClick}
            onBack={handleBackToHome}
          />
        ) : (
          <>
            <FeaturedMakananSection featuredMakanan={featuredMakanan} onNavigate={onNavigate} />
            <FeaturedMinumanSection featuredMinuman={featuredMinuman} onNavigate={onNavigate} />
          </>
        )}
      </main>
    </div>
  );
}

HomePage.propTypes = {
  onNavigate: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
};
