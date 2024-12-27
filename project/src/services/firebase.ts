import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection } from 'firebase/firestore';
import { firebaseConfig } from '../config/firebase';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Auth and Firestore instances
export const auth = getAuth(app);
export const db = getFirestore(app);

// Collection references
export const eventsCollection = collection(db, 'events');

// Initialize indexes
// Note: In a production environment, you would need to create these indexes in the Firebase Console
// Required index for querying approved public events sorted by date:
// Collection: events
// Fields indexed:
// - status Ascending
// - type Ascending
// - startDate Ascending