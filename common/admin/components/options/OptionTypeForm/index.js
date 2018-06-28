import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, FieldArray } from 'formik';
import { Input } from '@shared/components/form';
import { Table, Button } from 'semantic-ui-react';
import { Creatable } from 'react-select';
import css from './index.scss';

class OptionTypeForm extends Component {
  static propTypes = {
    form: PropTypes.object,
    optionTypes: PropTypes.array
  };

  // Custom handler for react select component
  handleAddOptionValue = ({ form, field }) => {
    return values => form.setFieldValue(field.name, values);
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
                        // onChange={this.handleOptionNameChange(optionType)}
                        placeholder="Option Name"
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <Field
                        name={`optionTypes.${idx}.values`}
                        render={props => {
                          return (
                            <Creatable
                              isMulti
                              onChange={this.handleAddOptionValue(props)}
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
                        onClick={() => remove(idx)}
                      />
                    </Table.Cell>
                  </Table.Row>
                );
              })}
              <Table.Row>
                <Table.Cell colSpan={3}>
                  <Button
                    onClick={() => push({ name: '', values: [] }) }
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

export default OptionTypeForm;
