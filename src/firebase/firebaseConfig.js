import { initializeApp } from "firebase/app";
import {GoogleAuthProvider, OAuthProvider, getAuth} from 'firebase/auth'
import {getStorage} from 'firebase/storage'
import {getFirestore} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhENvTsV461B045DYxo7sqPOPbsAp_yaE",
  authDomain: "e-commerce-64d90.firebaseapp.com",
  projectId: "e-commerce-64d90",
  storageBucket: "e-commerce-64d90.appspot.com",
  messagingSenderId: "1081898762316",
  appId: "1:1081898762316:web:a83404df591b43494ff4e9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// auth

export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const appleProvider = new OAuthProvider("apple.com");

// storage 

export const storage = getStorage(app)

// db 

export const db = getFirestore(app)
