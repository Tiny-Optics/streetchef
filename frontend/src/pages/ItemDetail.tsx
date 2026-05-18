import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Heart, Star, Clock, Minus, Plus, ShoppingCart } from 'lucide-react';
import { useMenuItem } from '../hooks/useMenu';
import { useAppContext } from '../context/AppContext';

export const ItemDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, favoriteIds, toggleFavorite } = useAppContext();
  const { item, loading } = useMenuItem(id);
  const [quantity, setQuantity] = useState(1);

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  if (!item) {
    return <div className="p-6 text-center">Item not found</div>;
  }

  const handleAddToCart = () => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity,
      image: item.image,
      options: []
    });
    navigate('/cart');
  };

  return (
    <div className="flex flex-col min-h-full bg-white pb-24 relative">
      <div className="relative h-80">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent h-24"></div>
        
        <div className="absolute top-6 left-4 right-4 flex justify-between items-center">
          <button 
            onClick={() => navigate(-1)}
            className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-900 shadow-sm"
          >
            <ArrowLeft size={24} />
          </button>
          <span className="text-white font-bold text-lg">Menu Detail</span>
          <button
            type="button"
            onClick={() => toggleFavorite(item.id)}
            className={`w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm ${
              favoriteIds.has(item.id) ? 'text-red-500' : 'text-gray-900'
            }`}
          >
            <Heart size={24} fill={favoriteIds.has(item.id) ? 'currentColor' : 'none'} />
          </button>
        </div>

        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          <div className="w-8 h-1.5 bg-white rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-white/50 rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-white/50 rounded-full"></div>
        </div>
      </div>

      <div className="p-6 bg-white">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-2xl font-bold text-gray-900 leading-tight pr-4">{item.name}</h1>
          <span className="text-2xl font-bold text-gray-900 whitespace-nowrap">R{item.price.toFixed(2)}</span>
        </div>
        
        <div className="flex items-center space-x-3 mb-6">
          <div className="flex items-center bg-gray-100 px-4 py-2 rounded-full text-sm font-medium text-gray-900">
            <span className="mr-2">🚚</span> Free Delivery
          </div>
          <div className="flex items-center bg-gray-100 px-4 py-2 rounded-full text-sm font-medium text-gray-900">
            <Clock size={16} className="mr-2" /> 20 - 30min
          </div>
          <div className="flex items-center bg-gray-100 px-4 py-2 rounded-full text-sm font-medium text-gray-900">
            <Star size={16} className="text-gray-900 mr-1" /> {item.rating}
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Description</h3>
          <p className="text-gray-500 leading-relaxed">
            {item.description} is a typical food from our restaurant that is much in demand by many people, this is very recommended for you <span className="text-gray-900 font-medium">Read More...</span>
          </p>
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-900">Reviews (120)</h3>
            <Link to={`/item/${item.id}/reviews`} className="text-sm font-medium text-gray-900">See All</Link>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img src="https://i.pravatar.cc/150?img=11" alt="Reviewer" className="w-12 h-12 rounded-full object-cover mr-4" />
              <span className="font-medium text-gray-900">Dianne Russell</span>
            </div>
            <div className="flex items-center text-gray-900 font-medium">
              <Star size={16} className="text-gray-900 fill-current mr-1" /> 4.5
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-100 flex items-center justify-between z-20 pb-8">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-12 h-12 border border-gray-200 rounded-full flex items-center justify-center text-gray-900"
          >
            <Minus size={20} />
          </button>
          <span className="font-bold text-xl w-4 text-center">{quantity}</span>
          <button 
            onClick={() => setQuantity(quantity + 1)}
            className="w-12 h-12 border border-gray-200 rounded-full flex items-center justify-center text-gray-900"
          >
            <Plus size={20} />
          </button>
        </div>
        
        <button 
          onClick={handleAddToCart}
          className="bg-orange-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg shadow-orange-500/30 flex-1 ml-6 flex items-center justify-center"
        >
          <ShoppingCart size={20} className="mr-2" /> Add to Cart
        </button>
      </div>
    </div>
  );
};
