import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDwYvwj5_ZKmf1PmHA221npnFrAHt-UqpE",
    authDomain: "galaktik-20f9f.firebaseapp.com",
    projectId: "galaktik-20f9f",
    storageBucket: "galaktik-20f9f.firebasestorage.app",
    messagingSenderId: "552838900544",
    appId: "1:552838900544:web:1d75fec6c95eead20aa8a5",
    measurementId: "G-JE29TZNQFS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
