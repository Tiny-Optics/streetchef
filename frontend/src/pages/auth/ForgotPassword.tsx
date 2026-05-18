import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {ArrowLeft, Mail} from 'lucide-react';
import {requestPasswordReset} from '../../lib/auth-client';

export const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address.');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      await requestPasswordReset(email, `${window.location.origin}/new-password`);

      setMessage(
        'If email delivery is configured on the server, you will receive a reset link shortly. Without SMTP, password reset is not available — contact support or sign up again.',
      );
    } catch {
      setError('Password reset is unavailable. Email (SMTP) must be configured on the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col px-6 py-8">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-900 mb-8"
      >
        <ArrowLeft size={24} />
      </button>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">Forgot Password</h1>
      <p className="text-gray-500 mb-4 leading-relaxed">
        Enter your email and we will send a reset link if email delivery is enabled.
      </p>

      <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-2xl text-amber-900 text-sm">
        Password reset requires SMTP email on the backend. In local development, reset emails are not sent unless you configure mail settings.
      </div>

      {error && (
        <p className="mb-4 text-sm text-red-600 bg-red-50 px-4 py-3 rounded-xl">{error}</p>
      )}
      {message && (
        <p className="mb-4 text-sm text-green-700 bg-green-50 px-4 py-3 rounded-xl">{message}</p>
      )}

      <form className="space-y-4 flex-1" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">Email</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-500 text-white py-4 rounded-full font-bold text-lg shadow-lg shadow-orange-500/30 disabled:opacity-50"
        >
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>
      </form>
    </div>
  );
};
