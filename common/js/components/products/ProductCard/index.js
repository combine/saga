import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import css from './index.scss';

const ProductList = (props) => {
  const { product, className } = props;

  return (
    <div className={classnames(css.productCard, className)}>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
    </div>
  );
};

ProductList.propTypes = {
  product: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default ProductList;
