import { createSelector } from 'reselect';

const authState = state => state.authReducer;
const getUserFromAuthState = createSelector(authState, auth => auth.user);
const getRoleFromAuthState = createSelector(authState, auth => auth.roles);
const getIsSuperFromAuthState = createSelector(authState, auth => auth.isSuper);
const getLoadingUserFromAuthState = createSelector(
  authState,
  auth => auth.loadingUser
);
export {
  getUserFromAuthState,
  getRoleFromAuthState,
  getIsSuperFromAuthState,
  getLoadingUserFromAuthState,
};
