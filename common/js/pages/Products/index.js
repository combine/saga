import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { searchProducts } from '@actions/search';
import { ProductSearch, ProductList } from '@components/products';

class ProductsPage extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    products: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { dispatch, products } = this.props;

    if (!products.isLoaded) {
      return dispatch(searchProducts({ query: ' ' }));
    }
  }

  render() {
    const { products, dispatch } = this.props;
    const title = 'Products';

    return (
      <div>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <h1>{title}</h1>
        <ProductSearch dispatch={dispatch} products={products} />
        <ProductList products={products} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.search.products
});

export default connect(mapStateToProps)(ProductsPage);
