import React, { useState } from 'react';
import { ListFilter, TrendingUp, MapPin, Sparkles, Search } from 'lucide-react';
import EventCard from '../../components/events/EventCard';
import EventDetailsModal from '../../components/events/EventDetailsModal';
import { Event } from '../../types';

const Events = () => {
  const [sortBy, setSortBy] = useState<'nearest' | 'trending' | 'mycsd'>('nearest');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Placeholder for events data - will be replaced with actual API call
  const events: Event[] = [
    {
      id: '1',
      title: 'Tech Talk: AI in Education',
      date: new Date('2024-03-25'),
      location: { name: 'DKG 1', coordinates: [5.355, 100.302] },
      description: 'Join us for an insightful discussion about AI in education.',
      organizer: 'School of Computer Sciences',
      type: 'public',
      isMyCSD: true
    },
    // Add more events as needed
  ];

  // Filter events based on search query
  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.location.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const SortButton = ({ value, icon, label }: { value: typeof sortBy; icon: React.ReactNode; label: string }) => (
    <button
      onClick={() => setSortBy(value)}
      className={`flex items-center px-4 py-2 rounded-lg ${
        sortBy === value ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'
      }`}
    >
      {icon}
      <span className="ml-2">{label}</span>
    </button>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Events</h1>
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <ListFilter className="w-5 h-5" />
        </button>
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

      <div className="flex gap-4 overflow-x-auto pb-2">
        <SortButton value="nearest" icon={<MapPin className="w-4 h-4" />} label="Nearest to you" />
        <SortButton value="trending" icon={<TrendingUp className="w-4 h-4" />} label="Trending" />
        <SortButton value="mycsd" icon={<Sparkles className="w-4 h-4" />} label="MyCSD Provided" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEvents.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onClick={() => setSelectedEvent(event)}
          />
        ))}
      </div>

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