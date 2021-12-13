import axios from "axios";

/* action type */
const MAIN_QUESTIONS = 'editor/MAIN_QUESTIONS';
const PAGE_CHANGE = 'editor/PAGE_CHANGE';

/* action func */
export const setMain = () => async dispatch => {
  try {
    const res = await fetch('http://127.0.0.1:8000/questions/question_list/?big_criteria=recent&page=1&small_criteria=all', {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
        }
      })
      const data = await res.json();
      if (res.status === 200) {
        dispatch({
          type: MAIN_QUESTIONS,
          data
        })
      }
    } catch (e) {
    console.log(e);
  }
}

export const handlePageChange = (pageNumber) => async dispatch => {
  try {
    const res = await fetch(`http://127.0.0.1:8000/questions/question_list/?big_criteria=recent&page=${pageNumber}&small_criteria=all`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
        }
      })
      const data = await res.json();
      if (res.status === 200) {
        dispatch({
          type: PAGE_CHANGE,
          data,
        })
      }
    } catch (e) {
    console.log(e);
  }
}

/* initialState */
const initialState = {
  data: [],
  count: 0,
};

/* reducer */
export default function getMain(state = initialState, action) {
  switch(action.type) {
    case MAIN_QUESTIONS:
      return {
        ...state,
        data: action.data.results,
        count: action.data.count
      }
    case PAGE_CHANGE:
      return {
        ...state,
        data: action.data.results,
      }
    default:
      return state;
  }
}


