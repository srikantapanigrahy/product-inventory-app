// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUzezHLH8F3suPDBeuS1oSBR7TvIn42yY",
  authDomain: "ganeshapp-8f1a6.firebaseapp.com",
  projectId: "ganeshapp-8f1a6",
  storageBucket: "ganeshapp-8f1a6.firebasestorage.app",
  messagingSenderId: "592833738112",
  appId: "1:592833738112:web:b174c62d965c7c16afbd65",
  measurementId: "G-G76D1PRTET"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();