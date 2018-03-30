import {
  SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE,
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
  LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE
} from '@app/constants';

const defaultState = {
  user: null,
  isLoading: false,
  isLoggedIn: false,
  error: null,
};

const auth = (state = defaultState, action) => {
  switch (action.type) {
    case SIGNUP_REQUEST:
    case LOGIN_REQUEST:
    case LOGOUT_REQUEST:
      return { ...state, isLoading: true };

    case SIGNUP_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        isAdmin: action.user.role === 'admin',
        user: state.user ? { ...state.user, ...action.user } : action.user
      };

    case LOGOUT_SUCCESS:
      return {
        ...defaultState
      };

    case LOGOUT_FAILURE:
      return {
        ...state,
        isLoading: false
      };

    case SIGNUP_FAILURE:
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        user: null
      };

    default:
      return state;
  }
};

export default auth;
