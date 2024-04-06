// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

import { getAuth, getReactNativePersistence, initializeAuth } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJ__lh0ZyTLkvLKPC21mdNPRhfUEukfuU",
  authDomain: "nucleo3-53018.firebaseapp.com",
  projectId: "nucleo3-53018",
  storageBucket: "nucleo3-53018.appspot.com",
  messagingSenderId: "348697286993",
  appId: "1:348697286993:web:885eb7e94414d50dea9b70",
  databaseURL: "https://nucleo3-53018-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const dbRealTime = getDatabase(app) 

/*export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });*/