import React from 'react';
import { Calendar, MapPin, ClipboardList } from 'lucide-react';
import { NavigateFunction } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import ActionButton from './components/ActionButton';

interface ActionButtonsProps {
  onNavigate: NavigateFunction;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onNavigate }) => {
  const { isGuest } = useAuth();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <ActionButton
        onClick={() => onNavigate('/events')}
        icon={<Calendar className="w-6 h-6 text-blue-600 mb-2" />}
        label="View all events"
      />
      {!isGuest && (
        <>
          <ActionButton
            onClick={() => onNavigate('/private-listings')}
            icon={<ClipboardList className="w-6 h-6 text-blue-600 mb-2" />}
            label="View your private listings"
          />
          <ActionButton
            onClick={() => onNavigate('/requests')}
            icon={<ClipboardList className="w-6 h-6 text-blue-600 mb-2" />}
            label="Your Requests"
          />
        </>
      )}
      <ActionButton
        onClick={() => onNavigate('/map')}
        icon={<MapPin className="w-6 h-6 text-blue-600 mb-2" />}
        label="View Map"
      />
    </div>
  );
};

export default ActionButtons;