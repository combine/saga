import { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const GET_PRODUCT_QUERY = gql`
  query getProduct($id: Int, $slug: String) {
    product(id: $id, slug: $slug) {
      id
      slug
      name
      description
      variants {
        id
        isMaster
        priceInCents
        barcode
        sku
        options
      }
    }
  }
`;

class ProductQuery extends Component {
  static propTypes = {
    children: PropTypes.any,
    data: PropTypes.object
  }

  render() {
    const { children, data } = this.props;

    return children(data);
  }
}

export default graphql(GET_PRODUCT_QUERY, {
  options: ({ slug }) => ({ variables: { slug } }),
})(ProductQuery);
