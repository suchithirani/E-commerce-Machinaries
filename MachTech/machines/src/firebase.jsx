import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVV-bdQESDNGkX_mHQcnxCgKmIL7KvokI",
  authDomain: "mighty-tech-54fbd.firebaseapp.com",
  projectId: "mighty-tech-54fbd",
  storageBucket: "mighty-tech-54fbd.firebasestorage.app",
  messagingSenderId: "242752589885",
  appId: "1:242752589885:web:03e49d10cbfe67ec905a54",
  measurementId: "G-3WD5HYK1PC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebaseconst app = initializeApp(firebaseConfig);

export const auth=getAuth();
export const db=getFirestore(app);
export default app;