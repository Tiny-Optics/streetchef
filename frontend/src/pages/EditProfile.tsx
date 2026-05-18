import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {ArrowLeft, Edit2, Calendar} from 'lucide-react';
import {useAppContext} from '../context/AppContext';
import {api} from '../lib/api';

export const EditProfile: React.FC = () => {
  const navigate = useNavigate();
  const {user, refreshUserData} = useAppContext();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneCode: '+27',
    phoneNumber: '',
    dob: '',
    gender: 'Male',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) return;
    const phone = user.phone ?? '';
    setFormData({
      fullName: user.name,
      email: user.email,
      phoneCode: phone.startsWith('+27') ? '+27' : '+27',
      phoneNumber: phone.replace(/^\+27\s?/, ''),
      dob: '',
      gender: 'Male',
    });
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
      await api.profile.update({
        name: formData.fullName,
        phone: `${formData.phoneCode} ${formData.phoneNumber}`.trim(),
        dateOfBirth: formData.dob,
        gender: formData.gender,
      });
      await refreshUserData();
      navigate(-1);
    } catch {
      setError('Failed to save profile.');
    } finally {
      setSaving(false);
    }
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

      {error && <p className="px-6 text-sm text-red-600">{error}</p>}

      <div className="flex flex-col items-center mb-8">
        <div className="relative">
          <div className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden">
            <img
              src={user?.avatar ?? 'https://i.pravatar.cc/150?img=11'}
              alt="User"
              className="w-full h-full object-cover"
            />
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
            disabled
            className="w-full p-4 border border-gray-200 rounded-2xl bg-gray-50 text-gray-500"
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
                className="bg-transparent focus:outline-none text-gray-900 font-medium"
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
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-orange-500 text-gray-900"
          >
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>
      </div>

      <div className="p-6 mt-auto">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="w-full bg-orange-500 text-white py-4 rounded-full font-bold text-lg shadow-lg shadow-orange-500/30 disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
};
