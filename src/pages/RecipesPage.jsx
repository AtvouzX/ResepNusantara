import { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { ResepMakanan } from '../data/makanan';
import { ResepMinuman } from '../data/minuman';
import RecipeGrid from '../components/makanan/RecipeGrid';
import RecipeDetail from '../components/makanan/RecipeDetail';

export default function RecipesPage({ searchQuery, favorites, onFavoriteToggle }) {
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const allRecipes = useMemo(() => [
    ...Object.values(ResepMakanan.resep).map(recipe => ({ ...recipe, type: 'makanan' })),
    ...Object.values(ResepMinuman.resep).map(recipe => ({ ...recipe, type: 'minuman' }))
  ], []);

  useEffect(() => {
    const filter = () => {
      if (searchQuery.trim() === '') {
        setFilteredRecipes(allRecipes);
      } else {
        const lowercasedQuery = searchQuery.toLowerCase();
        const filtered = allRecipes.filter(recipe =>
          recipe.name.toLowerCase().includes(lowercasedQuery) ||
          recipe.ingredients.some(ingredient =>
            ingredient.toLowerCase().includes(lowercasedQuery)
          )
        );
        setFilteredRecipes(filtered);
      }
    };

    filter();
  }, [searchQuery, allRecipes]);

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleBackToList = () => {
    setSelectedRecipe(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pb-20 md:pb-8">
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        {selectedRecipe ? (
          <RecipeDetail recipe={selectedRecipe} onBack={handleBackToList} />
        ) : (
          <RecipeGrid recipes={filteredRecipes} onRecipeClick={handleRecipeClick} favorites={favorites} onFavoriteToggle={onFavoriteToggle} />
        )}
      </main>
    </div>
  );
}

RecipesPage.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  favorites: PropTypes.arrayOf(PropTypes.string).isRequired,
  onFavoriteToggle: PropTypes.func.isRequired,
};
