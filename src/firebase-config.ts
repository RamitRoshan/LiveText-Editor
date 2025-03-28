// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore";
 
//Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFJsudaxEbMkZVxKD6nPq9XaaDFFaFcbE",
  authDomain: "docs-clone-73385.firebaseapp.com",
  projectId: "docs-clone-73385",
  storageBucket: "docs-clone-73385.firebasestorage.app",
  messagingSenderId: "441316913431",
  appId: "1:441316913431:web:a28f247f65b7d9c0730752"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
