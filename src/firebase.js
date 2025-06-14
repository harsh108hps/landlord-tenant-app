// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getDatabase } from "firebase/database";



const firebaseConfig = {
  apiKey: "AIzaSyCBQkdex7Eqg-1tJkQKwZgG1cI7dLs07y4",
  authDomain: "tenant-landlordhub.firebaseapp.com",
  projectId: "tenant-landlordhub",
  storageBucket: "tenant-landlordhub.firebasestorage.app",
    databaseURL: "https://tenant-landlordhub-default-rtdb.asia-southeast1.firebasedatabase.app/",
  messagingSenderId: "227682921887",
  appId: "1:227682921887:web:50d4804976f093e37361aa",
  measurementId: "G-M07DKM75LJ"
};



const app = initializeApp(firebaseConfig);

// ✅ Correct export of auth object
const auth = getAuth(app);
export { auth };
export const db = getFirestore(app); 
export const database = getDatabase(app);