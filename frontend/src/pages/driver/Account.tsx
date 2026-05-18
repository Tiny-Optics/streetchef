import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Car, FileText, ShieldCheck } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

export const DriverAccount: React.FC = () => {
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
          <h1 className="text-2xl font-bold text-gray-900">Account</h1>
        </div>
      </div>

      <div className="p-6 flex-1 overflow-y-auto">
        <div className="bg-white rounded-3xl p-6 mb-6 shadow-sm border border-gray-100 flex items-center">
          <div className="w-20 h-20 bg-gray-200 rounded-full overflow-hidden mr-4">
            <img src="https://i.pravatar.cc/150?img=11" alt="Driver" className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{user?.name || 'Ashley Idas'}</h2>
            <p className="text-gray-500">{user?.email || 'ashleyi@gmail.com'}</p>
            <div className="mt-2 inline-flex items-center bg-orange-100 text-orange-800 text-xs font-bold px-2 py-1 rounded-full">
              <ShieldCheck size={14} className="mr-1" /> Active
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <section>
            <h3 className="text-lg font-bold text-gray-900 mb-3 px-2">Personal Info</h3>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex items-center">
                <User size={20} className="text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Phone Number</p>
                  <p className="font-medium text-gray-900">{user?.phone || '+27 82 555 0101'}</p>
                </div>
              </div>
              <div className="p-4 flex items-center">
                <FileText size={20} className="text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Driver's License</p>
                  <p className="font-medium text-gray-900">Verified</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-bold text-gray-900 mb-3 px-2">Vehicle Details</h3>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex items-center">
                <Car size={20} className="text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Make & Model</p>
                  <p className="font-medium text-gray-900">Toyota Corolla (2018)</p>
                </div>
              </div>
              <div className="p-4 flex items-center">
                <div className="w-5 h-5 mr-3"></div> {/* Spacer */}
                <div>
                  <p className="text-sm text-gray-500">License Plate</p>
                  <p className="font-medium text-gray-900 uppercase">CA 123-456</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
