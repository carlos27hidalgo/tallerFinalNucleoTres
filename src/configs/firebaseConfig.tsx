// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

import { getAuth, getReactNativePersistence, initializeAuth, signOut } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJU5UB3qvRzaRWyYGTYlFLYxhzBi6a3sU",
  authDomain: "tallerfinalnucleo3.firebaseapp.com",
  projectId: "tallerfinalnucleo3",
  storageBucket: "tallerfinalnucleo3.appspot.com",
  messagingSenderId: "844272035742",
  appId: "1:844272035742:web:fcfc9251c75e837f73d88f",
  databaseURL: "https://tallerfinalnucleo3-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const dbRealTime = getDatabase(app) 

/*export const signOutDB = signOut(auth).then(() => {
  // Sign-out successful.
  console.log("deslogueo correcto")
}).catch((error) => {
  console.log(error)
  // An error happened.
}); */