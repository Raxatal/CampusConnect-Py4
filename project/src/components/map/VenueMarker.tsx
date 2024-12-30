import React, { useState } from 'react';
import { Marker } from 'react-leaflet';
import { Icon } from 'leaflet';
import { Event, Venue } from '../../types';
import VenueEventsModal from './VenueEventsModal';
import EventDetailsModal from '../events/EventDetailsModal';
import { useVenueEvents } from '../../hooks/useVenueEvents';

interface VenueMarkerProps {
  venue: Venue;
}

const venueIcon = new Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2563eb" width="24" height="24">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  `),
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const VenueMarker: React.FC<VenueMarkerProps> = ({ venue }) => {
  const [showVenueEvents, setShowVenueEvents] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const { events } = useVenueEvents(showVenueEvents ? venue : null);

  if (!venue.latitude || !venue.longitude) {
    console.warn(`Missing coordinates for venue ${venue.name}`);
    return null;
  }

  return (
    <>
      <Marker
        position={[venue.latitude, venue.longitude]}
        icon={venueIcon}
        eventHandlers={{
          click: () => setShowVenueEvents(true)
        }}
      />

      <VenueEventsModal
        venue={venue}
        events={events}
        isOpen={showVenueEvents}
        onClose={() => setShowVenueEvents(false)}
        onEventClick={(event) => {
          setSelectedEvent(event);
          setShowVenueEvents(false);
        }}
      />

      {selectedEvent && (
        <EventDetailsModal
          event={selectedEvent}
          isOpen={!!selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </>
  );
};

export default VenueMarker;