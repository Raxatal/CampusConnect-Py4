import React from 'react';
import EventCard from '../../components/events/EventCard';
import { useRecommendedEvents } from '../../hooks/useEvents';

interface RecommendedEventsProps {
  onEventClick: (eventId: string) => void;
}

const RecommendedEvents: React.FC<RecommendedEventsProps> = ({ onEventClick }) => {
  const events = useRecommendedEvents();

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Events you might be interested in:</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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