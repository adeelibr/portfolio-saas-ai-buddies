// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_yZd2XW9hip5jJbjbElLTnUP5cZPaBGI",
  authDomain: "portfolio-saas-ai-buddies.firebaseapp.com",
  projectId: "portfolio-saas-ai-buddies",
  storageBucket: "portfolio-saas-ai-buddies.appspot.com",
  messagingSenderId: "636842179326",
  appId: "1:636842179326:web:dd32276a60c13a7af403af"
};

// Initialize Firebase
const app = getApps.length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app);

export { auth, db, functions };
