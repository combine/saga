import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { ProductForm } from '@admin/components/products';
import { ProductQuery } from '@shared/components/products';
import { withMutation } from '@shared/hocs/products';
import { get } from 'lodash';

class AdminProductPage extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    mutate: PropTypes.func.isRequired
  };

  render() {
    const { match, mutate } = this.props;
    const slug = get(match, 'params.slug', null);

    return (
      <ProductQuery slug={slug}>
        {({ loading, error, product }) => {
          if (loading || error) return null;

          const title = `Editing ${product.name}`;

          return (
            <React.Fragment>
              <Helmet>
                <title>{title}</title>
              </Helmet>
              <ProductForm
                product={product}
                onSubmit={mutate}
                title={title}
              />
            </React.Fragment>
          );
        }}
      </ProductQuery>
    );
  }
}

export default withMutation(AdminProductPage);
