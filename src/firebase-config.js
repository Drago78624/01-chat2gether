import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAHepK0NotHE8MhTK2jCUoCn1qX3TBs9is",
  authDomain: "chat2gether-1f857.firebaseapp.com",
  projectId: "chat2gether-1f857",
  storageBucket: "chat2gether-1f857.appspot.com",
  messagingSenderId: "666278184109",
  appId: "1:666278184109:web:39d099e7ef263936057224",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
export const db = getFirestore(app)
