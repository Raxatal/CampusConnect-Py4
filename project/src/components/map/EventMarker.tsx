import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { Event } from '../../types';

interface EventMarkerProps {
  events: Event[];
  position: [number, number];
  onEventClick: (event: Event) => void;
}

// Create a custom icon for events
const eventIcon = new Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="16" y1="2" x2="16" y2="6"></line>
      <line x1="8" y1="2" x2="8" y2="6"></line>
      <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
  `),
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const EventMarker: React.FC<EventMarkerProps> = ({ events, position, onEventClick }) => {
  // Validate position before rendering
  if (!position || !Array.isArray(position) || position.length !== 2 || 
      typeof position[0] !== 'number' || typeof position[1] !== 'number') {
    return null;
  }

  return (
    <Marker position={position} icon={eventIcon}>
      <Popup>
        <div className="max-w-xs">
          <h3 className="font-semibold mb-2">Events at this location:</h3>
          <ul className="space-y-2">
            {events.map(event => (
              <li 
                key={event.id}
                onClick={() => onEventClick(event)}
                className="cursor-pointer hover:bg-blue-50 p-2 rounded transition-colors"
              >
                <span className="font-medium text-blue-600">{event.title}</span>
                <p className="text-sm text-gray-600">{event.location.name}</p>
              </li>
            ))}
          </ul>
        </div>
      </Popup>
    </Marker>
  );
};

export default EventMarker;