import React from 'react';
import { Link } from 'react-router-dom';
import { Book as BookIcon, Star, Headphones } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function Home() {
  const books = useStore((state) => state.filteredBooks);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="relative bg-purple-700 rounded-2xl overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
            alt="Library"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative px-8 py-16 sm:px-16 sm:py-24">
          <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6">
            Discover Your Next Great Read
          </h1>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl">
            Access thousands of books across multiple genres. Read or listen anywhere, anytime.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/categories"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-purple-700 bg-white hover:bg-purple-50"
            >
              <BookIcon className="h-5 w-5 mr-2" />
              Browse Library
            </Link>
            <Link
              to="/premium"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-900 hover:bg-purple-800"
            >
              <Star className="h-5 w-5 mr-2" />
              Go Premium
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <BookIcon className="h-12 w-12 text-purple-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Vast Library</h3>
          <p className="text-gray-600">
            Access thousands of books across multiple genres, from bestsellers to classics.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <Headphones className="h-12 w-12 text-purple-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">AI Audio Reader</h3>
          <p className="text-gray-600">
            Listen to your favorite books with our advanced AI text-to-speech technology.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <Star className="h-12 w-12 text-purple-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Personalized Experience</h3>
          <p className="text-gray-600">
            Get tailored recommendations based on your reading preferences and history.
          </p>
        </div>
      </div>

      {/* Featured Books */}
      <div>
        <h2 className="text-3xl font-bold mb-6">Featured Books</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.slice(0, 8).map((book) => (
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
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}