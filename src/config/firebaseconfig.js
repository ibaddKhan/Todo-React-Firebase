import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


  const firebaseConfig = {
    apiKey: "AIzaSyB-7Kr585289X6sl6mFO7TDif9l6tZSx_A",
    authDomain: "todo-react-f2e16.firebaseapp.com",
    projectId: "todo-react-f2e16",
    storageBucket: "todo-react-f2e16.appspot.com",
    messagingSenderId: "534797144306",
    appId: "1:534797144306:web:28c07783f73a53b48b406b"
  };
  export const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export const storage = getStorage(app);
  export const db = getFirestore(app);