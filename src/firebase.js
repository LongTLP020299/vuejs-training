import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD57C2grULAfjceg9Fc6HULxlgrdkj1FOI",
  authDomain: "vuejs-train-ae3c7.firebaseapp.com",
  projectId: "vuejs-train-ae3c7",
  storageBucket: "vuejs-train-ae3c7.appspot.com",
  messagingSenderId: "6194186897",
  appId: "1:6194186897:web:c7c0bd01f6e6c3955a4d30"
};

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();
const db = getFirestore(app);

export { db, auth, googleProvider };