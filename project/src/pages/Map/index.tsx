import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useSearchParams } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';

const Map = () => {
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get('eventId');

  // Center coordinates for USM main campus
  const center: [number, number] = [5.355, 100.302];

  return (
    <div className="h-[calc(100vh-12rem)]">
      <h1 className="text-2xl font-bold mb-4">Campus Map</h1>
      <div className="h-full rounded-lg overflow-hidden shadow-lg">
        <MapContainer center={center} zoom={16} className="h-full">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {/* Markers will be added here when integrated with actual data */}
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;