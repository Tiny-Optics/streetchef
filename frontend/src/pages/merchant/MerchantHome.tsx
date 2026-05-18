import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Bell, TrendingUp, ShoppingBag, DollarSign, Clock, X, CheckCircle2, ChevronRight, FileText, User, Wallet, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAppContext } from '../../context/AppContext';
import { api } from '../../lib/api';

export const MerchantHome: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAppContext();
  const [showMenu, setShowMenu] = useState(false);
  const [dashboard, setDashboard] = useState<{
    todaySales: number;
    orderCount: number;
    activeOrders: {id: string; items: string; time: string; status: string}[];
  } | null>(null);

  useEffect(() => {
    api.merchant.dashboard().then(setDashboard).catch(() => setDashboard(null));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Navigation Bar */}
      <div className="bg-white shadow-sm px-4 py-4 flex justify-between items-center sticky top-0 z-30">
        <button 
          onClick={() => setShowMenu(true)}
          className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"
        >
          <Menu size={20} className="text-gray-900" />
        </button>
        
        <div className="flex flex-col items-center">
          <span className="font-bold text-lg text-gray-900">Dashboard</span>
        </div>

        <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center relative">
          <Bell size={20} className="text-gray-900" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-gray-100"></span>
        </button>
      </div>

      <div className="p-6 flex-1 overflow-y-auto pb-24">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Welcome back, {user?.name || 'Chef'}!</h1>
          <p className="text-gray-500">Here's what's happening with your kitchen today.</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-orange-500 rounded-3xl p-5 text-white shadow-lg shadow-orange-500/20">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mb-3">
              <DollarSign size={20} className="text-white" />
            </div>
            <p className="text-orange-100 text-sm mb-1">Today's Sales</p>
            <p className="text-2xl font-bold">R {(dashboard?.todaySales ?? 0).toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mb-3">
              <ShoppingBag size={20} className="text-orange-500" />
            </div>
            <p className="text-gray-500 text-sm mb-1">Orders</p>
            <p className="text-2xl font-bold text-gray-900">{dashboard?.orderCount ?? 0}</p>
          </div>
        </div>

        {/* Active Orders */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-900">Active Orders</h2>
            <button
              type="button"
              onClick={() => navigate('/merchant/orders')}
              className="text-orange-500 font-medium text-sm hover:underline"
            >
              View All
            </button>
          </div>
          <div className="space-y-4">
            {(dashboard?.activeOrders ?? []).map((order, i) => (
              <div key={i} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center">
                <div>
                  <div className="flex items-center mb-1">
                    <span className="font-bold text-gray-900 mr-2">{order.id}</span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                      order.status === 'New' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{order.items}</p>
                  <p className="text-xs text-gray-400 flex items-center"><Clock size={12} className="mr-1" /> {order.time}</p>
                </div>
                <button className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-900 hover:bg-gray-100">
                  <ChevronRight size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Top Selling Items */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Top Selling Items</h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {[
              { name: 'Spicy Chicken Wings', sales: 45, price: 85.00 },
              { name: 'Beef Burger Combo', sales: 32, price: 120.00 },
              { name: 'Malva Pudding', sales: 28, price: 45.00 },
            ].map((item, i) => (
              <div key={i} className="p-4 border-b border-gray-100 last:border-0 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 font-bold flex items-center justify-center text-sm mr-3">
                    {i + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.sales} orders</p>
                  </div>
                </div>
                <p className="font-bold text-gray-900">R {item.price.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Side Menu */}
      <AnimatePresence>
        {showMenu && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMenu(false)}
              className="fixed inset-0 bg-black/50 z-40"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-4/5 max-w-sm bg-white z-50 flex flex-col"
            >
              <div className="p-6 bg-gray-900 text-white">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-16 h-16 bg-gray-700 rounded-full overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=150" alt="Chef" className="w-full h-full object-cover" />
                  </div>
                  <button onClick={() => setShowMenu(false)} className="text-gray-400 hover:text-white">
                    <X size={24} />
                  </button>
                </div>
                <h2 className="text-2xl font-bold">{user?.name || 'Mama\'s Kitchen'}</h2>
                <div className="flex items-center mt-2 text-sm text-gray-300">
                  <span className="flex items-center"><span className="text-yellow-400 mr-1">★</span> 4.8</span>
                  <span className="mx-2">•</span>
                  <span className="text-orange-400 flex items-center"><CheckCircle2 size={14} className="mr-1"/> Verified Kitchen</span>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto py-4">
                <div className="space-y-1">
                  <button 
                    onClick={() => { setShowMenu(false); navigate('/merchant/dashboard'); }}
                    className="w-full flex items-center px-6 py-4 bg-orange-50 text-orange-600 transition-colors"
                  >
                    <TrendingUp size={24} className="mr-4" />
                    <span className="text-lg font-bold flex-1 text-left">Dashboard</span>
                  </button>
                  <button 
                    onClick={() => { setShowMenu(false); navigate('/merchant/orders'); }}
                    className="w-full flex items-center px-6 py-4 hover:bg-gray-50 transition-colors"
                  >
                    <ShoppingBag size={24} className="text-gray-700 mr-4" />
                    <span className="text-lg font-medium text-gray-900 flex-1 text-left">Orders</span>
                  </button>
                  <button 
                    onClick={() => { setShowMenu(false); navigate('/merchant/menu'); }}
                    className="w-full flex items-center px-6 py-4 hover:bg-gray-50 transition-colors"
                  >
                    <FileText size={24} className="text-gray-700 mr-4" />
                    <span className="text-lg font-medium text-gray-900 flex-1 text-left">Menu Manager</span>
                  </button>
                  <button 
                    onClick={() => { setShowMenu(false); navigate('/merchant/earnings'); }}
                    className="w-full flex items-center px-6 py-4 hover:bg-gray-50 transition-colors"
                  >
                    <Wallet size={24} className="text-gray-700 mr-4" />
                    <span className="text-lg font-medium text-gray-900 flex-1 text-left">Earnings</span>
                  </button>
                  <button 
                    onClick={() => { setShowMenu(false); navigate('/merchant/account'); }}
                    className="w-full flex items-center px-6 py-4 hover:bg-gray-50 transition-colors"
                  >
                    <User size={24} className="text-gray-700 mr-4" />
                    <span className="text-lg font-medium text-gray-900 flex-1 text-left">Account</span>
                  </button>
                  <button 
                    onClick={() => { setShowMenu(false); navigate('/merchant/help'); }}
                    className="w-full flex items-center px-6 py-4 hover:bg-gray-50 transition-colors"
                  >
                    <HelpCircle size={24} className="text-gray-700 mr-4" />
                    <span className="text-lg font-medium text-gray-900 flex-1 text-left">Help</span>
                  </button>
                </div>
              </div>

              <div className="p-6 border-t border-gray-100">
                <button 
                  onClick={async () => {
                    await logout();
                    navigate('/welcome');
                  }}
                  className="w-full py-3 text-red-500 font-bold text-lg hover:bg-red-50 rounded-xl transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
