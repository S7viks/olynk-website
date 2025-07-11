import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, Firestore } from "firebase/firestore";
import { getAuth, Auth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChZxNv1dnZGIHva3hyA_O-zUlZtFxiI4Y",
  authDomain: "olynk-5f8f3.firebaseapp.com",
  projectId: "olynk-5f8f3",
  storageBucket: "olynk-5f8f3.firebasestorage.app",
  messagingSenderId: "900465754898",
  appId: "1:900465754898:web:b194c222e227e0980769cb",
  measurementId: "G-5R3T7VRFQQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const analytics = getAnalytics(app);
export const db: Firestore = getFirestore(app);
export const auth: Auth = getAuth(app);
export const storage = getStorage(app);

export default app;