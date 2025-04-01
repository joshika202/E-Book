import React from 'react';
import { Book, Users, Globe, Shield } from 'lucide-react';

export default function About() {
  return (
    <div className="space-y-12">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About BookVerse</h1>
        <p className="text-xl text-gray-600">
          We're on a mission to make quality literature accessible to everyone, everywhere.
          Through our platform, we combine traditional reading with modern technology to create
          an immersive and enriching reading experience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
          <Book className="h-12 w-12 text-purple-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Vast Library</h3>
          <p className="text-gray-600">Over 1 million books across all genres and languages</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
          <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Global Community</h3>
          <p className="text-gray-600">Join millions of readers from around the world</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
          <Globe className="h-12 w-12 text-purple-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Accessibility</h3>
          <p className="text-gray-600">Read anywhere, anytime, on any device</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
          <Shield className="h-12 w-12 text-purple-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Secure Platform</h3>
          <p className="text-gray-600">Your data and privacy are our top priority</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="p-8 lg:p-12">
            <h2 className="text-3xl font-bold mb-4">Our Story</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Founded in 2025, BookVerse emerged from a simple idea: to create a platform
                that makes reading more accessible and engaging in the digital age.
              </p>
              <p>
                We believe that everyone should have access to quality literature, regardless
                of their location or circumstances. Our innovative features, like AI audio
                reading and social reading groups, help make reading more interactive and
                enjoyable.
              </p>
              <p>
                Today, we're proud to serve millions of readers worldwide, offering both
                classic literature and contemporary works in multiple formats.
              </p>
            </div>
          </div>
          <div className="relative h-64 lg:h-auto">
            <img
              src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
              alt="Library interior"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}