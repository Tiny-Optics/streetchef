import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const VerifyCode: React.FC = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState(['7', '4', '9', '']);
  const [timeLeft, setTimeLeft] = useState(48);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    }
  }, [timeLeft]);

  const handleKeyPress = (key: string) => {
    if (key === 'backspace') {
      const newCode = [...code];
      for (let i = 3; i >= 0; i--) {
        if (newCode[i] !== '') {
          newCode[i] = '';
          break;
        }
      }
      setCode(newCode);
    } else {
      const newCode = [...code];
      for (let i = 0; i < 4; i++) {
        if (newCode[i] === '') {
          newCode[i] = key;
          break;
        }
      }
      setCode(newCode);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-white flex flex-col pt-8">
      <div className="px-6 flex-1 flex flex-col">
        <button 
          onClick={() => navigate(-1)}
          className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-900 mb-8"
        >
          <ArrowLeft size={24} />
        </button>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">Verify Code</h1>
        <p className="text-gray-500 mb-4 leading-relaxed">
          Phone verification is not enabled. Use email password reset instead.
        </p>
        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-2xl text-amber-900 text-sm">
          SMS OTP requires a provider that is not configured. Go back and use Forgot Password with your email.
        </div>

        <div className="flex justify-between gap-4 mb-8">
          {code.map((digit, index) => (
            <div 
              key={index}
              className={`w-16 h-16 rounded-2xl border-2 flex items-center justify-center text-2xl font-bold ${
                digit ? 'border-gray-200 text-gray-900' : 
                (index === code.findIndex(d => d === '') || (index === 3 && code[3] !== '')) ? 'border-orange-500 text-gray-900' : 'border-gray-200 text-gray-900'
              }`}
            >
              {digit}
              {(!digit && index === code.findIndex(d => d === '')) && (
                <div className="w-0.5 h-6 bg-orange-500 animate-pulse"></div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mb-auto">
          <p className="text-gray-900 font-medium">
            Resend code in <span className="text-orange-500">{formatTime(timeLeft)}</span>
          </p>
        </div>

        <div className="pb-6">
          <button
            onClick={() => navigate('/new-password')}
            disabled={code.includes('')}
            className="w-full bg-orange-500 text-white py-4 rounded-full font-bold text-lg shadow-lg shadow-orange-500/30 disabled:opacity-50 disabled:shadow-none transition-all"
          >
            Continue
          </button>
        </div>
      </div>

      {/* Custom Keypad */}
      <div className="bg-[#F2F4F7] px-2 pb-8 pt-2 grid grid-cols-3 gap-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button
            key={num}
            onClick={() => handleKeyPress(num.toString())}
            className="bg-white rounded-lg py-3 shadow-sm flex flex-col items-center justify-center active:bg-gray-100 transition-colors"
          >
            <span className="text-2xl font-medium text-gray-900">{num}</span>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">
              {num === 2 ? 'ABC' : num === 3 ? 'DEF' : num === 4 ? 'GHI' : num === 5 ? 'JKL' : num === 6 ? 'MNO' : num === 7 ? 'PQRS' : num === 8 ? 'TUV' : num === 9 ? 'WXYZ' : ''}
            </span>
          </button>
        ))}
        <div className="bg-transparent"></div>
        <button
          onClick={() => handleKeyPress('0')}
          className="bg-white rounded-lg py-3 shadow-sm flex items-center justify-center active:bg-gray-100 transition-colors"
        >
          <span className="text-2xl font-medium text-gray-900">0</span>
        </button>
        <button
          onClick={() => handleKeyPress('backspace')}
          className="bg-transparent rounded-lg py-3 flex items-center justify-center active:bg-gray-200 transition-colors text-gray-900"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"></path>
            <line x1="18" y1="9" x2="12" y2="15"></line>
            <line x1="12" y1="9" x2="18" y2="15"></line>
          </svg>
        </button>
      </div>
    </div>
  );
};
