import { combineReducers } from 'redux';
import authReducer from './auth';
import saveContent from '../../modules/editor';
import getQuestion from '../../modules/questions';
import handlePageChangeRecent from '../../modules/questions';
import handlePageChangePopular from '../../modules/questions';

export default combineReducers({
  auth: authReducer,
  content: saveContent,
  data: getQuestion,
});
