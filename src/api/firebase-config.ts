import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCnzfyHyGo4A7ADfbvzk0kVcNY57rrgdMU",
  authDomain: "flashy-fdf00.firebaseapp.com",
  projectId: "flashy-fdf00",
  storageBucket: "flashy-fdf00.appspot.com",
  messagingSenderId: "180381798197",
  appId: "1:180381798197:web:6bb3f83342d562ca5dc67c",
  measurementId: "G-5B5NB8QXPN",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth();

export default db;
