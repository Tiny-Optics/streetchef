import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Menu, Bell, Navigation, User, Wallet, HelpCircle, FileText, ChevronRight, X, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import L from 'leaflet';
import { useNavigate } from 'react-router-dom';

// Custom marker icon for driver
const driverIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Custom marker icon for pickup/dropoff
const locationIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export const DriverHome: React.FC = () => {
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [incomingOrder, setIncomingOrder] = useState<{
    id: string;
    restaurant: string;
    pickup: string;
    dropoff: string;
    distance: string;
    time: string;
    earnings: number;
    rating: number;
  } | null>(null);

  // Coordinates for Cape Town, South Africa
  const center: [number, number] = [-33.9249, 18.4241];

  // Simulate incoming order when going online
  const toggleOnline = () => {
    const newStatus = !isOnline;
    setIsOnline(newStatus);
    
    if (newStatus) {
      setTimeout(() => {
        setIncomingOrder({
          id: 'ORD-123',
          restaurant: 'Burger Joint',
          pickup: '12 Kloof St, Gardens',
          dropoff: '45 Strand St, Cape Town City Centre',
          distance: '2.5 km',
          time: '15 min',
          earnings: 45.50,
          rating: 4.8
        });
      }, 3000);
    } else {
      setIncomingOrder(null);
    }
  };

  const acceptOrder = () => {
    // Handle order acceptance logic here
    setIncomingOrder(null);
    // Navigate to active delivery screen or update state
  };

  const declineOrder = () => {
    setIncomingOrder(null);
  };

  return (
    <div className="relative h-screen w-full bg-gray-100 overflow-hidden">
      {/* Map Background */}
      <div className="absolute inset-0 z-0">
        <MapContainer 
          center={center} 
          zoom={14} 
          zoomControl={false} 
          className="w-full h-full"
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={center} icon={driverIcon}>
            <Popup>You are here</Popup>
          </Marker>
          
          {incomingOrder && (
            <>
              <Marker position={[-33.9280, 18.4150]} icon={locationIcon}>
                <Popup>Pickup: {incomingOrder.restaurant}</Popup>
              </Marker>
              <Marker position={[-33.9200, 18.4200]} icon={locationIcon}>
                <Popup>Dropoff</Popup>
              </Marker>
            </>
          )}
        </MapContainer>
      </div>

      {/* Top Navigation Bar */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4 flex justify-between items-start pointer-events-none">
        <button 
          onClick={() => setShowMenu(true)}
          className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center pointer-events-auto"
        >
          <Menu size={24} className="text-gray-900" />
        </button>
        
        <div className="flex flex-col items-center pointer-events-auto">
          <div className="bg-white rounded-full shadow-lg px-6 py-3 flex items-center space-x-2">
            <span className="font-bold text-lg text-gray-900">R 0.00</span>
          </div>
          <span className="text-xs font-medium text-gray-800 bg-white/80 px-2 py-1 rounded-full mt-2 shadow-sm backdrop-blur-sm">
            Today's Earnings
          </span>
        </div>

        <button className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center pointer-events-auto relative">
          <Bell size={24} className="text-gray-900" />
          <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-4 pointer-events-none">
        <div className="flex justify-end mb-4">
          <button className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center pointer-events-auto">
            <Navigation size={24} className="text-orange-500" />
          </button>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-6 pointer-events-auto">
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              {isOnline ? "You're Online" : "You're Offline"}
            </h2>
            <p className="text-gray-500 text-sm mb-6 text-center">
              {isOnline ? "Finding trips nearby..." : "Go online to start receiving delivery requests."}
            </p>
            
            <button 
              onClick={toggleOnline}
              className={`w-24 h-24 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg transition-all transform hover:scale-105 ${
                isOnline ? 'bg-red-500 shadow-red-500/30' : 'bg-orange-500 shadow-orange-500/30'
              }`}
            >
              {isOnline ? 'GO OFFLINE' : 'GO'}
            </button>
          </div>
        </div>
      </div>

      {/* Incoming Order Modal */}
      <AnimatePresence>
        {incomingOrder && (
          <motion.div 
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] p-6"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="bg-orange-100 text-orange-800 text-xs font-bold px-2 py-1 rounded">Delivery</span>
                  <span className="bg-gray-100 text-gray-800 text-xs font-bold px-2 py-1 rounded">Exclusive</span>
                </div>
                <h2 className="text-4xl font-bold text-gray-900">R {incomingOrder.earnings.toFixed(2)}</h2>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <span className="flex items-center"><span className="text-yellow-400 mr-1">★</span> {incomingOrder.rating}</span>
                  <span className="mx-2">•</span>
                  <span>Verified</span>
                </div>
              </div>
              <button 
                onClick={declineOrder}
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200"
              >
                <X size={20} />
              </button>
            </div>

            <div className="relative pl-6 space-y-6 mb-8">
              {/* Timeline line */}
              <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-gray-200"></div>
              
              <div className="relative">
                <div className="absolute -left-6 top-1 w-4 h-4 bg-gray-900 rounded-full border-4 border-white shadow-sm"></div>
                <p className="font-bold text-gray-900">{incomingOrder.time} ({incomingOrder.distance}) away</p>
                <p className="text-gray-500 text-sm">{incomingOrder.pickup}</p>
              </div>
              
              <div className="relative">
                <div className="absolute -left-6 top-1 w-4 h-4 bg-orange-500 rounded-sm border-4 border-white shadow-sm"></div>
                <p className="font-bold text-gray-900">Delivery</p>
                <p className="text-gray-500 text-sm">{incomingOrder.dropoff}</p>
              </div>
            </div>

            <button 
              onClick={acceptOrder}
              className="w-full bg-orange-500 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-orange-500/30 hover:bg-orange-600 transition-colors"
            >
              Accept
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Side Menu */}
      <AnimatePresence>
        {showMenu && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMenu(false)}
              className="absolute inset-0 bg-black/50 z-40"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute top-0 left-0 bottom-0 w-4/5 max-w-sm bg-white z-50 flex flex-col"
            >
              <div className="p-6 bg-gray-900 text-white">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-16 h-16 bg-gray-700 rounded-full overflow-hidden">
                    <img src="https://i.pravatar.cc/150?img=11" alt="Driver" className="w-full h-full object-cover" />
                  </div>
                  <button onClick={() => setShowMenu(false)} className="text-gray-400 hover:text-white">
                    <X size={24} />
                  </button>
                </div>
                <h2 className="text-2xl font-bold">Ashley Idas</h2>
                <div className="flex items-center mt-2 text-sm text-gray-300">
                  <span className="flex items-center"><span className="text-yellow-400 mr-1">★</span> 4.9</span>
                  <span className="mx-2">•</span>
                  <span className="text-orange-400 flex items-center"><CheckCircle2 size={14} className="mr-1"/> Verified</span>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto py-4">
                <div className="px-6 mb-6">
                  <div className="bg-gray-50 rounded-xl p-4 flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Wallet Balance</p>
                      <p className="text-2xl font-bold text-gray-900">R 420.50</p>
                    </div>
                    <ChevronRight size={20} className="text-gray-400" />
                  </div>
                </div>

                <div className="space-y-1">
                  <button 
                    onClick={() => navigate('/driver/earnings')}
                    className="w-full flex items-center px-6 py-4 hover:bg-gray-50 transition-colors"
                  >
                    <FileText size={24} className="text-gray-700 mr-4" />
                    <span className="text-lg font-medium text-gray-900 flex-1 text-left">Earnings</span>
                  </button>
                  <button 
                    onClick={() => navigate('/driver/account')}
                    className="w-full flex items-center px-6 py-4 hover:bg-gray-50 transition-colors"
                  >
                    <User size={24} className="text-gray-700 mr-4" />
                    <span className="text-lg font-medium text-gray-900 flex-1 text-left">Account</span>
                  </button>
                  <button 
                    onClick={() => navigate('/driver/payment')}
                    className="w-full flex items-center px-6 py-4 hover:bg-gray-50 transition-colors"
                  >
                    <Wallet size={24} className="text-gray-700 mr-4" />
                    <span className="text-lg font-medium text-gray-900 flex-1 text-left">Payment</span>
                  </button>
                  <button 
                    onClick={() => navigate('/driver/help')}
                    className="w-full flex items-center px-6 py-4 hover:bg-gray-50 transition-colors"
                  >
                    <HelpCircle size={24} className="text-gray-700 mr-4" />
                    <span className="text-lg font-medium text-gray-900 flex-1 text-left">Help</span>
                  </button>
                </div>
              </div>

              <div className="p-6 border-t border-gray-100">
                <button 
                  onClick={() => {
                    // Handle logout
                    navigate('/');
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
