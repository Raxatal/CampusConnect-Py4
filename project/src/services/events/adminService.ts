import { collection, query, where, getDocs, deleteDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { Event } from '../../types';
import { EventStatus } from './types';
import { updateEvent } from './eventService';

export const getPendingEvents = async (): Promise<Event[]> => {
  const q = query(
    collection(db, 'events'),
    where('status', '==', 'pending')
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

export const updateEventStatus = async (
  eventId: string, 
  status: EventStatus,
  rejectionReason?: string
): Promise<void> => {
  await updateEvent(eventId, {
    status,
    rejectionReason,
    updatedAt: Timestamp.now()
  });
};

export const deleteRejectedEvents = async (): Promise<void> => {
  const q = query(
    collection(db, 'events'),
    where('status', '==', 'rejected')
  );
  
  const snapshot = await getDocs(q);
  const batch = snapshot.docs.map(doc => deleteDoc(doc.ref));
  await Promise.all(batch);
};