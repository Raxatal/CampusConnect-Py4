import { collection, addDoc, updateDoc, doc, query, where, getDocs, Timestamp, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';
import { Event } from '../types';

const EVENTS_COLLECTION = 'events';

export const createEventRequest = async (eventData: Omit<Event, 'id' | 'status' | 'createdAt' | 'updatedAt'>): Promise<string> => {
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

export const getRandomApprovedEvents = async (limit: number = 4): Promise<Event[]> => {
  const q = query(
    collection(db, EVENTS_COLLECTION),
    where('status', '==', 'approved'),
    where('type', '==', 'public')
  );
  
  const snapshot = await getDocs(q);
  const events = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    startDate: doc.data().startDate.toDate(),
    endDate: doc.data().endDate.toDate(),
    createdAt: doc.data().createdAt.toDate(),
    updatedAt: doc.data().updatedAt.toDate()
  })) as Event[];
  
  // Shuffle and limit
  return events.sort(() => Math.random() - 0.5).slice(0, limit);
};

export const deleteRejectedEvents = async (): Promise<void> => {
  const q = query(
    collection(db, EVENTS_COLLECTION),
    where('status', '==', 'rejected')
  );
  
  const snapshot = await getDocs(q);
  const batch = snapshot.docs.map(doc => deleteDoc(doc.ref));
  await Promise.all(batch);
};