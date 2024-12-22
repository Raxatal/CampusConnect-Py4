import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Import custom marker icons
import eventIconA from '../../images/icons/bald.jpg'; 
import eventIconB from '../../images/icons/unnamed.png';

const Map = () => {
  // State to store the user's current location
  const [currentLocation, setCurrentLocation] = useState<[number, number] | null>(null);

  // Example event data with types
  const events = [
    { id: 1, name: 'Event A', lat: 5.358, lng: 100.304, type: 'A' },
    { id: 2, name: 'Event B', lat: 5.360, lng: 100.307, type: 'B' },
  ];

  // Default coordinates for USM main campus
  const defaultCenter: [number, number] = [5.355, 100.302];

  // Define custom icons for events
  const iconA = L.icon({
    iconUrl: eventIconA,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  const iconB = L.icon({
    iconUrl: eventIconB,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  // Function to select the icon based on event type
  const getIcon = (type: string) => {
    switch (type) {
      case 'A':
        return iconA;
      case 'B':
        return iconB;
      default:
        return iconA; // Default icon
    }
  };

  // Create a blue marker for current location
  const currentLocationIcon = L.divIcon({
    className: 'leaflet-div-icon',
    html: '<div style="background-color: blue; width: 20px; height: 20px; border-radius: 50%;"></div>',
    iconSize: [20, 20],
    iconAnchor: [10, 10], // Center the marker on the point
  });

  // Get current location using geolocation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation([latitude, longitude]);
        },
        (error) => {
          console.error('Error getting geolocation: ', error);
          // Optionally, you can set a fallback location here
        }
      );
    }
  }, []);

  return (
    <div className="h-[calc(100vh-12rem)]">
      <h1 className="text-2xl font-bold mb-4">Campus Map</h1>
      <div className="h-full rounded-lg overflow-hidden shadow-lg">
        <MapContainer
          center={currentLocation || defaultCenter} // Center on current location if available
          zoom={16}
          className="h-full"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {/* Render event markers with different icons */}
          {events.map((event) => (
            <Marker
              key={event.id}
              position={[event.lat, event.lng]}
              icon={getIcon(event.type)} // Assign icon based on event type
            >
              <Popup>
                <strong>{event.name}</strong>
                <br />
                Latitude: {event.lat}, Longitude: {event.lng}
              </Popup>
            </Marker>
          ))}

          {/* Add a blue marker for the current location */}
          {currentLocation && (
            <Marker position={currentLocation} icon={currentLocationIcon}>
              <Popup>
                <strong>Your Location</strong>
                <br />
                Latitude: {currentLocation[0]}, Longitude: {currentLocation[1]}
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;
