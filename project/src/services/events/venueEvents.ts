import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Event } from '../../types';

export const getEventsByVenue = async (venueId: string): Promise<Event[]> => {
  try {
    const q = query(
      collection(db, 'events'),
      where('location.id', '==', venueId),
      where('status', '==', 'approved')
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        startDate: data.startDate.toDate(),
        endDate: data.endDate.toDate(),
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate()
      } as Event;
    });
  } catch (error) {
    console.error('Error fetching venue events:', error);
    return [];
  }
};