import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { fetchProduct } from '@admin/actions/product';

class AdminProductPage extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { dispatch, product } = this.props;

    if (!product.isLoaded) {
      return dispatch(fetchProduct(product.slug));
    }
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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  product: state.product
});

export default connect(mapStateToProps)(AdminProductPage);
