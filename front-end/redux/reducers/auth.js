import {
  LOGIN_SUCCESS,
  LOGIN_fAIL,
  USER_LOADED_SUCCESS,
  USER_LOADED_FAIL,
} from "../actions/types";

//디폴트 값
const initialState = {
  access: localStorage.getItem("access"),
  refresh: localStorage.getItem("refresh"),
  isAuthenticated: null,
  user: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action; //reducer쓸때 보내주는 action에서 type과 payload 가져오기
  //action의 type에 따라 기능구현
  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        access: payload.access,
        refresh: payload.refresh,
      };
    case USER_LOADED_SUCCESS:
      return {
        ...state,
        user: payload,
      };
    case USER_LOADED_FAIL:
      return {
        ...state,
        user: null,
      };
    case LOGIN_fAIL:
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      return {
        ...state,
        access: null,
        refresh: null,
        isAuthenticated: false,
        user: null,
      };
  }
}
