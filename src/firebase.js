import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB2RrBORHeIINx_y-izwttIaxI6zbzHRfM",
  authDomain: "blog-educativo-d06ee.firebaseapp.com",
  projectId: "blog-educativo-d06ee",
  storageBucket: "blog-educativo-d06ee.firebasestorage.app",
  messagingSenderId: "423440979795",
  appId: "1:423440979795:web:43510749554412348273a6",
  measurementId: "G-YJW928CHVF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };