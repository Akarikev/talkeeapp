// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIR7GI6aLcAAbtH7QX0-5pwkfKHLmW2zU",
  authDomain: "talkeeapp-604fb.firebaseapp.com",
  projectId: "talkeeapp-604fb",
  storageBucket: "talkeeapp-604fb.appspot.com",
  messagingSenderId: "311633313514",
  appId: "1:311633313514:web:19aa96d3e6affb03eee193",
  measurementId: "G-BFKBK92W4C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth  = getAuth(app); 
export const provider  = new GoogleAuthProvider();
export const db = getFirestore(app); 
