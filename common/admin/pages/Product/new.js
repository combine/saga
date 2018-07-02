import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ProductForm } from '@admin/components/products';
import { withMutations } from '@shared/hocs/products';

class AdminAddProductPage extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    createProduct: PropTypes.func.isRequired
  };

  handleCreateProduct = (values) => {
    const { createProduct, history } = this.props;

    return createProduct(values)
      .then(({ data }) => {
        const { createProduct: product } = data;
        history.push(`/admin/products/${product.slug}`);
      });
  }

  render() {
    const title = 'New Product';

    return (
      <React.Fragment>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <ProductForm
          onSubmit={this.handleCreateProduct}
          title={title}
        />
      </React.Fragment>
    );
  }
}

export default withMutations(withRouter(AdminAddProductPage));
