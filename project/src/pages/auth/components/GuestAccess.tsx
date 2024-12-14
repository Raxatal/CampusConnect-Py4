import React from 'react';
import { UserCircle } from 'lucide-react';

interface GuestAccessProps {
  onGuestAccess: () => void;
}

const GuestAccess: React.FC<GuestAccessProps> = ({ onGuestAccess }) => {
  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue as</span>
        </div>
      </div>

      <button
        onClick={onGuestAccess}
        className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <UserCircle className="h-5 w-5 text-gray-400" />
        Guest
      </button>

      <p className="text-xs text-center text-gray-500">
        Guest access provides limited functionality. Sign in with your USM email for full access.
      </p>
    </div>
  );
};

export default GuestAccess;