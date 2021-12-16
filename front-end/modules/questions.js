import { API_URL } from "../config/index";

/* action type */
const SET_RECENT_QUESTIONS = "editor/SET_RECENT_QUESTIONS";
const SET_POPULAR_QUESTIONS = "editor/SET_POPULAR_QUESTIONS";
const SET_MINE_QUESTIONS = "editor/SET_MINE_QUESTIONS";

const CHANGE_PAGE = "editor/CHANGE_PAGE";
const CHANGE_BIG_CRITERIA = "editor/CHANGE_BIG_CRITERIA";

const CHANGE_DATA = "editor/CHANGE_DATA";

/* action func */
/* fetch data */
export const setRecent = (page, smallCriteria) => async (dispatch) => {
  try {
    const res = await fetch(
      `${API_URL}/questions/question_list/?big_criteria=recent&page=${page}&small_criteria=${smallCriteria}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    );
    const data = await res.json();
    if (res.status === 200) {
      console.log(res.url);
      dispatch({
        type: SET_RECENT_QUESTIONS,
        data,
        page,
        smallCriteria,
      });
    }
  } catch (e) {
    console.log(e);
  }
};

export const setPopular = (page, smallCriteria) => async (dispatch) => {
  try {
    const res = await fetch(
      `${API_URL}/questions/question_list/?big_criteria=popular&page=${page}&small_criteria=${smallCriteria}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    );
    const data = await res.json();
    if (res.status === 200) {
      console.log(res.url);
      dispatch({
        type: SET_POPULAR_QUESTIONS,
        data,
        page,
        smallCriteria,
      });
    }
  } catch (e) {
    console.log(e);
  }
};

export const setMine = (page, smallCriteria, token) => async (dispatch) => {
  console.log(token)
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
      console.log(res.url);
      dispatch({
        type: SET_MINE_QUESTIONS,
        data,
        page,
        smallCriteria,
      });
    }
  } catch (e) {
    console.log(e);
  }
};

/* toggle fetch data */
export const setPage = (page) => ({ type: CHANGE_PAGE, page });
export const setData = (data) => ({ type: CHANGE_DATA, data });

export const setBigCriteria = (bigCriteria) => ({
  type: CHANGE_BIG_CRITERIA,
  bigCriteria,
});

/* initialState */
const initialState = {
  data: [],
  count: 0,
  page: 1,
  smallCriteria: "all",
  bigCriteria: "recent",
};

/* reducer */
export default function getQuestion(state = initialState, action) {
  switch (action.type) {
    case SET_RECENT_QUESTIONS:
      return {
        ...state,
        data: action.data.results,
        count: action.data.count,
        page: action.page,
        smallCriteria: action.smallCriteria,
      };
    case SET_POPULAR_QUESTIONS:
      return {
        ...state,
        data: action.data.results,
        count: action.data.count,
        page: action.page,
        smallCriteria: action.smallCriteria,
      };
    case SET_MINE_QUESTIONS:
      return {
        ...state,
        data: action.data.results,
        count: action.data.count,
        page: action.page,
        smallCriteria: action.smallCriteria,
      };
    case CHANGE_PAGE:
      return {
        ...state,
        page: action.page,
      };
    case CHANGE_BIG_CRITERIA:
      return {
        ...state,
        bigCriteria: action.bigCriteria,
      };
    case CHANGE_DATA:
      return {
        ...state,
        data: action.data
      }
    default:
      return state;
  }
}
