import { initializeApp } from "firebase/app";

// TODO: Replace the following with your app's Firebase project configuration (Auth-recaptcha(project) --> mini-two-factor-auth(app))
// the below parameters are also known as (firebase options) that are required by Firebase and Google Services to consume the API provided by them
const firebaseConfig = {
  apiKey: "AIzaSyBtWZDDnQTEsDeRzbIf5EBgkWhinP6rOq0",
  authDomain: "auth-recaptcha-45fad.firebaseapp.com",
  projectId: "auth-recaptcha-45fad",
  storageBucket: "auth-recaptcha-45fad.firebasestorage.app",
  messagingSenderId: "838046004827",
  appId: "1:838046004827:web:ff7ea014285968b687717e",
};

export const app = initializeApp(firebaseConfig);
