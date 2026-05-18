import React from 'react';
import { motion } from 'motion/react';

export const Splash: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-5xl font-bold text-gray-900 mb-2 tracking-tight">StreetChef</h1>
        <p className="text-gray-600 text-lg">A taste of home</p>
      </motion.div>
    </div>
  );
};
