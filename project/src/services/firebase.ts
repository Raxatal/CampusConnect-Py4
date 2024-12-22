import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from '../config/firebase';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Auth and Firestore instances
export const auth = getAuth(app);
export const db = getFirestore(app);

// Event collection reference
export const EVENTS_COLLECTION = 'events';
export const PRIVATE_EVENTS_COLLECTION = 'private_events';
export const EVENT_REQUESTS_COLLECTION = 'event_requests';