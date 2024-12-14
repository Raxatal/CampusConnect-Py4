import { useState, useEffect } from 'react';
import { Event } from '../types';

interface MapState {
  center: [number, number];
  zoom: number;
  events: Event[];
  loading: boolean;
  error: string | null;
}

// TODO: Implement actual map functionality with Leaflet
export const useMap = (initialCenter: [number, number] = [5.355, 100.302]) => {
  const [state, setState] = useState<MapState>({
    center: initialCenter,
    zoom: 15,
    events: [],
    loading: true,
    error: null
  });

  useEffect(() => {
    // TODO: Load events from Firestore
    setState(prev => ({ ...prev, loading: false }));
  }, []);

  const focusLocation = (coordinates: [number, number]) => {
    setState(prev => ({
      ...prev,
      center: coordinates,
      zoom: 18
    }));
  };

  return {
    ...state,
    focusLocation
  };
};