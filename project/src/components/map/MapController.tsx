import React, { useEffect } from 'react';
import { useMap, useMapEvents } from 'react-leaflet';
import { useSearchParams } from 'react-router-dom';

interface MapControllerProps {
  bounds: [[number, number], [number, number]];
}

const MapController: React.FC<MapControllerProps> = ({ bounds }) => {
  const map = useMap();
  const [searchParams] = useSearchParams();
  
  // Get coordinates from URL parameters
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  useEffect(() => {
    if (!map) return;

    // Set bounds restriction
    map.setMaxBounds(bounds);
    map.setMinZoom(15);
    
    // If we have coordinates in the URL, zoom to that location
    if (lat && lng) {
      const latitude = parseFloat(lat);
      const longitude = parseFloat(lng);
      
      if (!isNaN(latitude) && !isNaN(longitude)) {
        map.setView([latitude, longitude], 18);
      }
    }
  }, [map, bounds, lat, lng]);

  // Prevent zooming out beyond minZoom
  useMapEvents({
    zoomend: () => {
      if (map.getZoom() < 15) {
        map.setZoom(15);
      }
    }
  });

  return null;
};

export default MapController;