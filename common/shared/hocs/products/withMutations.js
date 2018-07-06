import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import { GET_PRODUCT_QUERY } from '@shared/components/products/ProductQuery';
import { FIND_PRODUCTS } from '@admin/pages/Products';
import gql from 'graphql-tag';

export const UPDATE_PRODUCT_MUTATION = gql`
  mutation updateProductMutation(
    $slug: String!
    $name: String!
    $description: String!
  ) {
    updateProduct(slug: $slug, name: $name, description: $description) {
      id
      slug
      name
      description
    }
  }
`;

export const CREATE_PRODUCT_MUTATION = gql`
  mutation createProductMutation(
    $name: String!
    $description: String!
    $variants: [VariantInput]
  ) {
    createProduct(
      name: $name
      description: $description
      variants: $variants
    ) {
      id
      slug
      name
      description
    }
  }
`;

const withMutations = function(ComposedComponent) {
  class ProductMutations extends Component {
    static propTypes = {
      updateProduct: PropTypes.func.isRequired,
      createProduct: PropTypes.func.isRequired
    };

    executeUpdateMutation = values => {
      const { updateProduct } = this.props;

      return updateProduct({
        variables: values,
        update: (cache, { data }) => {
          const { updateProduct } = data;

          cache.writeQuery({
            query: GET_PRODUCT_QUERY,
            data: { product: updateProduct }
          });
        }
      });
    };

    executeCreateMutation = values => {
      const { createProduct } = this.props;

      return createProduct({
        variables: values,
        update: (cache, { data: { createProduct: product } }) => {
          // Read the data from our cache for this query.
          const data = cache.readQuery({
            query: FIND_PRODUCTS,
            variables: { query: '' }
          });

          // Add our comment from the mutation to the top.
          data.findProducts.products.unshift(product);

          // Write our data back to the cache.
          cache.writeQuery({
            query: FIND_PRODUCTS,
            variables: { query: '' },
            data
          });
        }
      });
    };

    render() {
      return (
        <ComposedComponent
          {...this.props}
          updateProduct={this.executeUpdateMutation}
          createProduct={this.executeCreateMutation}
        />
      );
    }
  }

  return compose(
    graphql(UPDATE_PRODUCT_MUTATION, { name: 'updateProduct' }),
    graphql(CREATE_PRODUCT_MUTATION, { name: 'createProduct' })
  )(ProductMutations);
};

export default withMutations;
