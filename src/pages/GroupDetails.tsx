import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Book, Users, MessageSquare, Plus, Calendar, ArrowLeft } from 'lucide-react';
import { useStore } from '../store/useStore';
import CreateDiscussionModal from '../components/CreateDiscussionModal';

export default function GroupDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, discussionGroups, books, joinGroup, leaveGroup } = useStore();
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  const group = discussionGroups.find(g => g.id === id);
  const book = group ? books.find(b => b.id === group.bookId) : null;
  
  if (!group) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Group not found</h2>
        <p className="text-gray-600 mb-6">The discussion group you're looking for doesn't exist.</p>
        <Link
          to="/community"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Community
        </Link>
      </div>
    );
  }
  
  const isUserMember = user && group.members.includes(user.id);
  
  const handleJoinLeave = () => {
    if (!user) {
      navigate('/signin');
      return;
    }
    
    if (isUserMember) {
      leaveGroup(group.id);
    } else {
      joinGroup(group.id);
    }
  };
  
  return (
    <div className="space-y-8">
      <div className="flex items-center mb-4">
        <Link
          to="/community"
          className="inline-flex items-center text-purple-600 hover:text-purple-700"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Community
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="h-48 bg-purple-100 relative">
          {book && (
            <img 
              src={book.coverUrl} 
              alt={book.title}
              className="absolute inset-0 w-full h-full object-cover opacity-30"
            />
          )}
          <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-black/30 to-transparent">
            <h1 className="text-3xl font-bold text-white">{group.name}</h1>
            <div className="flex items-center mt-2">
              <span className="bg-white text-xs font-medium px-2 py-1 rounded-full text-purple-600 mr-2">
                {book?.genre || "Book Group"}
              </span>
              <span className="bg-white text-xs px-2 py-1 rounded-full text-gray-600">
                {group.members.length} {group.members.length === 1 ? 'member' : 'members'}
              </span>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div className="flex items-center">
              <Book className="h-5 w-5 text-purple-600 mr-2" />
              <span className="font-medium">{book?.title || "Unknown Book"}</span>
              <span className="text-gray-500 ml-2">by {book?.author || "Unknown Author"}</span>
            </div>
            
            <button
              onClick={handleJoinLeave}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                isUserMember 
                  ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                  : 'bg-purple-600 text-white hover:bg-purple-700'
              }`}
            >
              {isUserMember ? 'Leave Group' : 'Join Group'}
            </button>
          </div>
          
          <p className="text-gray-600 mb-6">{group.description}</p>
          
          <div className="border-t pt-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Discussions</h2>
              {isUserMember && (
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  New Discussion
                </button>
              )}
            </div>
            
            {group.discussions.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">No discussions yet</h3>
                <p className="text-gray-600 mb-4">Be the first to start a discussion in this group</p>
                {isUserMember && (
                  <button
                    onClick={() => setShowCreateModal(true)}
                    className="text-purple-600 hover:text-purple-700 font-medium"
                  >
                    Start a discussion
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {group.discussions.map((discussion) => (
                  <Link
                    key={discussion.id}
                    to={`/discussion/${group.id}/${discussion.id}`}
                    className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <h3 className="font-medium text-lg mb-1">{discussion.title}</h3>
                    <p className="text-gray-600 line-clamp-2 mb-3">{discussion.content}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center">
                        <span className="mr-4">By {discussion.userName}</span>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(discussion.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        {discussion.comments.length} {discussion.comments.length === 1 ? 'comment' : 'comments'}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {showCreateModal && (
        <CreateDiscussionModal 
          groupId={group.id}
          onClose={() => setShowCreateModal(false)} 
        />
      )}
    </div>
  );
}