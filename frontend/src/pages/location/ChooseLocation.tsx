import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, MapPin } from 'lucide-react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export const ChooseLocation: React.FC = () => {
  const navigate = useNavigate();

  // Coordinates for Cape Town, South Africa
  const center: [number, number] = [-33.9249, 18.4241];

  return (
    <div className="min-h-screen bg-white flex flex-col px-6 py-8">
      <button 
        onClick={() => navigate(-1)}
        className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-900 mb-8 z-10 relative"
      >
        <ArrowLeft size={24} />
      </button>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">Choose your location</h1>
      <p className="text-gray-500 mb-8 leading-relaxed">
        Let's find your unforgettable event. Choose a location below to get started.
      </p>

      <div className="space-y-4 mb-8">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search location"
            className="w-full pl-11 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
          />
        </div>

        <button 
          onClick={() => navigate('/map-location')}
          className="w-full flex items-center justify-center py-4 border-2 border-orange-500 text-orange-500 rounded-2xl font-semibold hover:bg-orange-50 transition-colors"
        >
          <MapPin className="mr-2 h-5 w-5" />
          Set Location on Map
        </button>
      </div>

      <div className="flex-1 flex flex-col">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Current Location</h2>
        <div className="relative w-full flex-1 min-h-[200px] bg-gray-100 rounded-3xl overflow-hidden shadow-inner">
          <MapContainer 
            center={center} 
            zoom={15} 
            zoomControl={false} 
            className="w-full h-full z-0"
            dragging={false}
            touchZoom={false}
            scrollWheelZoom={false}
            doubleClickZoom={false}
          >
            {/* CartoDB Positron gives that clean, light-gray Uber-like map style */}
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            />
          </MapContainer>
          
          {/* Fixed Center Marker Overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <div className="bg-orange-500 text-white px-4 py-2 rounded-lg font-medium shadow-lg relative -translate-y-6 translate-x-8">
              Kloof Street
              <div className="absolute -bottom-2 left-4 w-4 h-4 bg-orange-500 rotate-45"></div>
            </div>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-2 w-6 h-6 bg-orange-100 rounded-full border-2 border-orange-500 flex items-center justify-center pointer-events-none z-10">
            <div className="w-2.5 h-2.5 bg-orange-500 rounded-full"></div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <button
          onClick={() => navigate('/home')}
          className="w-full bg-orange-500 text-white py-4 rounded-full font-bold text-lg shadow-lg shadow-orange-500/30"
        >
          Use Current Location
        </button>
      </div>
    </div>
  );
};
