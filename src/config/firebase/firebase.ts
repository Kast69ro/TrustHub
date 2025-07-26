import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAuXEo6TgSU5iJlq9b6UK6Nold5s2Vf1Gw",
  authDomain: "trusthub-f09c6.firebaseapp.com",
  projectId: "trusthub-f09c6",
  storageBucket: "trusthub-f09c6.firebasestorage.app",
  messagingSenderId: "929197387759",
  appId: "1:929197387759:web:33d3881ebba3c4b803901a",
  measurementId: "G-B19GVDQE64",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
