import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Form } from 'semantic-ui-react';
import { debounce } from 'lodash';
import classnames from 'classnames';
import css from './index.scss';

const DEBOUNCE_TIMER = 300;

class ProductSearch extends Component {
  static propTypes = {
    products: PropTypes.object.isRequired,
    instant: PropTypes.bool,
    className: PropTypes.string,
    onSearch: PropTypes.func,
    onSearchChange: PropTypes.func,
    initialQuery: PropTypes.string,
    emptyQuery: PropTypes.string
  };

  static defaultProps = {
    instant: true,
    initialQuery: '',
    emptyQuery: ''
  }

  state = { query: '' };

  handleSearch = () => {
    const { query } = this.state;
    const { onSearch } = this.props;

    if (typeof onSearch === 'function') {
      return onSearch({ query });
    }
  };

  debouncedSearch = debounce(this.handleSearch, DEBOUNCE_TIMER);

  handleSearchChange = (e, { value }) => {
    const { instant, onSearchChange, emptyQuery } = this.props;
    const query = value || emptyQuery;

    this.setState({ query });

    if (instant) this.debouncedSearch();

    if (typeof onSearchChange === 'function') {
      return onSearchChange({ query });
    }
  };

  render() {
    const { className, initialQuery, products } = this.props;
    const { isLoading } = products;
    const { query } = this.state;

    return (
      <div className={classnames(css.productSearch, className)}>
        <Form
          className={classnames(css.searchForm)}
          onSubmit={this.handleSearch}
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
