// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "insta-next-firebase-69d34.firebaseapp.com",
  projectId: "insta-next-firebase-69d34",
  storageBucket: "insta-next-firebase-69d34.appspot.com",
  messagingSenderId: "203271339562",
  appId: "1:203271339562:web:0c676191fdbda8c9440d53"
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);




