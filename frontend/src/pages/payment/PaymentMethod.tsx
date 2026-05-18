import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const PaymentMethod: React.FC = () => {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState<string | null>('mastercard');

  const paymentDisabledNotice = (
    <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-2xl text-amber-900 text-sm">
      Online payment is not enabled in this build. Orders use pay-on-delivery. Card selection is for display only.
    </div>
  );

  const paymentMethods = [
    {
      id: 'paypal',
      name: 'Home', // The screenshot says "Home" next to PayPal icon, which is weird, but let's follow it or assume it's PayPal
      label: 'Home',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.07617 21.3333L9.5857 5.46667H16.6333C19.7857 5.46667 21.3333 6.9619 21.3333 9.95238C21.3333 13.9143 18.8238 16.2952 14.8619 16.2952H11.6667L10.8714 21.3333H7.07617ZM12.2143 13.1048H14.5429C16.8952 13.1048 18.1429 11.8857 18.1429 9.45714C18.1429 7.64762 17.2286 6.75238 15.4 6.75238H11.5857L10.581 13.1048H12.2143Z" fill="#003087"/>
          <path d="M3.33333 21.3333L5.84286 5.46667H12.8905C16.0429 5.46667 17.5905 6.9619 17.5905 9.95238C17.5905 13.9143 15.081 16.2952 11.119 16.2952H7.92381L7.12857 21.3333H3.33333ZM8.47143 13.1048H10.8C13.1524 13.1048 14.4 11.8857 14.4 9.45714C14.4 7.64762 13.4857 6.75238 11.6571 6.75238H7.84286L6.8381 13.1048H8.47143Z" fill="#0079C1"/>
        </svg>
      )
    },
    {
      id: 'googlepay',
      name: 'Google Pay',
      label: 'Google Pay',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.24 10.2857V14.4H18.84C18.528 16.1143 17.04 18.5143 12.24 18.5143C8.448 18.5143 5.376 15.3429 5.376 11.5429C5.376 7.74286 8.448 4.57143 12.24 4.57143C14.352 4.57143 15.792 5.48571 16.584 6.24L19.728 3.12C17.76 1.28571 15.24 0 12.24 0C5.856 0 0.671997 5.18571 0.671997 11.5714C0.671997 17.9571 5.856 23.1429 12.24 23.1429C18.912 23.1429 23.328 18.4286 23.328 11.8286C23.328 10.9714 23.232 10.4571 23.088 9.85714L12.24 10.2857Z" fill="#4285F4"/>
          <path d="M12.24 23.1429C18.912 23.1429 23.328 18.4286 23.328 11.8286C23.328 10.9714 23.232 10.4571 23.088 9.85714H12.24V14.4H18.84C18.528 16.1143 17.04 18.5143 12.24 18.5143C10.272 18.5143 8.544 17.5714 7.44 16.1143L3.6 19.1143C5.76 21.1714 8.784 23.1429 12.24 23.1429Z" fill="#34A853"/>
          <path d="M7.44 16.1143C6.864 15.0857 6.528 13.8857 6.528 12.6857C6.528 11.4857 6.864 10.2857 7.44 9.25714L3.6 6.25714C2.352 8.74286 1.824 10.6286 1.824 12.6857C1.824 14.7429 2.352 16.6286 3.6 19.1143L7.44 16.1143Z" fill="#FBBC05"/>
          <path d="M12.24 4.57143C14.352 4.57143 15.792 5.48571 16.584 6.24L19.728 3.12C17.76 1.28571 15.24 0 12.24 0C8.784 0 5.76 1.97143 3.6 6.25714L7.44 9.25714C8.544 7.8 10.272 4.57143 12.24 4.57143Z" fill="#EA4335"/>
        </svg>
      )
    },
    {
      id: 'applepay',
      name: 'Apple Pay',
      label: 'Apple Pay',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.456 8.352C16.32 7.296 16.896 5.856 16.704 4.416C15.456 4.464 13.92 5.232 13.056 6.288C12.288 7.248 11.616 8.736 11.856 10.128C13.248 10.224 14.64 9.408 15.456 8.352ZM16.368 10.464C14.448 10.464 12.864 11.664 11.856 11.664C10.848 11.664 9.552 10.56 8.016 10.56C6.048 10.56 4.224 11.712 3.216 13.488C1.152 17.088 2.688 22.416 4.704 25.344C5.664 26.784 6.816 28.368 8.352 28.32C9.84 28.272 10.416 27.36 12.192 27.36C13.968 27.36 14.496 28.32 16.032 28.32C17.616 28.32 18.624 26.88 19.584 25.44C20.688 23.808 21.168 22.224 21.216 22.128C21.168 22.08 18.192 20.928 18.144 17.52C18.096 14.64 20.496 13.248 20.592 13.2C19.248 11.232 17.184 10.512 16.368 10.464Z" fill="black"/>
        </svg>
      )
    },
    {
      id: 'mastercard',
      name: 'Mastercard',
      label: '**** **** 1234',
      icon: (
        <svg width="32" height="24" viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="10" cy="12" r="10" fill="#EB001B"/>
          <circle cx="22" cy="12" r="10" fill="#F79E1B"/>
          <path d="M16 21.5333C18.1333 19.5333 19.3333 16.8667 19.3333 12C19.3333 7.13333 18.1333 4.46667 16 2.46667C13.8667 4.46667 12.6667 7.13333 12.6667 12C12.6667 16.8667 13.8667 19.5333 16 21.5333Z" fill="#FF5F00"/>
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col px-6 py-8">
      <div className="flex items-center mb-8">
        <button 
          onClick={() => navigate(-1)}
          className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-900 mr-4"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-gray-900 flex-1 text-center pr-16">Payment Methods</h1>
      </div>

      {paymentDisabledNotice}

      <div className="space-y-4 flex-1">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            onClick={() => setSelectedMethod(method.id)}
            className={`w-full flex items-center p-4 rounded-2xl border cursor-pointer transition-all ${
              selectedMethod === method.id ? 'border-orange-500 bg-white' : 'border-gray-200 bg-white'
            }`}
          >
            <div className="w-12 flex items-center justify-center mr-4">
              {method.icon}
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-semibold text-gray-900">{method.label}</h3>
            </div>
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
              selectedMethod === method.id ? 'border-orange-500' : 'border-gray-300'
            }`}>
              {selectedMethod === method.id && <div className="w-3 h-3 bg-orange-500 rounded-full" />}
            </div>
          </div>
        ))}

        <button
          type="button"
          disabled
          className="w-full py-4 rounded-2xl border border-gray-200 flex items-center justify-center text-gray-400 font-semibold mt-4 cursor-not-allowed"
        >
          <span className="mr-2 text-xl">+</span> Add New Card (unavailable)
        </button>
      </div>

      <div className="mt-auto pt-8">
        <button
          onClick={() => navigate('/checkout')}
          className="w-full bg-orange-500 text-white py-4 rounded-full font-bold text-lg shadow-lg shadow-orange-500/30 transition-all"
        >
          Continue
        </button>
      </div>
    </div>
  );
};
