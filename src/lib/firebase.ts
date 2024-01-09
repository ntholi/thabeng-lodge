import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCla13GCb3mso9JfTna4e10qDoNaAlj1SM",
  authDomain: "thabeng-hotel.firebaseapp.com",
  projectId: "thabeng-hotel",
  storageBucket: "thabeng-hotel.appspot.com",
  messagingSenderId: "866728967458",
  appId: "1:866728967458:web:0a7f704fd4301b126fb97b",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
