import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDUwPJ-2w7XwrwQicJwIDIfswzIOK1lmDE",
    authDomain: "authentication-c773a.firebaseapp.com",
    projectId: "authentication-c773a",
    storageBucket: "authentication-c773a.appspot.com",
    messagingSenderId: "766523365368",
    appId: "1:766523365368:web:85bac6930742dd24ad680d",
    measurementId: "G-0H3K5Q87V1"
  };

  const app = initializeApp(firebaseConfig);

  export const auth = getAuth(app)

