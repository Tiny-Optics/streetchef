import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {ArrowLeft} from 'lucide-react';
import {api, type NotificationSettings} from '../lib/api';

const defaultSettings: NotificationSettings = {
  notifications: true,
  sound: false,
  vibrate: false,
  specialOffers: true,
  payments: false,
  cashback: false,
  appUpdates: true,
};

export const Notifications: React.FC = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState<NotificationSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    api.settings
      .get()
      .then((data) => setSettings(data.notifications))
      .catch(() => setSettings(defaultSettings))
      .finally(() => setLoading(false));
  }, []);

  const toggleSetting = (key: keyof NotificationSettings) => {
    setSettings((prev) => ({...prev, [key]: !prev[key]}));
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
      await api.settings.update({notifications: settings});
      navigate(-1);
    } catch {
      setError('Failed to save settings. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const items = [
    {key: 'notifications', label: 'Notifications'},
    {key: 'sound', label: 'Sound'},
    {key: 'vibrate', label: 'Vibrate'},
    {key: 'specialOffers', label: 'Special Offers'},
    {key: 'payments', label: 'Payments'},
    {key: 'cashback', label: 'Cashback'},
    {key: 'appUpdates', label: 'App Updates'},
  ] as const;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="px-6 pt-12 pb-6 flex items-center">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-900 mr-4"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-gray-900 flex-1 text-center pr-16">Notifications</h1>
      </div>
      {error && <p className="px-6 text-sm text-red-600">{error}</p>}
      <div className="px-6 space-y-4 flex-1">
        {loading ? (
          <p className="text-gray-500 text-center py-12">Loading...</p>
        ) : (
          items.map((item) => (
            <div key={item.key} className="flex items-center justify-between p-4 border border-gray-200 rounded-2xl">
              <span className="font-medium text-gray-900">{item.label}</span>
              <button
                type="button"
                onClick={() => toggleSetting(item.key)}
                className={`w-12 h-6 rounded-full transition-colors relative ${
                  settings[item.key] ? 'bg-orange-500' : 'bg-gray-200'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                    settings[item.key] ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>
          ))
        )}
      </div>

      <div className="p-6 mt-auto">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving || loading}
          className="w-full bg-orange-500 text-white py-4 rounded-full font-bold text-lg shadow-lg shadow-orange-500/30 disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save'}
        </button>
      </div>
    </div>
  );
};
