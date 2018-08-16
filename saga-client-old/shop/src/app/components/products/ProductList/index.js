import React from 'react';
import PropTypes from 'prop-types';
import { Loader } from 'semantic-ui-react';
import { ProductCard } from '@components/products';
import classnames from 'classnames';
import css from './index.scss';

const ProductList = props => {
  const { products, loading, className } = props;

  return (
    <div className={classnames(css.productList, className)}>
      <Loader active={loading} />
      {products.map(product => {
        return <ProductCard key={product.id} product={product} />;
      })}
    </div>
  );
};

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  className: PropTypes.string
};

ProductList.defaultProps = {
  products: [],
  loading: false
};

export default ProductList;
