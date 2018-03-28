import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Card, Image } from 'semantic-ui-react';
import css from './index.scss';

const ProductList = (props) => {
  const { product, className } = props;

  return (
    <Card className={classnames(css.productCard, className)}>
      <Image src={product.imageUrl} />
      <Card.Content>
        <Card.Header>{product.name}</Card.Header>
        <Card.Meta>{product.description}</Card.Meta>
      </Card.Content>
    </Card>
  );
};

ProductList.propTypes = {
  product: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default ProductList;
