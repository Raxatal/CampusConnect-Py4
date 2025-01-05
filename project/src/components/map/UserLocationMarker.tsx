import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { useUserLocation } from '../../hooks/useUserLocation';

const userIcon = new Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
      <circle cx="12" cy="12" r="10" fill="#4F46E5" stroke="white" stroke-width="2"/>
      <circle cx="12" cy="12" r="3" fill="white"/>
    </svg>
  `),
  iconSize: [24, 24],
  iconAnchor: [12, 12],
  popupAnchor: [0, -12],
});

const UserLocationMarker: React.FC = () => {
  const { coords, error } = useUserLocation();

  if (!coords) return null;

  return (
    <Marker position={coords} icon={userIcon}>
      <Popup>
        <div className="text-center">
          <p className="font-medium">You are here</p>
          <p className="text-sm text-gray-600">
            {coords[0].toFixed(6)}, {coords[1].toFixed(6)}
          </p>
        </div>
      </Popup>
    </Marker>
  );
};

export default UserLocationMarker;