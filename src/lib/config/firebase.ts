// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDYc6npA4YzlLFG25WfEiUFtkQRNQupqV8',
  authDomain: 'litekotests.firebaseapp.com',
  projectId: 'litekotests',
  storageBucket: 'litekotests.appspot.com',
  messagingSenderId: '444060027240',
  appId: '1:444060027240:web:e0696768d0911af9fbeedd',
  measurementId: 'G-6D8C8JFXWK',
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, auth, storage };
