import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MoreVertical, Search, SlidersHorizontal, MapPin } from 'lucide-react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export const MapLocation: React.FC = () => {
  const navigate = useNavigate();

  // Coordinates for Cape Town, South Africa
  const center: [number, number] = [-33.9249, 18.4241];

  const popularLocations = [
    { id: 1, name: 'Cape Town', state: 'Western Cape, South Africa', distance: '3.21 KM' },
    { id: 2, name: 'Johannesburg', state: 'Gauteng, South Africa', distance: '1400 KM' },
    { id: 3, name: 'Durban', state: 'KwaZulu-Natal, South Africa', distance: '1600 KM' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 relative flex flex-col">
      {/* Map Background */}
      <div className="absolute inset-0 z-0">
        <MapContainer 
          center={center} 
          zoom={14} 
          zoomControl={false} 
          className="w-full h-full"
        >
          {/* CartoDB Positron gives that clean, light-gray Uber-like map style */}
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          />
        </MapContainer>
        
        {/* Fixed Center Marker Overlay (like Uber) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[400] pb-32">
          <div className="w-10 h-10 bg-orange-100 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Top Bar */}
      <div className="relative z-10 flex items-center justify-between px-6 py-8 pointer-events-none">
        <button 
          onClick={() => navigate(-1)}
          className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-900 shadow-sm pointer-events-auto"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-gray-900 bg-white/90 px-4 py-2 rounded-full backdrop-blur-sm shadow-sm">Choose Location</h1>
        <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-900 shadow-sm pointer-events-auto">
          <MoreVertical size={24} />
        </button>
      </div>

      {/* Bottom Sheet */}
      <div className="relative z-10 mt-auto bg-white rounded-t-[2.5rem] px-6 pt-4 pb-8 shadow-[0_-8px_30px_rgba(0,0,0,0.12)]">
        <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6"></div>
        
        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search location.."
            className="w-full pl-11 pr-12 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
          />
          <button className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600">
            <SlidersHorizontal className="h-5 w-5" />
          </button>
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-4">Popular Location</h2>
        
        <div className="space-y-4">
          {popularLocations.map((loc, index) => (
            <div key={loc.id} className={`flex items-center py-2 ${index !== popularLocations.length - 1 ? 'border-b border-gray-100 pb-4' : ''}`}>
              <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 mr-4 shrink-0">
                <MapPin size={20} className="fill-orange-500 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{loc.name}</h3>
                <p className="text-sm text-gray-500">{loc.state}</p>
              </div>
              <div className="text-sm font-medium text-gray-900">
                {loc.distance}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
