import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';
import classnames from 'classnames';

const Button = (props) => {
  const { className, ...rest } = props;

  return (
    <Form.Button className={classnames(className)} {...rest} />
  );
};

Button.propTypes = {
  className: PropTypes.string
};

export default Button;
