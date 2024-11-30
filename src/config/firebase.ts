import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAmvuE8Q8rnXYgkuV7rCXaP3CS9QM7vhZw",
    authDomain: "student-b8cee.firebaseapp.com",
    projectId: "student-b8cee",
    storageBucket: "student-b8cee.firebasestorage.app",
    messagingSenderId: "820976107435",
    appId: "1:820976107435:web:c416a8ce1b55938ad59cee",
    measurementId: "G-M0SH5Z3LKK"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);