import { collection, query, where, getDocs, addDoc, deleteDoc, doc, updateDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { Event } from '../../types';

export const getUserPrivateEvents = async (userId: string): Promise<Event[]> => {
  const q = query(
    collection(db, 'events'),
    where('organizerId', '==', userId),
    where('type', '==', 'private')
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

export const createPrivateEvent = async (
  eventData: Omit<Event, 'id' | 'status' | 'createdAt' | 'updatedAt'>
): Promise<string> => {
  const eventRef = await addDoc(collection(db, 'events'), {
    ...eventData,
    type: 'private',
    status: 'approved', // Private events are auto-approved
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now()
  });
  return eventRef.id;
};

export const deletePrivateEvent = async (eventId: string): Promise<void> => {
  await deleteDoc(doc(db, 'events', eventId));
};

export const updatePrivateEvent = async (
  eventId: string,
  data: Partial<Omit<Event, 'id' | 'type' | 'status'>>
): Promise<void> => {
  await updateDoc(doc(db, 'events', eventId), {
    ...data,
    updatedAt: Timestamp.now()
  });
};