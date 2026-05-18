import React, { useState, useMemo } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Search, Star, Plus, ArrowLeft, SlidersHorizontal, X, Heart, Clock } from 'lucide-react';
import { categories } from '../data/menu';
import { useMenu } from '../hooks/useMenu';
import { motion, AnimatePresence } from 'motion/react';
import { useAppContext } from '../context/AppContext';

export const Menu: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [recentSearches, setRecentSearches] = useState(['Pizza', 'Burger', 'Pastry', 'Cookies', 'Meat Church']);
  
  const { addToCart } = useAppContext();
  const { items: menuItems } = useMenu();

  const matchesSearch = (item: (typeof menuItems)[0]) => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;
    return (
      item.name.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    );
  };

  const searchResults = useMemo(
    () => menuItems.filter(matchesSearch),
    [menuItems, searchQuery],
  );

  const hotDeals = menuItems.filter((item) => item.popular && matchesSearch(item)).slice(0, 2);
  const recommended = menuItems.filter((item) => !item.popular && matchesSearch(item)).slice(0, 3);
  const isSearching = searchQuery.trim().length > 0;

  const handleRemoveRecent = (search: string) => {
    setRecentSearches(recentSearches.filter(s => s !== search));
  };

  const handleAddToCart = (e: React.MouseEvent, item: any) => {
    e.preventDefault(); // Prevent navigating to item detail
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image
    });
  };

  return (
    <div className="flex flex-col min-h-full bg-white pb-6 relative">
      <div className="bg-white px-4 pt-6 pb-4 sticky top-0 z-10">
        <div className="flex items-center mb-6">
          <button onClick={() => navigate(-1)} className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-900 mr-4">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold text-gray-900 flex-1 text-center pr-14">Search</h1>
        </div>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search size={20} className="text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-11 pr-12 py-3.5 border border-gray-200 rounded-2xl leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
            placeholder="Search for Food.."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button 
            onClick={() => setShowFilter(true)}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
          >
            <SlidersHorizontal size={20} />
          </button>
        </div>
      </div>

      <div className="px-4 mt-2">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-gray-900">Recent Search</h3>
          <button 
            onClick={() => setRecentSearches([])}
            className="text-sm font-medium text-gray-900"
          >
            Clear All
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          <AnimatePresence>
            {recentSearches.map(search => (
              <motion.div 
                key={search}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="bg-gray-100 px-4 py-2 rounded-full flex items-center"
              >
                <span className="text-sm text-gray-700 mr-2">{search}</span>
                <button onClick={() => handleRemoveRecent(search)} className="text-gray-400 hover:text-gray-600">
                  <X size={14} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {isSearching ? (
        <div className="mt-8 px-4">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Results ({searchResults.length})</h3>
          {searchResults.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No items match your search.</p>
          ) : (
            <motion.div className="space-y-4">
              {searchResults.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{opacity: 0, y: 20}}
                  animate={{opacity: 1, y: 0}}
                  transition={{delay: index * 0.05}}
                >
                  <Link
                    to={`/item/${item.id}`}
                    className="bg-white rounded-2xl p-3 flex border border-gray-100 shadow-sm"
                  >
                    <img src={item.image} alt={item.name} className="w-24 h-24 rounded-xl object-cover" />
                    <div className="ml-4 flex-1 flex flex-col justify-between py-1">
                      <div>
                        <h4 className="font-semibold text-gray-900 line-clamp-1">{item.name}</h4>
                        <p className="text-sm text-gray-500">{item.category}</p>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="font-bold text-gray-900">R{item.price.toFixed(2)}</span>
                        <button
                          onClick={(e) => handleAddToCart(e, item)}
                          className="bg-orange-500 text-white px-3 py-1.5 rounded-full text-sm font-semibold flex items-center"
                        >
                          <Plus size={16} className="mr-1" /> Add
                        </button>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      ) : (
        <>
      <div className="mt-8 px-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-900">Hot Deals 🔥</h3>
          <Link to="/menu" className="text-sm font-medium text-gray-900">See All</Link>
        </div>
        <div className="space-y-4">
          {hotDeals.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={`/item/${item.id}`} className="bg-white rounded-2xl p-3 flex border border-gray-100 shadow-sm">
                <img src={item.image} alt={item.name} className="w-24 h-24 rounded-xl object-cover" />
                <div className="ml-4 flex-1 flex flex-col justify-between py-1">
                  <div>
                    <h4 className="font-semibold text-gray-900 line-clamp-1">{item.name}</h4>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <Clock size={14} className="mr-1" />
                      <span>15-30 min • 1.3 km</span>
                    </div>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <Star size={14} className="text-yellow-400 fill-current mr-1" />
                      <span className="font-medium text-orange-500 mr-1">{item.rating}</span>
                      <span>({item.reviews} Reviews)</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-bold text-gray-900">R{item.price.toFixed(2)}</span>
                    <button 
                      onClick={(e) => handleAddToCart(e, item)}
                      className="bg-orange-500 text-white px-3 py-1.5 rounded-full text-sm font-semibold flex items-center"
                    >
                      <Plus size={16} className="mr-1" /> Add
                    </button>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <div className="flex justify-between items-center px-4 mb-4">
          <h3 className="text-lg font-bold text-gray-900">Recommended 🔥</h3>
          <Link to="/menu" className="text-sm font-medium text-gray-900">See All</Link>
        </div>
        <div className="flex overflow-x-auto px-4 pb-4 space-x-4 hide-scrollbar">
          {recommended.map((item, index) => (
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
                    <span>15-30 min • 1.3 km</span>
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
        </>
      )}

      {/* Filter Bottom Sheet */}
      <AnimatePresence>
        {showFilter && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFilter(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[2.5rem] p-6 z-50 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <button 
                  onClick={() => setShowFilter(false)}
                  className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-900"
                >
                  <X size={20} />
                </button>
                <h2 className="text-xl font-bold text-gray-900">Filter</h2>
                <div className="w-10"></div>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-4">
                    <h3 className="font-bold text-gray-900">Price Range</h3>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-gray-900 mb-2">
                    <span>R10</span>
                    <span>R500+</span>
                  </div>
                  <div className="relative h-2 bg-gray-200 rounded-full">
                    <div className="absolute left-0 right-1/4 h-full bg-orange-500 rounded-full"></div>
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-orange-500 rounded-full border-2 border-white shadow"></div>
                    <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-4 h-4 bg-orange-500 rounded-full border-2 border-white shadow translate-x-2"></div>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-4">Popular Filters</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Pizza', 'Hamburgers', 'Meat Church', 'Pastry', 'Cookies'].map((filter, index) => (
                      <button 
                        key={filter}
                        className={`px-4 py-2 rounded-full text-sm font-medium border ${
                          index === 0 ? 'border-orange-500 text-orange-500 bg-orange-50/30' : 'border-gray-200 text-gray-700'
                        }`}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-4">Payment Type</h3>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <div className="w-6 h-6 rounded-full border-2 border-orange-500 flex items-center justify-center mr-3">
                        <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                      </div>
                      <span className="text-gray-900 font-medium">Pay now</span>
                    </label>
                    <label className="flex items-center">
                      <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center mr-3">
                      </div>
                      <span className="text-gray-900 font-medium">Pay on delivery</span>
                    </label>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-4">Star Rating</h3>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button 
                        key={rating}
                        className="flex-1 py-2 border border-gray-200 rounded-xl flex items-center justify-center text-gray-900 font-medium"
                      >
                        {rating} <Star size={14} className="ml-1 text-yellow-400 fill-current" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <button 
                  onClick={() => setShowFilter(false)}
                  className="w-full bg-orange-500 text-white py-4 rounded-full font-bold text-lg shadow-lg shadow-orange-500/30"
                >
                  Apply Filter
                </button>
                <button 
                  onClick={() => setShowFilter(false)}
                  className="w-full bg-white text-orange-500 border-2 border-orange-500 py-4 rounded-full font-bold text-lg"
                >
                  Clear All
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
