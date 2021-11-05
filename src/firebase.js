import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyC9HYL9aBFdXaBEzD2_JYnAXryYldJYr8U',
  authDomain: 'authentication-d5eec.firebaseapp.com',
  databaseURL: 'https://authentication-d5eec.firebaseio.com',
  projectId: 'authentication-d5eec',
  storageBucket: 'authentication-d5eec.appspot.com',
  messagingSenderId: '720129545652',
  appId: '1:720129545652:web:7fb593c36603939d824ee1',
};

const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;
