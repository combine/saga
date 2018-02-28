export default (values, props) => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Email is required.';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'A password is required.';
  } else {
    const pass = values.password;
    const len = pass.length;
    let err = [];

    if (len < 8) {
      err.push('be at least 8 characters');
    }

    if (!/(?=.*[a-z])/.test(pass)) {
      err.push('at least 1 lowercase character');
    }

    if (!/(?=.*[A-Z])/.test(pass)) {
      err.push('at least 1 uppercase character');
    }

    if (!/(?=.*[0-9])/.test(pass)) {
      err.push('at least 1 number');
    }

    if (err.length) {
      errors.password = `Password must ${err.join(', ')}.`;
    }
  }

  return errors;
};
