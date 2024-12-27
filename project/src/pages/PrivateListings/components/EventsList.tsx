import React from 'react';
import { Event } from '../../../types';
import PrivateEventCard from './PrivateEventCard';

interface EventsListProps {
  events: Event[];
  onEventClick: (event: Event) => void;
  onEventEdit: (event: Event) => void;
  onEventDelete: (eventId: string) => void;
}

const EventsList: React.FC<EventsListProps> = ({
  events,
  onEventClick,
  onEventEdit,
  onEventDelete,
}) => {
  if (events.length === 0) {
    return <p className="text-center text-gray-500 py-8">No private events yet</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {events.map((event) => (
        <PrivateEventCard
          key={event.id}
          event={event}
          onClick={() => onEventClick(event)}
          onEdit={() => onEventEdit(event)}
          onDelete={() => onEventDelete(event.id)}
        />
      ))}
    </div>
  );
};

export default EventsList;