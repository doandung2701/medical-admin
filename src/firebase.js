import { GoogleAuthProvider } from '@firebase/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyC9HYL9aBFdXaBEzD2_JYnAXryYldJYr8U',
  authDomain: 'authentication-d5eec.firebaseapp.com',
  databaseURL: 'https://authentication-d5eec.firebaseio.com',
  projectId: 'authentication-d5eec',
  storageBucket: 'authentication-d5eec.appspot.com',
  messagingSenderId: '720129545652',
  appId: '1:720129545652:web:7fb593c36603939d824ee1',
};
const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await auth.signInWithPopup(googleProvider);
  } catch (err) {
    console.error(err);
  }
};
const signInWithEmailAndPassword = async (email, password) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
  } catch (err) {
    console.error(err);
  }
};
const registerWithEmailAndPassword = async (_name, email, password) => {
  try {
    const res = await auth.createUserWithEmailAndPassword(email, password);
  } catch (err) {
    console.error(err);
  }
};
const sendPasswordResetEmail = async email => {
  try {
    await auth.sendPasswordResetEmail(email);
  } catch (err) {
    console.error(err);
  }
};
const logout = () => {
  auth.signOut();
};
export {
  auth,
  signInWithGoogle,
  signInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordResetEmail,
  logout,
};
