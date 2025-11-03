// config/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBmpDtywD5-01szKjm8q4AHVWKQsxZbNBY",
  authDomain: "usmapadova-stats.firebaseapp.com",
  projectId: "usmapadova-stats",
  storageBucket: "usmapadova-stats.firebasestorage.app",
  messagingSenderId: "1033668859351",
  appId: "1:1033668859351:web:590f57468fc513c6b5e792"
};


// Inizializza Firebase
const app = initializeApp(firebaseConfig);

// Inizializza Firestore (per dati storici)
export const db = getFirestore(app);

// Inizializza Realtime Database (per partite attive)
export const realtimeDb = getDatabase(app);

// Debug: verifica connessione
if (typeof window !== 'undefined') {
  console.log('Firebase Realtime Database configurato:', firebaseConfig.databaseURL);
}

export default app;