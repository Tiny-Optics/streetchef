import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight } from 'lucide-react';

export const Security: React.FC = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    rememberPassword: true,
    faceId: true,
    biometricId: false,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="px-6 pt-12 pb-6 flex items-center">
        <button 
          onClick={() => navigate(-1)}
          className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-900 mr-4"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-gray-900 flex-1 text-center pr-16">Security</h1>
      </div>

      <div className="px-6 space-y-4 flex-1">
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-2xl">
          <span className="font-medium text-gray-900">Remember Password</span>
          <button 
            onClick={() => toggleSetting('rememberPassword')}
            className={`w-12 h-6 rounded-full transition-colors relative ${
              settings.rememberPassword ? 'bg-orange-500' : 'bg-gray-200'
            }`}
          >
            <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
              settings.rememberPassword ? 'translate-x-6' : 'translate-x-0.5'
            }`} />
          </button>
        </div>

        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-2xl">
          <span className="font-medium text-gray-900">Face ID</span>
          <button 
            onClick={() => toggleSetting('faceId')}
            className={`w-12 h-6 rounded-full transition-colors relative ${
              settings.faceId ? 'bg-orange-500' : 'bg-gray-200'
            }`}
          >
            <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
              settings.faceId ? 'translate-x-6' : 'translate-x-0.5'
            }`} />
          </button>
        </div>

        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-2xl">
          <span className="font-medium text-gray-900">Biometric ID</span>
          <button 
            onClick={() => toggleSetting('biometricId')}
            className={`w-12 h-6 rounded-full transition-colors relative ${
              settings.biometricId ? 'bg-orange-500' : 'bg-gray-200'
            }`}
          >
            <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
              settings.biometricId ? 'translate-x-6' : 'translate-x-0.5'
            }`} />
          </button>
        </div>

        <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-2xl">
          <span className="font-medium text-gray-900">Google Authenticator</span>
          <ChevronRight size={20} className="text-gray-400" />
        </button>
      </div>

      <div className="p-6 mt-auto">
        <button 
          onClick={() => navigate(-1)}
          className="w-full bg-orange-500 text-white py-4 rounded-full font-bold text-lg shadow-lg shadow-orange-500/30"
        >
          Save
        </button>
      </div>
    </div>
  );
};
