import api from '@lib/api';
import {
  SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE,
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
  LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE
} from '@app/constants';

/**
 * logout()
 * Logs the user out.
 */
export const login = (data) => {
  return {
    types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE],
    callAPI: () => api.post('/auth/login', JSON.stringify(data)),
    transform: response => ({ user: response })
  };
};

/**
 * logout()
 * Logs the user out.
 */
export const logout = () => {
  return {
    types: [LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE],
    callAPI: () => api.delete('/auth/logout')
  };
};

/**
 * signup()
 * Signs the user up!
 * @param {Object} data - User data { name, email, password }
 * @param {Object} (options) { redirect } - redirect the user on success
 */
export const signup = (data = {}) => {
  return {
    types: [SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE],
    callAPI: () => api.post('/auth/signup', JSON.stringify(data)),
    transform: response => ({ user: response })
  };
};
