// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "patientpriority-3a4f2.firebaseapp.com",
  projectId: "patientpriority-3a4f2",
  storageBucket: "patientpriority-3a4f2.appspot.com",
  messagingSenderId: "977195430733",
  appId: "1:977195430733:web:519d305e8b29c5f9763d04",
  measurementId: "G-MQVY1ZGBP3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);
