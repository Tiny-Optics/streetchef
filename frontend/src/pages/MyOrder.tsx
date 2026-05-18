import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export const MyOrder: React.FC = () => {
  const navigate = useNavigate();
  const { orders } = useAppContext();

  return (
    <div className="flex flex-col min-h-full bg-gray-50 pb-24">
      <div className="bg-white px-4 pt-6 pb-4 sticky top-0 z-10 shadow-sm flex items-center">
        <button onClick={() => navigate(-1)} className="mr-4 text-gray-900">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-gray-900">My Orders</h1>
      </div>
      
      {orders.length === 0 ? (
        <div className="p-4 flex flex-col items-center justify-center flex-1 mt-20">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">No Orders Yet</h2>
          <p className="text-gray-500 text-center max-w-xs">
            You don't have any past orders. Start exploring our menu!
          </p>
        </div>
      ) : (
        <div className="p-4 space-y-4">
          {orders.map(order => (
            <div key={order.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-3">
                <span className="font-bold text-gray-900">{order.id}</span>
                <span className="text-sm text-gray-500">{new Date(order.date).toLocaleDateString()}</span>
              </div>
              <div className="space-y-2 mb-3">
                {order.items.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-700">{item.quantity}x {item.name}</span>
                    <span className="text-gray-900 font-medium">R{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
                <span className="text-sm font-medium capitalize text-orange-500">{order.status}</span>
                <span className="font-bold text-gray-900">Total: R{order.total.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
