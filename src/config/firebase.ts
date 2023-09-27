// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxd9oGlgR-Fp92yihXJn6upTTimTR2bMw",
  authDomain: "best-at-laundry-a4a57.firebaseapp.com",
  projectId: "best-at-laundry-a4a57",
  storageBucket: "best-at-laundry-a4a57.appspot.com",
  messagingSenderId: "543589103364",
  appId: "1:543589103364:web:03ffc6f13ff52e4b788251"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();