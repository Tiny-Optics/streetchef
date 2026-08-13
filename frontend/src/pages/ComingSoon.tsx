import React from 'react';
import {Link, Navigate, useNavigate} from 'react-router-dom';
import {BrandLogo} from '../components/BrandLogo';
import {useAppContext} from '../context/AppContext';
import {isStreetChefRole} from '../lib/coming-soon';

export const ComingSoon: React.FC = () => {
  const navigate = useNavigate();
  const {user, authLoading, logout} = useAppContext();

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (user && isStreetChefRole(user.role)) {
    return <Navigate to="/merchant/dashboard" replace />;
  }

  const handleLogout = async () => {
    await logout(() => navigate('/'));
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-16">
      <BrandLogo size="lg" className="mb-10" />
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
        Coming soon
      </h1>
      <p className="text-gray-600 text-center max-w-md mb-10 leading-relaxed">
        Ordering and delivery are not available yet. StreetChefs can still sign in
        and run their kitchens — eaters and drivers are on the way.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
        {user ? (
          <button
            type="button"
            onClick={handleLogout}
            className="w-full bg-gray-100 text-gray-900 py-4 rounded-full font-bold text-lg hover:bg-gray-200 transition-colors"
          >
            Log out
          </button>
        ) : (
          <>
            <Link
              to="/"
              className="w-full bg-gray-100 text-gray-900 py-4 rounded-full font-bold text-lg hover:bg-gray-200 transition-colors text-center"
            >
              Back to home
            </Link>
            <Link
              to="/signup?type=merchant"
              className="w-full bg-orange-500 text-white py-4 rounded-full font-bold text-lg hover:bg-orange-600 transition-colors text-center"
            >
              Become a StreetChef
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
