import React from 'react';
import {useNavigate} from 'react-router-dom';
import {ArrowLeft} from 'lucide-react';

export const PaymentInfo: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col px-6 py-8">
      <div className="flex items-center mb-8">
        <button
          onClick={() => navigate(-1)}
          className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-900 mr-4"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-gray-900 flex-1 text-center pr-16">Add Card</h1>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <p className="text-lg font-semibold text-gray-900 mb-2">Payment not available</p>
        <p className="text-gray-500 mb-8">
          Card payments are disabled in this environment. Place orders with pay-on-delivery at checkout.
        </p>
        <button
          type="button"
          onClick={() => navigate('/checkout')}
          className="w-full bg-orange-500 text-white py-4 rounded-full font-bold text-lg"
        >
          Back to Checkout
        </button>
      </div>
    </div>
  );
};
