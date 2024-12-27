import React from 'react';
import { Plus } from 'lucide-react';

interface HeaderProps {
  onCreateClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCreateClick }) => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold">Your Private Events</h1>
      <button
        onClick={onCreateClick}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
      >
        <Plus className="w-5 h-5 mr-2" />
        Create Private Event
      </button>
    </div>
  );
};

export default Header;