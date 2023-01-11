import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {

  apiKey: "AIzaSyCwW6CImYe4HKMMCD0F4ts9cCF4n0EBpeM",
  authDomain: "chatapp-d754a.firebaseapp.com",
  projectId: "chatapp-d754a",
  storageBucket: "chatapp-d754a.appspot.com",
  messagingSenderId: "97161068642",
  appId: "1:97161068642:web:71bc1dd012ff4aa3a2113b",
  measurementId: "G-D1Q4QDKND7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();

// For storing the images
export const storage = getStorage();
export const db = getFirestore();
// const analytics = getAnalytics(app);