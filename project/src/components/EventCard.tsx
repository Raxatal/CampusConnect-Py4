import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import { Event } from '../types';

interface EventCardProps {
  event: Event;
  onClick?: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer"
    >
      <h3 className="font-semibold text-lg text-gray-800">{event.title}</h3>
      <div className="mt-2 space-y-2">
        <div className="flex items-center text-gray-600">
          <Calendar className="w-4 h-4 mr-2" />
          <span className="text-sm">
            {format(new Date(event.date), 'PPP')}
          </span>
        </div>
        <div className="flex items-center text-gray-600">
          <MapPin className="w-4 h-4 mr-2" />
          <span className="text-sm">{event.location.name}</span>
        </div>
      </div>
      {event.status && (
        <div className="mt-2">
          <span className={`text-xs px-2 py-1 rounded-full ${
            event.status === 'approved' ? 'bg-green-100 text-green-800' :
            event.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
          </span>
        </div>
      )}
    </div>
  );
};

export default EventCard;