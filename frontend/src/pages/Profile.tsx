import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, User, Lock, Bell, Shield, Globe, ShieldCheck, HelpCircle, Edit2 } from 'lucide-react';

export const Profile: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white pb-24">
      <div className="px-6 pt-12 pb-6">
        <div className="flex items-center">
          <div className="relative">
            <div className="w-20 h-20 bg-gray-200 rounded-full overflow-hidden">
              <img src="https://i.pravatar.cc/150?img=11" alt="User" className="w-full h-full object-cover" />
            </div>
            <button className="absolute bottom-0 right-0 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center border-2 border-white text-white">
              <Edit2 size={12} />
            </button>
          </div>
          <div className="ml-4 flex-1">
            <h1 className="text-xl font-bold text-gray-900">Ashely Idas</h1>
            <p className="text-gray-500 text-sm">ashleyi@gmail.com</p>
          </div>
        </div>
      </div>

      <div className="px-6 space-y-6">
        <section>
          <h3 className="text-lg font-bold text-gray-900 mb-4">General</h3>
          <div className="space-y-3">
            <Link to="/edit-profile" className="flex items-center justify-between p-4 border border-gray-200 rounded-2xl hover:bg-gray-50 transition-colors">
              <div className="flex items-center text-gray-900">
                <User size={20} className="mr-3 text-gray-900" />
                <span className="font-medium">Edit Profile</span>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </Link>
            <Link to="/change-password" className="flex items-center justify-between p-4 border border-gray-200 rounded-2xl hover:bg-gray-50 transition-colors">
              <div className="flex items-center text-gray-900">
                <Lock size={20} className="mr-3 text-gray-900" />
                <span className="font-medium">Change Password</span>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </Link>
            <Link to="/notifications" className="flex items-center justify-between p-4 border border-gray-200 rounded-2xl hover:bg-gray-50 transition-colors">
              <div className="flex items-center text-gray-900">
                <Bell size={20} className="mr-3 text-gray-900" />
                <span className="font-medium">Notifications</span>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </Link>
            <Link to="/security" className="flex items-center justify-between p-4 border border-gray-200 rounded-2xl hover:bg-gray-50 transition-colors">
              <div className="flex items-center text-gray-900">
                <Shield size={20} className="mr-3 text-gray-900" />
                <span className="font-medium">Security</span>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </Link>
            <Link to="/language" className="flex items-center justify-between p-4 border border-gray-200 rounded-2xl hover:bg-gray-50 transition-colors">
              <div className="flex items-center text-gray-900">
                <Globe size={20} className="mr-3 text-gray-900" />
                <span className="font-medium">Language</span>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </Link>
          </div>
        </section>

        <section>
          <h3 className="text-lg font-bold text-gray-900 mb-4">Preferences</h3>
          <div className="space-y-3">
            <Link to="/legal" className="flex items-center justify-between p-4 border border-gray-200 rounded-2xl hover:bg-gray-50 transition-colors">
              <div className="flex items-center text-gray-900">
                <ShieldCheck size={20} className="mr-3 text-gray-900" />
                <span className="font-medium">Legal and Policies</span>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </Link>
            <Link to="/help" className="flex items-center justify-between p-4 border border-gray-200 rounded-2xl hover:bg-gray-50 transition-colors">
              <div className="flex items-center text-gray-900">
                <HelpCircle size={20} className="mr-3 text-gray-900" />
                <span className="font-medium">Help & Support</span>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </Link>
            <Link to="/partner" className="flex items-center justify-between p-4 border border-gray-200 rounded-2xl hover:bg-gray-50 transition-colors">
              <div className="flex items-center text-gray-900">
                <Globe size={20} className="mr-3 text-gray-900" />
                <span className="font-medium">Partner with Us</span>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};
