export const RESET_AUTH_STATE = 'RESET_AUTH_STATE';
export const LOGOUT = 'LOGOUT';
export const initialState = {
  user: null,
  idToken: null,
  roles: null,
  isSuper: false,
  loadingUser: true,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case RESET_AUTH_STATE:
      return {
        ...state,
        user: action.payload.user ? action.payload.user : initialState.user,
        idToken: action.payload.idToken,
        roles: action.payload.roles,
        isSuper: action.payload.isSuper,
        loadingUser: false,
      };
    case LOGOUT:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
