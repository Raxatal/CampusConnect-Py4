import { collection, query, where, getDocs, deleteDoc, updateDoc, doc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { Event } from '../../types';
import { EventStatus } from './types';

const EVENTS_COLLECTION = 'events';

export const getPendingEvents = async (): Promise<Event[]> => {
  const q = query(
    collection(db, EVENTS_COLLECTION),
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
  const eventRef = doc(db, EVENTS_COLLECTION, eventId);
  await updateDoc(eventRef, {
    status,
    ...(rejectionReason && { rejectionReason }),
    updatedAt: Timestamp.now()
  });
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