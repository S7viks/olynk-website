// Import the functions you need from the Firebase SDKs
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdVcZEt7JpWQp9nY-_1O0CXXOo9ciqu2Y",
  authDomain: "olynk-3ad71.firebaseapp.com",
  projectId: "olynk-3ad71",
  storageBucket: "olynk-3ad71.firebasestorage.app",
  messagingSenderId: "136104705120",
  appId: "1:136104705120:web:1fe6d8a2973c042b889705",
  measurementId: "G-044FCGCXPD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Export the Firestore database instance
export { db };