// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_dBAo8-uJZNQEvA13jactxpnVTJpNyz8",
  authDomain: "campus-connect-bf067.firebaseapp.com",
  projectId: "campus-connect-bf067",
  storageBucket: "campus-connect-bf067.firebasestorage.app",
  messagingSenderId: "361788091187",
  appId: "1:361788091187:web:61eafb4318b84db7ea2c46",
  measurementId: "G-H9C6D91DWS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//Export Services
export default app;