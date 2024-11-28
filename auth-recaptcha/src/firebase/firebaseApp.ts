import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  onAuthStateChanged,
} from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration (Auth-recaptcha(project) --> mini-two-factor-auth(app))
// the below parameters are also known as (firebase options) that are required by Firebase and Google Services to consume the API provided by them
const firebaseConfig = {
  apiKey: "AIzaSyBtWZDDnQTEsDeRzbIf5EBgkWhinP6rOq0", //use when calling certain APIs
  authDomain: "auth-recaptcha-45fad.firebaseapp.com",
  projectId: "auth-recaptcha-45fad", // unique identifier for the project for Firebase and Google Cloud
  storageBucket: "auth-recaptcha-45fad.firebasestorage.app",
  messagingSenderId: "838046004827",
  appId: "1:838046004827:web:ff7ea014285968b687717e", // unique identifier for firebase app
};

//initialize firebase app
const app = initializeApp(firebaseConfig);

//initialize firebase authentication
const auth = getAuth(app);

export {
  auth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  onAuthStateChanged,
};
