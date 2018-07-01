import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, FieldArray } from 'formik';
import { Input } from '@shared/components/form';
import { Table, Button } from 'semantic-ui-react';
import { Creatable } from 'react-select';
import { getVariantOptions } from '@admin/helpers/variants';
import { get } from 'lodash';
import css from './index.scss';

class OptionTypes extends Component {
  static propTypes = {
    form: PropTypes.object,
    optionTypes: PropTypes.array
  };

  // Updates the generate variants based on the option types.
  updateVariants = () => {
    // TODO: Fix this if Formik allows promise/callbacks on setFieldValue.
    // Wrap in a timeout so this isn't executed until form values are updated
    setTimeout(() => {
      const { form, optionTypes } = this.props;
      const variantOptions = getVariantOptions(optionTypes);

      form.setFieldValue(
        'variants',
        variantOptions.map((options, idx) => {
          let variant = get(form, `values.variants[${idx}]`, {});

          return {
            priceInCents: 0,
            sku: '',
            barcode: '',
            ...variant,
            options
          };
        })
      );
    });
  };

  // Custom handler for react select component
  handleAddOptionValue = field => {
    const { form } = this.props;

    return values => {
      const tags = values.map(v => v.value);

      form.setFieldValue(field.name, tags);

      this.updateVariants();
    };
  };

  render() {
    const { optionTypes } = this.props;

    return (
      <FieldArray
        name="optionTypes"
        render={({ push, remove }) => (
          <Table basic className={css.optionTypes}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Option name</Table.HeaderCell>
                <Table.HeaderCell>Option values</Table.HeaderCell>
                <Table.HeaderCell collapsing />
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {optionTypes.map((optionType, idx) => {
                return (
                  <Table.Row key={idx}>
                    <Table.Cell collapsing>
                      <Field
                        component={Input}
                        className={css.optionNameInput}
                        name={`optionTypes.${idx}.name`}
                        placeholder="Option Name"
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <Field
                        name={`optionTypes.${idx}.values`}
                        render={({ field }) => {
                          return (
                            <Creatable
                              isMulti
                              onChange={this.handleAddOptionValue(field)}
                              placeholder="Add separate option values..."
                              selected
                            />
                          );
                        }}
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <Button
                        icon="trash"
                        type="button"
                        onClick={() => {
                          remove(idx);
                          this.updateVariants();
                        }}
                      />
                    </Table.Cell>
                  </Table.Row>
                );
              })}
              <Table.Row>
                <Table.Cell colSpan={3}>
                  <Button
                    onClick={() => push({ name: '', values: [] })}
                    type="button"
                    content="Add another option"
                  />
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        )}
      />
    );
  }
}

export default OptionTypes;
