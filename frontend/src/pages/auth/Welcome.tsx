import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

export const Welcome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen w-full bg-black overflow-hidden flex flex-col">
      <motion.img
        src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800"
        alt="Welcome background"
        className="absolute inset-0 w-full h-full object-cover opacity-60"
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ duration: 0.8 }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

      <div className="relative z-10 flex flex-col h-full justify-end px-6 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
            Welcome to <span className="text-orange-500">StreetChef</span>
          </h1>
          <p className="text-gray-300 text-base leading-relaxed px-2">
            The best food delivery app in town. Get your favorite meals delivered fast and fresh.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="space-y-4"
        >
          <button
            onClick={() => navigate('/signup')}
            className="w-full bg-orange-500 text-white py-4 rounded-full font-bold text-lg shadow-lg shadow-orange-500/30 hover:bg-orange-600 transition-colors"
          >
            Create an Account
          </button>
          <button
            onClick={() => navigate('/login')}
            className="w-full bg-white text-gray-900 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-gray-100 transition-colors"
          >
            Sign In
          </button>
          
          <div className="pt-4 text-center">
            <button 
              onClick={() => navigate('/partner')}
              className="text-gray-300 hover:text-white text-sm font-medium transition-colors"
            >
              Want to partner with us? Earn with StreetChef
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
