import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import EventCard from '../../components/events/EventCard';
import EventDetailsModal from '../../components/events/EventDetailsModal';
import { Event } from '../../types';
import { getApprovedPublicEvents, updatePublicEvent, deletePublicEvent } from '../../services/events';
import { getVenues } from '../../services/venues';
import SortSelect, { SortOption } from './components/SortSelect';
import FilterSelect from './components/FilterSelect';
import LocationFilter from '../../components/events/LocationFilter';
import { useUserLocation } from '../../hooks/useUserLocation';
import { calculateDistance } from '../../utils/location';

const Events = () => {
  const [filter, setFilter] = useState<'all' | 'mycsd'>('all');
  const [sortBy, setSortBy] = useState<SortOption>('date');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [locationFilterEnabled, setLocationFilterEnabled] = useState(false);
  const [radius, setRadius] = useState(0.25); // Default radius in kilometers
  const { coords: userLocation } = useUserLocation();
  const [venueDistances, setVenueDistances] = useState<{ venueName: string; distance: number }[]>([]);

  useEffect(() => {
    loadEvents();
  }, []);

  useEffect(() => {
    if (userLocation) {
      calculateVenueDistances();
    }
  }, [userLocation]);

  const calculateVenueDistances = async () => {
    if (!userLocation) return;
    
    try {
      const venues = await getVenues();
      const distances = venues.map(venue => ({
        venueName: venue.name,
        distance: calculateDistance(
          userLocation[0],
          userLocation[1],
          venue.latitude,
          venue.longitude
        )
      })).sort((a, b) => a.distance - b.distance);
      
      setVenueDistances(distances);
    } catch (error) {
      console.error('Error calculating venue distances:', error);
    }
  };

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

  const handleEditEvent = async (event: Event, data: Partial<Event>) => {
    try {
      await updatePublicEvent(event.id, data);
      await loadEvents();
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    try {
      await deletePublicEvent(eventId);
      await loadEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  // Filter events based on search query, type, and location
  const filteredEvents = events.filter(event => {
    const matchesSearch = 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = filter === 'all' ? true : event.isMyCSD;
    
    // Location-based filtering
    let matchesLocation = true;
    if (locationFilterEnabled && userLocation && event.location) {
      const venueDistance = venueDistances.find(
        v => v.venueName === event.location.name
      )?.distance;
      
      if (venueDistance !== undefined) {
        matchesLocation = venueDistance <= radius;
      }
    }
    
    return matchesSearch && matchesType && matchesLocation;
  });

  // Sort filtered events
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return a.startDate.getTime() - b.startDate.getTime();
      case 'title':
        return a.title.localeCompare(b.title);
      case 'venue':
        return a.location.name.localeCompare(b.location.name);
      default:
        return 0;
    }
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

      <LocationFilter
        enabled={locationFilterEnabled}
        onToggle={() => setLocationFilterEnabled(!locationFilterEnabled)}
        radius={radius}
        onRadiusChange={setRadius}
        distances={venueDistances}
      />

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
              onEdit={async (data) => await handleEditEvent(event, data)}
              onDelete={async () => await handleDeleteEvent(event.id)}
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