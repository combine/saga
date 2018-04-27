import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { loadProduct, updateProduct } from '@admin/actions/product';
import { ProductForm } from '@admin/components/products';
import { get } from 'lodash';

class AdminProductPage extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { dispatch, product, match } = this.props;
    const { isLoaded } = product;
    const slug = get(match, 'params.slug', null);

    if ((!isLoaded && slug) || (isLoaded && slug !== product.slug)) {
      return dispatch(loadProduct(match.params.slug));
    }
  }

  handleUpdate = (values) => {
    const { dispatch, product } = this.props;

    return dispatch(updateProduct(product.slug, values));
  }

  render() {
    const { product } = this.props;
    const title = product.name;

    return (
      <div>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <h1>{title}</h1>
        <ProductForm
          product={product}
          onSubmit={this.handleUpdate}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  product: state.product
});

export default connect(mapStateToProps)(AdminProductPage);
