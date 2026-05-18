import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Building, Plus } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

export const DriverPayment: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAppContext();
  const backPath = user?.role === 'merchant' ? '/merchant/dashboard' : '/driver/home';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white px-6 pt-12 pb-6 shadow-sm">
        <div className="flex items-center">
          <button 
            onClick={() => navigate(backPath)}
            className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-900 mr-4"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Payment</h1>
        </div>
      </div>

      <div className="p-6 flex-1 overflow-y-auto">
        <h3 className="text-lg font-bold text-gray-900 mb-4 px-2">Payout Methods</h3>
        
        <div className="space-y-4 mb-8">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-orange-500 flex items-center justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg">
              DEFAULT
            </div>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mr-4">
                <Building size={24} className="text-gray-700" />
              </div>
              <div>
                <p className="font-bold text-gray-900">Standard Bank</p>
                <p className="text-sm text-gray-500">**** 1234</p>
              </div>
            </div>
          </div>

          <button className="w-full bg-white p-4 rounded-2xl shadow-sm border border-gray-200 border-dashed flex items-center justify-center text-orange-500 font-medium hover:bg-orange-50 transition-colors">
            <Plus size={20} className="mr-2" />
            Add Payment Method
          </button>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-4 px-2">Payout History</h3>
        <div className="space-y-4">
          {[
            { id: 1, date: 'Oct 12, 2023', amount: 1250.00, status: 'Completed' },
            { id: 2, date: 'Oct 05, 2023', amount: 980.50, status: 'Completed' },
            { id: 3, date: 'Sep 28, 2023', amount: 1120.00, status: 'Completed' },
          ].map((payout) => (
            <div key={payout.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center">
              <div>
                <p className="font-bold text-gray-900">{payout.date}</p>
                <p className="text-sm text-orange-600 font-medium">{payout.status}</p>
              </div>
              <p className="font-bold text-gray-900">R {payout.amount.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
