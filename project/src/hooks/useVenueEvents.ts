import { useState, useEffect } from 'react';
import { Event, Venue } from '../types';
import { getEventsByVenue } from '../services/events/venueEvents';

export const useVenueEvents = (venue: Venue | null) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!venue) {
      setEvents([]);
      return;
    }

    const loadEvents = async () => {
      setLoading(true);
      try {
        const venueEvents = await getEventsByVenue(venue.id);
        setEvents(venueEvents);
      } catch (error) {
        console.error('Error loading venue events:', error);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, [venue]);

  return { events, loading };
};