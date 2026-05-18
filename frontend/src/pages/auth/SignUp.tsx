import React, { useState } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

export const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type');
  const { setUser } = useAppContext();
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  // Driver specific fields
  const [vehicleMake, setVehicleMake] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [vehicleYear, setVehicleYear] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [driversLicense, setDriversLicense] = useState('');

  // Merchant specific fields
  const [kitchenName, setKitchenName] = useState('');
  const [kitchenAddress, setKitchenAddress] = useState('');
  const [cuisineType, setCuisineType] = useState('');

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;
    
    let role: 'customer' | 'driver' | 'merchant' = 'customer';
    if (type === 'driver') role = 'driver';
    if (type === 'merchant') role = 'merchant';

    // Set a dummy user to bypass auth
    setUser({
      id: 'user-1',
      name: name || 'New User',
      email: email || 'user@example.com',
      phone: '+1234567890',
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

      <h1 className="text-3xl font-bold text-gray-900 mb-2">Create an Account</h1>
      <p className="text-gray-500 mb-8 leading-relaxed">
        Join us today and unlock endless possibilities. It's quick, easy, and just a step away!
      </p>

      <form className="space-y-5 flex-1" onSubmit={handleSignUp}>
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name.."
            className="w-full px-4 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
          />
        </div>

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

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
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

        {type === 'driver' && (
          <div className="pt-6 mt-6 border-t border-gray-100 space-y-5">
            <h3 className="text-lg font-bold text-gray-900">Driver & Vehicle Details</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Driver's License Number</label>
              <input
                type="text"
                value={driversLicense}
                onChange={(e) => setDriversLicense(e.target.value)}
                placeholder="Enter license number"
                className="w-full px-4 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Vehicle Make</label>
                <input
                  type="text"
                  value={vehicleMake}
                  onChange={(e) => setVehicleMake(e.target.value)}
                  placeholder="e.g. Toyota"
                  className="w-full px-4 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Vehicle Model</label>
                <input
                  type="text"
                  value={vehicleModel}
                  onChange={(e) => setVehicleModel(e.target.value)}
                  placeholder="e.g. Corolla"
                  className="w-full px-4 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Year</label>
                <input
                  type="text"
                  value={vehicleYear}
                  onChange={(e) => setVehicleYear(e.target.value)}
                  placeholder="e.g. 2018"
                  className="w-full px-4 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">License Plate</label>
                <input
                  type="text"
                  value={licensePlate}
                  onChange={(e) => setLicensePlate(e.target.value)}
                  placeholder="e.g. CA 123-456"
                  className="w-full px-4 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
          </div>
        )}

        {type === 'merchant' && (
          <div className="pt-6 mt-6 border-t border-gray-100 space-y-5">
            <h3 className="text-lg font-bold text-gray-900">Kitchen Details</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Kitchen Name</label>
              <input
                type="text"
                value={kitchenName}
                onChange={(e) => setKitchenName(e.target.value)}
                placeholder="e.g. Mama's Kitchen"
                className="w-full px-4 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Kitchen Address</label>
              <input
                type="text"
                value={kitchenAddress}
                onChange={(e) => setKitchenAddress(e.target.value)}
                placeholder="Enter full address"
                className="w-full px-4 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Cuisine Type</label>
              <input
                type="text"
                value={cuisineType}
                onChange={(e) => setCuisineType(e.target.value)}
                placeholder="e.g. Traditional South African, Italian"
                className="w-full px-4 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
        )}

        <div className="flex items-start mt-6">
          <div className="flex items-center h-5">
            <input
              id="terms"
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="w-5 h-5 text-orange-500 bg-white border-gray-300 rounded focus:ring-orange-500 focus:ring-2 accent-orange-500"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="terms" className="font-medium text-gray-500">
              By creating an account, you agree to our <a href="#" className="text-orange-500 hover:underline">Terms and Conditions</a> and <a href="#" className="text-orange-500 hover:underline">Privacy Notice</a>.
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={!agreed}
          className="w-full bg-orange-500 text-white py-4 rounded-full font-bold text-lg shadow-lg shadow-orange-500/30 mt-8 disabled:opacity-50 disabled:shadow-none transition-all"
        >
          Sign Up
        </button>
      </form>

      <div className="mt-auto pt-8 text-center">
        <p className="text-gray-600">
          Already have an account? <Link to="/login" className="text-orange-500 font-bold">Sign In</Link>
        </p>
      </div>
    </div>
  );
};
