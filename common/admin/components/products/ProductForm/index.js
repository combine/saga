import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Formik, Field } from 'formik';
import { Input, FormActions, StickyForm } from '@shared/components/form';
import { Segment, Button } from 'semantic-ui-react';
import { OptionTypeForm } from '@admin/components/options';
import { getValidationErrors } from '@lib/errors';
import { get } from 'lodash';
// import schema from './schema';
import css from './index.scss';

class ProductForm extends Component {
  static propTypes = {
    product: PropTypes.object,
    onSubmit: PropTypes.func.isRequired,
    title: PropTypes.string
  };

  static defaultProps = {
    product: {
      name: '',
      description: '',
      optionTypes: []
    }
  };

  state = { adding: false };

  handleAddVariant = form => {
    const { product } = this.props;

    return (e) => {
      e.preventDefault();

      // Add first set of variants since there aren't any yet
      if (!get(product, 'variants', []).length) {
        this.setState({ adding: !this.state.adding });

        // Add a default
        form.setFieldValue('optionTypes.0.name', 'Size');
      } else {
        // TODO: Perform add new variant functionality.
      }
    };
  };

  handleSubmit = (values, actions) => {
    const { onSubmit } = this.props;

    return onSubmit(values)
      .then(() => {
        actions.setSubmitting(false);
      })
      .catch(err => {
        actions.setErrors(getValidationErrors(err));
        actions.setSubmitting(false);
      });
  };

  render() {
    const { product, title } = this.props;
    const { adding } = this.state;

    return (
      <Formik
        // validationSchema={schema}
        initialValues={product}
        onSubmit={this.handleSubmit}
        enableReinitialize={true}
        render={form => {
          return (
            <StickyForm
              formProps={{
                onSubmit: form.handleSubmit,
                error: true
              }}
              className={css.productForm}
              renderActions={() => (
                <FormActions
                  form={form}
                  submitText={product ? 'Save' : 'Create'}
                />
              )}
            >
              {title && <h1>{title}</h1>}
              <Segment>
                <Field
                  component={Input}
                  name="name"
                  label="Title"
                  placeholder="Cool Running Shoes"
                />
                <Field
                  component={Input}
                  inputComponent="textarea"
                  name="description"
                  label="Description"
                  placeholder="Description"
                />
              </Segment>
              <Segment clearing>
                <div className={css.variantEditor}>
                  <h3>Variants</h3>
                  <p>
                    Add variants of your product if it comes in multiple
                    versions, such as sizes and colors.
                  </p>
                  <Button
                    secondary
                    onClick={this.handleAddVariant(form)}
                    content={adding ? 'Cancel' : 'Add Variant'}
                  />
                  {adding && (
                    <OptionTypeForm
                      form={form}
                      optionTypes={form.values.optionTypes}
                    />
                  )}
                </div>
              </Segment>
            </StickyForm>
          );
        }}
      />
    );
  }
}

export default ProductForm;
