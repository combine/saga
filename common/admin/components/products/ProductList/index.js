import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class ProductList extends React.Component {
  static propTypes = {
    products: PropTypes.array.isRequired
  };

  static defaultProps = {
    products: []
  };

  render() {
    const { products } = this.props;

    return (
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {products.map(product => (
            <Table.Row key={product.id}>
              <Table.Cell>{product.id}</Table.Cell>
              <Table.Cell>
                <Link to={`/admin/products/${product.slug}`}>
                  {product.name}
                </Link>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  }
}

export default ProductList;
