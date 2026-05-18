import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageCircle, Phone, FileText, ChevronRight } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

export const DriverHelp: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAppContext();
  const backPath = user?.role === 'merchant' ? '/merchant/dashboard' : '/driver/home';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white px-6 pt-12 pb-6 shadow-sm">
        <div className="flex items-center">
          <button 
            onClick={() => navigate(backPath)}
            className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-900 mr-4"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Help & Support</h1>
        </div>
      </div>

      <div className="p-6 flex-1 overflow-y-auto">
        <div className="grid grid-cols-2 gap-4 mb-8">
          <button className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-3">
              <MessageCircle size={24} className="text-orange-600" />
            </div>
            <span className="font-bold text-gray-900">Chat Support</span>
          </button>
          <button className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-3">
              <Phone size={24} className="text-orange-600" />
            </div>
            <span className="font-bold text-gray-900">Call Us</span>
          </button>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-4 px-2">Frequently Asked Questions</h3>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {[
            'How do payouts work?',
            'What if I have an issue with an order?',
            'How to update my vehicle details?',
            'Understanding my ratings',
            'Safety guidelines for drivers'
          ].map((faq, index) => (
            <button key={index} className="w-full p-4 border-b border-gray-100 flex items-center justify-between hover:bg-gray-50 transition-colors last:border-0">
              <div className="flex items-center">
                <FileText size={20} className="text-gray-400 mr-3" />
                <span className="text-gray-700 font-medium text-left">{faq}</span>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
