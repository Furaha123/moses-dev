import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDpqg6BH68i0vGnOghSaxMKi1W_ZPhEXu4",
  authDomain: "moses-dev.firebaseapp.com",
  projectId: "moses-dev",
  storageBucket: "moses-dev.firebasestorage.app",
  messagingSenderId: "1015618593874",
  appId: "1:1015618593874:web:91e1b0fa390cd8755beb8b",
  measurementId: "G-1BEF1RQ6V7",
  databaseURL: "https://moses-dev-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);
