import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

export const VerifyCode: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/forgot-password', {
      replace: true,
      state: {
        message:
          'Password reset uses email only. Enter your email to receive a reset link when SMTP is configured.',
      },
    });
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <p className="text-gray-500">Redirecting...</p>
    </div>
  );
};
