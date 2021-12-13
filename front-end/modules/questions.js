/* action type */
const SET_QUESTIONS = 'editor/MAIN_QUESTIONS';
const PAGE_CHANGE = 'editor/PAGE_CHANGE';
const CHANGE_NUM = 'editor/CHANGE_NUM';

/* action func */
export const setRecent = (page) => async dispatch => {
  try {
    const res = await fetch(`http://127.0.0.1:8000/questions/question_list/?big_criteria=recent&page=${page}&small_criteria=all`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
        }
      })
      const data = await res.json();
      if (res.status === 200) {
        // console.log(data);
        dispatch({
          type: SET_QUESTIONS,
          data,
          page,
        })
      }
    } catch (e) {
    console.log(e);
  }
}

export const setPopular = (page) => async dispatch => {
  try {
    const res = await fetch(`http://127.0.0.1:8000/questions/question_list/?big_criteria=popular&page=${page}&small_criteria=all`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
        }
      })
      const data = await res.json();
      if (res.status === 200) {
        dispatch({
          type: SET_QUESTIONS,
          data,
          page
        })
      }
    } catch (e) {
    console.log(e);
  }
}

export const setMine = (page) => async dispatch => {
  try {
    const res = await fetch(`http://127.0.0.1:8000/questions/question_list/?big_criteria=mine&page=${page}&small_criteria=all`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
        }
      })
      const data = await res.json();
      if (res.status === 200) {
        dispatch({
          type: SET_QUESTIONS,
          data,
          page
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
  page: 1,
};

/* reducer */
export default function getQuestion(state = initialState, action) {
  switch(action.type) {
    case SET_QUESTIONS:
      return {
        ...state,
        data: action.data.results,
        count: action.data.count,
        page: action.page
      }
    default:
      return state;
  }
}


