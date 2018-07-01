import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Table, Checkbox } from 'semantic-ui-react';
import { Field, FieldArray } from 'formik';
import { InputField } from '@shared/components/form';
import { valid } from '@admin/helpers/optionTypes';
import css from './index.scss';

class VariantList extends Component {
  static propTypes = {
    optionTypes: PropTypes.array,
    variants: PropTypes.array
  };

  static defaultProps = {
    optionTypes: [],
    variants: []
  };

  render() {
    const { optionTypes, variants } = this.props;
    const headerOptionTypes = optionTypes.filter(valid);

    if (!variants.length) return null;

    return (
      <FieldArray
        name="variants"
        render={() => (
          <Fragment>
            <p>Modify each variant as needed:</p>
            <Table basic className={css.variantListForm}>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell collapsing>
                    <Checkbox />
                  </Table.HeaderCell>
                  {headerOptionTypes.map((optionType, idx) => (
                    <Table.HeaderCell collapsing key={idx}>
                      {optionType.name}
                    </Table.HeaderCell>
                  ))}
                  <Table.HeaderCell>Price</Table.HeaderCell>
                  <Table.HeaderCell>SKU</Table.HeaderCell>
                  <Table.HeaderCell>Barcode</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {variants.map((variant, idx) => {
                  return (
                    <Table.Row key={idx}>
                      <Table.Cell>
                        <Checkbox />
                      </Table.Cell>
                      {variant.options.map((option, index) => (
                        <Table.Cell key={`${idx}-${index}-${option}`}>
                          {option}
                        </Table.Cell>
                      ))}
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
                      <Table.Cell>
                        <Field
                          component={InputField}
                          name={`variants.${idx}.barcode`}
                          placeholder="Barcode"
                        />
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table>
          </Fragment>
        )}
      />
    );
  }
}

export default VariantList;
