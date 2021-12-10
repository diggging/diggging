import { combineReducers } from 'redux';
import authReducer from './auth';
import saveContent from '../../modules/editor';

export default combineReducers({
  auth: authReducer,
  test: saveContent
});
