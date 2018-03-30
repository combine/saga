import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { searchProducts } from '@admin/actions/search';
import { ProductList } from '@admin/components/products';
import { ProductSearch } from '@shared/components/products';

class AdminProductsPage extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    products: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { dispatch, products } = this.props;

    if (!products.isLoaded) {
      return dispatch(searchProducts());
    }
  }

  handleSearch = ({ query }) => {
    const { dispatch } = this.props;

    return dispatch(searchProducts({ q: query }));
  }

  render() {
    const { products } = this.props;
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
          instant={false}
        />
        <ProductList products={products} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.search.products
});

export default connect(mapStateToProps)(AdminProductsPage);
