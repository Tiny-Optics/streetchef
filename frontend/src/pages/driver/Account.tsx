import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {ArrowLeft, User, Car, FileText, ShieldCheck, Edit2} from 'lucide-react';
import {useAppContext} from '../../context/AppContext';
import type {DriverProfile} from '../../context/AppContext';
import {api, resolveImageUrl} from '../../lib/api';

const emptyVehicleForm: DriverProfile = {
  driversLicense: '',
  vehicleMake: '',
  vehicleModel: '',
  vehicleYear: '',
  licensePlate: '',
};

export const DriverAccount: React.FC = () => {
  const navigate = useNavigate();
  const {user} = useAppContext();
  const backPath = user?.role === 'merchant' ? '/merchant/dashboard' : '/driver/home';
  const [driverProfile, setDriverProfile] = useState<DriverProfile | null>(null);
  const [editingVehicle, setEditingVehicle] = useState(false);
  const [vehicleForm, setVehicleForm] = useState<DriverProfile>(emptyVehicleForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    api.profile
      .get()
      .then((profile) => {
        if (profile.driverProfile) {
          setDriverProfile(profile.driverProfile);
          setVehicleForm(profile.driverProfile);
        }
      })
      .catch(() => setDriverProfile(null));
  }, []);

  const handleVehicleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const updated = await api.profile.update({driverProfile: vehicleForm});
      if (updated.driverProfile) {
        setDriverProfile(updated.driverProfile);
      }
      setEditingVehicle(false);
    } catch {
      setError('Failed to update vehicle details.');
    } finally {
      setSaving(false);
    }
  };

  const vehicleLabel = driverProfile
    ? `${driverProfile.vehicleMake} ${driverProfile.vehicleModel}${driverProfile.vehicleYear ? ` (${driverProfile.vehicleYear})` : ''}`.trim()
    : 'No vehicle on file';

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
            <img
              src={resolveImageUrl(user?.avatar ?? '') || 'https://i.pravatar.cc/150?img=11'}
              alt="Driver"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{user?.name ?? 'Driver'}</h2>
            <p className="text-gray-500">{user?.email}</p>
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
                  <p className="font-medium text-gray-900">{user?.phone || 'Not set'}</p>
                </div>
              </div>
              <div className="p-4 flex items-center">
                <FileText size={20} className="text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Driver&apos;s License</p>
                  <p className="font-medium text-gray-900">
                    {driverProfile?.driversLicense ? 'On file' : 'Not provided'}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-3 px-2">
              <h3 className="text-lg font-bold text-gray-900">Vehicle Details</h3>
              {!editingVehicle && (
                <button
                  type="button"
                  onClick={() => {
                    setVehicleForm(driverProfile ?? emptyVehicleForm);
                    setEditingVehicle(true);
                  }}
                  className="flex items-center text-sm font-medium text-orange-600"
                >
                  <Edit2 size={16} className="mr-1" />
                  Edit
                </button>
              )}
            </div>

            {error && <p className="px-2 mb-3 text-sm text-red-600">{error}</p>}

            {editingVehicle ? (
              <form
                onSubmit={handleVehicleSave}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 space-y-4"
              >
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Make</label>
                  <input
                    type="text"
                    required
                    value={vehicleForm.vehicleMake}
                    onChange={(e) => setVehicleForm((f) => ({...f, vehicleMake: e.target.value}))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Honda"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Model</label>
                  <input
                    type="text"
                    required
                    value={vehicleForm.vehicleModel}
                    onChange={(e) => setVehicleForm((f) => ({...f, vehicleModel: e.target.value}))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Ballade"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Year</label>
                  <input
                    type="text"
                    value={vehicleForm.vehicleYear}
                    onChange={(e) => setVehicleForm((f) => ({...f, vehicleYear: e.target.value}))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="2020"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">License Plate</label>
                  <input
                    type="text"
                    required
                    value={vehicleForm.licensePlate}
                    onChange={(e) => setVehicleForm((f) => ({...f, licensePlate: e.target.value}))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 uppercase"
                    placeholder="CA 123-456"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setEditingVehicle(false)}
                    className="flex-1 py-3 rounded-xl border border-gray-200 font-medium text-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 py-3 rounded-xl bg-orange-500 text-white font-bold disabled:opacity-50"
                  >
                    {saving ? 'Saving...' : 'Save Vehicle'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex items-center">
                  <Car size={20} className="text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Make & Model</p>
                    <p className="font-medium text-gray-900">{vehicleLabel}</p>
                  </div>
                </div>
                <div className="p-4 flex items-center">
                  <div className="w-5 h-5 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">License Plate</p>
                    <p className="font-medium text-gray-900 uppercase">
                      {driverProfile?.licensePlate || 'Not set'}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};
