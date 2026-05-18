import React, {useEffect, useState} from 'react';
import {ChevronLeft, Heart} from 'lucide-react';
import {Link, useNavigate} from 'react-router-dom';
import {api} from '../lib/api';
import type {MenuItem} from '../data/menu';
export const Favorites: React.FC = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.favorites
      .list()
      .then(setItems)
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-col min-h-full bg-gray-50 pb-24">
      <div className="bg-white px-4 pt-6 pb-4 sticky top-0 z-10 shadow-sm flex items-center">
        <button onClick={() => navigate(-1)} className="mr-4 text-gray-900">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-gray-900">Favorites</h1>
      </div>

      {loading ? (
        <p className="text-center text-gray-500 mt-20">Loading...</p>
      ) : items.length === 0 ? (
        <div className="p-4 flex flex-col items-center justify-center flex-1 mt-20">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Heart size={40} className="text-gray-400" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">No Favorites Yet</h2>
          <p className="text-gray-500 text-center max-w-xs">
            Hit the heart icon on your favorite items to save them here.
          </p>
          <Link to="/menu" className="mt-6 text-orange-500 font-semibold">
            Browse Menu
          </Link>
        </div>
      ) : (
        <div className="p-4 space-y-4">
          {items.map((item) => (
            <Link
              key={item.id}
              to={`/item/${item.id}`}
              className="flex bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <img src={item.image} alt={item.name} className="w-24 h-24 object-cover" />
              <div className="p-3 flex-1">
                <h4 className="font-semibold text-gray-900">{item.name}</h4>
                <p className="text-sm text-gray-500">{item.category}</p>
                <p className="font-bold text-gray-900 mt-1">R{item.price.toFixed(2)}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
