import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { Event } from '../../types';
import { divIcon } from 'leaflet';

interface MapMarkerProps {
  event: Event;
  onClick?: () => void;
}

const MapMarker: React.FC<MapMarkerProps> = ({ event, onClick }) => {
  // TODO: Create custom marker icons based on event type
  const markerIcon = divIcon({
    className: 'custom-marker',
    html: `<div class="marker-content">${event.title}</div>`,
    iconSize: [30, 30]
  });

  return (
    <Marker 
      position={event.location.coordinates} 
      icon={markerIcon}
      eventHandlers={{ click: onClick }}
    >
      <Popup>
        <div className="p-2">
          <h3 className="font-semibold">{event.title}</h3>
          <p className="text-sm text-gray-600">{event.location.name}</p>
        </div>
      </Popup>
    </Marker>
  );
};