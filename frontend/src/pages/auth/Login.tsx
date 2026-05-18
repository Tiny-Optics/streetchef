import React, { useState } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type');
  const { setUser } = useAppContext();
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    let role: 'customer' | 'driver' | 'merchant' = 'customer';
    if (type === 'driver') role = 'driver';
    if (type === 'merchant') role = 'merchant';

    // Set a dummy user to bypass auth
    setUser({
      id: 'user-1',
      name: 'Existing User',
      email: loginMethod === 'email' ? email || 'user@example.com' : 'user@example.com',
      phone: loginMethod === 'phone' ? phone || '+1234567890' : '+1234567890',
      role
    });
    
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col px-6 py-8">
      <button 
        onClick={() => navigate(-1)}
        className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-900 mb-8"
      >
        <ArrowLeft size={24} />
      </button>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back!</h1>
      <p className="text-gray-500 mb-8">Enter your registered account to sign in</p>

      <div className="flex p-1 bg-gray-50 rounded-2xl mb-8">
        <button
          className={`flex-1 py-3 text-sm font-medium rounded-xl transition-colors ${
            loginMethod === 'email' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
          }`}
          onClick={() => setLoginMethod('email')}
        >
          Email
        </button>
        <button
          className={`flex-1 py-3 text-sm font-medium rounded-xl transition-colors ${
            loginMethod === 'phone' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
          }`}
          onClick={() => setLoginMethod('phone')}
        >
          Phone Number
        </button>
      </div>

      <form className="space-y-5 flex-1" onSubmit={handleLogin}>
        {loginMethod === 'email' ? (
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address.."
              className="w-full px-4 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Phone Number</label>
            <div className="flex">
              <div className="flex items-center px-4 py-4 bg-white border border-gray-200 border-r-0 rounded-l-2xl">
                <span className="text-xl mr-2">🇿🇦</span>
                <span className="text-gray-900 font-medium">+27</span>
                <svg className="w-4 h-4 ml-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your number.."
                className="w-full px-4 py-4 bg-white border border-gray-200 rounded-r-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password.."
              className="w-full px-4 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>
        </div>

        <div className="flex justify-end">
          <Link to="/forgot-password" className="text-orange-500 font-medium text-sm">
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-4 rounded-full font-bold text-lg shadow-lg shadow-orange-500/30 mt-4"
        >
          Sign In
        </button>

        <div className="relative flex items-center justify-center mt-8 mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative bg-white px-4 text-sm text-gray-400">
            Or continue with
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <button type="button" className="w-16 h-16 rounded-2xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M23.766 12.2764C23.766 11.4607 23.6999 10.6406 23.5588 9.83807H12.24V14.4591H18.7217C18.4528 15.9494 17.5885 17.2678 16.323 18.1056V21.1039H20.19C22.4608 19.0139 23.766 15.9274 23.766 12.2764Z" fill="#4285F4"/>
              <path d="M12.2401 24.0008C15.4766 24.0008 18.2059 22.9382 20.1945 21.1039L16.3276 18.1055C15.2517 18.8375 13.8627 19.252 12.2445 19.252C9.11388 19.252 6.45946 17.1399 5.50705 14.3003H1.5166V17.3912C3.55371 21.4434 7.7029 24.0008 12.2401 24.0008Z" fill="#34A853"/>
              <path d="M5.50253 14.3003C5.00015 12.8099 5.00015 11.1961 5.50253 9.70575V6.61481H1.51649C-0.18551 10.0056 -0.18551 14.0004 1.51649 17.3912L5.50253 14.3003Z" fill="#FBBC05"/>
              <path d="M12.2401 4.74966C13.9509 4.7232 15.6044 5.36697 16.8434 6.54867L20.2695 3.12262C18.1001 1.0855 15.2208 -0.034466 12.2401 0.000808666C7.7029 0.000808666 3.55371 2.55822 1.5166 6.61481L5.50264 9.70575C6.45064 6.86173 9.10947 4.74966 12.2401 4.74966Z" fill="#EA4335"/>
            </svg>
          </button>
          <button type="button" className="w-16 h-16 rounded-2xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-900">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.365 7.11C17.151 6.156 17.66 4.845 17.515 3.5C16.353 3.547 14.95 4.275 14.135 5.225C13.411 6.061 12.793 7.41 12.968 8.71C14.261 8.81 15.578 8.064 16.365 7.11ZM17.433 10.665C15.42 10.665 14.004 11.89 13.046 11.89C12.062 11.89 10.871 10.713 9.206 10.713C7.031 10.713 4.982 11.981 3.864 13.93C1.59 17.887 3.284 23.75 5.498 26.96C6.586 28.535 7.848 30.301 9.537 30.253C11.178 30.205 11.802 29.213 13.743 29.213C15.684 29.213 16.236 30.253 17.949 30.253C19.71 30.253 20.803 28.655 21.867 27.08C23.097 25.285 23.601 23.538 23.625 23.442C23.577 23.418 20.218 22.147 20.218 18.356C20.218 15.19 22.809 13.632 22.929 13.56C21.321 11.21 18.848 10.737 17.433 10.665Z" transform="translate(0 -3.5)" />
            </svg>
          </button>
          <button type="button" className="w-16 h-16 rounded-2xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 12.0733C24 5.40553 18.6274 0 12 0C5.37258 0 0 5.40553 0 12.0733C0 18.1002 4.38823 23.0944 10.125 24V15.5625H7.07812V12.0733H10.125V9.41331C10.125 6.38691 11.9165 4.71624 14.6576 4.71624C15.9705 4.71624 17.3438 4.95183 17.3438 4.95183V7.92415H15.8306C14.3399 7.92415 13.875 8.85465 13.875 9.80906V12.0733H17.2031L16.6711 15.5625H13.875V24C19.6118 23.0944 24 18.1002 24 12.0733Z" fill="#1877F2"/>
            </svg>
          </button>
        </div>
      </form>

      <div className="mt-auto pt-8 text-center">
        <p className="text-gray-600">
          Don't have an account? <Link to="/signup" className="text-orange-500 font-bold">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};
