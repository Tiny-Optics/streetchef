import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, MessageSquare, ClipboardCheck, Coffee, Bike, Star } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { api } from '../lib/api';
import { motion } from 'motion/react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export const OrderTracking: React.FC = () => {
  const navigate = useNavigate();
  const { orders } = useAppContext();
  const activeOrder = orders[0];

  const statusToStep = (status?: string) => {
    switch (status) {
      case 'preparing':
        return 0;
      case 'delivering':
        return 2;
      case 'arrived':
        return 3;
      case 'completed':
        return 3;
      default:
        return 0;
    }
  };

  const [currentStep, setCurrentStep] = useState(statusToStep(activeOrder?.status));

  useEffect(() => {
    if (!activeOrder?.id) return;

    const poll = async () => {
      try {
        const order = await api.orders.get(activeOrder.id);
        setCurrentStep(statusToStep(order.status));
      } catch {
        // keep last known step
      }
    };

    poll();
    const id = setInterval(poll, 4000);
    return () => clearInterval(id);
  }, [activeOrder?.id, activeOrder?.status]);

  // Map Path Points (Pixel coordinates for the SVG overlay)
  const pathPoints = [
    { x: 150, y: 450 }, // Restaurant
    { x: 120, y: 350 },
    { x: 200, y: 300 },
    { x: 250, y: 200 },
    { x: 230, y: 150 }  // Destination
  ];

  // Determine driver position based on current step
  const getDriverAnimation = () => {
    if (currentStep <= 1) {
      // At restaurant
      return { x: pathPoints[0].x, y: pathPoints[0].y };
    } else if (currentStep === 2) {
      // Delivering: Animate through all points
      return { 
        x: pathPoints.map(p => p.x), 
        y: pathPoints.map(p => p.y) 
      };
    } else {
      // Arrived
      return { x: pathPoints[4].x, y: pathPoints[4].y };
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#e5e3df] relative overflow-hidden">
      {/* Map Background */}
      <div className="absolute inset-0 z-0">
        <MapContainer 
          center={[-33.9249, 18.4241]} 
          zoom={14} 
          zoomControl={false} 
          dragging={false}
          touchZoom={false}
          scrollWheelZoom={false}
          doubleClickZoom={false}
          className="w-full h-full opacity-80"
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          />
        </MapContainer>
        
        {/* Simulated Route and Markers */}
        <div className="absolute inset-0 pointer-events-none">
          <svg className="w-full h-full">
            {/* Route Casing (White border for the line) */}
            <path 
              d="M 150 450 L 120 350 L 200 300 L 250 200 L 230 150" 
              fill="none" 
              stroke="#ffffff" 
              strokeWidth="10" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
            {/* Route Line (Thick Black/Dark Gray) */}
            <path 
              d="M 150 450 L 120 350 L 200 300 L 250 200 L 230 150" 
              fill="none" 
              stroke="#111827" 
              strokeWidth="5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
          </svg>
          
          {/* Start Marker (Restaurant) */}
          <div className="absolute left-[150px] top-[450px] -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-black rounded-full border-2 border-white shadow-md flex items-center justify-center">
            <Coffee size={14} className="text-white" />
          </div>

          {/* Destination Marker */}
          <div className="absolute left-[230px] top-[150px] -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-black rounded-full border-2 border-white shadow-md flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
          </div>

          {/* Driver Marker (Animated) */}
          <motion.div 
            className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
            initial={{ x: pathPoints[0].x, y: pathPoints[0].y }}
            animate={getDriverAnimation()}
            transition={{ 
              duration: currentStep === 2 ? 8 : 0.5, // 8 seconds for the delivery journey
              ease: "linear"
            }}
            style={{ left: 0, top: 0 }}
          >
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.15)] border border-gray-100">
              <Bike size={24} className="text-black" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Header */}
      <div className="relative z-10 px-4 pt-12 flex items-center justify-between pointer-events-none">
        <button 
          onClick={() => navigate('/', { replace: true })}
          className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-900 shadow-md pointer-events-auto hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <button className="bg-white px-4 py-2.5 rounded-full shadow-md pointer-events-auto font-medium text-sm flex items-center hover:bg-gray-50 transition-colors">
          Help
        </button>
      </div>

      {/* Bottom Sheet */}
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-[0_-20px_40px_rgba(0,0,0,0.1)] z-20 flex flex-col overflow-hidden">
        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-gray-100">
          <motion.div 
            className="h-full bg-orange-500"
            initial={{ width: '0%' }}
            animate={{ width: `${(currentStep / 3) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        
        <div className="p-6">
          <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6"></div>
          
          {/* ETA Header */}
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-1">
              {currentStep === 0 ? 'Preparing' : 
               currentStep === 1 ? 'Wrapping up' : 
               currentStep === 2 ? 'Arriving in 5 min' : 'Arrived'}
            </h2>
            <p className="text-gray-500 font-medium">
              {currentStep < 3 ? 'Latest arrival by 11:00 AM' : 'Enjoy your food!'}
            </p>
          </div>

          {/* Driver Info */}
          <div className="flex items-center justify-between border-t border-b border-gray-100 py-5 mb-6">
            <div className="flex items-center">
              <div className="relative mr-4">
                <img src="https://i.pravatar.cc/150?img=11" alt="Driver" className="w-14 h-14 rounded-full object-cover border border-gray-200" />
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white px-2 py-0.5 rounded-full shadow-sm border border-gray-100 flex items-center text-xs font-bold">
                  4.9 <Star size={10} className="text-yellow-500 ml-1 fill-yellow-500" />
                </div>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-lg">Jason</h4>
                <p className="text-gray-500 text-sm">Honda PCX • ABC 123</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-900 hover:bg-gray-200 transition-colors">
                <Phone size={20} />
              </button>
              <button className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-900 hover:bg-gray-200 transition-colors">
                <MessageSquare size={20} />
              </button>
            </div>
          </div>

          {/* Order Details Teaser */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                <ClipboardCheck size={20} className="text-gray-900" />
              </div>
              <div>
                <p className="font-bold text-gray-900">Order from Street Chef</p>
                <p className="text-sm text-gray-500">Order #{activeOrder?.id || '012345'}</p>
              </div>
            </div>
            <button className="text-gray-900 font-medium bg-gray-100 px-4 py-2 rounded-full text-sm hover:bg-gray-200 transition-colors">
              Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
