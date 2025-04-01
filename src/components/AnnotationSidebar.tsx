import React, { useState } from 'react';
import { X, MessageSquare, User, Globe, Calendar } from 'lucide-react';
import { useStore } from '../store/useStore';

interface AnnotationSidebarProps {
  bookId: string;
  onClose: () => void;
}

export default function AnnotationSidebar({ bookId, onClose }: AnnotationSidebarProps) {
  const { user, getAnnotationsByBook, getPublicAnnotationsByBook } = useStore();
  const [filter, setFilter] = useState<'all' | 'mine' | 'community'>('all');
  
  const myAnnotations = user ? getAnnotationsByBook(bookId) : [];
  const communityAnnotations = getPublicAnnotationsByBook(bookId);
  
  let displayedAnnotations = [];
  if (filter === 'mine') {
    displayedAnnotations = myAnnotations;
  } else if (filter === 'community') {
    displayedAnnotations = communityAnnotations;
  } else {
    displayedAnnotations = [...myAnnotations, ...communityAnnotations];
  }
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    });
  };
  
  return (
    <div className="w-80 bg-white border-l shadow-lg overflow-y-auto">
      <div className="sticky top-0 bg-white z-10 border-b">
        <div className="flex items-center justify-between p-4">
          <h2 className="text-lg font-semibold">Annotations</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="flex border-b">
          <button
            onClick={() => setFilter('all')}
            className={`flex-1 py-2 text-sm font-medium ${
              filter === 'all' 
                ? 'text-purple-600 border-b-2 border-purple-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('mine')}
            className={`flex-1 py-2 text-sm font-medium ${
              filter === 'mine' 
                ? 'text-purple-600 border-b-2 border-purple-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            My Notes
          </button>
          <button
            onClick={() => setFilter('community')}
            className={`flex-1 py-2 text-sm font-medium ${
              filter === 'community' 
                ? 'text-purple-600 border-b-2 border-purple-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Community
          </button>
        </div>
      </div>
      
      <div className="p-4">
        {displayedAnnotations.length === 0 ? (
          <div className="text-center py-8">
            <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-gray-500 font-medium mb-1">No annotations yet</h3>
            <p className="text-sm text-gray-400">
              {filter === 'mine' 
                ? "You haven't added any notes to this book." 
                : filter === 'community'
                  ? "No community annotations available."
                  : "No annotations available for this book."}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {displayedAnnotations.map((annotation) => (
              <div key={annotation.id} className="border rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    {annotation.isPrivate ? (
                      <User className="h-4 w-4 text-gray-400 mr-1" />
                    ) : (
                      <Globe className="h-4 w-4 text-purple-500 mr-1" />
                    )}
                    <span className="text-sm font-medium">
                      {annotation.isPrivate ? 'Private Note' : 'Shared Note'}
                    </span>
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar className="h-3 w-3 mr-1" />
                    {formatDate(annotation.createdAt)}
                  </div>
                </div>
                <div className="bg-yellow-50 p-2 rounded mb-2 text-sm italic">
                  "{annotation.highlight}"
                </div>
                <p className="text-sm text-gray-700">{annotation.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}