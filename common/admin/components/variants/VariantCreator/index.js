import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import OptionList from './OptionList';
import VariantList from './VariantList';

import css from './index.scss';

class VariantCreator extends Component {
  static propTypes = {
    form: PropTypes.shape({
      values: PropTypes.shape({
        variants: PropTypes.array
      })
    })
  };

  state = { adding: false, options: [] };

  handleOptionChange = (options) => {
    this.setState({ options });
  }

  render() {
    const { form } = this.props;
    const { adding, options } = this.state;

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
          onClick={() => this.setState({ adding: !adding })}
          content={adding ? 'Cancel' : 'Add Variant'}
        />
        {adding && (
          <Fragment>
            <OptionList
              form={form}
              onChange={this.handleOptionChange}
            />
            <Fragment>
              <VariantList
                form={form}
                options={options}
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
