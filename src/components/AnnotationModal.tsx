import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useStore } from '../store/useStore';

interface AnnotationModalProps {
  selectedText: string;
  bookId: string;
  chapterId: string;
  position: number;
  onClose: () => void;
}

export default function AnnotationModal({ 
  selectedText, 
  bookId, 
  chapterId, 
  position, 
  onClose 
}: AnnotationModalProps) {
  const [note, setNote] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  
  const { addAnnotation } = useStore();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addAnnotation(
      bookId,
      chapterId,
      note,
      selectedText,
      position,
      isPrivate
    );
    
    onClose();
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">Add Annotation</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Selected Text
            </label>
            <div className="p-3 bg-gray-50 rounded-md border border-gray-200 text-gray-700">
              "{selectedText}"
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-1">
              Your Note
            </label>
            <textarea
              id="note"
              rows={4}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add your thoughts, questions, or insights..."
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={isPrivate}
                onChange={(e) => setIsPrivate(e.target.checked)}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">
                Keep this annotation private
              </span>
            </label>
            <p className="mt-1 text-xs text-gray-500">
              {isPrivate 
                ? "Only you will be able to see this annotation." 
                : "This annotation will be visible to other readers in the community."}
            </p>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-purple-600 hover:bg-purple-700"
            >
              Save Annotation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}