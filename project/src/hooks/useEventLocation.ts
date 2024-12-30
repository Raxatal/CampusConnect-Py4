import { useState, useEffect } from 'react';
import { getEventById } from '../services/events/mapEvents';

export const useEventLocation = (eventId: string | null) => {
  const [coordinates, setCoordinates] = useState<[number, number] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!eventId) return;

    const fetchEventLocation = async () => {
      try {
        setLoading(true);
        const event = await getEventById(eventId);
        
        if (event && event.location.coordinates) {
          setCoordinates(event.location.coordinates);
        } else {
          setError('Event location not found');
        }
      } catch (err) {
        setError('Failed to fetch event location');
        console.error('Error fetching event location:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEventLocation();
  }, [eventId]);

  return { coordinates, loading, error };
};