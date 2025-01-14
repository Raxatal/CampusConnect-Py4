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

export const checkExpiredEvents = async (): Promise<void> => {
  try {
    const now = new Date();
    const q = query(
      collection(db, EVENTS_COLLECTION),
      where('status', '==', 'approved')
    );
    
    const snapshot = await getDocs(q);
    const expiredEvents = snapshot.docs.filter(doc => {
      const data = doc.data();
      const endDate = data.endDate.toDate();
      return endDate < now;
    });

    // Update all expired events in parallel
    await Promise.all(expiredEvents.map(doc => 
      updateDoc(doc.ref, {
        status: 'expired',
        updatedAt: Timestamp.now()
      })
    ));

    if (expiredEvents.length > 0) {
      console.log(`Updated ${expiredEvents.length} expired events`);
    }
  } catch (error) {
    console.error('Error checking for expired events:', error);
  }
};

export const getRejectedAndExpiredEvents = async (): Promise<Event[]> => {
  const q = query(
    collection(db, EVENTS_COLLECTION),
    where('status', 'in', ['rejected', 'expired'])
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

export const deleteRejectedAndExpiredEvents = async (): Promise<void> => {
  const q = query(
    collection(db, EVENTS_COLLECTION),
    where('status', 'in', ['rejected', 'expired'])
  );
  
  const snapshot = await getDocs(q);
  const batch = snapshot.docs.map(doc => deleteDoc(doc.ref));
  await Promise.all(batch);
};