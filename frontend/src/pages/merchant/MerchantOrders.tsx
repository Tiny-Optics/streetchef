import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {ArrowLeft, Search, Filter, Clock} from 'lucide-react';
import {useAppContext} from '../../context/AppContext';
import {formatMerchantOrder, type MerchantOrder} from '../../lib/api';
import type {Order} from '../../context/AppContext';

export const MerchantOrders: React.FC = () => {
  const navigate = useNavigate();
  const {orders, refreshUserData, updateOrderStatus} = useAppContext();
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');
  const [search, setSearch] = useState('');
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    refreshUserData();
  }, [refreshUserData]);

  const merchantOrders = orders.map(formatMerchantOrder);
  const activeOrders = merchantOrders.filter((o) => !['Delivered', 'Arrived'].includes(o.status));
  const completedOrders = merchantOrders.filter((o) => ['Delivered', 'Arrived'].includes(o.status));
  const displayOrders = (activeTab === 'active' ? activeOrders : completedOrders).filter(
    (o) =>
      !search ||
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.items.toLowerCase().includes(search.toLowerCase()),
  );

  const handleStatus = async (orderId: string, next: Order['status']) => {
    setUpdating(orderId);
    try {
      await updateOrderStatus(orderId, next);
    } finally {
      setUpdating(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white px-6 pt-12 pb-4 shadow-sm sticky top-0 z-20">
        <div className="flex items-center mb-6">
          <button
            type="button"
            onClick={() => navigate('/merchant/dashboard')}
            className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-900 mr-4"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
        </div>

        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => setActiveTab('active')}
            className={`flex-1 py-2 text-center font-bold border-b-2 transition-colors ${
              activeTab === 'active' ? 'border-orange-500 text-orange-500' : 'border-transparent text-gray-500'
            }`}
          >
            Active
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('completed')}
            className={`flex-1 py-2 text-center font-bold border-b-2 transition-colors ${
              activeTab === 'completed' ? 'border-orange-500 text-orange-500' : 'border-transparent text-gray-500'
            }`}
          >
            Completed
          </button>
        </div>
      </div>

      <div className="p-6 flex-1 overflow-y-auto">
        <div className="flex space-x-2 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search order ID or items"
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <button
            type="button"
            className="w-12 h-12 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-gray-700"
          >
            <Filter size={20} />
          </button>
        </div>

        {displayOrders.length === 0 ? (
          <p className="text-gray-500 text-center py-12">No orders in this tab.</p>
        ) : (
          <div className="space-y-4">
            {displayOrders.map((order) => (
              <div key={order.id}>
                <OrderCard
                  order={order}
                  activeTab={activeTab}
                  updating={updating === order.id}
                  onStatus={handleStatus}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

function OrderCard({
  order,
  activeTab,
  updating,
  onStatus,
}: {
  order: MerchantOrder;
  activeTab: 'active' | 'completed';
  updating: boolean;
  onStatus: (id: string, status: Order['status']) => void;
}) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="flex items-center mb-1">
            <span className="font-bold text-gray-900 text-lg mr-2">{order.id}</span>
            <span
              className={`text-xs font-bold px-2 py-1 rounded-full ${
                order.status === 'New'
                  ? 'bg-red-100 text-red-700'
                  : order.status === 'Preparing'
                    ? 'bg-orange-100 text-orange-700'
                    : order.status === 'Ready for Pickup'
                      ? 'bg-gray-100 text-gray-700'
                      : 'bg-orange-100 text-orange-700'
              }`}
            >
              {order.status}
            </span>
          </div>
          <p className="text-sm text-gray-500 flex items-center">
            <Clock size={14} className="mr-1" /> {new Date(order.date).toLocaleString()}
          </p>
        </div>
        <p className="font-bold text-gray-900">R {order.total.toFixed(2)}</p>
      </div>

      <div className="border-t border-b border-gray-50 py-3 my-3">
        <p className="text-gray-700 font-medium">{order.items}</p>
        <p className="text-sm text-gray-500 mt-1">Customer: {order.customer}</p>
      </div>

      {activeTab === 'active' && (
        <div className="flex space-x-3 mt-4">
          {order.status === 'Preparing' && (
            <button
              type="button"
              disabled={updating}
              onClick={() => onStatus(order.id, 'delivering')}
              className="flex-1 bg-gray-900 text-white py-3 rounded-xl font-bold hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              Mark Ready for Pickup
            </button>
          )}
          {order.status === 'Ready for Pickup' && (
            <button
              type="button"
              disabled={updating}
              onClick={() => onStatus(order.id, 'completed')}
              className="flex-1 bg-orange-500 text-white py-3 rounded-xl font-bold disabled:opacity-50"
            >
              Mark Completed
            </button>
          )}
        </div>
      )}
    </div>
  );
}
