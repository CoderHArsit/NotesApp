
// Import the functions you need from the SDKs you need
import { getFirestore}  from "firebase/firestore";
// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC75m-Sv9HgaZaWfR5C-4shpyVmmt_4PdM",
  authDomain: "newprojext-b1df7.firebaseapp.com",
  projectId: "newprojext-b1df7",
  storageBucket: "newprojext-b1df7.appspot.com",
  messagingSenderId: "989327655709",
  appId: "1:989327655709:web:f6e868ce1a49b605b997f4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
