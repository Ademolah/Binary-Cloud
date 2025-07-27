import {initializeApp} from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "spectracloud-5d4d8",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "722672496486",
    appId: "APP_ID",
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };