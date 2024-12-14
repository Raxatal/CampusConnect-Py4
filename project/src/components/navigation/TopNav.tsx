import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import LogoutModal from '../ui/LogoutModal';
import { useLogout } from '../../hooks/useLogout';

const TopNav = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { logout } = useLogout();

  const handleLogout = async () => {
    try {
      await logout();
      setShowLogoutModal(false);
    } catch (error) {
      console.error('Error during logout:', error);
      // TODO: Show error notification to user
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
              <button 
                className="p-2 hover:bg-blue-700 rounded-full"
                onClick={() => setShowLogoutModal(true)}
                aria-label="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
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