import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Star, Heart } from 'lucide-react';
import { menuItems } from '../data/menu';
import { motion } from 'motion/react';

const categoryIcons: Record<string, string> = {
  'Pizza': '🍕',
  'Burgers': '🍔',
  'Cookies': '🍪',
  'Pastry': '🥐',
  'Asian': '🍜',
  'Desserts': '🍰',
  'Drinks': '🥤',
  'Healthy': '🥗',
  'Mexican': '🌮',
};

export const Home: React.FC = () => {
  const popularItems = menuItems.filter(item => item.popular);
  const newItems = menuItems.slice(5, 10);
  const allItems = menuItems;

  return (
    <div className="flex flex-col min-h-full pb-24 bg-white">
      {/* Header */}
      <header className="bg-white px-4 pt-6 pb-4 sticky top-0 z-10">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-sm text-gray-500">Delivering to</p>
            <Link to="/choose-location" className="flex items-center text-gray-900 font-semibold hover:text-orange-500 transition-colors">
              <MapPin size={16} className="text-orange-500 mr-1" />
              <span>12 Long Street, Cape Town</span>
            </Link>
          </div>
          <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" className="w-full h-full object-cover" />
          </div>
        </div>
      </header>

      {/* Banner */}
      <div className="px-4 mt-2">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl text-white relative overflow-hidden h-48"
        >
          <img 
            src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800" 
            alt="Pizza" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>
          <div className="relative z-10 p-6 flex flex-col h-full justify-center w-2/3">
            <h2 className="text-2xl font-bold mb-4 leading-tight">UP TO 30% OFF<br/>ON FIRST ORDER</h2>
            <Link to="/menu" className="bg-white text-gray-900 px-5 py-2 rounded-full text-sm font-bold inline-block w-max">
              Order Now
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Categories */}
      <div className="mt-6">
        <div className="flex overflow-x-auto px-4 pb-2 space-x-3 hide-scrollbar">
          {['Pizza', 'Burgers', 'Asian', 'Healthy', 'Mexican', 'Desserts', 'Drinks'].map((category, index) => (
            <Link 
              key={category} 
              to={`/menu?category=${category}`}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-full whitespace-nowrap ${
                index === 0 ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-900'
              }`}
            >
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-xs shadow-sm">
                {categoryIcons[category]}
              </div>
              <span className="text-sm font-medium">{category}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Kitchen near you (Horizontal Scroll) */}
      <div className="mt-8">
        <div className="flex justify-between items-center px-4 mb-4">
          <h3 className="text-lg font-bold text-gray-900">Kitchen near you</h3>
          <Link to="/menu" className="text-orange-500 text-sm font-medium">
            See All
          </Link>
        </div>
        <div className="flex overflow-x-auto px-4 pb-4 space-x-4 hide-scrollbar">
          {popularItems.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="min-w-[280px] w-[280px]"
            >
              <Link to={`/item/${item.id}`} className="block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="relative h-40">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
                    10% Off
                  </div>
                  <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-400 hover:text-red-500">
                    <Heart size={16} />
                  </button>
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">{item.name}</h4>
                  <div className="flex items-center text-xs text-gray-500 mb-2">
                    <Clock size={14} className="mr-1" />
                    <span>{item.prepTime} • 1.3 km</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-500">
                      <Star size={14} className="text-yellow-400 fill-current mr-1" />
                      <span className="font-medium text-orange-500 mr-1">{item.rating}</span>
                      <span>({item.reviews} Reviews)</span>
                    </div>
                    <span className="font-bold text-gray-900">R{item.price.toFixed(2)}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* New on Street Chef (Horizontal Scroll) */}
      <div className="mt-6">
        <div className="flex justify-between items-center px-4 mb-4">
          <h3 className="text-lg font-bold text-gray-900">New on Street Chef</h3>
          <Link to="/menu" className="text-orange-500 text-sm font-medium">
            See All
          </Link>
        </div>
        <div className="flex overflow-x-auto px-4 pb-4 space-x-4 hide-scrollbar">
          {newItems.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="min-w-[200px] w-[200px]"
            >
              <Link to={`/item/${item.id}`} className="block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="relative h-28">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
                    New
                  </div>
                </div>
                <div className="p-3">
                  <h4 className="font-semibold text-gray-900 text-sm mb-1 truncate">{item.name}</h4>
                  <div className="flex items-center text-xs text-gray-500 mb-2">
                    <Clock size={12} className="mr-1" />
                    <span>{item.prepTime}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-900 text-sm">R{item.price.toFixed(2)}</span>
                    <div className="flex items-center text-xs text-gray-500">
                      <Star size={12} className="text-yellow-400 fill-current mr-1" />
                      <span className="font-medium text-gray-900">{item.rating}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* All Restaurants (Vertical List) */}
      <div className="mt-6 px-4">
        <h3 className="text-lg font-bold text-gray-900 mb-4">All Restaurants</h3>
        <div className="space-y-4">
          {allItems.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link to={`/item/${item.id}`} className="flex bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="w-1/3 relative">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  {item.popular && (
                    <div className="absolute top-2 left-2 bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                      Popular
                    </div>
                  )}
                </div>
                <div className="w-2/3 p-3 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-semibold text-gray-900 text-sm line-clamp-1">{item.name}</h4>
                      <button className="text-gray-400 hover:text-red-500">
                        <Heart size={16} />
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 line-clamp-1 mb-2">{item.description}</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center text-xs text-gray-500 mb-1">
                      <Star size={12} className="text-yellow-400 fill-current mr-1" />
                      <span className="font-medium text-gray-900 mr-1">{item.rating}</span>
                      <span>({item.reviews})</span>
                      <span className="mx-1">•</span>
                      <Clock size={12} className="mr-1" />
                      <span>{item.prepTime}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{item.category}</span>
                      <span className="font-bold text-gray-900">R{item.price.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
