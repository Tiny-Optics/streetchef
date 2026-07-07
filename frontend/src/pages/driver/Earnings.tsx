import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {ArrowLeft, TrendingUp, DollarSign, Clock} from 'lucide-react';
import {useAppContext} from '../../context/AppContext';
import {api, type DriverEarnings as DriverEarningsData} from '../../lib/api';

export const DriverEarnings: React.FC = () => {
  const navigate = useNavigate();
  const {user} = useAppContext();
  const backPath = user?.role === 'merchant' ? '/merchant/dashboard' : '/driver/home';
  const [earnings, setEarnings] = useState<DriverEarningsData | null>(null);

  useEffect(() => {
    if (user?.role === 'driver') {
      api.driver.earnings().then(setEarnings).catch(() => setEarnings(null));
    }
  }, [user?.role]);

  const today = earnings?.todayEarnings ?? 0;
  const week = earnings?.weekEarnings ?? 0;
  const trips = earnings?.trips ?? [];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white px-6 pt-12 pb-6 shadow-sm">
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => navigate(backPath)}
            className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-900 mr-4"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Earnings</h1>
        </div>
      </div>

      <div className="p-6 flex-1 overflow-y-auto">
        <motionlessNotice />

        <div className="bg-orange-500 rounded-3xl p-6 text-white mb-8 shadow-lg shadow-orange-500/20">
          <p className="text-orange-100 font-medium mb-1">Today&apos;s Earnings</p>
          <h2 className="text-4xl font-bold mb-6">R {today.toFixed(2)}</h2>
          <button
            type="button"
            disabled
            className="w-full bg-white text-orange-500 py-3 rounded-xl font-bold opacity-60 cursor-not-allowed"
          >
            Cash Out (unavailable)
          </button>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-4">This Week</h3>
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mb-3">
              <TrendingUp size={20} className="text-orange-600" />
            </div>
            <p className="text-gray-500 text-sm mb-1">Total Earnings</p>
            <p className="text-xl font-bold text-gray-900">R {week.toFixed(2)}</p>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mb-3">
              <Clock size={20} className="text-orange-600" />
            </div>
            <p className="text-gray-500 text-sm mb-1">Completed Deliveries</p>
            <p className="text-xl font-bold text-gray-900">{earnings?.weekTripCount ?? 0}</p>
          </div>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Deliveries</h3>
        {trips.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No completed deliveries yet.</p>
        ) : (
          <div className="space-y-4">
            {trips.map((trip) => (
              <motionlessTrip key={trip.id} trip={trip} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

function motionlessNotice() {
  return (
    <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-2xl text-amber-900 text-sm">
      Payouts are read-only. Earnings are estimated from completed deliveries (15% of order total).
    </div>
  );
}

function motionlessTrip({trip}: {trip: {id: string; date: string; amount: number}}) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center">
      <div className="flex items-center">
        <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mr-4">
          <DollarSign size={20} className="text-gray-600" />
        </div>
        <div>
          <p className="font-bold text-gray-900">{new Date(trip.date).toLocaleString()}</p>
          <p className="text-sm text-gray-500">{trip.id}</p>
        </div>
      </div>
      <p className="font-bold text-gray-900">R {trip.amount.toFixed(2)}</p>
    </div>
  );
}
