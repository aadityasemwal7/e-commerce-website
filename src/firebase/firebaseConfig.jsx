import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDgTsTuRNlyHOLhuYcDZtDylPmHD3nUMU8",
  authDomain: "bd-website-940a3.firebaseapp.com",
  projectId: "bd-website-940a3",
  storageBucket: "bd-website-940a3.appspot.com",
  messagingSenderId: "752548924523",
  appId: "1:752548924523:web:240117ad6461d8580c352e"
}

const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app)
const auth = getAuth(app)

export { fireDB, auth }