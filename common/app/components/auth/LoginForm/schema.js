import yup from 'yup';

export default yup.object().shape({
  usernameOrEmail: yup.string().required('Username or email is required.'),
  password: yup.string().required('Password is required.')
});
