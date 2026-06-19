import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";

import { getFirestore }
from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

import { getAuth }
from "https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js";

import { getStorage }
from "https://www.gstatic.com/firebasejs/12.14.0/firebase-storage.js";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDF3a8_zmGCkL6SYB7ith3KTN2pMItOtIg",
  authDomain: "trust-vault-bc640.firebaseapp.com",
  projectId: "trust-vault-bc640",
  storageBucket: "trust-vault-bc640.firebasestorage.app",
  messagingSenderId: "77794682776",
  appId: "1:77794682776:web:a4ab9c907f7693ca0d2ded"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);