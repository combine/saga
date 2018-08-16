import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';
import { Error } from '@common/components/form';
import classnames from 'classnames';

const Select = (props) => {
  const { className, field, form, options, label, ...rest } = props;
  const { touched, errors } = form;
  const hasError = !!(touched[field.name] && errors[field.name]);

  return (
    <Form.Field>
      <label>{label}</label>
      <select
        className={classnames(className)}
        {...field}
        {...rest}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>{option.text}</option>
        ))}
      </select>
      {hasError && <Error message={errors[field.name]} />}
    </Form.Field>
  );
};

Select.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  field: PropTypes.object,
  form: PropTypes.object,
  options: PropTypes.array
};

Select.defaultProps = {
  options: []
};

export default Select;
