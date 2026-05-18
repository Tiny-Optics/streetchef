import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const PaymentInfo: React.FC = () => {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
  };

  const handleContinue = () => {
    setShowSuccess(false);
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col px-6 py-8 relative">
      <div className="flex items-center mb-8">
        <button 
          onClick={() => navigate(-1)}
          className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-900 mr-4"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-gray-900 flex-1 text-center pr-16">Add Card</h1>
      </div>

      <div className="bg-[#1A1A24] rounded-3xl p-6 text-white mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl translate-y-1/4 -translate-x-1/4"></div>
        
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-8">
            <div>
              <p className="text-sm text-gray-300 mb-1">Current Balance</p>
              <h2 className="text-3xl font-bold">R4,570,80</h2>
            </div>
            <svg width="48" height="36" viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="10" cy="12" r="10" fill="#EB001B"/>
              <circle cx="22" cy="12" r="10" fill="#F79E1B"/>
              <path d="M16 21.5333C18.1333 19.5333 19.3333 16.8667 19.3333 12C19.3333 7.13333 18.1333 4.46667 16 2.46667C13.8667 4.46667 12.6667 7.13333 12.6667 12C12.6667 16.8667 13.8667 19.5333 16 21.5333Z" fill="#FF5F00"/>
              <text x="16" y="28" fill="white" fontSize="6" textAnchor="middle" fontFamily="sans-serif">mastercard</text>
            </svg>
          </div>
          
          <div className="flex justify-between items-end">
            <p className="font-mono tracking-widest text-gray-200">5294 2436 4780 9568</p>
            <p className="text-sm text-gray-300">12/24</p>
          </div>
        </div>
      </div>

      <form className="space-y-5 flex-1" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">Card Holder Name</label>
          <input
            type="text"
            placeholder="Enter name"
            className="w-full px-4 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">Card Number</label>
          <input
            type="text"
            placeholder="Enter card number"
            className="w-full px-4 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">CVV</label>
            <input
              type="text"
              placeholder="Cvv"
              maxLength={3}
              className="w-full px-4 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Expire Date</label>
            <input
              type="text"
              placeholder="Date"
              className="w-full px-4 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              required
            />
          </div>
        </div>

        <div className="mt-auto pt-8">
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-4 rounded-full font-bold text-lg shadow-lg shadow-orange-500/30"
          >
            Continue
          </button>
        </div>
      </form>

      <AnimatePresence>
        {showSuccess && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-sm bg-white rounded-3xl p-8 z-50 flex flex-col items-center text-center"
            >
              <div className="w-24 h-24 bg-orange-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-orange-500/30">
                <Check size={48} className="text-white" strokeWidth={3} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Successfully Add Card</h2>
              <p className="text-gray-500 mb-8">
                Your card has been successfully added to the system
              </p>
              <button 
                onClick={handleContinue}
                className="w-full bg-orange-500 text-white py-4 rounded-full font-bold text-lg shadow-lg shadow-orange-500/30"
              >
                Continue
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
