import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { ResepMakanan } from '../data/makanan';
import { ResepMinuman } from '../data/minuman';
import RecipeGrid from '../components/makanan/RecipeGrid'; // Using makanan RecipeGrid as base

export default function FavoritesPage({ favorites, onRecipeClick, onFavoriteToggle }) {
  // Combine all recipes and filter favorites
  const favoriteRecipes = useMemo(() => {
    const allRecipes = [
      ...Object.values(ResepMakanan.resep).map(recipe => ({ ...recipe, category: 'makanan' })),
      ...Object.values(ResepMinuman.resep).map(recipe => ({ ...recipe, category: 'minuman' }))
    ];
    return allRecipes.filter(recipe => favorites.includes(recipe.id));
  }, [favorites]);

  const handleRecipeClick = (recipe) => {
    if (onRecipeClick) onRecipeClick(recipe);
  };

  const handleFavoriteToggle = (recipe) => {
    if (onFavoriteToggle) onFavoriteToggle(recipe);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pb-20 md:pb-8">
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-4">
            Resep Favorit
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Kumpulan resep favorit Anda. Simpan dan akses resep kesukaan dengan mudah.
          </p>
        </div>

        {favoriteRecipes.length > 0 ? (
          <RecipeGrid
              recipes={favoriteRecipes}
              onRecipeClick={handleRecipeClick}
              onFavoriteToggle={handleFavoriteToggle}
              favorites={favorites}
              showHeader={false}
            />
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">❤️</div>
            <h2 className="text-2xl font-bold text-slate-700 mb-2">Belum ada resep favorit</h2>
            <p className="text-slate-500">Tambahkan resep ke favorit dengan menekan tombol hati di resep yang Anda sukai.</p>
          </div>
        )}
      </main>
    </div>
  );
}

FavoritesPage.propTypes = {
  favorites: PropTypes.arrayOf(PropTypes.string).isRequired,
  onRecipeClick: PropTypes.func,
  onFavoriteToggle: PropTypes.func,
};
