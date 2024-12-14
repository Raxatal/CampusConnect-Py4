import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import EventCard from '../../components/events/EventCard';
import Modal from '../../components/ui/Modal';
import EventForm from '../../components/events/EventForm';
import EventDetailsModal from '../../components/events/EventDetailsModal';
import { Event } from '../../types';

const Requests = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  // Placeholder for requests data - will be replaced with actual API call
  const requests: Event[] = [
    {
      id: '3',
      title: 'Programming Workshop',
      date: new Date('2024-04-01'),
      location: { name: 'Lab 101', coordinates: [5.355, 100.302] },
      description: 'Hands-on programming workshop for beginners.',
      organizer: 'Computing Society',
      type: 'public',
      status: 'pending'
    },
    // Add more requests as needed
  ];

  const handleCreateRequest = (data: Partial<Event>) => {
    // Handle creating event request
    console.log('Creating event request:', data);
    setIsCreateModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Your Event Requests</h1>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Create Request
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {requests.map((request) => (
          <EventCard
            key={request.id}
            event={request}
            onClick={() => setSelectedEvent(request)}
          />
        ))}
      </div>

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create Event Request"
      >
        <EventForm
          onSubmit={handleCreateRequest}
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

export default Requests;