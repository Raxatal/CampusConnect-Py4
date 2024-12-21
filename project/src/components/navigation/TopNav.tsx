import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ClipboardList } from 'lucide-react';
import LogoutModal from '../ui/LogoutModal';
import { useAuth } from '../../contexts/AuthContext';
import { useAuthNavigation } from '../../hooks/useAuthNavigation';
import UserInfo from './UserInfo';
import LogoutButton from './LogoutButton';

const TopNav = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { user, logout } = useAuth();
  const { navigateToLogin } = useAuthNavigation();
  const navigate = useNavigate();

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
      <nav className="bg-blue-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="text-xl font-bold">
                Campus Connect
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              {isAdmin && (
                <button
                  onClick={() => navigate('/admin/event-requests')}
                  className="flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  <ClipboardList className="w-5 h-5" />
                  <span>Event Requests</span>
                </button>
              )}
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