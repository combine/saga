import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { GET_PRODUCT_QUERY } from '@shared/components/products/ProductQuery';
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

const withUpdate = function(ComposedComponent) {
  class UpdateProductMutation extends Component {
    static propTypes = {
      mutate: PropTypes.func.isRequired
    };

    executeUpdate = values => {
      const { mutate } = this.props;

      return mutate({
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

    render() {
      return <ComposedComponent {...this.props} update={this.executeUpdate} />;
    }
  }

  return graphql(UPDATE_PRODUCT_MUTATION)(UpdateProductMutation);
};

export default withUpdate;
