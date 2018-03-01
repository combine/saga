import api from '@lib/api';
import { SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE } from '@constants';

export const login = () => {};

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
