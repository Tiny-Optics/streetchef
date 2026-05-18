import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Star } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: 'Dianne Russell',
    avatar: 'https://i.pravatar.cc/150?img=11',
    rating: 4.5,
    text: 'Amazing! The burger was juicier and tastier than I expected. Perfectly grilled with fresh toppings. Highly recommend!'
  },
  {
    id: 2,
    name: 'Cody Fisher',
    avatar: 'https://i.pravatar.cc/150?img=12',
    rating: 4.4,
    text: 'The burger was cooked to perfection, and the flavors were spot on. Loved the special sauce—definitely coming back for more!'
  },
  {
    id: 3,
    name: 'Jacob Jones',
    avatar: 'https://i.pravatar.cc/150?img=13',
    rating: 4.8,
    text: 'Incredible! The burger was even better than the pictures. The patty was so flavorful, and the bun was soft and fresh. A must-try!'
  },
  {
    id: 4,
    name: 'Esther Howard',
    avatar: 'https://i.pravatar.cc/150?img=14',
    rating: 4.4,
    text: 'The burger was delicious, and the portion size was just right. Loved the combination of textures and flavors. Great job!'
  }
];

export const Reviews: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col px-6 py-8">
      <div className="flex items-center mb-8">
        <button 
          onClick={() => navigate(-1)}
          className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-900 mr-4"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-gray-900 flex-1 text-center pr-16">Reviews</h1>
      </div>

      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="text-6xl font-bold text-gray-900 mb-2">4.9</div>
          <div className="flex items-center mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} size={20} className={star <= 4 ? "text-yellow-400 fill-current" : "text-gray-300 fill-current"} />
            ))}
          </div>
          <div className="text-gray-500 text-sm">Based on 120 review</div>
        </div>
        
        <div className="flex-1 ml-8 space-y-2">
          {[
            { stars: 1, percent: 80 },
            { stars: 2, percent: 60 },
            { stars: 3, percent: 40 },
            { stars: 4, percent: 70 },
            { stars: 5, percent: 90 },
          ].map((bar) => (
            <div key={bar.stars} className="flex items-center">
              <span className="w-4 text-xs text-gray-500 mr-2">{bar.stars}</span>
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-orange-500 rounded-full" 
                  style={{ width: `${bar.percent}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-gray-900">Reviews (120)</h3>
        <button className="text-sm font-medium text-gray-900">See All</button>
      </div>

      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="flex items-start">
            <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full object-cover mr-4" />
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <h4 className="font-semibold text-gray-900">{review.name}</h4>
                <div className="flex items-center text-sm font-medium text-gray-900">
                  <Star size={14} className="text-yellow-400 fill-current mr-1" /> {review.rating}
                </div>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">{review.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
