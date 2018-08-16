import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';
import { Error } from '@common/components/form';
import classnames from 'classnames';

const Input = (props) => {
  const { className, inputComponent, field, form, ...rest } = props;
  const { touched, errors } = form;
  const hasError = !!(touched[field.name] && errors[field.name]);
  const Component = inputComponent === 'textarea' ? Form.TextArea : Form.Input;

  return (
    <React.Fragment>
      <Component
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
  inputComponent: PropTypes.oneOf(['input', 'textarea']),
  className: PropTypes.string,
  field: PropTypes.object,
  form: PropTypes.object
};

Input.defaultProps = {
  component: 'input'
};

export default Input;
