import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { divIcon } from 'leaflet';
import { Event } from '../../types';

interface ClusterMarkerProps {
  events: Event[];
  position: [number, number];
}

const ClusterMarker: React.FC<ClusterMarkerProps> = ({ events, position }) => {
  // TODO: Create custom cluster icon
  const clusterIcon = divIcon({
    className: 'custom-cluster',
    html: `<div class="cluster-content">${events.length}</div>`,
    iconSize: [40, 40]
  });

  return (
    <Marker position={position} icon={clusterIcon}>
      <Popup>
        <div className="p-2 max-h-60 overflow-y-auto">
          <h3 className="font-semibold mb-2">Events at this location:</h3>
          <ul className="space-y-2">
            {events.map(event => (
              <li key={event.id} className="text-sm">
                <span className="font-medium">{event.title}</span>
                <p className="text-gray-600">{event.location.name}</p>
              </li>
            ))}
          </ul>
        </div>
      </Popup>
    </Marker>
  );
};