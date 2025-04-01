import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Book, MessageSquare, Plus, Search } from 'lucide-react';
import { useStore } from '../store/useStore';
import CreateGroupModal from '../components/CreateGroupModal';

export default function Community() {
  const { user, discussionGroups, books } = useStore();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'my-groups'>('all');

  const filteredGroups = discussionGroups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      books.find(b => b.id === group.bookId)?.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'my-groups') {
      return matchesSearch && user && group.members.includes(user.id);
    }
    
    return matchesSearch;
  });

  if (!user) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Join our reading community</h2>
        <p className="text-gray-600 mb-6">Sign in to connect with other readers, join discussion groups, and share your thoughts.</p>
        <Link
          to="/signin"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
        >
          Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reading Community</h1>
          <p className="text-gray-600">Connect with other readers and discuss your favorite books</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Group
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search groups..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-md ${
                filter === 'all' 
                  ? 'bg-purple-100 text-purple-700' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Groups
            </button>
            <button
              onClick={() => setFilter('my-groups')}
              className={`px-4 py-2 rounded-md ${
                filter === 'my-groups' 
                  ? 'bg-purple-100 text-purple-700' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              My Groups
            </button>
          </div>
        </div>

        {filteredGroups.length === 0 ? (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No groups found</h3>
            <p className="text-gray-600">
              {filter === 'my-groups' 
                ? "You haven't joined any groups yet." 
                : "No groups match your search criteria."}
            </p>
            {filter === 'my-groups' && (
              <button
                onClick={() => setShowCreateModal(true)}
                className="mt-4 text-purple-600 hover:text-purple-700 font-medium"
              >
                Create a new group
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGroups.map((group) => {
              const book = books.find(b => b.id === group.bookId);
              const isUserMember = user && group.members.includes(user.id);
              
              return (
                <div key={group.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <div className="h-32 bg-purple-100 relative">
                    {book && (
                      <img 
                        src={book.coverUrl} 
                        alt={book.title}
                        className="absolute inset-0 w-full h-full object-cover opacity-30"
                      />
                    )}
                    <div className="absolute inset-0 p-4 flex flex-col justify-between">
                      <div className="flex items-start justify-between">
                        <span className="bg-white text-xs font-medium px-2 py-1 rounded-full text-purple-600">
                          {book?.genre || "Book Group"}
                        </span>
                        <span className="bg-white text-xs px-2 py-1 rounded-full text-gray-600">
                          {group.members.length} {group.members.length === 1 ? 'member' : 'members'}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 bg-white bg-opacity-80 p-1 rounded">
                        {group.name}
                      </h3>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <Book className="h-4 w-4 mr-1" />
                      {book?.title || "Unknown Book"}
                    </div>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {group.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        {group.discussions.length} {group.discussions.length === 1 ? 'discussion' : 'discussions'}
                      </div>
                      <Link
                        to={`/group/${group.id}`}
                        className={`px-3 py-1 rounded-md text-sm font-medium ${
                          isUserMember 
                            ? 'bg-purple-100 text-purple-700 hover:bg-purple-200' 
                            : 'bg-purple-600 text-white hover:bg-purple-700'
                        }`}
                      >
                        {isUserMember ? 'View Group' : 'Join Group'}
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {showCreateModal && (
        <CreateGroupModal 
          onClose={() => setShowCreateModal(false)} 
          books={books}
        />
      )}
    </div>
  );
}