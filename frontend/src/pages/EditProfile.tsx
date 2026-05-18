import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit2, Calendar } from 'lucide-react';

export const EditProfile: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: 'Lucas Nathan',
    email: 'lucas@09gmail.com',
    phoneCode: '+27',
    phoneNumber: '82 555 0121',
    dob: 'November 24, 2000'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
        <h1 className="text-xl font-bold text-gray-900 flex-1 text-center pr-16">Personal Data</h1>
      </div>

      <div className="flex flex-col items-center mb-8">
        <div className="relative">
          <div className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden">
            <img src="https://i.pravatar.cc/150?img=11" alt="User" className="w-full h-full object-cover" />
          </div>
          <button className="absolute bottom-0 right-0 w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center border-4 border-white text-white shadow-sm">
            <Edit2 size={16} />
          </button>
        </div>
      </div>

      <div className="px-6 space-y-6 flex-1">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">Full Name</label>
          <input 
            type="text" 
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-gray-900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">Email</label>
          <input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-gray-900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">Phone Number</label>
          <div className="flex">
            <div className="flex items-center border border-gray-200 rounded-l-2xl px-4 bg-white border-r-0">
              <span className="text-xl mr-2">🇿🇦</span>
              <select 
                name="phoneCode"
                value={formData.phoneCode}
                onChange={handleChange}
                className="bg-transparent focus:outline-none text-gray-900 font-medium appearance-none pr-4"
                style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%236b7280%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right center', backgroundSize: '10px auto' }}
              >
                <option value="+27">+27</option>
                <option value="+1">+1</option>
                <option value="+44">+44</option>
              </select>
            </div>
            <input 
              type="tel" 
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="flex-1 p-4 border border-gray-200 rounded-r-2xl focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-gray-900"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">Date of Birth</label>
          <div className="relative">
            <input 
              type="text" 
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full p-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-gray-900 pr-12"
            />
            <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">Gender</label>
          <div className="relative">
            <select 
              className="w-full p-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-gray-900 appearance-none"
              style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%236b7280%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '12px auto' }}
            >
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
        </div>
      </div>

      <div className="p-6 mt-auto">
        <button className="w-full bg-orange-500 text-white py-4 rounded-full font-bold text-lg shadow-lg shadow-orange-500/30">
          Save Changes
        </button>
      </div>
    </div>
  );
};
