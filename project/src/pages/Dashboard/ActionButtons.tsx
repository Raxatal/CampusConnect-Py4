import React from 'react';
import { Calendar, MapPin, ClipboardList, LogIn, ListChecks } from 'lucide-react';
import { NavigateFunction } from 'react-router-dom';

interface ActionButtonsProps {
  onNavigate: NavigateFunction;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onNavigate }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <ActionButton
        onClick={() => onNavigate('/events')}
        icon={<Calendar className="w-6 h-6 text-blue-600 mb-2" />}
        label="View all events"
      />
      <ActionButton
        onClick={() => onNavigate('/private-listings')}
        icon={<ListChecks className="w-6 h-6 text-blue-600 mb-2" />}
        label="View your private listings"
      />
      <ActionButton
        onClick={() => onNavigate('/map')}
        icon={<MapPin className="w-6 h-6 text-blue-600 mb-2" />}
        label="View Map"
      />
      <ActionButton
        onClick={() => onNavigate('/requests')}
        icon={<ClipboardList className="w-6 h-6 text-blue-600 mb-2" />}
        label="Your Requests"
      />
      
      {/* Temporary Login Button */}
      <div className="md:col-span-4">
        <ActionButton
          onClick={() => onNavigate('/login')}
          icon={<LogIn className="w-6 h-6 text-blue-600 mb-2" />}
          label="Login (Temporary)"
        />
      </div>
    </div>
  );
};

interface ActionButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({ onClick, icon, label }) => {
  return (
    <button
      onClick={onClick}
      className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
    >
      {icon}
      <h3 className="font-semibold">{label}</h3>
    </button>
  );
};

export default ActionButtons;