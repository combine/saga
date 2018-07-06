import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Table, Checkbox } from 'semantic-ui-react';
import { Field, FieldArray } from 'formik';
import { InputField } from '@shared/components/form';
import { validOptions } from '@admin/helpers/variants';
import css from './index.scss';

class VariantList extends Component {
  static propTypes = {
    options: PropTypes.array,
    variants: PropTypes.array
  };

  static defaultProps = {
    options: [],
    variants: []
  };

  render() {
    const { options, variants } = this.props;
    const headerOptions = options.filter(validOptions);

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
                  {headerOptions.map((option, idx) => (
                    <Table.HeaderCell collapsing key={idx}>
                      {option.name}
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
                      {Object.keys(variant.options).map((key, index) => {
                        const optionName = variant.options[key];
                        return (
                          <Table.Cell key={`${idx}-${index}-${optionName}`}>
                            {optionName}
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
