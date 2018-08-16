import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import css from './index.scss';

const Error = (props) => {
  const { message, className, children } = props;

  return (
    <p className={classnames(css.error, className)}>
      {children || message}
    </p>
  );
};

Error.propTypes = {
  message: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.any
};

export default Error;
