// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCTOcxOZTfu4qKHVyIDol6mM5aFaOgNF0",
  authDomain: "expense-tracker-11fee.firebaseapp.com",
  projectId: "expense-tracker-11fee",
  storageBucket: "expense-tracker-11fee.appspot.com",
  messagingSenderId: "1075032802791",
  appId: "1:1075032802791:web:5d2dbe1f2bf41682dbe942"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);