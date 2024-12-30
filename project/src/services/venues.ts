import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import { Venue } from '../types';

const venuesCollection = collection(db, 'venues');

export const getVenues = async (): Promise<Venue[]> => {
  try {
    const snapshot = await getDocs(venuesCollection);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Venue));
  } catch (error) {
    console.error('Error fetching venues:', error);
    return initialVenues.map((venue, index) => ({
      ...venue,
      id: `venue-${index + 1}`
    }));
  }
};

// Initial venues data with separate lat/lng
export const initialVenues: Omit<Venue, 'id'>[] = [
  {
    name: 'Dewan Tuanku Syed Putra (DTSP)',
    latitude: 5.355,
    longitude: 100.302,
    capacity: 2000,
    type: 'indoor'
  },
  {
    name: 'Dewan Kuliah G (DKG)',
    latitude: 5.358,
    longitude: 100.304,
    capacity: 300,
    type: 'indoor'
  },
  {
    name: 'Padang Kawad',
    latitude: 5.356,
    longitude: 100.303,
    capacity: 5000,
    type: 'outdoor'
  },
  {
    name: 'Foyer Pelangi',
    latitude: 5.357,
    longitude: 100.302,
    capacity: 200,
    type: 'indoor'
  }
];