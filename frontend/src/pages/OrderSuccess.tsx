import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import { motion } from 'motion/react';

export const OrderSuccess: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto redirect to tracking after 3 seconds
    const timer = setTimeout(() => {
      navigate('/tracking', { replace: true });
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-orange-500 flex flex-col px-6 py-8 relative overflow-hidden">
      <div className="flex items-center mb-8 relative z-10">
        <button 
          onClick={() => navigate('/home', { replace: true })}
          className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-900 mr-4"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-white flex-1 text-center pr-16">Checkout</h1>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative z-10 -mt-20">
        <div className="relative mb-8">
          {/* Particles */}
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute -top-4 -left-4 w-4 h-4 bg-white rounded-full"
          />
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="absolute top-0 -right-2 w-2 h-2 bg-white/60 rounded-full"
          />
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="absolute bottom-4 -left-8 w-2 h-2 bg-white/60 rounded-full"
          />
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute -bottom-2 right-0 w-3 h-3 bg-white rounded-full"
          />
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="absolute top-1/2 -right-8 w-1.5 h-1.5 bg-white/80 rounded-full"
          />
          
          {/* Crosses */}
          <motion.div 
            initial={{ scale: 0, opacity: 0, rotate: -45 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ delay: 0.4 }}
            className="absolute top-8 -right-6 text-white/80 text-xl font-light"
          >
            +
          </motion.div>
          <motion.div 
            initial={{ scale: 0, opacity: 0, rotate: 45 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-8 -left-6 text-white/80 text-xl font-light"
          >
            +
          </motion.div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 15 }}
            className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-xl shadow-orange-600/20"
          >
            <Check size={64} className="text-orange-500" strokeWidth={3} />
          </motion.div>
        </div>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold text-white mb-4"
        >
          Order Successfully
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-white/90 text-center leading-relaxed px-4 mb-12"
        >
          Happy! Your food will be made immediately and we will send it after it's finished by the courier.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onClick={() => navigate('/tracking', { replace: true })}
          className="bg-white text-orange-500 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-gray-50 transition-colors w-full max-w-xs"
        >
          Track Order
        </motion.button>
      </div>
    </div>
  );
};
