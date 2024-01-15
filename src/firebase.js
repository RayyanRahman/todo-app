// Imported the functions I need from the SDKs
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

//My  web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDt5zX_74OVakWLqn40gvCvQ2hkj4qkKL0",
  authDomain: "todo-app-by-rayyan.firebaseapp.com",
  projectId: "todo-app-by-rayyan",
  storageBucket: "todo-app-by-rayyan.appspot.com",
  messagingSenderId: "338662354014",
  appId: "1:338662354014:web:9fff52206ad14ae98b18cf",
};

// Initializing Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
