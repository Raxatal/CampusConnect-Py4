import React, { useState, useEffect } from 'react';
import { Event } from '../../types';
import { createEventRequest, getUserEvents } from '../../services/events';
import { useAuth } from '../../contexts/AuthContext';
import Modal from '../../components/ui/Modal';
import EventRequestForm from '../../components/events/EventRequestForm';
import EventDetailsModal from '../../components/events/EventDetailsModal';
import RequestList from './components/RequestList';
import CreateRequestButton from './components/CreateRequestButton';

const Requests = () => {
  const { user } = useAuth();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userEvents, setUserEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadUserEvents();
    }
  }, [user]);

  const loadUserEvents = async () => {
    try {
      const events = await getUserEvents(user!.uid);
      setUserEvents(events);
    } catch (error) {
      console.error('Error loading user events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateRequest = async (data: Omit<Event, 'id' | 'status' | 'createdAt' | 'updatedAt'>) => {
    try {
      setIsSubmitting(true);
      await createEventRequest(data);
      setIsCreateModalOpen(false);
      loadUserEvents();
    } catch (error) {
      console.error('Error creating event request:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Your Event Requests</h1>
        <CreateRequestButton onClick={() => setIsCreateModalOpen(true)} />
      </div>

      <RequestList 
        events={userEvents} 
        onEventClick={setSelectedEvent} 
      />

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create Event Request"
      >
        <EventRequestForm
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