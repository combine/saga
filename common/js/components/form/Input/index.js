import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';
import { Error } from '@components/form';
import classnames from 'classnames';

const Input = (props) => {
  const { className, field, form, ...rest } = props;
  const { touched, errors } = form;
  const hasError = !!(touched[field.name] && errors[field.name]);

  return (
    <React.Fragment>
      <Form.Input
        className={classnames(className)}
        {...field}
        {...rest}
        error={hasError}
      />
      {hasError && <Error message={errors[field.name]} />}
    </React.Fragment>
  );
};

Input.propTypes = {
  className: PropTypes.string,
  field: PropTypes.object,
  form: PropTypes.object
};

export default Input;
