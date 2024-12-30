import { useState, useEffect } from 'react';
import { Event } from '../types';
import { getApprovedPublicEvents } from '../services/events';

interface EventsByLocation {
  [key: string]: {
    events: Event[];
    position: [number, number];
  };
}

export const useMapEvents = () => {
  const [eventsByLocation, setEventsByLocation] = useState<EventsByLocation>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const events = await getApprovedPublicEvents();
      
      // Group events by location, ensuring valid coordinates
      const grouped = events.reduce((acc, event) => {
        if (!event.location?.coordinates?.[0] || !event.location?.coordinates?.[1]) {
          return acc;
        }

        const key = `${event.location.coordinates[0]},${event.location.coordinates[1]}`;
        const position: [number, number] = [
          event.location.coordinates[0],
          event.location.coordinates[1]
        ];
        
        if (!acc[key]) {
          acc[key] = {
            events: [],
            position
          };
        }
        
        acc[key].events.push(event);
        return acc;
      }, {} as EventsByLocation);

      setEventsByLocation(grouped);
    } catch (err) {
      setError('Failed to load events');
      console.error('Error loading map events:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    eventsByLocation,
    loading,
    error,
    refreshEvents: loadEvents
  };
};