import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import OptionTypes from './OptionTypes';
import VariantList from './VariantList';

import css from './index.scss';

class VariantCreator extends Component {
  static propTypes = {
    form: PropTypes.shape({
      values: PropTypes.shape({
        optionTypes: PropTypes.array
      })
    })
  };

  state = { adding: false };

  handleStartAdding = () => {
    const { form } = this.props;
    const { adding } = this.state;

    this.setState({ adding: !adding });

    // Add a default
    form.setFieldValue('optionTypes.0.name', 'Size');
  };

  render() {
    const { form } = this.props;
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
          type="button"
          onClick={this.handleStartAdding}
          content={adding ? 'Cancel' : 'Add Variant'}
        />
        {adding && (
          <Fragment>
            <OptionTypes
              form={form}
              optionTypes={form.values.optionTypes}
              onAddOptionValue={this.handleAddOptionValue}
            />
            <Fragment>
              <VariantList
                form={form}
                optionTypes={form.values.optionTypes}
                variants={form.values.variants}
              />
            </Fragment>
          </Fragment>
        )}
      </div>
    );
  }
}

export default VariantCreator;
