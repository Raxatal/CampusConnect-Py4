import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Event } from '../../types';

export const getEventById = async (eventId: string): Promise<Event | null> => {
  try {
    const eventDoc = await getDoc(doc(db, 'events', eventId));
    if (!eventDoc.exists()) return null;

    const data = eventDoc.data();
    return {
      id: eventDoc.id,
      ...data,
      startDate: data.startDate.toDate(),
      endDate: data.endDate.toDate(),
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate()
    } as Event;
  } catch (error) {
    console.error('Error fetching event:', error);
    return null;
  }
};