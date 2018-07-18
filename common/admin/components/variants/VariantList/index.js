import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Checkbox } from 'semantic-ui-react';
import { Field } from 'formik';
import { Input, InputField } from '@shared/components/form';
import { first, map } from 'lodash';
import css from './index.scss';

class VariantList extends Component {
  static propTypes = {
    variants: PropTypes.array
  };

  static defaultProps = {
    variants: []
  };

  render() {
    const { variants } = this.props;
    const options = Object.keys(first(variants).options);

    return (
      <Table basic className={css.variantListTable}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell collapsing>
              <Checkbox />
            </Table.HeaderCell>
            {options.map((opt, idx) => (
              <Table.HeaderCell key={idx}>{opt}</Table.HeaderCell>
            ))}
            <Table.HeaderCell>Price</Table.HeaderCell>
            <Table.HeaderCell>SKU</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {variants.map((variant, idx) => {
            return (
              <Table.Row className={css.variant} key={idx}>
                <Table.Cell className={css.checkbox}>
                  <Checkbox />
                </Table.Cell>
                {options.map((name, index) => {
                  return (
                    <Table.Cell key={`${idx}-${index}`}>
                      <Field
                        component={InputField}
                        name={`variants[${idx}].options[${name}]`}
                        className={css.optionField}
                        placeholder={name}
                      />
                    </Table.Cell>
                  );
                })}
                <Table.Cell>
                  <Field
                    component={InputField}
                    name={`variants.${idx}.priceInCents`}
                    placeholder="Price"
                    type="number"
                  />
                </Table.Cell>
                <Table.Cell>
                  <Field
                    component={InputField}
                    name={`variants.${idx}.sku`}
                    placeholder="SKU"
                  />
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    );
  }
}

export default VariantList;
