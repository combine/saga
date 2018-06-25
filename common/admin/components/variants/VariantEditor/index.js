import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Input, Button, Checkbox } from 'semantic-ui-react';
import { Creatable } from 'react-select';
import { variantSet, hasValues } from '@admin/helpers/variants';
import { get } from 'lodash';
import dayjs from 'dayjs';
import css from './index.scss';

class VariantEditor extends Component {
  static propTypes = {
    product: PropTypes.object.isRequired
  };

  state = {
    adding: false,
    optionTypes: [
      {
        id: dayjs().valueOf(),
        name: 'Size',
        values: []
      }
    ]
  };

  handleAddVariant = e => {
    const { product } = this.props;

    e.preventDefault();

    // Add first set of variants since there aren't any yet
    if (!get(product, 'variants', []).length) {
      this.setState({ adding: !this.state.adding });
    } else {
      // TODO: Perform add new variant functionality.
    }
  };

  handleAddOptionType = e => {
    e.preventDefault();
    this.setState({
      optionTypes: [
        ...this.state.optionTypes,
        { id: dayjs().valueOf(), name: '', values: [] }
      ]
    });
  };

  handleOptionNameChange = optionType => {
    return (ev, { value }) => {
      this.setState({
        optionTypes: this.state.optionTypes.map(ot => {
          if (ot.id === optionType.id) {
            return { ...ot, name: value };
          }
          return ot;
        })
      });
    };
  };

  handleAddOptionValue = optionType => {
    return values => {
      this.setState({
        optionTypes: this.state.optionTypes.map(ot => {
          if (ot.id === optionType.id) {
            return { ...ot, values };
          }
          return ot;
        })
      });
    };
  };

  handleRemoveOptionType = optionType => {
    return ev => {
      ev.preventDefault();

      this.setState({
        optionTypes: this.state.optionTypes.filter(ot => {
          return ot.id !== optionType.id;
        })
      });
    };
  };

  renderAddForm = () => {
    const { adding, optionTypes } = this.state;

    if (!adding) return null;

    return (
      <Table basic className={css.optionTypes}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Option name</Table.HeaderCell>
            <Table.HeaderCell>Option values</Table.HeaderCell>
            <Table.HeaderCell collapsing />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {optionTypes.map(optionType => {
            const { id, name, values } = optionType;

            return (
              <Table.Row key={id}>
                <Table.Cell collapsing>
                  <Input
                    placeholder="Option Name"
                    value={name}
                    onChange={this.handleOptionNameChange(optionType)}
                    className={css.optionNameInput}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Creatable
                    isMulti
                    onChange={this.handleAddOptionValue(optionType)}
                    placeholder="Add separate option values..."
                    options={values}
                    value={values}
                    selected
                  />
                </Table.Cell>
                <Table.Cell>
                  <Button
                    icon="trash"
                    onClick={this.handleRemoveOptionType(optionType)}
                  />
                </Table.Cell>
              </Table.Row>
            );
          })}
          <Table.Row>
            <Table.Cell colSpan={3}>
              <Button
                onClick={this.handleAddOptionType}
                content="Add another option"
              />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
  };

  renderVariants = () => {
    const { adding, optionTypes: types } = this.state;
    const hasValuesAndName = ot => (
      (ot.values && ot.values.length > 0) &&
      (ot.name && ot.name !== '')
    );
    const optionTypes = types.filter(hasValuesAndName);
    const num = optionTypes.length;

    // only render if there is at least one option type with values
    if (!adding || !num || !(num && optionTypes[0].values.length)) {
      return null;
    }

    const optionCombos = variantSet(optionTypes);

    console.log(optionCombos);

    return (
      <Fragment>
        <p>Modify each variant as needed:</p>
        <Table basic className={css.optionTypes}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell collapsing>
                <Checkbox />
              </Table.HeaderCell>
              {optionTypes.map(optionType => {
                return (
                  <Table.HeaderCell collapsing key={optionType.id}>
                    {optionType.name}
                  </Table.HeaderCell>
                );
              })}
              <Table.HeaderCell>Price</Table.HeaderCell>
              <Table.HeaderCell>SKU</Table.HeaderCell>
              <Table.HeaderCell>Barcode</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {optionCombos.map((combo, idx) => {
              return (
                <Table.Row key={idx}>
                  <Table.Cell>
                    <Checkbox />
                  </Table.Cell>
                  {combo.map(({ label, value }) => {
                    return (
                      <Table.Cell key={`${idx}-${value}`}>{label}</Table.Cell>
                    );
                  })}
                  <Table.Cell>
                    <Input placeholder="Price" defaultValue={0} type="number" />
                  </Table.Cell>
                  <Table.Cell>
                    <Input placeholder="SKU" />
                  </Table.Cell>
                  <Table.Cell>
                    <Input placeholder="Barcode" />
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </Fragment>
    );
  };

  render() {
    const { adding } = this.state;
    return (
      <div className={css.variantEditor}>
        <h3>Variants</h3>
        <p>
          Add variants of your product if it comes in multiple versions, such as
          sizes and colors.
        </p>
        <Button
          secondary
          onClick={this.handleAddVariant}
          content={adding ? 'Cancel' : 'Add Variant'}
        />
        {this.renderAddForm()}
        {this.renderVariants()}
      </div>
    );
  }
}

export default VariantEditor;
