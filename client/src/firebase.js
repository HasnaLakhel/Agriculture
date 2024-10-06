// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "agriculture-3c6ae.firebaseapp.com",
  projectId: "agriculture-3c6ae",
  storageBucket: "agriculture-3c6ae.appspot.com",
  messagingSenderId: "1022496165530",
  appId: "1:1022496165530:web:33010c704096cc7fd11923"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

