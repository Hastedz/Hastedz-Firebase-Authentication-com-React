// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDz1AK5c7TfZpLi8yDtzgRtsCzgtdh-9Ko",
  authDomain: "fir-authentication-e1c40.firebaseapp.com",
  projectId: "fir-authentication-e1c40",
  storageBucket: "fir-authentication-e1c40.firebasestorage.app",
  messagingSenderId: "257645172516",
  appId: "1:257645172516:web:369d28633866686cd805b1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);