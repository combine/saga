import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ProductList } from '@components/products';
import { ProductSearch } from '@common/components/products';
import { Query } from 'react-apollo';
import { get } from 'lodash';
import qs from 'query-string';
import gql from 'graphql-tag';

export const FIND_PRODUCTS = gql`
  query findProducts($query: String!, $count: Int, $after: Int) {
    findProducts(query: $query, count: $count, after: $after) {
      products {
        id
        slug
        name
        description
      }
      meta {
        total
        count
        after
        query
      }
    }
  }
`;

class ProductsPage extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  state = { query: null };

  handleSearch = ({ query }) => {
    const { history } = this.props;
    const search = query && query !== '' ? '?query=' + query : null;

    // set query string
    history.push({ search });

    // set current query state
    this.setState({ query });
  };

  render() {
    const title = 'Products';
    const { location: { search } } = this.props;
    const { query } = this.state;
    const { query: initial = '' } = qs.parse(search);

    return (
      <Query query={FIND_PRODUCTS} variables={{ query: query || initial }}>
        {({ loading, error, data }) => {
          if (error) return null;

          const products = get(data, 'findProducts.products');

          return (
            <div>
              <Helmet>
                <title>{title}</title>
              </Helmet>
              <h1>{title}</h1>
              <ProductSearch
                products={products}
                onSearch={this.handleSearch}
                loading={loading}
                initialQuery={initial}
              />
              <ProductList loading={loading} products={products} />
            </div>
          );
        }}
      </Query>
    );
  }
}

export default withRouter(ProductsPage);
