import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Form } from 'semantic-ui-react';
import { searchProducts } from '@actions/search';
import { debounce } from 'lodash';
import classnames from 'classnames';
import css from './index.scss';

const DEBOUNCE_TIMER = 300;

class ProductSearch extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    products: PropTypes.object.isRequired,
    className: PropTypes.string
  };

  state = { query: '' };

  handleSearch = params => {
    const { dispatch } = this.props;

    return dispatch(searchProducts(params));
  };

  debouncedSearch = debounce(this.handleSearch, DEBOUNCE_TIMER);

  handleSearchChange = (e, { value }) => {
    const query = value || ' ';

    this.setState({ query });

    return this.debouncedSearch({ query });
  };

  render() {
    const { className, products: { meta, isLoading } } = this.props;
    const { query } = this.state;
    const initialQuery = (meta.query && meta.query.trim()) || '';

    return (
      <div className={classnames(css.productSearch, className)}>
        <h2>Search</h2>

        <Form
          className={classnames(css.searchForm)}
          onSubmit={() => this.handleSearch({ query })}
        >
          <Input
            placeholder="Search..."
            onChange={this.handleSearchChange}
            action={{ icon: 'search', loading: isLoading }}
            value={query || initialQuery}
          />
        </Form>
      </div>
    );
  }
}

export default ProductSearch;
