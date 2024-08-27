// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIkpMij5-6Y8JLfmZo_S2Id3cAU86VQEA",
  authDomain: "coindabang-nextjs14.firebaseapp.com",
  projectId: "coindabang-nextjs14",
  storageBucket: "coindabang-nextjs14.appspot.com",
  messagingSenderId: "12076189333",
  appId: "1:12076189333:web:202adec2a67a93c27f3d9c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);
