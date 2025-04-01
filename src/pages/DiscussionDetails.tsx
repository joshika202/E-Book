import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, MessageSquare, Heart, Reply as ReplyIcon } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function DiscussionDetails() {
  const { groupId, discussionId } = useParams();
  const { user, discussionGroups, books, addComment, addReply, likeComment } = useStore();
  const [comment, setComment] = useState('');
  const [replyText, setReplyText] = useState<Record<string, string>>({});
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  
  const group = discussionGroups.find(g => g.id === groupId);
  const discussion = group?.discussions.find(d => d.id === discussionId);
  const book = group ? books.find(b => b.id === group.bookId) : null;
  
  if (!group || !discussion) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Discussion not found</h2>
        <p className="text-gray-600 mb-6">The discussion you're looking for doesn't exist.</p>
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
  
  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !comment.trim()) return;
    
    addComment(group.id, discussion.id, comment);
    setComment('');
  };
  
  const handleSubmitReply = (commentId: string) => {
    if (!user || !replyText[commentId]?.trim()) return;
    
    addReply(group.id, discussion.id, commentId, replyText[commentId]);
    setReplyText(prev => ({ ...prev, [commentId]: '' }));
    setReplyingTo(null);
  };
  
  const toggleReply = (commentId: string) => {
    setReplyingTo(replyingTo === commentId ? null : commentId);
    if (!replyText[commentId]) {
      setReplyText(prev => ({ ...prev, [commentId]: '' }));
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  return (
    <div className="space-y-8">
      <div className="flex items-center mb-4">
        <Link
          to={`/group/${group.id}`}
          className="inline-flex items-center text-purple-600 hover:text-purple-700"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to {group.name}
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <span className="mr-4">
              <Link to={`/group/${group.id}`} className="text-purple-600 hover:text-purple-700">
                {group.name}
              </Link>
            </span>
            {book && (
              <span>
                Discussing{' '}
                <Link to={`/book/${book.id}`} className="text-purple-600 hover:text-purple-700">
                  {book.title}
                </Link>
              </span>
            )}
          </div>
          
          <h1 className="text-2xl font-bold mb-2">{discussion.title}</h1>
          
          <div className="flex items-center text-sm text-gray-500 mb-6">
            <span className="mr-4">By {discussion.userName}</span>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {formatDate(discussion.createdAt)}
            </div>
          </div>
          
          <div className="prose max-w-none mb-8">
            <p className="text-gray-700 whitespace-pre-line">{discussion.content}</p>
          </div>
          
          <div className="border-t pt-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">
                Comments ({discussion.comments.length})
              </h2>
            </div>
            
            {isUserMember && (
              <form onSubmit={handleSubmitComment} className="mb-8">
                <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                  Add a comment
                </label>
                <textarea
                  id="comment"
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your thoughts..."
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  required
                />
                <div className="mt-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={!comment.trim()}
                    className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 disabled:cursor-not-allowed"
                  >
                    Post Comment
                  </button>
                </div>
              </form>
            )}
            
            {discussion.comments.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">No comments yet</h3>
                <p className="text-gray-600">Be the first to comment on this discussion</p>
              </div>
            ) : (
              <div className="space-y-6">
                {discussion.comments.map((comment) => (
                  <div key={comment.id} className="border rounded-lg p-4">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">{comment.userName}</span>
                      <span className="text-sm text-gray-500">{formatDate(comment.createdAt)}</span>
                    </div>
                    <p className="text-gray-700 mb-3">{comment.text}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <button 
                          onClick={() => likeComment(group.id, discussion.id, comment.id)}
                          className="flex items-center text-gray-500 hover:text-purple-600"
                        >
                          <Heart className={`h-4 w-4 mr-1 ${comment.likes > 0 ? 'fill-current text-purple-600' : ''}`} />
                          <span>{comment.likes}</span>
                        </button>
                        {isUserMember && (
                          <button 
                            onClick={() => toggleReply(comment.id)}
                            className="flex items-center text-gray-500 hover:text-purple-600"
                          >
                            <ReplyIcon className="h-4 w-4 mr-1" />
                            <span>Reply</span>
                          </button>
                        )}
                      </div>
                    </div>
                    
                    {/* Replies */}
                    {comment.replies.length > 0 && (
                      <div className="mt-4 pl-4 border-l-2 border-gray-200 space-y-3">
                        {comment.replies.map((reply) => (
                          <div key={reply.id} className="bg-gray-50 p-3 rounded">
                            <div className="flex justify-between mb-1">
                              <span className="font-medium text-sm">{reply.userName}</span>
                              <span className="text-xs text-gray-500">{formatDate(reply.createdAt)}</span>
                            </div>
                            <p className="text-gray-700 text-sm">{reply.text}</p>
                            <button 
                              onClick={() => likeComment(group.id, discussion.id, reply.id)}
                              className="mt-1 flex items-center text-xs text-gray-500 hover:text-purple-600"
                            >
                              <Heart className={`h-3 w-3 mr-1 ${reply.likes > 0 ? 'fill-current text-purple-600' : ''}`} />
                              <span>{reply.likes}</span>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {/* Reply form */}
                    {replyingTo === comment.id && isUserMember && (
                      <div className="mt-3 pl-4 border-l-2 border-gray-200">
                        <textarea
                          rows={2}
                          value={replyText[comment.id] || ''}
                          onChange={(e) => setReplyText({...replyText, [comment.id]: e.target.value})}
                          placeholder="Write a reply..."
                          className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                        />
                        <div className="mt-2 flex justify-end space-x-2">
                          <button
                            type="button"
                            onClick={() => setReplyingTo(null)}
                            className="px-3 py-1 text-xs border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSubmitReply(comment.id)}
                            disabled={!replyText[comment.id]?.trim()}
                            className="px-3 py-1 text-xs border border-transparent rounded-md text-white bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 disabled:cursor-not-allowed"
                          >
                            Post Reply
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}