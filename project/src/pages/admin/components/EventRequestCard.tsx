import React from 'react';
import { format } from 'date-fns';
import { CheckCircle, XCircle } from 'lucide-react';
import { Event } from '../../../types';
import FileViewer from '../../../components/ui/FileViewer';

interface EventRequestCardProps {
  event: Event;
  onApprove: () => void;
  onReject: () => void;
}

const EventRequestCard: React.FC<EventRequestCardProps> = ({ event, onApprove, onReject }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="font-semibold text-lg">{event.title}</h3>
      <div className="mt-2 space-y-2 text-sm text-gray-600">
        <p>Organizer: {event.organizer}</p>
        <p>Start: {format(event.startDate, 'PPp')}</p>
        <p>End: {format(event.endDate, 'PPp')}</p>
        <p>Location: {event.location.name}</p>
        <p>MyCSD: {event.isMyCSD ? 'Yes' : 'No'}</p>
      </div>
      <p className="mt-2 text-sm">{event.description}</p>
      
      {/* File Viewers */}
      <div className="mt-4 space-y-4">
        {event.posterUrl && (
          <FileViewer url={event.posterUrl} type="poster" />
        )}
        {event.approvalLetterUrl && (
          <FileViewer url={event.approvalLetterUrl} type="approval" />
        )}
      </div>

      <div className="mt-4 flex justify-end space-x-2">
        <button
          onClick={onReject}
          className="flex items-center px-3 py-2 text-red-600 hover:bg-red-50 rounded-md"
        >
          <XCircle className="w-5 h-5 mr-1" />
          Reject
        </button>
        <button
          onClick={onApprove}
          className="flex items-center px-3 py-2 text-green-600 hover:bg-green-50 rounded-md"
        >
          <CheckCircle className="w-5 h-5 mr-1" />
          Approve
        </button>
      </div>
    </div>
  );
};

export default EventRequestCard;