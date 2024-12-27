import React, { useState, useEffect } from 'react';
import { ListFilter, MapPin, Sparkles, Search } from 'lucide-react';
import EventCard from '../../components/events/EventCard';
import EventDetailsModal from '../../components/events/EventDetailsModal';
import { Event } from '../../types';
import { getApprovedPublicEvents } from '../../services/events';
import SortSelect from './components/SortSelect';
import FilterSelect from './components/FilterSelect';

const Events = () => {
  const [filter, setFilter] = useState<'all' | 'mycsd'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'title'>('date');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const fetchedEvents = await getApprovedPublicEvents();
      setEvents(fetchedEvents);
    } catch (error) {
      console.error('Error loading events:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter events based on search query and filter type
  const filteredEvents = events.filter(event => {
    const matchesSearch = 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filter === 'mycsd') {
      return matchesSearch && event.isMyCSD;
    }
    return matchesSearch;
  });

  // Sort filtered events
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (sortBy === 'date') {
      return a.startDate.getTime() - b.startDate.getTime();
    }
    return a.title.localeCompare(b.title);
  });

  if (loading) {
    return <div className="text-center py-8">Loading events...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Events</h1>
        <div className="flex items-center gap-4">
          <FilterSelect value={filter} onChange={setFilter} />
          <SortSelect value={sortBy} onChange={setSortBy} />
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search events by title or venue..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      {sortedEvents.length === 0 ? (
        <p className="text-center text-gray-500 py-8">
          {searchQuery ? 'No events found matching your search' : 'No events available'}
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onClick={() => setSelectedEvent(event)}
            />
          ))}
        </div>
      )}

      {selectedEvent && (
        <EventDetailsModal
          event={selectedEvent}
          isOpen={!!selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
};

export default Events;