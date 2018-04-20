import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';

class ProductList extends React.Component {
  static propTypes = {
    products: PropTypes.object.isRequired
  }

  render() {
    const { products } = this.props;

    return (
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              ID
            </Table.HeaderCell>
            <Table.HeaderCell>
              Name
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {products.products.map(product => (
            <Table.Row key={product.id}>
              <Table.Cell>{product.id}</Table.Cell>
              <Table.Cell>{product.name}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  }
}

export default ProductList;
