import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, query, orderBy } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA3QPvorrS_VxoCxSD3hP1FB3nTIHpNjSY",
  authDomain: "visitorsbook-e8352.firebaseapp.com",
  projectId: "visitorsbook-e8352",
  storageBucket: "visitorsbook-e8352.appspot.com",
  messagingSenderId: "554843480451",
  appId: "1:554843480451:web:8d031b8d8dd90995c9d6b6",
  measurementId: "G-SD11XSRGXK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();
const storage = getStorage();

const usersRef = collection(db, "Users");
const eventsRef = collection(db, "Events");
const companyRef = collection(db, "Companies");

export const getEvents = () => {
  const q = query(eventsRef, orderBy("eventDate"));

  return q;
};

export const getCompanies = () => {
  const q = query(companyRef);

  return q;
};

export const getUsers = () => {
  const q = query(usersRef);

  return q;
};

export const uploadImage = (file) => {
  const storageRef = ref(storage, `files/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);
  return uploadTask;
};
