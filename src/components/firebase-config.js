
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore}  from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDvbJvrnwl_fWQCMF5x64hiQ_K_Fgy-sbg",
  authDomain: "notesway-1f357.firebaseapp.com",
  projectId: "notesway-1f357",
  storageBucket: "notesway-1f357.appspot.com",
  messagingSenderId: "321939275331",
  appId: "1:321939275331:web:8fb2654d889b503a235ef6",
  measurementId: "G-2DCJTQTRPP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db=getFirestore(app);
