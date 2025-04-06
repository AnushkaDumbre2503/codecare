
// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDwX2VlkdgQSC0Lp10XLni5-QlU2hwj4P4",
    authDomain: "codecare2503.firebaseapp.com",
    projectId: "codecare2503",
    storageBucket: "codecare2503.appspot.com",
    messagingSenderId: "934670174568",
    appId: "1:934670174568:web:51987743767f02261c2edd"
};

// Initialize Firebase & Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
