import React from 'react';
import { Event } from '../../../types';
import EventCard from '../../../components/events/EventCard';
import FileViewer from '../../../components/ui/FileViewer';

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
        <div key={event.id} className="space-y-4">
          <EventCard 
            event={event}
            onClick={() => onEventClick(event)}
          />
          
          {/* File Viewers */}
          {(event.posterUrl || event.approvalLetterUrl) && (
            <div className="bg-white p-4 rounded-lg shadow space-y-4">
              {event.posterUrl && (
                <FileViewer url={event.posterUrl} type="poster" />
              )}
              {event.approvalLetterUrl && (
                <FileViewer url={event.approvalLetterUrl} type="approval" />
              )}
            </div>
          )}
          
          {event.status === 'rejected' && event.rejectionReason && (
            <div className="p-3 bg-red-50 text-red-700 text-sm rounded-lg">
              <strong>Rejection reason:</strong> {event.rejectionReason}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default RequestList;