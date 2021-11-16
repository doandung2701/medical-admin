// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from 'firebase/app';

// Add the Firebase services that you want to use
// We only want to use Firebase Auth here
import 'firebase/auth';
import 'firebase/firestore';

// Your app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsp5rP7pJCeqTR2YxxH9tLCErtpK_SSyQ",
  authDomain: "medicine-c54e8.firebaseapp.com",
  projectId: "medicine-c54e8",
  storageBucket: "medicine-c54e8.appspot.com",
  messagingSenderId: "146585992764",
  appId: "1:146585992764:web:81b62eaa5940379fdc8d39",
  measurementId: "G-ETNXH96NYQ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore();
// Finally, export it to use it throughout your app
export default firebase;
