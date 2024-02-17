// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "mern-blog-80b66.firebaseapp.com",
  projectId: "mern-blog-80b66",
  storageBucket: "mern-blog-80b66.appspot.com",
  messagingSenderId: "586242924812",
  appId: "1:586242924812:web:8581398c34649715a4a929"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);

