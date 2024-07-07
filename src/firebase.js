// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAuHOjjL6DtVgDRuQZnZhYshOfZ15ZohXo",
  authDomain: "electronic-lock-851c6.firebaseapp.com",
  projectId: "electronic-lock-851c6",
  storageBucket: "electronic-lock-851c6.appspot.com",
  messagingSenderId: "243033749726",
  appId: "1:243033749726:web:ab92bfeac4171957e7aa4f",
  measurementId: "G-ZN3QE0FCSP"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app)
//const analytics = getAnalytics(app);

export { db, storage, auth};