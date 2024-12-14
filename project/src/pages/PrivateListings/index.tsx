import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import EventCard from '../../components/events/EventCard';
import Modal from '../../components/ui/Modal';
import EventForm from '../../components/events/EventForm';
import { Event } from '../../types';

const PrivateListings = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  // Placeholder for private events data - will be replaced with actual API call
  const privateEvents: Event[] = [
    {
      id: '4',
      title: 'Study Group: Advanced Algorithms',
      date: new Date('2024-03-28'),
      location: { name: 'Library Discussion Room 3', coordinates: [5.355, 100.302] },
      description: 'Weekly study group for CS students.',
      organizer: 'Self',
      type: 'private'
    },
    // Add more private events as needed
  ];

  const handleCreatePrivateEvent = (data: Partial<Event>) => {
    // Handle creating private event
    console.log('Creating private event:', data);
    setIsCreateModalOpen(false);
  };

  const handleDeleteEvent = (eventId: string) => {
    // Handle deleting private event
    console.log('Deleting event:', eventId);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Your Private Events</h1>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Create Private Event
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {privateEvents.map((event) => (
          <div key={event.id} className="relative">
            <EventCard 
              event={event}
              onClick={() => setSelectedEvent(event)}
            />
            <button
              onClick={() => handleDeleteEvent(event.id)}
              className="absolute top-2 right-2 p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create Private Event"
      >
        <EventForm
          onSubmit={handleCreatePrivateEvent}
          onCancel={() => setIsCreateModalOpen(false)}
        />
      </Modal>

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

export default PrivateListings;