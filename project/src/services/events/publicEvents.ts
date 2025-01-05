import { query, where, getDocs, orderBy, doc, updateDoc, deleteDoc, Timestamp } from 'firebase/firestore';
import { eventsCollection, db } from '../firebase';
import { Event } from '../../types';

export const getApprovedPublicEvents = async (): Promise<Event[]> => {
  try {
    const q = query(
      eventsCollection,
      where('status', '==', 'approved'),
      where('type', '==', 'public'),
      orderBy('startDate', 'asc')
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        startDate: data.startDate?.toDate() || new Date(),
        endDate: data.endDate?.toDate() || new Date(),
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date()
      } as Event;
    });
  } catch (error) {
    console.error('Error fetching approved public events:', error);
    return [];
  }
};

export const updatePublicEvent = async (
  eventId: string,
  data: Partial<Event>
): Promise<void> => {
  const eventRef = doc(db, 'events', eventId);
  await updateDoc(eventRef, {
    ...data,
    updatedAt: Timestamp.now()
  });
};

export const deletePublicEvent = async (eventId: string): Promise<void> => {
  await deleteDoc(doc(db, 'events', eventId));
};