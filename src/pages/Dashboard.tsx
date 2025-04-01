import React, { useState } from 'react';
import { Book, Bookmark, History, Settings, Users, MessageSquare, Edit3 } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { user, books, getGroupsByUser } = useStore();
  const [activeTab, setActiveTab] = useState<'reading' | 'groups' | 'annotations'>('reading');

  if (!user) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Please sign in to access your dashboard</h2>
        <Link
          to="/signin"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
        >
          Sign In
        </Link>
      </div>
    );
  }

  const userGroups = getGroupsByUser();
  const userBooks = books.filter(book => user.readingList.includes(book.id));

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold mb-4">Welcome back, {user.name}!</h1>
        <p className="text-gray-600">
          {user.subscription === 'premium' ? 'Premium Member' : 'Free Tier'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <Book className="h-8 w-8 text-purple-600 mb-4" />
          <h3 className="font-semibold mb-2">Reading List</h3>
          <p className="text-gray-600">{user.readingList.length} books</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <Bookmark className="h-8 w-8 text-purple-600 mb-4" />
          <h3 className="font-semibold mb-2">Bookmarks</h3>
          <p className="text-gray-600">{user.bookmarks.length} saved places</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <Users className="h-8 w-8 text-purple-600 mb-4" />
          <h3 className="font-semibold mb-2">Discussion Groups</h3>
          <p className="text-gray-600">{userGroups.length} groups joined</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <Edit3 className="h-8 w-8 text-purple-600 mb-4" />
          <h3 className="font-semibold mb-2">Annotations</h3>
          <p className="text-gray-600">{user.annotations?.length || 0} notes</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="border-b">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('reading')}
              className={`px-4 py-3 text-sm font-medium ${
                activeTab === 'reading'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Reading List
            </button>
            <button
              onClick={() => setActiveTab('groups')}
              className={`px-4 py-3 text-sm font-medium ${
                activeTab === 'groups'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              My Groups
            </button>
            <button
              onClick={() => setActiveTab('annotations')}
              className={`px-4 py-3 text-sm font-medium ${
                activeTab === 'annotations'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              My Annotations
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'reading' && (
            <>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Your Reading List</h2>
                <Link
                  to="/categories"
                  className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                >
                  Browse more books
                </Link>
              </div>
              
              {userBooks.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <Book className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">Your reading list is empty</h3>
                  <p className="text-gray-600 mb-4">Start adding books to your reading list</p>
                  <Link
                    to="/categories"
                    className="text-purple-600 hover:text-purple-700 font-medium"
                  >
                    Browse books
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userBooks.map((book) => (
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
                      <h3 className="mt-4 text-sm font-medium text-gray-900">{book.title}</h3>
                      <p className="mt-1 text-sm text-gray-500">{book.author}</p>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}

          {activeTab === 'groups' && (
            <>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Your Discussion Groups</h2>
                <Link
                  to="/community"
                  className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                >
                  Explore community
                </Link>
              </div>
              
              {userGroups.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">You haven't joined any groups yet</h3>
                  <p className="text-gray-600 mb-4">Join discussion groups to connect with other readers</p>
                  <Link
                    to="/community"
                    className="text-purple-600 hover:text-purple-700 font-medium"
                  >
                    Browse groups
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {userGroups.map((group) => {
                    const groupBook = books.find(b => b.id === group.bookId);
                    return (
                      <Link
                        key={group.id}
                        to={`/group/${group.id}`}
                        className="flex items-start gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex-shrink-0 w-12 h-16 bg-purple-100 rounded overflow-hidden">
                          {groupBook && (
                            <img 
                              src={groupBook.coverUrl} 
                              alt={groupBook.title}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <div className="flex-grow">
                          <h3 className="font-medium">{group.name}</h3>
                          <p className="text-sm text-gray-600 line-clamp-1">{group.description}</p>
                          <div className="flex items-center mt-1 text-xs text-gray-500">
                            <span className="mr-3">{group.members.length} members</span>
                            <div className="flex items-center">
                              <MessageSquare className="h-3 w-3 mr-1" />
                              {group.discussions.length} discussions
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </>
          )}

          {activeTab === 'annotations' && (
            <>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Your Annotations</h2>
              </div>
              
              {!user.annotations || user.annotations.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <Edit3 className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No annotations yet</h3>
                  <p className="text-gray-600 mb-4">Add notes and highlights while reading to see them here</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {user.annotations.map((annotation) => {
                    const annotationBook = books.find(b => b.id === annotation.bookId);
                    return (
                      <div key={annotation.id} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">
                            {annotationBook?.title || "Unknown Book"}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(annotation.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="bg-yellow-50 p-2 rounded mb-2 text-sm italic">
                          "{annotation.highlight}"
                        </div>
                        <p className="text-sm text-gray-700">{annotation.text}</p>
                        <div className="mt-2 flex justify-between items-center">
                          <span className="text-xs text-gray-500">
                            {annotation.isPrivate ? 'Private note' : 'Shared with community'}
                          </span>
                          <Link
                            to={`/read/${annotation.bookId}/${annotation.chapterId}`}
                            className="text-xs text-purple-600 hover:text-purple-700 font-medium"
                          >
                            Go to passage
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}