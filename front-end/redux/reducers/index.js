import { combineReducers } from 'redux';
import authReducer from './auth';
import saveContent from '../../modules/editor';
import getQuestion from '../../modules/questions';
import setPage from '../../modules/questions';
import setData from '../../modules/questions';
import setQuestion from '../../modules/questions';
import setMine from '../../modules/questions';
import clearBigCriteria from '../../modules/questions';
import clearQuestion from '../../modules/questions';
import setBigCriteria from '../../modules/questions';

export default combineReducers({
  auth: authReducer,
  content: saveContent,
  questions: getQuestion,
  setPage,
  setQuestion,
  setMine,
  clearBigCriteria,
  clearQuestion,
  setBigCriteria
});
