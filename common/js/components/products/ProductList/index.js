import React from 'react';
import PropTypes from 'prop-types';
import { Loader } from 'semantic-ui-react';
import { ProductCard } from '@components/products';
import classnames from 'classnames';
import css from './index.scss';

const ProductList = (props) => {
  const { products, className } = props;

  return (
    <div className={classnames(css.productList, className)}>
      <Loader active={products.isLoading} />
      {products.products.map(product => {
        return (
          <ProductCard key={product.id} product={product} />
        );
      })}
    </div>
  );
};

ProductList.propTypes = {
  products: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default ProductList;
