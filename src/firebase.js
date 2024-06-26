// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
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

// Initialize Firebase
export const app = initializeApp(firebaseConfig);


//Storage Rules
// rules_version = '2';

// Craft rules based on data in your Firestore database
// allow write: if firestore.get(
//    /databases/(default)/documents/users/$(request.auth.uid)).data.isAdmin;
// service firebase.storage {
//   match /b/{bucket}/o {
//     match /{allPaths=**} {
//       allow read;
//       allow write: if
//       request.resource.size < 2 * 1024 * 1024 &&
//       request.resource.contentType.matches('image/.*')
//     }
//   }
// }




