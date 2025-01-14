import React, { useEffect, useState } from 'react';
import { Event } from '../../types';
import { 
  getPendingEvents, 
  updateEventStatus, 
  deleteRejectedAndExpiredEvents,
  getRejectedAndExpiredEvents,
  checkExpiredEvents
} from '../../services/events';
import EventRequestCard from './components/EventRequestCard';
import DeleteRejectedButton from './components/DeleteRejectedButton';
import RejectionModal from './components/RejectionModal';

const EventRequests = () => {
  const [pendingEvents, setPendingEvents] = useState<Event[]>([]);
  const [rejectedAndExpiredEvents, setRejectedAndExpiredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showRejectionModal, setShowRejectionModal] = useState(false);

  useEffect(() => {
    loadEvents();
    // Set up interval to check for expired events every minute
    const interval = setInterval(async () => {
      await checkExpiredEvents();
      await loadEvents();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const loadEvents = async () => {
    try {
      const [pending, rejectedAndExpired] = await Promise.all([
        getPendingEvents(),
        getRejectedAndExpiredEvents()
      ]);
      setPendingEvents(pending);
      setRejectedAndExpiredEvents(rejectedAndExpired);
    } catch (error) {
      console.error('Error loading events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (event: Event) => {
    try {
      await updateEventStatus(event.id, 'approved');
      await loadEvents();
    } catch (error) {
      console.error('Error approving event:', error);
    }
  };

  const handleReject = async (event: Event, reason: string) => {
    try {
      await updateEventStatus(event.id, 'rejected', reason);
      setShowRejectionModal(false);
      setSelectedEvent(null);
      await loadEvents();
    } catch (error) {
      console.error('Error rejecting event:', error);
    }
  };

  const handleDeleteRejectedAndExpired = async () => {
    try {
      await deleteRejectedAndExpiredEvents();
      await loadEvents();
    } catch (error) {
      console.error('Error deleting rejected and expired events:', error);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Event Requests</h1>
        <DeleteRejectedButton 
          events={rejectedAndExpiredEvents}
          onDelete={handleDeleteRejectedAndExpired} 
        />
      </div>

      {pendingEvents.length === 0 ? (
        <p className="text-center text-gray-500 py-8">No pending event requests</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pendingEvents.map((event) => (
            <EventRequestCard
              key={event.id}
              event={event}
              onApprove={() => handleApprove(event)}
              onReject={() => {
                setSelectedEvent(event);
                setShowRejectionModal(true);
              }}
            />
          ))}
        </div>
      )}

      {selectedEvent && (
        <RejectionModal
          isOpen={showRejectionModal}
          onClose={() => {
            setShowRejectionModal(false);
            setSelectedEvent(null);
          }}
          onConfirm={(reason) => handleReject(selectedEvent, reason)}
        />
      )}
    </div>
  );
};

export default EventRequests;