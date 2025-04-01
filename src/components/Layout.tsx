import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Book, Search, User, Menu, Users } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function Layout() {
  const { user, setUser, books, setFilteredBooks } = useStore();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSignOut = () => {
    setUser(null);
    navigate('/');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) {
      setFilteredBooks(books);
      return;
    }
    
    const filtered = books.filter(book => 
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.genre.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setFilteredBooks(filtered);
    navigate('/categories');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex items-center">
                <Book className="h-8 w-8 text-purple-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">BookVerse</span>
              </Link>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  to="/categories"
                  className="text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium"
                >
                  Categories
                </Link>
                <Link
                  to="/community"
                  className="text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium"
                >
                  <Users className="h-4 w-4 mr-1" />
                  Community
                </Link>
                <Link
                  to="/about"
                  className="text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium"
                >
                  About
                </Link>
                <Link
                  to="/contact"
                  className="text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium"
                >
                  Contact
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <form onSubmit={handleSearch} className="relative">
                  <input
                    type="text"
                    placeholder="Search books..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                  <button type="submit" className="absolute left-3 top-2.5">
                    <Search className="h-5 w-5 text-gray-400" />
                  </button>
                </form>
              </div>
              <div className="ml-4 flex items-center">
                {user ? (
                  <div className="relative">
                    <button 
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900"
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                      <User className="h-5 w-5 mr-1" />
                      {user.name}
                    </button>
                    {dropdownOpen && (
                      <div className="absolute right-0 w-48 mt-2 py-1 bg-white rounded-md shadow-lg z-10">
                        <Link
                          to="/dashboard"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setDropdownOpen(false)}
                        >
                          Dashboard
                        </Link>
                        <button
                          onClick={() => {
                            handleSignOut();
                            setDropdownOpen(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Sign out
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to="/signin"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
                  >
                    Sign in
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      <footer className="bg-gray-800 text-white mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About BookVerse</h3>
              <p className="text-gray-400">Your gateway to endless stories and knowledge.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/faq" className="text-gray-400 hover:text-white">FAQ</Link></li>
                <li><Link to="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Categories</h3>
              <ul className="space-y-2">
                <li><Link to="/categories/fiction" className="text-gray-400 hover:text-white">Fiction</Link></li>
                <li><Link to="/categories/non-fiction" className="text-gray-400 hover:text-white">Non-Fiction</Link></li>
                <li><Link to="/categories/academic" className="text-gray-400 hover:text-white">Academic</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect</h3>
              <ul className="space-y-2">
                <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact Us</Link></li>
                <li><Link to="/community" className="text-gray-400 hover:text-white">Community</Link></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Support</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>&copy; 2025 BookVerse. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}