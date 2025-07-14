// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "mern-blog-amel.firebaseapp.com",
  projectId: "mern-blog-amel",
  storageBucket: "mern-blog-amel.firebasestorage.app",
  messagingSenderId: "1078239243525",
  appId: "1:1078239243525:web:3832d8e947ae97f59d5b6c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);