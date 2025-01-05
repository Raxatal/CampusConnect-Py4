import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import GuestAccess from './components/GuestAccess';
import AuthLayout from './components/AuthLayout';
import { useAuth } from '../../contexts/AuthContext';
import { useAuthNavigation } from '../../hooks/useAuthNavigation';
import { getLogoUrl } from '../../services/logo';

const LoginPage = () => {
  const { user, login, loginAsGuest } = useAuth();
  const { navigateAfterLogin } = useAuthNavigation();
  const [error, setError] = useState('');
  const [logoUrl, setLogoUrl] = useState('');

  useEffect(() => {
    const loadLogo = async () => {
      const url = await getLogoUrl();
      setLogoUrl(url);
    };
    loadLogo();
  }, []);

  // Redirect if already logged in
  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleUsmLogin = async (email: string, password: string) => {
    try {
      setError('');
      await login(email, password);
      navigateAfterLogin();
    } catch (error: any) {
      console.error('Login error:', error);
      setError(error.message || 'Failed to sign in');
    }
  };

  const handleAdminLogin = async (email: string, password: string) => {
    try {
      setError('');
      await login(email, password);
      navigateAfterLogin();
    } catch (error: any) {
      console.error('Login error:', error);
      setError(error.message || 'Failed to sign in');
    }
  };

  const handleGuestAccess = async () => {
    try {
      setError('');
      await loginAsGuest();
      navigateAfterLogin();
    } catch (error: any) {
      console.error('Guest login error:', error);
      setError('Guest access is temporarily unavailable. Please try again later or sign in with your account.');
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <img
            src={logoUrl}
            alt="CampusConnect Logo"
            className="mx-auto mb-1"
            style={{ height: '170px', width: 'auto' }}
            onError={(e) => {
              const img = e.target as HTMLImageElement;
              img.src = 'https://via.placeholder.com/150x50?text=CampusConnect';
            }}
          />
          <h1 className="text-3xl font-bold">Welcome to Campus Connect</h1>
          <p className="mt-2 text-gray-600">
            Connect with campus events at Universiti Sains Malaysia
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
            {error}
          </div>
        )}

        <LoginForm onUsmLogin={handleUsmLogin} onAdminLogin={handleAdminLogin} />
        <GuestAccess onGuestAccess={handleGuestAccess} />
      </div>
    </AuthLayout>
  );
};

export default LoginPage;