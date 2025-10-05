// src/pages/MakananPage.jsx
import { useState, useEffect } from 'react';
import { ResepMakanan } from '../data/makanan';
import RecipeGrid from '../components/makanan/RecipeGrid';
import RecipeDetail from '../components/makanan/RecipeDetail';


export default function MakananPage({ searchQuery, setSearchQuery }) {
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const allMakanan = Object.values(ResepMakanan.resep);

  useEffect(() => {
    const filter = () => {
      if (searchQuery.trim() === '') {
        setFilteredRecipes(allMakanan);
      } else {
        const lowercasedQuery = searchQuery.toLowerCase();
        const filtered = allMakanan.filter(recipe =>
          recipe.name.toLowerCase().includes(lowercasedQuery) ||
          recipe.ingredients.some(ingredient =>
            ingredient.toLowerCase().includes(lowercasedQuery)
          )
        );
        setFilteredRecipes(filtered);
      }
    };

    filter();
  }, [searchQuery, allMakanan]);

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
          <RecipeGrid recipes={filteredRecipes} onRecipeClick={handleRecipeClick} />
        )}
      </main>
    </div>
  );
}
