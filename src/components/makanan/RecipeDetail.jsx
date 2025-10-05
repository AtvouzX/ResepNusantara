// src/components/makanan/RecipeDetail.jsx
import { ArrowLeft, Clock, Star, ChefHat, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export default function RecipeDetail({ recipe, onBack }) {
  const [completedSteps, setCompletedSteps] = useState(new Set());

  const toggleStep = (index) => {
    const newCompleted = new Set(completedSteps);
    if (newCompleted.has(index)) {
      newCompleted.delete(index);
    } else {
      newCompleted.add(index);
    }
    setCompletedSteps(newCompleted);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <main className="max-w-4xl mx-auto px-4 md:px-8 py-8 md:py-12">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-slate-600 hover:text-slate-800 mb-6 transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Kembali ke Daftar Resep</span>
        </button>

        {/* Recipe Header */}
        <div className="bg-white/15 backdrop-blur-xl border border-white/25 rounded-3xl overflow-hidden shadow-2xl shadow-blue-500/5 mb-8">
          <div className="relative h-64 md:h-96 overflow-hidden">
            <img
              src={recipe.image_url}
              alt={recipe.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-sm font-semibold text-white bg-blue-600/90 px-3 py-1.5 rounded-full">
                  Makanan
                </span>
                <div className="flex items-center space-x-1 bg-white/90 px-3 py-1.5 rounded-full">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-semibold text-slate-700">4.8</span>
                </div>
              </div>
              <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">
                {recipe.name}
              </h1>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Ingredients */}
          <div className="lg:col-span-1">
            <div className="bg-white/15 backdrop-blur-xl border border-white/25 rounded-2xl p-6 shadow-lg shadow-blue-500/5">
              <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
                <ChefHat className="w-5 h-5 mr-2 text-blue-600" />
                Bahan-bahan ({recipe.ingredients.length})
              </h2>
              <ul className="space-y-3">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-slate-700">{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Steps */}
          <div className="lg:col-span-2">
            <div className="bg-white/15 backdrop-blur-xl border border-white/25 rounded-2xl p-6 shadow-lg shadow-blue-500/5">
              <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-blue-600" />
                Langkah-langkah ({recipe.steps.length})
              </h2>
              <div className="space-y-4">
                {recipe.steps.map((step, index) => (
                  <div
                    key={index}
                    className={`flex items-start space-x-4 p-4 rounded-xl transition-all duration-200 cursor-pointer ${
                      completedSteps.has(index)
                        ? 'bg-green-50 border border-green-200'
                        : 'bg-white/50 hover:bg-white/70'
                    }`}
                    onClick={() => toggleStep(index)}
                  >
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      completedSteps.has(index)
                        ? 'bg-green-500 text-white'
                        : 'bg-blue-100 text-blue-600'
                    }`}>
                      {completedSteps.has(index) ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        index + 1
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`text-slate-700 leading-relaxed ${
                        completedSteps.has(index) ? 'line-through text-slate-500' : ''
                      }`}>
                        {step}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
