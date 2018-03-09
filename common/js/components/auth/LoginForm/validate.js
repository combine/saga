export default (values) => {
  const errors = {};

  if (!values.username) {
    errors.username = 'Username is required.';
  }

  if (!values.password) {
    errors.password = 'Please enter a password.';
  }

  return errors;
};
