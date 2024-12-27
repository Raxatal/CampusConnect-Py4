import { useState, useEffect } from 'react';
import { Event } from '../../../types';
import { useAuth } from '../../../contexts/AuthContext';
import { 
  getUserPrivateEvents, 
  createPrivateEvent, 
  deletePrivateEvent, 
  updatePrivateEvent 
} from '../../../services/events/privateEvents';

export const usePrivateEvents = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  const loadEvents = async () => {
    if (!user) return;
    try {
      const userEvents = await getUserPrivateEvents(user.uid);
      setEvents(userEvents);
    } catch (error) {
      console.error('Error loading private events:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      loadEvents();
    }
  }, [user]);

  const createEvent = async (data: Omit<Event, 'id' | 'status' | 'createdAt' | 'updatedAt'>) => {
    try {
      await createPrivateEvent(data);
      await loadEvents();
      return true;
    } catch (error) {
      console.error('Error creating private event:', error);
      return false;
    }
  };

  const updateEvent = async (
    eventId: string,
    data: Partial<Omit<Event, 'id' | 'type' | 'status'>>
  ) => {
    try {
      await updatePrivateEvent(eventId, data);
      await loadEvents();
      return true;
    } catch (error) {
      console.error('Error updating private event:', error);
      return false;
    }
  };

  const deleteEvent = async (eventId: string) => {
    try {
      await deletePrivateEvent(eventId);
      await loadEvents();
      return true;
    } catch (error) {
      console.error('Error deleting private event:', error);
      return false;
    }
  };

  return {
    events,
    loading,
    createEvent,
    updateEvent,
    deleteEvent
  };
};

export default usePrivateEvents;