import React from 'react';
import { LogOut } from 'lucide-react';

interface LogoutButtonProps {
  onClick: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ onClick }) => {
  return (
    <button 
      className="p-2 hover:bg-blue-700 rounded-full"
      onClick={onClick}
      aria-label="Logout"
    >
      <LogOut className="w-5 h-5" />
    </button>
  );
};

export default LogoutButton;