import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LogoutModal from '../ui/LogoutModal';
import { useAuth } from '../../contexts/AuthContext';
import { useAuthNavigation } from '../../hooks/useAuthNavigation';
import UserInfo from './UserInfo';
import LogoutButton from './LogoutButton';
import Logo from './Logo';
import AdminMenu from './AdminMenu';

const TopNav = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { user, logout } = useAuth();
  const { navigateToLogin } = useAuthNavigation();
  const isAdmin = user?.email === 'admin@usm.my';

  const handleLogout = async () => {
    try {
      await logout();
      setShowLogoutModal(false);
      navigateToLogin();
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <>
      <nav className="bg-orange-500 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <Logo />
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              {isAdmin && <AdminMenu />}
              {user && (
                <>
                  <UserInfo />
                  <LogoutButton onClick={() => setShowLogoutModal(true)} />
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />
    </>
  );
};

export default TopNav;