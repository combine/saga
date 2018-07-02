import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { withRouter, Link } from 'react-router-dom';
import { ProductList } from '@admin/components/products';
import { ProductSearch } from '@shared/components/products';
import { Query } from 'react-apollo';
import { Menu } from 'semantic-ui-react';
import { get } from 'lodash';
import qs from 'query-string';
import gql from 'graphql-tag';
import css from './index.scss';

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

class AdminProductsPage extends Component {
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
              <Menu className={css.menu} secondary>
                <Menu.Item>
                  <ProductSearch
                    products={products}
                    onSearch={this.handleSearch}
                    initialQuery={initial}
                    loading={loading}
                  />
                </Menu.Item>
                <Menu.Item
                  as={Link}
                  name="Import"
                  to="/admin/products/import"
                  icon="upload"
                />
                <Menu.Item
                  as={Link}
                  to="/admin/products/new"
                  name="New Product"
                  icon="plus"
                />
              </Menu>
              <ProductList loading={loading} products={products} />
            </div>
          );
        }}
      </Query>
    );
  }
}

export default withRouter(AdminProductsPage);
