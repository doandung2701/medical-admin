import { combineReducers } from 'redux';
import initReducer from './initReducer';
import authReducer from './authReducer';

export default combineReducers({
  initReducer,
  authReducer,
});
