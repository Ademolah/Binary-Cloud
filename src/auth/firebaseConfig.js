import {initializeApp} from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAuFXoA_oO-TS7kK6ld80gVtwb8USABKFY",
  authDomain: "spectracloud-5d4d8.firebaseapp.com",
  projectId: "spectracloud-5d4d8",
  storageBucket: "spectracloud-5d4d8.firebasestorage.app",
  messagingSenderId: "722672496486",
  appId: "1:722672496486:web:043f76a234e89e28ece2a7",
  measurementId: "G-WP312ZW7RL"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };