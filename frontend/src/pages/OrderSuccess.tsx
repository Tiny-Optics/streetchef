import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import { motion } from 'motion/react';

type OrderSuccessState = {
  orderId?: string;
};

export const OrderSuccess: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const orderId = (location.state as OrderSuccessState | null)?.orderId;

  return (
    <div className="min-h-screen bg-orange-500 flex flex-col px-6 py-8 relative overflow-hidden">
      <div className="flex items-center mb-8 relative z-10">
        <button
          type="button"
          onClick={() => navigate('/home', { replace: true })}
          className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-900 mr-4"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-white flex-1 text-center pr-16">Checkout</h1>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative z-10 -mt-20">
        <div className="relative mb-8">
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
          Happy! Your food will be made immediately and we will send it after it&apos;s finished by the courier.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="w-full max-w-xs space-y-3"
        >
          {orderId ? (
            <button
              type="button"
              onClick={() => navigate(`/tracking/${orderId}`, { replace: true })}
              className="w-full bg-white text-orange-500 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-gray-50 transition-colors"
            >
              Track Order
            </button>
          ) : (
            <p className="text-white/80 text-center text-sm mb-2">
              Track this order from My Orders once it appears in your list.
            </p>
          )}
          <button
            type="button"
            onClick={() => navigate('/my-order')}
            className="w-full bg-white/20 text-white px-8 py-4 rounded-full font-bold text-lg border border-white/40 hover:bg-white/30 transition-colors"
          >
            View My Orders
          </button>
          <button
            type="button"
            onClick={() => navigate('/home', { replace: true })}
            className="w-full text-white/90 py-2 text-sm font-medium"
          >
            Back to Home
          </button>
        </motion.div>
      </div>
    </div>
  );
};
