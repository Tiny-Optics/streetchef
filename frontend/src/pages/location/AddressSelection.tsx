import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin } from 'lucide-react';

const addresses = [
  { id: '1', title: 'Home', address: '12 Simple Street, Cape Town' },
  { id: '2', title: 'My Office', address: '12 Simple Street, Cape Town' },
  { id: '3', title: 'My Apartment', address: '12 Simple Street, Cape Town' },
];

export const AddressSelection: React.FC = () => {
  const navigate = useNavigate();
  const [selectedAddress, setSelectedAddress] = useState(addresses[0].id);

  return (
    <div className="min-h-screen bg-white flex flex-col px-6 py-8">
      <div className="flex items-center mb-8">
        <button 
          onClick={() => navigate(-1)}
          className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-900 mr-4"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-gray-900 flex-1 text-center pr-16">Address</h1>
      </div>

      <div className="space-y-4 flex-1">
        {addresses.map((address) => (
          <div 
            key={address.id}
            onClick={() => setSelectedAddress(address.id)}
            className={`p-4 rounded-2xl border flex items-center cursor-pointer transition-colors ${
              selectedAddress === address.id ? 'border-gray-300 bg-white' : 'border-gray-200 bg-white'
            }`}
          >
            <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center text-white mr-4">
              <MapPin size={20} />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900">{address.title}</h4>
              <p className="text-sm text-gray-500 mt-1">{address.address}</p>
            </div>
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
              selectedAddress === address.id ? 'border-gray-900' : 'border-gray-300'
            }`}>
              {selectedAddress === address.id && <div className="w-3 h-3 bg-gray-900 rounded-full" />}
            </div>
          </div>
        ))}

        <button className="w-full py-4 rounded-2xl border border-gray-300 flex items-center justify-center text-gray-900 font-semibold mt-4">
          <span className="mr-2 text-xl">+</span> Add New Address
        </button>
      </div>

      <div className="mt-auto pt-8">
        <button 
          onClick={() => navigate('/checkout')}
          className="w-full bg-orange-500 text-white py-4 rounded-full font-bold text-lg shadow-lg shadow-orange-500/30"
        >
          Continue
        </button>
      </div>
    </div>
  );
};
