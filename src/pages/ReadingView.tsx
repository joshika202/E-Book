import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Bookmark, MessageSquare, Share2, Settings, Edit3, ChevronLeft, ChevronRight } from 'lucide-react';
import { useStore } from '../store/useStore';
import AnnotationModal from '../components/AnnotationModal';
import AnnotationSidebar from '../components/AnnotationSidebar';

export default function ReadingView() {
  const { bookId, chapterId } = useParams();
  const { books, user, addAnnotation, getAnnotationsByBook, getPublicAnnotationsByBook } = useStore();
  
  const [showAnnotationModal, setShowAnnotationModal] = useState(false);
  const [showAnnotationSidebar, setShowAnnotationSidebar] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [selectionPosition, setSelectionPosition] = useState(0);
  const [fontSize, setFontSize] = useState(16);
  const [lineHeight, setLineHeight] = useState(1.6);
  const [theme, setTheme] = useState<'light' | 'sepia' | 'dark'>('light');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const book = books.find(b => b.id === bookId);
  const chapter = book?.sampleChapters.find(c => c.id === chapterId) || book?.sampleChapters[0];
  
  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim().length > 0) {
      setSelectedText(selection.toString());
      // This is a simplified position calculation
      setSelectionPosition(selection.anchorOffset);
    }
  };
  
  const handleAnnotate = () => {
    if (selectedText) {
      setShowAnnotationModal(true);
    }
  };
  
  const getThemeClasses = () => {
    switch (theme) {
      case 'sepia':
        return 'bg-amber-50 text-amber-900';
      case 'dark':
        return 'bg-gray-900 text-gray-100';
      default:
        return 'bg-white text-gray-900';
    }
  };

  const nextImage = () => {
    if (chapter?.images && currentImageIndex < chapter.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };
  
  if (!book || !chapter) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Content not found</h2>
        <p className="text-gray-600 mb-6">The book or chapter you're looking for doesn't exist.</p>
        <Link
          to="/categories"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Browse Books
        </Link>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Reading toolbar */}
      <div className="sticky top-0 z-10 bg-white border-b shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center">
            <Link
              to={`/book/${book.id}`}
              className="inline-flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-5 w-5 mr-1" />
              <span className="hidden sm:inline">Back to Book</span>
            </Link>
            <div className="ml-4 hidden sm:block">
              <h1 className="text-sm font-medium">{book.title}</h1>
              <p className="text-xs text-gray-500">{chapter.title}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setShowAnnotationSidebar(!showAnnotationSidebar)}
              className={`p-1.5 rounded-full ${showAnnotationSidebar ? 'bg-purple-100 text-purple-600' : 'text-gray-500 hover:text-gray-700'}`}
              title="Annotations"
            >
              <MessageSquare className="h-5 w-5" />
            </button>
            <button 
              className="p-1.5 rounded-full text-gray-500 hover:text-gray-700"
              title="Bookmark"
            >
              <Bookmark className="h-5 w-5" />
            </button>
            <button 
              className="p-1.5 rounded-full text-gray-500 hover:text-gray-700"
              title="Share"
            >
              <Share2 className="h-5 w-5" />
            </button>
            <div className="relative group">
              <button 
                className="p-1.5 rounded-full text-gray-500 hover:text-gray-700"
                title="Settings"
              >
                <Settings className="h-5 w-5" />
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg hidden group-hover:block">
                <div className="p-3 border-b">
                  <p className="text-sm font-medium mb-2">Font Size</p>
                  <div className="flex items-center justify-between">
                    <button 
                      onClick={() => setFontSize(Math.max(12, fontSize - 1))}
                      className="p-1 text-gray-500 hover:text-gray-700"
                    >
                      A-
                    </button>
                    <span className="text-sm">{fontSize}px</span>
                    <button 
                      onClick={() => setFontSize(Math.min(24, fontSize + 1))}
                      className="p-1 text-gray-500 hover:text-gray-700"
                    >
                      A+
                    </button>
                  </div>
                </div>
                <div className="p-3 border-b">
                  <p className="text-sm font-medium mb-2">Line Spacing</p>
                  <div className="flex items-center justify-between">
                    <button 
                      onClick={() => setLineHeight(Math.max(1.2, lineHeight - 0.1))}
                      className="p-1 text-gray-500 hover:text-gray-700"
                    >
                      -
                    </button>
                    <span className="text-sm">{lineHeight.toFixed(1)}</span>
                    <button 
                      onClick={() => setLineHeight(Math.min(2.5, lineHeight + 0.1))}
                      className="p-1 text-gray-500 hover:text-gray-700"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium mb-2">Theme</p>
                  <div className="flex items-center justify-between space-x-2">
                    <button 
                      onClick={() => setTheme('light')}
                      className={`w-8 h-8 rounded-full bg-white border ${theme === 'light' ? 'ring-2 ring-purple-500' : 'border-gray-300'}`}
                    ></button>
                    <button 
                      onClick={() => setTheme('sepia')}
                      className={`w-8 h-8 rounded-full bg-amber-50 border ${theme === 'sepia' ? 'ring-2 ring-purple-500' : 'border-gray-300'}`}
                    ></button>
                    <button 
                      onClick={() => setTheme('dark')}
                      className={`w-8 h-8 rounded-full bg-gray-900 border ${theme === 'dark' ? 'ring-2 ring-purple-500' : 'border-gray-300'}`}
                    ></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex-grow flex">
        {/* Reading content */}
        <div className={`flex-grow ${getThemeClasses()}`}>
          <div 
            className="max-w-2xl mx-auto px-4 py-8"
            style={{ fontSize: `${fontSize}px`, lineHeight: lineHeight }}
          >
            <h1 className="text-2xl font-bold mb-6">{chapter.title}</h1>
            
            {/* Chapter images */}
            {chapter.images && chapter.images.length > 0 && (
              <div className="mb-8 relative">
                <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                  <img 
                    src={chapter.images[currentImageIndex].url} 
                    alt={chapter.images[currentImageIndex].caption}
                    className="object-cover w-full h-full"
                  />
                </div>
                <p className="text-center text-sm mt-2 italic">
                  {chapter.images[currentImageIndex].caption}
                </p>
                
                {chapter.images.length > 1 && (
                  <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between">
                    <button 
                      onClick={prevImage}
                      className={`p-2 rounded-full bg-black bg-opacity-30 text-white ${currentImageIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-opacity-50'}`}
                      disabled={currentImageIndex === 0}
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button 
                      onClick={nextImage}
                      className={`p-2 rounded-full bg-black bg-opacity-30 text-white ${currentImageIndex === chapter.images.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-opacity-50'}`}
                      disabled={currentImageIndex === chapter.images.length - 1}
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                  </div>
                )}
                
                {chapter.images.length > 1 && (
                  <div className="flex justify-center mt-2 space-x-1">
                    {chapter.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full ${currentImageIndex === index ? 'bg-purple-600' : 'bg-gray-300'}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
            
            <div 
              onMouseUp={handleTextSelection}
              className="prose max-w-none"
            >
              {chapter.content.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4">{paragraph}</p>
              ))}
            </div>
            
            {/* Selection toolbar */}
            {selectedText && (
              <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg border p-2 flex items-center space-x-2">
                <button 
                  onClick={handleAnnotate}
                  className="p-1.5 rounded-full text-gray-700 hover:bg-gray-100"
                  title="Add annotation"
                >
                  <Edit3 className="h-5 w-5" />
                </button>
                <button 
                  className="p-1.5 rounded-full text-gray-700 hover:bg-gray-100"
                  title="Highlight"
                >
                  <span className="flex items-center justify-center w-5 h-5 bg-yellow-200 rounded">H</span>
                </button>
                <button 
                  className="p-1.5 rounded-full text-gray-700 hover:bg-gray-100"
                  title="Share"
                >
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Annotations sidebar */}
        {showAnnotationSidebar && (
          <AnnotationSidebar 
            bookId={book.id}
            onClose={() => setShowAnnotationSidebar(false)}
          />
        )}
      </div>
      
      {/* Annotation modal */}
      {showAnnotationModal && (
        <AnnotationModal
          selectedText={selectedText}
          bookId={book.id}
          chapterId={chapter.id}
          position={selectionPosition}
          onClose={() => {
            setShowAnnotationModal(false);
            setSelectedText('');
          }}
        />
      )}
    </div>
  );
}