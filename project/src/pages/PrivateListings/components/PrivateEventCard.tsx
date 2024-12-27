import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import EventCard from '../../../components/events/EventCard';
import { Event } from '../../../types';

interface PrivateEventCardProps {
  event: Event;
  onEdit: () => void;
  onDelete: () => void;
  onClick: () => void;
}

const PrivateEventCard: React.FC<PrivateEventCardProps> = ({ 
  event, 
  onEdit, 
  onDelete, 
  onClick 
}) => {
  return (
    <div className="relative group">
      <EventCard event={event} onClick={onClick} />
      <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200"
        >
          <Pencil className="w-4 h-4" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default PrivateEventCard;