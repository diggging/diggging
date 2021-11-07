import axios from 'axios';
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED_SUCCESS,
  USER_LOADED_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  SET_AUTH_LOADING,
  REMOVE_AUTH_LOADING,
} from './types';

import { RESET_REGISTER_SUCCESS } from './types';

export const register =
  (username, user_nickname, email, password1, password2) => async (dispatch) => {
    const body = JSON.stringify({
      username,
      user_nickname,
      email,
      password1,
      password2,
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

export const reset_register_success = () => (dispatch) => {
  dispatch({
    type: RESET_REGISTER_SUCCESS,
  });
};

//login하는 액션
export const login = (username, password) => async (dispatch) => {
  //username과 password를 받아와서
  const body = JSON.stringify({
    username,
    password,
  });

  dispatch({
    type: SET_AUTH_LOADING,
  });

  try {
    const res = await fetch('api/account/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: body,
    });

    if (res.status === 200) {
      dispatch({
        type: LOGIN_SUCCESS,
      });
    } else {
      dispatch({
        type: LOGIN_FAIL,
      });
    }
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
    });
  }

  dispatch({
    type: REMOVE_AUTH_LOADING,
  });
};
