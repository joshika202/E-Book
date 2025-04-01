import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Filter, Star } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function Categories() {
  const { filters, updateFilters, filteredBooks } = useStore();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Get unique genres from books
  const genres = ['All', 'Fiction', 'Romance', 'Mystery', 'Science'];

  const handleRatingClick = (rating: number) => {
    updateFilters({ rating });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Filters Sidebar */}
      <div className={`lg:w-64 bg-white p-6 rounded-lg shadow-sm ${isFilterOpen ? 'block' : 'hidden lg:block'}`}>
        <div className="flex items-center justify-between lg:justify-start mb-6">
          <h2 className="text-lg font-semibold">Filters</h2>
          <button
            onClick={() => setIsFilterOpen(false)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        {/* Genre Filter */}
        <div className="mb-6">
          <h3 className="font-medium mb-3">Genre</h3>
          <div className="space-y-2">
            {genres.map((genre) => (
              <label key={genre} className="flex items-center">
                <input
                  type="radio"
                  name="genre"
                  value={genre.toLowerCase()}
                  checked={filters.genre === genre.toLowerCase()}
                  onChange={(e) => updateFilters({ genre: e.target.value })}
                  className="text-purple-600 focus:ring-purple-500"
                />
                <span className="ml-2 text-sm text-gray-700">{genre}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range Filter */}
        <div className="mb-6">
          <h3 className="font-medium mb-3">Price</h3>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="price"
                value="all"
                checked={filters.priceRange === 'all'}
                onChange={(e) => updateFilters({ priceRange: e.target.value })}
                className="text-purple-600 focus:ring-purple-500"
              />
              <span className="ml-2 text-sm text-gray-700">All</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="price"
                value="free"
                checked={filters.priceRange === 'free'}
                onChange={(e) => updateFilters({ priceRange: e.target.value })}
                className="text-purple-600 focus:ring-purple-500"
              />
              <span className="ml-2 text-sm text-gray-700">Free</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="price"
                value="paid"
                checked={filters.priceRange === 'paid'}
                onChange={(e) => updateFilters({ priceRange: e.target.value })}
                className="text-purple-600 focus:ring-purple-500"
              />
              <span className="ml-2 text-sm text-gray-700">Paid</span>
            </label>
          </div>
        </div>

        {/* Rating Filter */}
        <div className="mb-6">
          <h3 className="font-medium mb-3">Exact Rating</h3>
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                onClick={() => handleRatingClick(rating)}
                className="p-1"
              >
                <Star 
                  className={`h-5 w-5 ${
                    rating <= filters.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
                  }`} 
                />
              </button>
            ))}
          </div>
          {filters.rating > 0 && (
            <button
              onClick={() => updateFilters({ rating: 0 })}
              className="mt-2 text-sm text-purple-600 hover:text-purple-700"
            >
              Clear rating filter
            </button>
          )}
          <p className="mt-2 text-xs text-gray-500">
            {filters.rating > 0 
              ? `Showing books with ${filters.rating} star rating` 
              : "Select stars to filter by exact rating"}
          </p>
         </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Browse Books</h1>
          <button
            onClick={() => setIsFilterOpen(true)}
            className="lg:hidden inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </button>
        </div>

        {filteredBooks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No books found matching your filters.</p>
            <button
              onClick={() => updateFilters({ genre: 'all', priceRange: 'all', rating: 0 })}
              className="mt-4 text-purple-600 hover:text-purple-700 font-medium"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredBooks.map((book) => (
              <Link
                key={book.id}
                to={`/book/${book.id}`}
                className="group"
              >
                <div className="aspect-w-2 aspect-h-3 w-full overflow-hidden rounded-lg bg-gray-200">
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <h3 className="mt-4 text-sm text-gray-700">{book.title}</h3>
                <p className="mt-1 text-sm text-gray-500">{book.author}</p>
                <p className="mt-1 text-lg font-medium text-gray-900">
                  {book.isFree ? 'Free' : `₹${book.price.toFixed(2)}`}
                </p>
                <div className="mt-1 flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${
                        star <= book.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-1 text-xs text-gray-500">{book.rating.toFixed(1)}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}