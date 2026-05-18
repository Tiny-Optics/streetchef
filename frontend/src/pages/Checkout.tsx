import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Minus, Plus } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export const Checkout: React.FC = () => {
  const { cart, addresses, clearCart, addOrder, updateQuantity } = useAppContext();
  const defaultAddress = addresses.find((a) => a.isDefault) ?? addresses[0];
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(cart[0]?.id);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = 5;
  const discount = 0;
  const total = subtotal + tax - discount;

  const [placing, setPlacing] = useState(false);

  const handlePlaceOrder = async () => {
    setPlacing(true);
    try {
      await addOrder({
        status: 'preparing',
        total,
        items: [...cart],
      });
      clearCart();
      navigate('/order-success');
    } catch {
      alert('Failed to place order. Please try again.');
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white pb-64">
      <div className="bg-white px-4 pt-6 pb-4 sticky top-0 z-10 flex items-center mb-4">
        <button 
          onClick={() => navigate(-1)}
          className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-900 mr-4"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-gray-900 flex-1 text-center pr-16">Checkout</h1>
      </div>

      <div className="px-4 space-y-4">
        {cart.map(item => (
          <div 
            key={item.id}
            onClick={() => setSelectedItem(item.id)}
            className={`bg-gray-100 p-3 rounded-2xl flex items-center cursor-pointer transition-colors ${
              selectedItem === item.id ? 'border-2 border-transparent' : 'border-2 border-transparent'
            }`}
          >
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 ${
              selectedItem === item.id ? 'border-gray-900' : 'border-gray-300 bg-white'
            }`}>
              {selectedItem === item.id && <div className="w-3 h-3 bg-gray-900 rounded-full" />}
            </div>
            
            <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover mr-4" />
            
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900">{item.name}</h4>
              <p className="text-sm text-gray-500 mb-2">Pizza</p>
              <span className="font-bold text-gray-900">R{item.price.toFixed(2)}</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <button 
                onClick={(e) => { e.stopPropagation(); updateQuantity(item.id, Math.max(1, item.quantity - 1)); }}
                className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 bg-white"
              >
                <Minus size={14} />
              </button>
              <span className="font-medium text-gray-900 w-4 text-center">{item.quantity.toString().padStart(2, '0')}</span>
              <button 
                onClick={(e) => { e.stopPropagation(); updateQuantity(item.id, item.quantity + 1); }}
                className="w-6 h-6 rounded-full bg-gray-900 flex items-center justify-center text-white"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="px-4 mt-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-900">Address</h3>
          <button onClick={() => navigate('/address-selection')} className="text-orange-500 text-sm font-medium">Edit</button>
        </div>
        <div className="flex items-center">
          <div className="w-16 h-16 bg-gray-200 rounded-xl overflow-hidden mr-4">
            <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=200" alt="Map" className="w-full h-full object-cover opacity-50 grayscale" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 text-lg">{defaultAddress?.title ?? 'Add address'}</h4>
            <p className="text-gray-500 text-sm">{defaultAddress?.address ?? 'Select a delivery address'}</p>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[2.5rem] p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-20">
        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-gray-500 font-medium">
            <span>Order Amount</span>
            <span className="text-gray-900">R{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-500 font-medium">
            <span>Tax</span>
            <span className="text-gray-900">R{tax}</span>
          </div>
          <div className="flex justify-between text-gray-500 font-medium">
            <span>Discount</span>
            <span className="text-gray-900">R{discount}</span>
          </div>
        </div>
        
        <div className="border-t border-dashed border-gray-200 pt-6 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold text-gray-900">Total Payment</span>
            <span className="text-xl font-bold text-gray-900">R{total.toFixed(2)}</span>
          </div>
        </div>

        <button 
          onClick={handlePlaceOrder}
          disabled={cart.length === 0 || placing}
          className="w-full bg-orange-500 text-white py-4 rounded-full font-bold text-lg shadow-lg shadow-orange-500/30 disabled:opacity-50"
        >
          {placing ? 'Placing order...' : 'Place Order (pay on delivery)'}
        </button>
      </div>
    </div>
  );
};
