import React from 'react';
import { motion } from 'motion/react';
import { BrandLogo } from '../components/BrandLogo';

export const Splash: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center flex flex-col items-center"
      >
        <BrandLogo size="lg" className="mb-4 justify-center" />
        <p className="text-gray-600 text-lg">A taste of home</p>
      </motion.div>
    </div>
  );
};
