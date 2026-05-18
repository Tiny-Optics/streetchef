import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { motion, AnimatePresence } from 'motion/react';

export const Cart: React.FC = () => {
  const { cart, updateQuantity, removeFromCart } = useAppContext();
  const navigate = useNavigate();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 0 ? (subtotal > 20 ? 0 : 3.99) : 0;
  const total = subtotal + deliveryFee;

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-full p-6 text-center">
        <div className="w-48 h-48 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <img src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png" alt="Empty Cart" className="w-24 h-24 opacity-50" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/menu" className="bg-orange-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg shadow-orange-500/30">
          Start Ordering
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full bg-gray-50 pb-24">
      <div className="bg-white px-4 pt-6 pb-4 sticky top-0 z-10 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">Your Cart</h1>
      </div>

      <div className="p-4 space-y-4">
        <AnimatePresence>
          {cart.map(item => (
            <motion.div 
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
              className="bg-white rounded-2xl p-3 flex shadow-sm"
            >
              <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover" />
              <div className="ml-4 flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-gray-900 line-clamp-1">{item.name}</h4>
                    <p className="text-orange-500 font-bold mt-1">R{item.price.toFixed(2)}</p>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-1"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center bg-gray-100 rounded-full p-1">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-7 h-7 bg-white rounded-full flex items-center justify-center text-gray-600 shadow-sm"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center font-medium text-sm">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-7 h-7 bg-orange-500 rounded-full flex items-center justify-center text-white shadow-sm"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-auto bg-white p-6 rounded-t-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>R{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Delivery Fee</span>
            <span>{deliveryFee === 0 ? <span className="text-orange-500 font-medium">Free</span> : `R${deliveryFee.toFixed(2)}`}</span>
          </div>
          <div className="h-px bg-gray-200 w-full my-2"></div>
          <div className="flex justify-between text-lg font-bold text-gray-900">
            <span>Total</span>
            <span>R{total.toFixed(2)}</span>
          </div>
        </div>

        <button 
          onClick={() => navigate('/checkout')}
          className="w-full bg-orange-500 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-orange-500/30 flex items-center justify-center"
        >
          <span>Proceed to Checkout</span>
          <ArrowRight size={20} className="ml-2" />
        </button>
      </div>
    </div>
  );
};
