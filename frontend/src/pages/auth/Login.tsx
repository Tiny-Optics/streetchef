import React, {useState} from 'react';
import {useNavigate, Link, useSearchParams} from 'react-router-dom';
import {ArrowLeft, Eye, EyeOff} from 'lucide-react';
import {signIn} from '../../lib/auth-client';
import {useAppContext} from '../../context/AppContext';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type');
  const {refreshUserData} = useAppContext();
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (loginMethod === 'phone') {
      setError('Phone sign-in is not available yet. Please use email.');
      return;
    }

    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }

    setLoading(true);
    try {
      const result = await signIn.email({email, password});
      if (result.error) {
        setError(result.error.message ?? 'Sign in failed');
        return;
      }

      await refreshUserData();
      const role = (result.data?.user as {role?: string})?.role ?? type ?? 'customer';

      if (role === 'driver') navigate('/driver/home');
      else if (role === 'merchant') navigate('/merchant/dashboard');
      else navigate('/home');
    } catch {
      setError('Sign in failed. Check your credentials.');
    } finally {
      setLoading(false);
    }
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

      {error && (
        <p className="mb-4 text-sm text-red-600 bg-red-50 px-4 py-3 rounded-xl">{error}</p>
      )}

      <div className="flex p-1 bg-gray-50 rounded-2xl mb-8">
        <button
          type="button"
          className={`flex-1 py-3 text-sm font-medium rounded-xl transition-colors ${
            loginMethod === 'email' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
          }`}
          onClick={() => setLoginMethod('email')}
        >
          Email
        </button>
        <button
          type="button"
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
          disabled={loading}
          className="w-full bg-orange-500 text-white py-4 rounded-full font-bold text-lg shadow-lg shadow-orange-500/30 mt-4 disabled:opacity-50"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      <div className="mt-auto pt-8 text-center">
        <p className="text-gray-600">
          Don't have an account?{' '}
          <Link
            to={type ? `/signup?type=${type}` : '/signup'}
            className="text-orange-500 font-bold"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};
