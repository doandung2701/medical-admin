import React, { useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from '@firebase/auth';
import history from './router/history';
import MainLayout from './page/layout/MainLayout';
import Login from './page/auth/login/Login';
import {
  getRoleFromAuthState,
  getUserFromAuthState,
} from './redux/selector/authSelector';
import firebaseApp from './firebase';
import { RESET_AUTH_STATE } from './redux/reducer/authReducer';

function App() {
  const dispatch = useDispatch();
  // eslint-disable-next-line no-shadow
  const rolesState = useSelector(getRoleFromAuthState);
  useEffect(() => {
    const unsubscriber = getAuth(firebaseApp).onAuthStateChanged(async user => {
      if (user) {
        // eslint-disable-next-line no-use-before-define
        resetAuth();
      } else {
        dispatch({
          type: RESET_AUTH_STATE,
          payload: {
            loading: false,
          },
        });
      }
    });
    return () => unsubscriber();
  }, []);
  const extractRoles = claims =>
    Object.keys(claims).filter(claim => claim.includes('ROLE_'));
  const resetAuth = () => {
    getAuth(firebaseApp)
      .currentUser.getIdTokenResult()
      .then(idTokenResult => {
        // eslint-disable-next-line valid-typeof
        if (typeof idTokenResult.claims !== undefined) {
          const roles = extractRoles(idTokenResult.claims);
          dispatch({
            type: RESET_AUTH_STATE,
            payload: {
              user: idTokenResult.claims,
              idToken: idTokenResult.token,
              roles,
              isSuper: roles.includes('ROLE_SUPER'),
            },
          });
        }
      })
      .catch(error => console.error(error));
  };
  const hasRole = role => rolesState.includes(role);
  // Login
  const login = () =>
    signInWithPopup(getAuth(firebaseApp), new GoogleAuthProvider());

  const refreshToken = () => {
    getAuth(firebaseApp)
      .currentUser.getIdToken(true)
      // eslint-disable-next-line no-use-before-define
      .then(idToken => resetAuth(idToken))
      .catch(error => console.error(error));
  };
  return (
    <BrowserRouter history={history}>
      <Switch>
        <Route path="/login" component={Login} />
        <MainLayout />
      </Switch>
    </BrowserRouter>
  );
}
export default hot(App);
