import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  RESET_REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAIL,
  REFRESH_SUCCESS,
  REFRESH_FAIL,
  SET_AUTH_LOADING,
  REMOVE_AUTH_LOADING,
  BAD_REQUEST,
  RESET_BAD_REQUEST,
  PASSWORD_RESET_FAIL,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_CONFIRM_FAIL,
  PASSWORD_RESET_CONFIRM_SUCCESS,

} from '../actions/types';

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  register_success: false,
  bad_request: false,
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        register_success: true,
        loading: false,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        bad_request: false,
        loading: false,
      };
    case BAD_REQUEST:
      return {
        ...state,
        bad_request: true,
        loading: false,
      }
    case RESET_BAD_REQUEST :
      return {
        ...state,
        bad_request: false,
      }
    case RESET_REGISTER_SUCCESS:
      return {
        ...state,
        register_success: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false, //logout일땐 더이상 authenticated하지 않게.
        user: null,
        loading: false,
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        loading: false,
      };
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        user: payload.user,
        loading: false,
      };
    case LOAD_USER_FAIL:
      return {
        ...state,
        user: null,
        loading: false,
      };
    case AUTHENTICATED_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
      };
    case AUTHENTICATED_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    case REFRESH_SUCCESS:
      return {
        ...state,
      };
    case REFRESH_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    case SET_AUTH_LOADING:
      return {
        ...state,
        loading: true,
      };
    case REMOVE_AUTH_LOADING:
      return {
        ...state,
        loading: false,
      };
    case PASSWORD_RESET_SUCCESS:
    case PASSWORD_RESET_FAIL:
    case PASSWORD_RESET_FAIL:
    case PASSWORD_RESET_CONFIRM_FAIL:
    case PASSWORD_RESET_CONFIRM_SUCCESS:
      return {
        ...state,
      }

    default:
      return state;
  }
};

export default authReducer;
