/* action type */
const SET_QUESTIONS = 'editor/MAIN_QUESTIONS';
const CHANGE_PAGE = 'editor/CHANGE_PAGE';

/* action func */
/* fetch data */
export const setRecent = (page, smallCriteria) => async dispatch => {
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
          type: SET_QUESTIONS,
          data,
          page,
          smallCriteria
        })
      }
    } catch (e) {
    console.log(e);
  }
}

export const setPopular = (page, smallCriteria) => async dispatch => {
  try {
    const res = await fetch(`http://127.0.0.1:8000/questions/question_list/?big_criteria=popular&page=${page}&small_criteria=${smallCriteria}`, {
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
          smallCriteria
        })
      }
    } catch (e) {
    console.log(e);
  }
}

export const setMine = (page, smallCriteria) => async dispatch => {
  try {
    const res = await fetch(`http://127.0.0.1:8000/questions/question_list/?big_criteria=mine&page=${page}&small_criteria=${smallCriteria}`, {
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
          smallCriteria
        })
      }
    } catch (e) {
    console.log(e);
  }
}

/* toggle fetch data */

export const setPage = page => ({ type: CHANGE_PAGE, page });

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
        smallCriteria: action.smallCriteria
      }
    case CHANGE_PAGE:
      return {
        ...state,
        page: action.page
      }
    default:
      return state;
  }
}


