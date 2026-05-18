import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const PrivacyPolicy: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="px-6 pt-12 pb-6 flex items-center sticky top-0 bg-white z-10">
        <button 
          onClick={() => navigate(-1)}
          className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-900 mr-4 shrink-0"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-gray-900 flex-1 text-center pr-16">Privacy & Policy</h1>
      </div>

      <div className="px-6 pb-12 relative flex-1">
        {/* Scrollbar Indicator */}
        <div className="absolute right-2 top-0 bottom-12 w-1 bg-gray-100 rounded-full">
          <div className="w-full h-32 bg-orange-500 rounded-full absolute top-1/4"></div>
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-6 pr-4">Effective Date: January 2025</h2>

        <div className="space-y-6 pr-4">
          <section>
            <h3 className="text-lg font-medium text-gray-900 mb-3">1. Information Collection</h3>
            <p className="text-gray-500 leading-relaxed">
              We collect essential information to enhance your experience. This includes details you provide directly, such as account data, as well as information gathered through usage analytics and cookies.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-medium text-gray-900 mb-3">2. Information Usage</h3>
            <p className="text-gray-500 leading-relaxed">
              The information collected is used to improve our services, provide personalized recommendations, and ensure a seamless experience. We do not share your data without your explicit consent.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-medium text-gray-900 mb-3">3. Information Setting</h3>
            <p className="text-gray-500 leading-relaxed">
              You have full control over your data. Manage your privacy preferences, update personal details, and customize your settings to match your needs.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-medium text-gray-900 mb-3">4. Security Measures</h3>
            <p className="text-gray-500 leading-relaxed">
              We prioritize your data's safety with advanced security protocols, encryption methods, and regular audits to protect against unauthorized access or breaches.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
