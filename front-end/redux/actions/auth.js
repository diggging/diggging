import axios from 'axios';
import {
  LOGIN_SUCCESS,
  LOGIN_fAIL,
  USER_LOADED_SUCCESS,
  USER_LOADED_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  SET_AUTH_LOADING,
  REMOVE_AUTH_LOADING,
} from './actions/types';

export const register =
  (username, nickname, email, password, passwordCheck) => async (dispatch) => {
    const body = JSON.stringify({
      username,
      nickname,
      email,
      password,
      passwordCheck,
    });
    // 회원가입 버튼 누르면 일단 로딩중.
    dispatch({
      type: SET_AUTH_LOADING,
    });

    try {
      const res = await fetch('/api/account/register', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: body,
      });

      if (res.status === 201) {
        dispatch({
          type: REGISTER_SUCCESS,
        });
      } else {
        dispatch({
          type: REGISTER_FAIL,
        });
      }
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
      });
    }
    // 가입 끝나면 AUTH_LOADING지우기
    dispatch({
      type: REMOVE_AUTH_LOADING,
    });
  };

export const login = (username, password) => async (dispatch) => {
  const body = JSON.stringify({
    username,
    password,
  });

  try {
  } catch (err) {}
};
