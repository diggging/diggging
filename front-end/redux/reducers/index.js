import { combineReducers } from 'redux';
import authReducer from './auth';
import saveContent from '../../modules/editor';
import getQuestion from '../../modules/questions';
import setRecentCriteria from '../../modules/questions';


export default combineReducers({
  auth: authReducer,
  content: saveContent,
  data: getQuestion,
  setRecentCriteria
});
