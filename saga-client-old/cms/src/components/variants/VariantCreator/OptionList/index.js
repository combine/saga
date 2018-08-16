import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Input } from 'semantic-ui-react';
import { Creatable } from 'react-select';
import { getVariantOptions } from '@admin/helpers/variants';
import { get } from 'lodash';
import dayjs from 'dayjs';
import css from './index.scss';

class OptionsList extends Component {
  static propTypes = {
    form: PropTypes.object,
    onChange: PropTypes.func
  };

  state = {
    options: [
      { id: dayjs().valueOf(), name: 'Size', values: [] }
    ]
  };

  // Updates the generate variants based on the option types.
  updateVariants = () => {
    const { onChange } = this.props;

    // Wrap in a timeout so this isn't executed until state is updated
    // TODO: Try to do something better here.
    setTimeout(() => {
      const { form } = this.props;
      const { options } = this.state;
      const variantOptions = getVariantOptions(options);
      const variants = variantOptions.map((options, idx) => {
        let variant = get(form, `values.variants[${idx}]`, {});

        return {
          priceInCents: 0,
          sku: '',
          barcode: '',
          ...variant,
          options
        };
      });

      form.setFieldValue('variants', variants);

      // TODO: We can do better here, maybe on componentDidUpdate?
      if (typeof onChange === 'function') {
        return onChange(options);
      }
    });
  };

  handleAddOption = () => {
    this.setState({
      options: [
        ...this.state.options,
        { id: dayjs().valueOf(), name: '', values: [] }
      ]
    });

    this.updateVariants();
  };

  handleRemoveOption = id => {
    return () => {
      this.setState({
        options: this.state.options.filter(option => option.id !== id)
      });

      this.updateVariants();
    };
  };

  // Custom handler for react select component
  handleAddOptionValue = id => {
    return data => {
      const { options } = this.state;
      const values = data.map(v => v.value);

      this.setState({
        options: options.map(option => {
          if (option.id === id) {
            return { ...option, values };
          }

          return option;
        })
      });

      this.updateVariants();
    };
  };

  handleChangeOptionName = id => {
    return (e, { value }) => {
      this.setState({
        options: this.state.options.map(option => {
          if (option.id === id) {
            return { ...option, name: value };
          }
          return option;
        })
      });

      this.updateVariants();
    };
  };

  render() {
    const { options } = this.state;

    return (
      <Table basic className={css.options}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Option name</Table.HeaderCell>
            <Table.HeaderCell>Option values</Table.HeaderCell>
            <Table.HeaderCell collapsing />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {options.map((option, idx) => {
            const { id, name } = option;

            return (
              <Table.Row key={idx}>
                <Table.Cell collapsing>
                  <Input
                    className={css.optionNameInput}
                    placeholder="Option Name"
                    onChange={this.handleChangeOptionName(id)}
                    value={name}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Creatable
                    isMulti
                    onChange={this.handleAddOptionValue(id)}
                    placeholder="Add separate option values..."
                    selected
                  />
                </Table.Cell>
                <Table.Cell>
                  <Button
                    icon="trash"
                    type="button"
                    onClick={this.handleRemoveOption(id)}
                  />
                </Table.Cell>
              </Table.Row>
            );
          })}
          <Table.Row>
            <Table.Cell colSpan={3}>
              <Button
                onClick={this.handleAddOption}
                type="button"
                content="Add another option"
              />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
  }
}

export default OptionsList;
