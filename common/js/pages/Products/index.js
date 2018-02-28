import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadProducts } from '@actions/products';
import { Loader } from 'semantic-ui-react';

class ProductsPage extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    products: PropTypes.object.isRequired
  }

  componentDidMount() {
    const { dispatch, products } = this.props;

    if (!products.isLoaded) {
      return dispatch(loadProducts());
    }
  }

  render() {
    const { products } = this.props;

    return (
      <div>
        <h1>Products</h1>
        <Loader active={products.isLoading} />
        <div>
          {products.products.map(product => {
            return (
              <div key={product.id}>
                <h2>{product.name}</h2>
                <p>{product.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.products
});

export default connect(mapStateToProps)(ProductsPage);
