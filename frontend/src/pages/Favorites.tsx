import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Favorites: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-full bg-gray-50 pb-24">
      <div className="bg-white px-4 pt-6 pb-4 sticky top-0 z-10 shadow-sm flex items-center">
        <button onClick={() => navigate(-1)} className="mr-4 text-gray-900">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-gray-900">Favorites</h1>
      </div>
      <div className="p-4 flex flex-col items-center justify-center flex-1 mt-20">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">No Favorites Yet</h2>
        <p className="text-gray-500 text-center max-w-xs">
          Hit the heart icon on your favorite items to save them here.
        </p>
      </div>
    </div>
  );
};
