import { API_URL } from "../config/index";

/* action type */
const GET_QUESTIONS = "editor/GET_QUESTIONS";
const GET_QUESTIONS_SUCCESS = "editor/GET_QUESTIONS_SUCCESS";
const GET_QUESTIONS_FAIL = "editor/GET_QUESTIONS_FAIL";
const GET_MINE_QUESTIONS = "editor/GET_QUESTIONS";
const GET_MINE_QUESTIONS_SUCCESS = "editor/GET_QUESTIONS_SUCCESS";
const GET_MINE_QUESTIONS_FAIL = "editor/GET_QUESTIONS_FAIL";
const CHANGE_PAGE = "editor/CHANGE_PAGE";

const CLEAR_QUESTION = "editor/CLEAR_QUESTION";
const CLEAR_BIG_CRITERIA = "editor/CLEAR_BIG_CRITERIA";
const SET_BIG_CRITERIA = "editor/SET_BIG_CRITERIA";

/* action func */
/* fetch data */
export const setQuestion = (page, bigCriteria, smallCriteria) => async (dispatch) => {
  dispatch({type:GET_QUESTIONS});
  console.log(`${bigCriteria} 요청중`);
  try {
    const res = await fetch(
      `${API_URL}/questions/question_list/?big_criteria=${bigCriteria}&page=${page}&small_criteria=${smallCriteria}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    );
    const data = await res.json();
    if (res.status === 200) {
      dispatch({
        type: GET_QUESTIONS_SUCCESS,
        data,
        page,
        bigCriteria,
        smallCriteria,
      });
    }
    console.log(`${bigCriteria} 성공`);
  } catch (e) {
    dispatch({type:GET_QUESTIONS_FAIL, error:e});
    console.log(`${bigCriteria} 실패`);
  }
};

export const setMine = (page, smallCriteria, token) => async (dispatch) => {
  dispatch({type:GET_MINE_QUESTIONS});
  console.log('mine 요청중');
  try {
    const res = await fetch(
      `${API_URL}/questions/question_list/?big_criteria=mine&page=${page}&small_criteria=${smallCriteria}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    if (res.status === 200) {
      dispatch({
        type: GET_MINE_QUESTIONS_SUCCESS,
        data,
        page,
        smallCriteria,
      });
      console.log('mine 성공');
    }
  } catch (e) {
    dispatch({type:GET_MINE_QUESTIONS_FAIL});
    console.log('mine 실패');
  }
};

/* toggle fetch data */
export const setPage = (page) => ({ type: CHANGE_PAGE, page });
export const clearQuestion = () => ({ type: CLEAR_QUESTION });
export const clearBigCriteria = () => ({type: CLEAR_BIG_CRITERIA});
export const setBigCriteria = (bigCriteria) => ({type: SET_BIG_CRITERIA});

/* initialState */
const initialState = {
  data: [],
  count: 0,
  page: 1,
  bigCriteria: null,
  smallCriteria: "all",
  loading: false,
  error: null,

  mine: {
    data: [],
    count: 0,
    page: 1,
    smallCriteria: "all",
    loading: false,
    error: null,
  }
};

/* reducer */
export default function getQuestion(state = initialState, action) {
  switch (action.type) {
    case GET_QUESTIONS: 
      return {
        ...state,
        data: [],
        count: 0,
        page: 1,
        bigCriteria: null,
        smallCriteria: "all",
        loading: true,
        error: null,
      }
    case GET_QUESTIONS_SUCCESS:
      return {
        ...state,
        data: action.data.results,
        count: action.data.count,
        page: action.page,
        bigCriteria: action.bigCriteria,
        smallCriteria: action.smallCriteria,
        loading: true,
        error: null
      }
    case GET_QUESTIONS_FAIL:
      return {
        ...state,
        data: [],
        count: 0,
        page: 1,
        bigCriteria: null,
        smallCriteria: "all",
        loading: true,
        error: action.error
      }

    case GET_MINE_QUESTIONS:
      return {
        ...state,
        mine: {
          data: [],
          count: 0,
          page: 1,
          smallCriteria: "all",
          loading: true,
          error: null,
        },
      };
    case GET_MINE_QUESTIONS_SUCCESS:
      return {
        ...state,
        mine: {
          data: action.data.results,
          count: action.data.count,
          page: action.page,
          smallCriteria: action.smallCriteria,
          loading: true,
          error: null,
        }
      }
    case GET_MINE_QUESTIONS_FAIL:
      return {
        ...state,
        mine: {
          data: [],
          count: 0,
          page: 1,
          smallCriteria: "all",
          loading: true,
          error: action.error,
        }
      }
    case CHANGE_PAGE:
      return {
        ...state,
        page: action.page,
      };
    case CLEAR_QUESTION:
      return {
        ...state,
        data: [],
        count: 0,
        page: 1,
        bigCriteria: null,
        smallCriteria: "all",
        loading: false,
        error: null,
      }
    case CLEAR_BIG_CRITERIA:
      return {
        ...state,
        bigCriteria: null
      }
    case SET_BIG_CRITERIA:
      return {
        ...state,
        bigCriteria:action.bigCriteria
      }  
    default:
      return state;
  }
}
