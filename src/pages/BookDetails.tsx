import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Star, BookOpen, Headphones, Download, Users, MessageSquare } from 'lucide-react';
import { useStore } from '../store/useStore';
import PaymentModal from '../components/PaymentModal';

export default function BookDetails() {
  const { id } = useParams();
  const { books, user, addToReadingList, getGroupsByBook } = useStore();
  const navigate = useNavigate();
  const [showPayment, setShowPayment] = useState(false);
  const book = books.find((b) => b.id === id);

  if (!book) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Book not found</h2>
        <p className="text-gray-600">The book you're looking for doesn't 't exist.</p>
      </div>
    );
  }

  const handleBuyClick = () => {
    if (!user) {
      navigate('/signin');
      return;
    }
    setShowPayment(true);
  };

  const discussionGroups = getGroupsByBook(book.id);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Book Cover and Actions */}
        <div className="lg:col-span-1">
          <div className="aspect-w-2 aspect-h-3 w-full overflow-hidden rounded-lg bg-gray-200 mb-6">
            <img
              src={book.coverUrl}
              alt={book.title}
              className="object-cover object-center"
            />
          </div>
          <div className="space-y-4">
            <button
              onClick={book.isFree ? () => addToReadingList(book.id) : handleBuyClick}
              className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
            >
              <BookOpen className="h-5 w-5 mr-2" />
              {book.isFree ? 'Read Now' : `Buy for ₹${book.price.toFixed(2)}`}
            </button>
            {user?.subscription === 'premium' && (
              <>
                <button className="w-full inline-flex justify-center items-center px-6 py-3 border border-purple-600 text-base font-medium rounded-md text-purple-600 hover:bg-purple-50">
                  <Headphones className="h-5 w-5 mr-2" />
                  Listen with AI
                </button>
                <button className="w-full inline-flex justify-center items-center px-6 py-3 border border-purple-600 text-base font-medium rounded-md text-purple-600 hover:bg-purple-50">
                  <Download className="h-5 w-5 mr-2" />
                  Download for Offline
                </button>
              </>
            )}
            {book.sampleChapters.length > 0 && (
              <Link
                to={`/read/${book.id}/${book.sampleChapters[0].id}`}
                className="w-full inline-flex justify-center items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 hover:bg-gray-50"
              >
                Read Sample
              </Link>
            )}
          </div>
        </div>

        {/* Book Details */}
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
          <p className="text-xl text-gray-600 mb-4">by {book.author}</p>
          
          <div className="flex items-center mb-6">
            <div className="flex items-center mr-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-5 w-5 ${
                    star <= book.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-gray-600">{book.rating.toFixed(1)} out of 5</span>
          </div>

          <div className="prose max-w-none mb-8">
            <h2 className="text-2xl font-semibold mb-4">Synopsis</h2>
            <p className="text-gray-600">{book.synopsis}</p>
          </div>

          {/* Discussion Groups Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold">Discussion Groups</h2>
              <Link
                to="/community"
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                View All
              </Link>
            </div>
            
            {discussionGroups.length === 0 ? (
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No discussion groups yet</h3>
                <p className="text-gray-600 mb-4">Be the first to start a discussion group for this book</p>
                <Link
                  to="/community"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
                >
                  Create Group
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {discussionGroups.slice(0, 2).map((group) => (
                  <Link
                    key={group.id}
                    to={`/group/${group.id}`}
                    className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <h3 className="font-medium mb-1">{group.name}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-2">{group.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{group.members.length} members</span>
                      <div className="flex items-center">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        {group.discussions.length} discussions
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Sample Chapters</h2>
            <div className="space-y-4">
              {book.sampleChapters.map((chapter) => (
                <div key={chapter.id} className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="font-medium mb-2">{chapter.title}</h3>
                  <p className="text-gray-600 line-clamp-3">{chapter.content}</p>
                  <Link 
                    to={`/read/${book.id}/${chapter.id}`}
                    className="mt-2 text-purple-600 hover:text-purple-700 font-medium inline-block"
                  >
                    Read More
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Book Information</h2>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <dt className="text-gray-600">Genre</dt>
                <dd className="font-medium">{book.genre}</dd>
              </div>
              <div>
                <dt className="text-gray-600">Release Date</dt>
                <dd className="font-medium">{book.releaseDate}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPayment && (
        <PaymentModal 
          book={book} 
          onClose={() => setShowPayment(false)} 
          onSuccess={() => {
            addToReadingList(book.id);
            setShowPayment(false);
            navigate('/dashboard');
          }} 
        />
      )}
    </div>
  );
}