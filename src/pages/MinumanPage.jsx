// src/pages/MinumanPage.jsx
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ResepMinuman } from '../data/minuman';
import RecipeGrid from '../components/minuman/RecipeGrid';
import RecipeDetail from '../components/minuman/RecipeDetail';


export default function MinumanPage({ searchQuery }) {
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const allMinuman = Object.values(ResepMinuman.resep);

  useEffect(() => {
    const filter = () => {
      if (searchQuery.trim() === '') {
        setFilteredRecipes(allMinuman);
      } else {
        const lowercasedQuery = searchQuery.toLowerCase();
        const filtered = allMinuman.filter(recipe =>
          recipe.name.toLowerCase().includes(lowercasedQuery) ||
          recipe.ingredients.some(ingredient =>
            ingredient.toLowerCase().includes(lowercasedQuery)
          )
        );
        setFilteredRecipes(filtered);
      }
    };

    filter();
  }, [searchQuery, allMinuman]);

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleBackToList = () => {
    setSelectedRecipe(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-cyan-50 pb-20 md:pb-8">
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        {selectedRecipe ? (
          <RecipeDetail recipe={selectedRecipe} onBack={handleBackToList} />
        ) : (
          <RecipeGrid recipes={filteredRecipes} onRecipeClick={handleRecipeClick} />
        )}
      </main>
    </div>
  );
}

MinumanPage.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};
