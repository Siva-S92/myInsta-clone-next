// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "insta-nextjs-fb.firebaseapp.com",
  projectId: "insta-nextjs-fb",
  storageBucket: "insta-nextjs-fb.appspot.com",
  messagingSenderId: "88392067403",
  appId: "1:88392067403:web:7a9a8af87f8e1faae0e0ce"
};

// Initialize Firebase only once
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
}

const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };






