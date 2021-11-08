// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from 'firebase/app';

// Add the Firebase services that you want to use
// We only want to use Firebase Auth here
import 'firebase/auth';
import 'firebase/firestore';

// Your app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC9HYL9aBFdXaBEzD2_JYnAXryYldJYr8U',
  authDomain: 'authentication-d5eec.firebaseapp.com',
  databaseURL: 'https://authentication-d5eec.firebaseio.com',
  projectId: 'authentication-d5eec',
  storageBucket: 'authentication-d5eec.appspot.com',
  messagingSenderId: '720129545652',
  appId: '1:720129545652:web:7fb593c36603939d824ee1',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore();
// Finally, export it to use it throughout your app
export default firebase;
