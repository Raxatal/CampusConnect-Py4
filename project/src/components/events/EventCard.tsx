import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import { Event } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import AdminEventControls from './AdminEventControls';

interface EventCardProps {
  event: Event;
  onClick?: () => void;
  onEdit?: (data: Partial<Event>) => Promise<void>;
  onDelete?: () => Promise<void>;
}

const EventCard: React.FC<EventCardProps> = ({ event, onClick, onEdit, onDelete }) => {
  const { user } = useAuth();
  const isAdmin = user?.email === 'admin@usm.my';
  const showAdminControls = isAdmin && event.status === 'approved' && onEdit && onDelete;

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.admin-controls')) {
      return;
    }
    onClick?.();
  };

  return (
    <div 
      onClick={handleCardClick}
      className="relative group bg-white rounded-lg shadow-md p-4 hover-card cursor-pointer"
    >
      <h3 className="font-semibold text-lg text-gray-800">{event.title}</h3>
      <div className="mt-2 space-y-2">
        <div className="flex items-center text-gray-600">
          <Calendar className="w-4 h-4 mr-2" />
          <span className="text-sm">
            {format(new Date(event.startDate), 'PPP')}
          </span>
        </div>
        <div className="flex items-center text-gray-600">
          <MapPin className="w-4 h-4 mr-2" />
          <span className="text-sm">{event.location.name}</span>
        </div>
      </div>
      {event.status && (
        <div className="mt-2">
          <span className={`text-xs px-2 py-1 rounded-full transition-colors duration-200 ${
            event.status === 'approved' ? 'bg-green-100 text-green-800' :
            event.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
          </span>
        </div>
      )}

      {showAdminControls && (
        <div className="admin-controls">
          <AdminEventControls
            event={event}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </div>
      )}
    </div>
  );
};

export default EventCard;