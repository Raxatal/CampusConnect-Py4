import React from 'react';
import Modal from '../ui/Modal';
import EventCard from '../events/EventCard';
import { Event, Venue } from '../../types';

interface VenueEventsModalProps {
  venue: Venue;
  events: Event[];
  isOpen: boolean;
  onClose: () => void;
  onEventClick: (event: Event) => void;
}

const VenueEventsModal: React.FC<VenueEventsModalProps> = ({
  venue,
  events,
  isOpen,
  onClose,
  onEventClick,
}) => {
  // Prevent wheel events from propagating to the map
  const handleWheel = (e: React.WheelEvent) => {
    e.stopPropagation();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={venue.name}>
      <div 
        className="space-y-4 max-h-[60vh] overflow-y-auto pr-2" 
        onWheel={handleWheel}
      >
        {events.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No events scheduled at this venue</p>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onClick={() => onEventClick(event)}
              />
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default VenueEventsModal;