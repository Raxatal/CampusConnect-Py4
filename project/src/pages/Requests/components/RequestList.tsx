import React from 'react';
import { Event } from '../../../types';
import EventCard from '../../../components/events/EventCard';

interface RequestListProps {
  events: Event[];
  onEventClick: (event: Event) => void;
}

const RequestList: React.FC<RequestListProps> = ({ events, onEventClick }) => {
  if (events.length === 0) {
    return <p className="text-center text-gray-500 py-8">No event requests yet</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {events.map((event) => (
        <div key={event.id} className="relative">
          <EventCard 
            event={event}
            onClick={() => onEventClick(event)}
          />
          {event.status === 'rejected' && event.rejectionReason && (
            <div className="mt-2 p-2 bg-red-50 text-red-700 text-sm rounded">
              Rejection reason: {event.rejectionReason}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default RequestList;