import React, { useReducer, useEffect, createContext, useContext } from 'react';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import firebaseApp from '../firebase';
import {
  initialState,
  authReducer,
  RESET_AUTH_STATE,
} from '../redux/reducer/authReducer';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const dispatch = useDispatch();
  // eslint-disable-next-line no-shadow
  const state = useSelector(state => state.authReducer);
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

  const hasRole = role => state.roles.includes(role);

  const extractRoles = claims =>
    Object.keys(claims).filter(claim => claim.includes('ROLE_'));

  // Login
  const login = () =>
    signInWithPopup(getAuth(firebaseApp), new GoogleAuthProvider());

  // Logout
  const logout = () => signOut(getAuth(firebaseApp));

  const refreshToken = () => {
    getAuth(firebaseApp)
      .currentUser.getIdToken(true)
      // eslint-disable-next-line no-use-before-define
      .then(idToken => resetAuth(idToken))
      .catch(error => console.error(error));
  };

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
              isSeller: roles.includes('ROLE_SELLER'),
            },
          });
        }
      })
      .catch(error => console.error(error));
  };
  return (
    <UserContext.Provider
      value={{
        login,
        logout,
        refreshToken,
        user: state.user,
        roles: state.roles,
        isSuper: state.isSuper,
        isSeller: state.isSeller,
        idToken: state.idToken,
        loadingUser: state.loadingUser,
        hasRole,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
export const useAuth = () => useContext(UserContext);
