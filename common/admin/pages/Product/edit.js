import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { DimmedLoader } from '@shared/components/common';
import { ProductForm } from '@admin/components/products';
import { ProductQuery } from '@shared/components/products';
import { withMutations } from '@shared/hocs/products';
import { get } from 'lodash';
import Error from '@admin/pages/Error';

class AdminEditProductPage extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    updateProduct: PropTypes.func.isRequired
  };

  render() {
    const { match, updateProduct } = this.props;
    const slug = get(match, 'params.slug', null);

    return (
      <ProductQuery slug={slug}>
        {({ loading, error, product }) => {
          if (loading) return <DimmedLoader />;
          if (error) return <Error />;

          const title = `Editing ${product.name}`;

          return (
            <React.Fragment>
              <Helmet>
                <title>{title}</title>
              </Helmet>
              <ProductForm
                product={product}
                onSubmit={updateProduct}
                title={title}
              />
            </React.Fragment>
          );
        }}
      </ProductQuery>
    );
  }
}

export default withMutations(AdminEditProductPage);
