import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { searchProducts } from '@app/actions/search';
import { ProductList } from '@app/components/products';
import { ProductSearch } from '@shared/components/products';

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

  handleSearch = (params) => {
    const { dispatch } = this.props;

    return dispatch(searchProducts(params));
  }

  render() {
    const { products, products: { meta } } = this.props;
    const initialQuery = (meta.query && meta.query.trim()) || '';
    const title = 'Products';

    return (
      <div>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <h1>{title}</h1>
        <ProductSearch
          products={products}
          onSearch={this.handleSearch}
          emptyQuery={' '}
          initialQuery={initialQuery}
        />
        <ProductList products={products} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.search.products
});

export default connect(mapStateToProps)(ProductsPage);
