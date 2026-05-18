import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {ArrowLeft, ChevronRight} from 'lucide-react';
import {api, type SecuritySettings} from '../lib/api';

const defaultSettings: SecuritySettings = {
  rememberPassword: true,
  faceId: false,
  biometricId: false,
};

export const Security: React.FC = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState<SecuritySettings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    api.settings
      .get()
      .then((data) => setSettings(data.security))
      .catch(() => setSettings(defaultSettings))
      .finally(() => setLoading(false));
  }, []);

  const toggleSetting = (key: keyof SecuritySettings) => {
    setSettings((prev) => ({...prev, [key]: !prev[key]}));
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
      await api.settings.update({security: settings});
      navigate(-1);
    } catch {
      setError('Failed to save settings. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const toggles: {key: keyof SecuritySettings; label: string}[] = [
    {key: 'rememberPassword', label: 'Remember Password'},
    {key: 'faceId', label: 'Face ID'},
    {key: 'biometricId', label: 'Biometric ID'},
  ];

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
        <h1 className="text-xl font-bold text-gray-900 flex-1 text-center pr-16">Security</h1>
      </div>
      {error && <p className="px-6 text-sm text-red-600">{error}</p>}
      <div className="px-6 space-y-4 flex-1">
        {loading ? (
          <p className="text-gray-500 text-center py-12">Loading...</p>
        ) : (
          <>
            {toggles.map(({key, label}) => (
              <div key={key} className="flex items-center justify-between p-4 border border-gray-200 rounded-2xl">
                <span className="font-medium text-gray-900">{label}</span>
                <button
                  type="button"
                  onClick={() => toggleSetting(key)}
                  className={`w-12 h-6 rounded-full transition-colors relative ${
                    settings[key] ? 'bg-orange-500' : 'bg-gray-200'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                      settings[key] ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>
            ))}
            <button
              type="button"
              disabled
              className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-2xl opacity-60 cursor-not-allowed"
            >
              <span className="font-medium text-gray-900">Google Authenticator</span>
              <ChevronRight size={20} className="text-gray-400" />
            </button>
            <p className="text-xs text-gray-500 px-2">Two-factor authentication is not available in this build.</p>
          </>
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
