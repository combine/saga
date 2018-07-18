import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'semantic-ui-react';
import classnames from 'classnames';

const InputField = (props) => {
  const { className, field, form, ...rest } = props;
  const { touched, errors } = form;
  const hasError = !!(touched[field.name] && errors[field.name]);

  return (
    <React.Fragment>
      <Input
        className={classnames(className)}
        error={hasError}
        {...field}
        {...rest}
      />
    </React.Fragment>
  );
};

InputField.propTypes = {
  className: PropTypes.string,
  field: PropTypes.object,
  form: PropTypes.object
};

export default InputField;
