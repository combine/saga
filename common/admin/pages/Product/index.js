import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { ProductForm } from '@admin/components/products';
import { get } from 'lodash';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const GET_PRODUCT = gql`
  query getProduct($id: Int, $slug: String) {
    product(id: $id, slug: $slug) {
      id
      slug
      name
      description
    }
  }
`;

class AdminProductPage extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired
  };

  handleUpdate = (values) => {
    console.log('mutate:', values);
  }

  render() {
    const { match } = this.props;
    const slug = get(match, 'params.slug', null);

    return (
      <Query query={GET_PRODUCT} variables={{ slug }}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading</p>;
          if (error) return <p>Error</p>;

          const { product } = data;

          return (
            <React.Fragment>
              <Helmet>
                <title>{product.title}</title>
              </Helmet>
              <h1>{product.title}</h1>
              <ProductForm
                product={product}
                onSubmit={this.handleUpdate}
              />
            </React.Fragment>
          );
        }}
      </Query>
    );
  }
}

export default AdminProductPage;
