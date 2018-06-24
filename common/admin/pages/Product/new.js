import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { ProductForm } from '@admin/components/products';
import { withMutations } from '@shared/hocs/products';

class AdminAddProductPage extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    createProduct: PropTypes.func.isRequired
  };

  render() {
    const { createProduct } = this.props;
    const title = 'New Product';

    return (
      <React.Fragment>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <ProductForm
          onSubmit={createProduct}
          title={title}
        />
      </React.Fragment>
    );
  }
}

export default withMutations(AdminAddProductPage);
