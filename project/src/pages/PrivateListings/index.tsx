import React, { useState } from 'react';
import { Event } from '../../types';
import Modal from '../../components/ui/Modal';
import DeleteConfirmationModal from '../../components/ui/DeleteConfirmationModal';
import EventDetailsModal from '../../components/events/EventDetailsModal';
import PrivateEventForm from '../../components/events/PrivateEventForm';
import Header from './components/Header';
import EventsList from './components/EventsList';
import usePrivateEvents from './hooks/usePrivateEvents';

const PrivateListings = () => {
  const { events, loading, createEvent, updateEvent, deleteEvent } = usePrivateEvents();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [detailsEvent, setDetailsEvent] = useState<Event | null>(null);
  const [eventToDelete, setEventToDelete] = useState<string | null>(null);

  const handleCreateEvent = async (data: Omit<Event, 'id' | 'status' | 'createdAt' | 'updatedAt'>) => {
    const success = await createEvent(data);
    if (success) {
      setIsCreateModalOpen(false);
    }
  };

  const handleUpdateEvent = async (data: Omit<Event, 'id' | 'status' | 'createdAt' | 'updatedAt'>) => {
    if (!selectedEvent) return;
    const success = await updateEvent(selectedEvent.id, data);
    if (success) {
      setIsEditModalOpen(false);
      setSelectedEvent(null);
    }
  };

  const handleDeleteEvent = async () => {
    if (!eventToDelete) return;
    await deleteEvent(eventToDelete);
    setIsDeleteModalOpen(false);
    setEventToDelete(null);
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <Header onCreateClick={() => setIsCreateModalOpen(true)} />
      
      <EventsList
        events={events}
        onEventClick={setDetailsEvent}
        onEventEdit={(event) => {
          setSelectedEvent(event);
          setIsEditModalOpen(true);
        }}
        onEventDelete={(eventId) => {
          setEventToDelete(eventId);
          setIsDeleteModalOpen(true);
        }}
      />

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create Private Event"
      >
        <PrivateEventForm
          onSubmit={handleCreateEvent}
          onCancel={() => setIsCreateModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedEvent(null);
        }}
        title="Edit Private Event"
      >
        <PrivateEventForm
          onSubmit={handleUpdateEvent}
          onCancel={() => {
            setIsEditModalOpen(false);
            setSelectedEvent(null);
          }}
          initialData={selectedEvent || undefined}
          submitLabel="Save Changes"
        />
      </Modal>

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setEventToDelete(null);
        }}
        onConfirm={handleDeleteEvent}
      />

      {detailsEvent && (
        <EventDetailsModal
          event={detailsEvent}
          isOpen={!!detailsEvent}
          onClose={() => setDetailsEvent(null)}
        />
      )}
    </div>
  );
};

export default PrivateListings;