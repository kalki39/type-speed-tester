import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDdYhImlh4nvkOfvK2KVBpSNVZq7H0W3BM",
  authDomain: "my-typing-test-project-react.firebaseapp.com",
  projectId: "my-typing-test-project-react",
  storageBucket: "my-typing-test-project-react.appspot.com",
  messagingSenderId: "548026297773",
  appId: "1:548026297773:web:1976bf44c044da2f408524",
  measurementId: "G-20HMBJLVBC",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebaseApp.firestore();

export { auth, db };
