// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZST6GGR8__myg7Jc5nspLN11e319hxmA",
  authDomain: "realestateweb-react.firebaseapp.com",
  projectId: "realestateweb-react",
  storageBucket: "realestateweb-react.appspot.com",
  messagingSenderId: "773383921915",
  appId: "1:773383921915:web:b7b26484507c1742c0905e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();
