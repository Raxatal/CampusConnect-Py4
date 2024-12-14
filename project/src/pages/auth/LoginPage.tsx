import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import GuestAccess from './components/GuestAccess';
import AuthLayout from './components/AuthLayout';

const LoginPage = () => {
  const navigate = useNavigate();

  // Placeholder for Firebase auth
  const handleUsmLogin = async (email: string, password: string) => {
    console.log('USM Login:', { email, password });
    // TODO: Implement Firebase authentication for USM emails
    navigate('/');
  };

  const handleAdminLogin = async (email: string, password: string) => {
    console.log('Admin Login:', { email, password });
    // TODO: Implement Firebase authentication for admin accounts
    navigate('/');
  };

  const handleGuestAccess = () => {
    console.log('Guest Access');
    // TODO: Implement guest authentication
    navigate('/');
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Welcome to Campus Connect</h1>
          <p className="mt-2 text-gray-600">
            Connect with campus events at Universiti Sains Malaysia
          </p>
        </div>

        <LoginForm onUsmLogin={handleUsmLogin} onAdminLogin={handleAdminLogin} />
        <GuestAccess onGuestAccess={handleGuestAccess} />
      </div>
    </AuthLayout>
  );
};

export default LoginPage;