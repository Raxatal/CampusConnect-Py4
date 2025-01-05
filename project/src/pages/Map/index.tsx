import React, { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { useSearchParams } from 'react-router-dom';
import { Event } from '../../types';
import VenueMarker from '../../components/map/VenueMarker';
import EventMarker from '../../components/map/EventMarker';
import UserLocationMarker from '../../components/map/UserLocationMarker';
import MapController from '../../components/map/MapController';
import EventDetailsModal from '../../components/events/EventDetailsModal';
import { useVenues } from '../../hooks/useVenues';
import { useMapEvents } from '../../hooks/useMapEvents';
import { useUserLocation } from '../../hooks/useUserLocation';
import 'leaflet/dist/leaflet.css';

// USM main campus bounds
const bounds: [[number, number], [number, number]] = [
  [5.345, 100.287], // Southwest coordinates
  [5.365, 100.310]  // Northeast coordinates
];

// Center coordinates for USM main campus
const defaultCenter: [number, number] = [5.355, 100.302];
const defaultZoom = 16;

const Map = () => {
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get('eventId');
  const { venues, loading: venuesLoading } = useVenues();
  const { eventsByLocation, loading: eventsLoading } = useMapEvents();
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const { coords: userLocation } = useUserLocation();

  const center = userLocation || defaultCenter;

  if (venuesLoading || eventsLoading) {
    return <div className="h-[calc(100vh-8rem)] flex items-center justify-center">
      <div className="text-gray-600">Loading map...</div>
    </div>;
  }

  return (
    <div className="h-[calc(100vh-10rem)] -mt-4">
      <div className="h-full rounded-lg overflow-hidden shadow-lg">
        <MapContainer
          center={center}
          zoom={defaultZoom}
          className="h-full"
          maxBounds={bounds}
          maxBoundsViscosity={1.0}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <MapController eventId={eventId} bounds={bounds} />
          <UserLocationMarker />
          
          {/* Render venue markers */}
          {venues.map((venue) => (
            <VenueMarker key={venue.id} venue={venue} />
          ))}

          {/* Render event markers */}
          {Object.entries(eventsByLocation).map(([key, { events, position }]) => (
            <EventMarker
              key={key}
              events={events}
              position={position}
              onEventClick={setSelectedEvent}
            />
          ))}
        </MapContainer>
      </div>

      {selectedEvent && (
        <EventDetailsModal
          event={selectedEvent}
          isOpen={!!selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
};

export default Map;