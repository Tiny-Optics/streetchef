import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Edit2, Trash2, Search } from 'lucide-react';

export const MerchantMenu: React.FC = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Mains', 'Sides', 'Desserts', 'Drinks'];

  const menuItems = [
    { id: 1, name: 'Spicy Chicken Wings', category: 'Mains', price: 85.00, available: true, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=200' },
    { id: 2, name: 'Beef Burger Combo', category: 'Mains', price: 120.00, available: true, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=200' },
    { id: 3, name: 'Malva Pudding', category: 'Desserts', price: 45.00, available: true, image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&q=80&w=200' },
    { id: 4, name: 'French Fries', category: 'Sides', price: 30.00, available: false, image: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&q=80&w=200' },
  ];

  const filteredItems = activeCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white px-6 pt-12 pb-4 shadow-sm sticky top-0 z-20">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <button 
              onClick={() => navigate('/merchant/dashboard')}
              className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-900 mr-4"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Menu Manager</h1>
          </div>
          <button className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-orange-500/30">
            <Plus size={20} />
          </button>
        </div>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search menu items" 
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full whitespace-nowrap font-medium text-sm transition-colors ${
                activeCategory === category 
                  ? 'bg-gray-900 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 flex-1 overflow-y-auto">
        <div className="space-y-4">
          {filteredItems.map(item => (
            <div key={item.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center">
              <div className="w-20 h-20 rounded-xl overflow-hidden mr-4 shrink-0">
                <img src={item.image} alt={item.name} className={`w-full h-full object-cover ${!item.available && 'grayscale opacity-50'}`} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className={`font-bold text-gray-900 ${!item.available && 'text-gray-400'}`}>{item.name}</h3>
                  <p className={`font-bold ${!item.available ? 'text-gray-400' : 'text-gray-900'}`}>R {item.price.toFixed(2)}</p>
                </div>
                <p className="text-sm text-gray-500 mb-2">{item.category}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                    item.available ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {item.available ? 'Available' : 'Sold Out'}
                  </span>
                  <div className="flex space-x-2">
                    <button className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200">
                      <Edit2 size={14} />
                    </button>
                    <button className="w-8 h-8 bg-red-50 rounded-full flex items-center justify-center text-red-500 hover:bg-red-100">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
