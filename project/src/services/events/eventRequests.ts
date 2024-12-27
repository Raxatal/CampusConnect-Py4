import { collection, addDoc, query, where, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { Event } from '../../types';

const EVENTS_COLLECTION = 'events';

export const createEventRequest = async (
  eventData: Omit<Event, 'id' | 'status' | 'createdAt' | 'updatedAt'>
): Promise<string> => {
  const eventRef = await addDoc(collection(db, EVENTS_COLLECTION), {
    ...eventData,
    status: 'pending',
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now()
  });
  return eventRef.id;
};

export const getUserEvents = async (userId: string): Promise<Event[]> => {
  const q = query(
    collection(db, EVENTS_COLLECTION),
    where('organizerId', '==', userId)
  );
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    startDate: doc.data().startDate.toDate(),
    endDate: doc.data().endDate.toDate(),
    createdAt: doc.data().createdAt.toDate(),
    updatedAt: doc.data().updatedAt.toDate()
  })) as Event[];
};