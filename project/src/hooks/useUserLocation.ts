import { useState, useEffect } from 'react';

interface LocationState {
  coords: [number, number] | null;
  error: string | null;
  loading: boolean;
}

export const useUserLocation = () => {
  const [state, setState] = useState<LocationState>({
    coords: null,
    error: null,
    loading: true
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setState(prev => ({
        ...prev,
        error: 'Geolocation is not supported by your browser',
        loading: false
      }));
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setState({
          coords: [position.coords.latitude, position.coords.longitude],
          error: null,
          loading: false
        });
      },
      (error) => {
        setState({
          coords: null,
          error: error.message,
          loading: false
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return state;
};