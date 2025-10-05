// src/components/home/SearchBar.jsx
import { Search, X } from 'lucide-react';
import { useState } from 'react';

export default function SearchBar({ onSearch, placeholder = "Cari resep..." }) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <form onSubmit={handleSubmit} className="relative">
        <div className={`relative flex items-center bg-white/10 backdrop-blur-xl border rounded-2xl transition-all duration-300 ${
          isFocused
            ? 'border-blue-400/50 shadow-lg shadow-blue-500/10 bg-white/15'
            : 'border-white/20 hover:border-white/30'
        }`}>
          <div className="pl-4 pr-3">
            <Search className={`w-5 h-5 transition-colors duration-200 ${
              isFocused ? 'text-blue-400' : 'text-slate-400'
            }`} />
          </div>

          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            className="flex-1 px-3 py-4 bg-transparent text-slate-800 placeholder-slate-400 focus:outline-none text-base"
          />

          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="pr-4 pl-2 text-slate-400 hover:text-slate-600 transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
