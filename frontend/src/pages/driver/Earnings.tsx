import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Calendar, DollarSign, Clock } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

export const DriverEarnings: React.FC = () => {
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
          <h1 className="text-2xl font-bold text-gray-900">Earnings</h1>
        </div>
      </div>

      <div className="p-6 flex-1 overflow-y-auto">
        <div className="bg-orange-500 rounded-3xl p-6 text-white mb-8 shadow-lg shadow-orange-500/20">
          <p className="text-orange-100 font-medium mb-1">Available Balance</p>
          <h2 className="text-4xl font-bold mb-6">R 420.50</h2>
          <button className="w-full bg-white text-orange-500 py-3 rounded-xl font-bold hover:bg-orange-50 transition-colors">
            Cash Out
          </button>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-4">This Week</h3>
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mb-3">
              <TrendingUp size={20} className="text-orange-600" />
            </div>
            <p className="text-gray-500 text-sm mb-1">Total Earnings</p>
            <p className="text-xl font-bold text-gray-900">R 1,250.00</p>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mb-3">
              <Clock size={20} className="text-orange-600" />
            </div>
            <p className="text-gray-500 text-sm mb-1">Online Time</p>
            <p className="text-xl font-bold text-gray-900">12h 30m</p>
          </div>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Trips</h3>
        <div className="space-y-4">
          {[
            { id: 1, date: 'Today, 2:30 PM', amount: 45.50, distance: '2.5 km' },
            { id: 2, date: 'Today, 1:15 PM', amount: 32.00, distance: '1.8 km' },
            { id: 3, date: 'Yesterday, 6:45 PM', amount: 85.00, distance: '5.2 km' },
            { id: 4, date: 'Yesterday, 5:20 PM', amount: 40.00, distance: '2.1 km' },
          ].map((trip) => (
            <div key={trip.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mr-4">
                  <DollarSign size={20} className="text-gray-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">{trip.date}</p>
                  <p className="text-sm text-gray-500">{trip.distance}</p>
                </div>
              </div>
              <p className="font-bold text-gray-900">R {trip.amount.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
