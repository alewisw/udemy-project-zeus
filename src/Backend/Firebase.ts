// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  authDomain: "udemy-project-zeus.firebaseapp.com",
  projectId: "udemy-project-zeus",
  storageBucket: "udemy-project-zeus.firebasestorage.app",
  messagingSenderId: "320340985323",
  appId: "1:320340985323:web:aee75a77405beca7d6c5ae",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
