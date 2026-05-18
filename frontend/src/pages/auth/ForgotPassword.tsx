import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Phone } from 'lucide-react';

export const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [method, setMethod] = useState<'email' | 'phone'>('email');

  return (
    <div className="min-h-screen bg-white flex flex-col px-6 py-8">
      <button 
        onClick={() => navigate(-1)}
        className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-900 mb-8"
      >
        <ArrowLeft size={24} />
      </button>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">Forgot Password</h1>
      <p className="text-gray-500 mb-8 leading-relaxed">
        Select verification method and we will send verification code
      </p>

      <div className="space-y-4 flex-1">
        <button
          onClick={() => setMethod('email')}
          className={`w-full flex items-center p-4 rounded-2xl border-2 transition-all ${
            method === 'email' ? 'border-orange-500 bg-orange-50/30' : 'border-gray-200 bg-white'
          }`}
        >
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 mr-4">
            <Mail size={24} />
          </div>
          <div className="flex-1 text-left">
            <h3 className="font-semibold text-gray-900">Email</h3>
            <p className="text-sm text-gray-500 mt-1">********@mail.com</p>
          </div>
          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
            method === 'email' ? 'border-orange-500' : 'border-gray-300'
          }`}>
            {method === 'email' && <div className="w-3 h-3 bg-orange-500 rounded-full" />}
          </div>
        </button>

        <button
          onClick={() => setMethod('phone')}
          className={`w-full flex items-center p-4 rounded-2xl border-2 transition-all ${
            method === 'phone' ? 'border-orange-500 bg-orange-50/30' : 'border-gray-200 bg-white'
          }`}
        >
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 mr-4">
            <Phone size={24} />
          </div>
          <div className="flex-1 text-left">
            <h3 className="font-semibold text-gray-900">Phone Number</h3>
            <p className="text-sm text-gray-500 mt-1">**** **** **** 0101</p>
          </div>
          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
            method === 'phone' ? 'border-orange-500' : 'border-gray-300'
          }`}>
            {method === 'phone' && <div className="w-3 h-3 bg-orange-500 rounded-full" />}
          </div>
        </button>
      </div>

      <div className="mt-auto pt-8">
        <button
          onClick={() => navigate('/verify-code')}
          className="w-full bg-orange-500 text-white py-4 rounded-full font-bold text-lg shadow-lg shadow-orange-500/30"
        >
          Continue
        </button>
      </div>
    </div>
  );
};
