import { collection, query, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import { Event } from '../types';

export const getEventAnalytics = async () => {
  try {
    const eventsRef = collection(db, 'events');
    const snapshot = await getDocs(eventsRef);
    
    const events = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        startDate: data.startDate?.toDate() || new Date(),
        endDate: data.endDate?.toDate() || new Date(),
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
        status: data.status || 'pending',
        isMyCSD: !!data.isMyCSD,
        location: {
          name: data.location?.name || 'Unknown Venue',
          coordinates: data.location?.coordinates || [0, 0]
        }
      } as Event;
    });

    // Calculate analytics
    const analytics = {
      totalEvents: events.length,
      statusDistribution: {
        approved: 0,
        pending: 0,
        rejected: 0,
        expired: 0
      },
      venueDistribution: {} as { [key: string]: number },
      myCSDDistribution: {
        myCSD: 0,
        regular: 0
      }
    };

    events.forEach(event => {
      // Status distribution
      if (event.status) {
        analytics.statusDistribution[event.status as keyof typeof analytics.statusDistribution] = 
          (analytics.statusDistribution[event.status as keyof typeof analytics.statusDistribution] || 0) + 1;
      }

      // Venue distribution
      const venueName = event.location?.name || 'Unknown Venue';
      analytics.venueDistribution[venueName] = (analytics.venueDistribution[venueName] || 0) + 1;

      // MyCSD distribution
      if (event.isMyCSD) {
        analytics.myCSDDistribution.myCSD++;
      } else {
        analytics.myCSDDistribution.regular++;
      }
    });

    return analytics;
  } catch (error) {
    console.error('Error getting event analytics:', error);
    throw error;
  }
};