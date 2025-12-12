// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCcMxYXnD6T6fB9u2bj0XSYrPr7F5JcG-4",
  authDomain: "time-trcker-app.firebaseapp.com",
  projectId: "time-trcker-app",
  storageBucket: "time-trcker-app.firebasestorage.app",
  messagingSenderId: "266222951874",
  appId: "1:266222951874:web:e926e7d328f881cf614a5b",
  measurementId: "G-4PJ7LE49M1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
//const analytics = getAnalytics(app);