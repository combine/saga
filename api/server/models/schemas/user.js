import * as yup from 'yup';
import { patchOptional } from './lib';

export default yup.object().shape({
  firstName: yup.string()
    .min(2, 'First name must be at least 2 characters.'),
  lastName: yup.string()
    .min(2, 'Last name must be at least 2 characters.'),
  username: yup
    .string()
    .matches(
      /^[a-zA-Z0-9]+([_|.]?[a-zA-Z0-9])*$/,
      'Username can only contain letters, number, and single underscores.'
    )
    .min(3, 'Username must be at least 3 characters.')
    .max(64, 'Username can\'t exceed 64 characters')
    .required('Username is required.')
    .when('$patch', patchOptional),
  email: yup
    .string()
    .email('Invalid email.')
    .required('Email is required.')
    .when('$patch', patchOptional),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters.')
    .max(64, 'Password can\'t be more than 64 characters.')
    .required('Password is required.')
    .when('$patch', patchOptional)
}).noUnknown();
