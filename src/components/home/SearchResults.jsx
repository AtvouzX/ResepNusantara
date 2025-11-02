// src/components/home/SearchResults.jsx
import { Clock, Star, ChefHat, Coffee } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

export default function SearchResults({ results, onRecipeClick, onBack }) {
  const [visibleCards, setVisibleCards] = useState(new Set());
  const cardRefs = useRef([]);

  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, results.length);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.dataset.index);
          setTimeout(() => {
            setVisibleCards(prev => new Set(prev).add(index));
          }, (index % 3) * 150);
        }
      });
    }, { threshold: 0.1 });

    cardRefs.current.forEach((ref, index) => {
      if (ref) {
        ref.dataset.index = index;
        observer.observe(ref);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [results]);

  if (results.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold text-slate-700 mb-2">Tidak ada hasil ditemukan</h3>
        <p className="text-slate-500">Coba kata kunci yang berbeda</p>
        <button
          onClick={onBack}
          className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
        >
          Kembali
        </button>
      </div>
    );
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <h2 className="text-xl md:text-3xl font-bold text-slate-800">
          Hasil Pencarian ({results.length})
        </h2>
        <button
          onClick={onBack}
          className="text-slate-500 hover:text-slate-600 font-medium text-xs md:text-sm transition-colors duration-200 hover:underline"
        >
          Kembali
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
        {results.map((recipe, index) => (
          <div
            key={`${recipe.category}-${recipe.id}`}
            ref={el => cardRefs.current[index] = el}
            className={`group transform transition-all duration-700 ${
              visibleCards.has(index)
                ? 'translate-y-0 opacity-100'
                : 'translate-y-8 opacity-0'
            }`}
            onClick={() => onRecipeClick && onRecipeClick(recipe)}
          >
            <div className={`relative bg-white/15 backdrop-blur-xl border border-white/25 rounded-2xl md:rounded-3xl overflow-hidden shadow-lg md:shadow-2xl cursor-pointer group-hover:scale-105 group-hover:bg-white/20 transition-all duration-500 ${
              recipe.category === 'makanan'
                ? 'shadow-blue-500/5 hover:shadow-blue-500/15'
                : 'shadow-green-500/5 hover:shadow-green-500/15'
            }`}>

              <div className={`absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                recipe.category === 'makanan' ? 'to-blue-500/5' : 'to-green-500/5'
              }`} />

              <div className="relative h-32 md:h-56 overflow-hidden">
                <img
                  src={recipe.image_url}
                  alt={recipe.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>

              <div className="relative z-10 p-4 md:p-8">
                <div className="flex items-center justify-between mb-3 md:mb-4">
                  <span className={`text-xs font-semibold px-2 md:px-3 py-1 md:py-1.5 rounded-full ${
                    recipe.category === 'makanan'
                      ? 'text-blue-700 bg-blue-100/90'
                      : 'text-green-700 bg-green-100/90'
                  }`}>
                    {recipe.category === 'makanan' ? 'Makanan' : 'Minuman'}
                  </span>
                  <div className="flex items-center space-x-1 bg-white/90 px-2 py-1 rounded-full">
                    <Star className="w-3 h-3 md:w-4 md:h-4 text-yellow-500 fill-current" />
                    <span className="text-xs md:text-sm font-semibold text-slate-700">
                      {recipe.category === 'makanan' ? '4.8' : '4.7'}
                    </span>
                  </div>
                </div>

                <h3 className={`font-bold text-slate-800 mb-3 md:mb-4 text-base md:text-xl group-hover:text-blue-600 transition-colors duration-200 line-clamp-2 ${
                  recipe.category === 'makanan' ? 'group-hover:text-blue-600' : 'group-hover:text-green-600'
                }`}>
                  {recipe.name}
                </h3>

                <div className="flex items-center justify-between text-xs md:text-sm text-slate-600">
                  <div className="flex items-center space-x-1 md:space-x-2 bg-white/70 px-2 md:px-3 py-1 md:py-2 rounded-full">
                    <Clock className="w-3 h-3 md:w-4 md:h-4" />
                    <span className="font-medium">{recipe.ingredients.length} bahan</span>
                  </div>
                  <div className="flex items-center space-x-1 md:space-x-2 bg-white/70 px-2 md:px-3 py-1 md:py-2 rounded-full">
                    {recipe.category === 'makanan' ? (
                      <ChefHat className="w-3 h-3 md:w-4 md:h-4" />
                    ) : (
                      <Coffee className="w-3 h-3 md:w-4 md:h-4" />
                    )}
                    <span className="font-medium">{recipe.steps.length} langkah</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

SearchResults.propTypes = {
  results: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      image_url: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      ingredients: PropTypes.array.isRequired,
      steps: PropTypes.array.isRequired,
    })
  ).isRequired,
  onRecipeClick: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};
