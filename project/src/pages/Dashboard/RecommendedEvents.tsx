import React from 'react';
import { useState, useEffect } from 'react';
import EventCard from '../../components/events/EventCard';
import { getRandomApprovedEvents } from '../../services/eventService';
import { Event } from '../../types';

interface RecommendedEventsProps {
  onEventClick: (eventId: string) => void;
}

const RecommendedEvents: React.FC<RecommendedEventsProps> = ({ onEventClick }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const randomEvents = await getRandomApprovedEvents(4);
      setEvents(randomEvents);
    } catch (error) {
      console.error('Error loading recommended events:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading events...</div>;
  }

  if (events.length === 0) {
    return <div>No events available</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Events you might be interested in:</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {events.map((event) => (
          <EventCard 
            key={event.id} 
            event={event}
            onClick={() => onEventClick(event.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default RecommendedEvents;