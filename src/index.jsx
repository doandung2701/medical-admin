import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import App from './App.js';
import { store } from './redux/store.js';
import firebase from 'firebase/app';
import { createFirestoreInstance } from 'redux-firestore' // <- needed if using firestore

const rrfConfig = {
  userProfile: 'users',
  enableClaims: true,
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};
const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance // <- needed if using firestore
};
ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <App />
    </ReactReduxFirebaseProvider>
  </Provider>,

  document.getElementById('app')
);
