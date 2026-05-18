import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const NewPassword: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleCreatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccessModal(true);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col px-6 py-8 relative">
      <button 
        onClick={() => navigate(-1)}
        className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-900 mb-8"
      >
        <ArrowLeft size={24} />
      </button>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">New Password</h1>
      <p className="text-gray-500 mb-8 leading-relaxed">
        Create a new password that is safe and easy to remember
      </p>

      <form className="space-y-5 flex-1" onSubmit={handleCreatePassword}>
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">New Password</label>
          <div className="relative">
            <input
              type={showPassword1 ? 'text' : 'password'}
              placeholder="Enter new password"
              className="w-full px-4 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword1(!showPassword1)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword1 ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">Confirm New password</label>
          <div className="relative">
            <input
              type={showPassword2 ? 'text' : 'password'}
              placeholder="Confirm new password"
              className="w-full px-4 py-4 bg-white border border-orange-500 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword2(!showPassword2)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword2 ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>
        </div>

        <div className="mt-auto pt-8 absolute bottom-8 left-6 right-6">
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-4 rounded-full font-bold text-lg shadow-lg shadow-orange-500/30"
          >
            Create New Password
          </button>
        </div>
      </form>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            />
            <div className="fixed inset-0 flex items-center justify-center z-50 px-6">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="bg-white rounded-3xl p-8 w-full max-w-sm text-center shadow-2xl"
              >
                <div className="w-24 h-24 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                  <Check size={48} className="text-white" strokeWidth={3} />
                  {/* Decorative dots */}
                  <div className="absolute -top-2 -left-2 w-3 h-3 bg-orange-500 rounded-full"></div>
                  <div className="absolute top-4 -right-4 w-2 h-2 bg-orange-500 rounded-full"></div>
                  <div className="absolute -bottom-2 right-2 w-3 h-3 bg-orange-500 rounded-full"></div>
                  <div className="absolute bottom-4 -left-4 w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                  <div className="absolute top-0 right-0 text-orange-500 text-lg font-bold">+</div>
                  <div className="absolute bottom-0 left-0 text-orange-500 text-lg font-bold">+</div>
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Password Changed!</h2>
                <p className="text-gray-500 mb-8">
                  Your password has been successfully updated. You can now log in with your new password.
                </p>
                
                <button
                  onClick={() => navigate('/login')}
                  className="w-full bg-orange-500 text-white py-4 rounded-full font-bold text-lg shadow-lg shadow-orange-500/30"
                >
                  Login Now
                </button>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
