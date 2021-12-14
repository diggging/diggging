/* action type */
const SET_QUESTIONS = 'editor/MAIN_QUESTIONS';
const CHANGE_SMALL_CRUTERIA = 'editor/CHANGE_SMALL_CRUTERIA';
const SET_RECENT_CRETERIA = 'editor/SET_RECENT_CRETERIA';

/* action func */
/* tab fetch data */
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
          page,
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
          page,
        })
      }
    } catch (e) {
    console.log(e);
  }
}

/* toggle fetch data */

export const setSmallCriteria = smallCriteria => ({ type: CHANGE_SMALL_CRUTERIA, smallCriteria });

export const setRecentCriteria = (page, smallCriteria) => async dispatch => {
  console.log(smallCriteria);
  try {
    const res = await fetch(`http://127.0.0.1:8000/questions/question_list/?big_criteria=recent&page=${page}&small_criteria=${smallCriteria}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
        }
      })
      const data = await res.json();
      if (res.status === 200) {
        // console.log(data);
        dispatch({
          type: SET_RECENT_CRETERIA,
          data,
          page,
          smallCriteria
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
  smallCriteria: "all"
};

/* reducer */
export default function getQuestion(state = initialState, action) {
  switch(action.type) {
    case SET_QUESTIONS:
      return {
        ...state,
        data: action.data.results,
        count: action.data.count,
        page: action.page,
        smallCriteria: state.smallCriteria
      }
    case CHANGE_SMALL_CRUTERIA:
      return {
        ...state,
        smallCriteria: action.smallCriteria
      }
    case SET_RECENT_CRETERIA:
      return {
        ...state,
        data: action.data.results,
        count: action.data.count,
        page: action.page,
        smallCriteria: action.smallCriteria
      }
    default:
      return state;
  }
}


