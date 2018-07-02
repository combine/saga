import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Formik, Field } from 'formik';
import { Input, FormActions, StickyForm } from '@shared/components/form';
import { Segment } from 'semantic-ui-react';
import { VariantCreator } from '@admin/components/variants';
import { getValidationErrors } from '@lib/errors';
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
                  submitText={product.id ? 'Save' : 'Create'}
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
                {!product.id && <VariantCreator form={form} />}
              </Segment>
            </StickyForm>
          );
        }}
      />
    );
  }
}

export default ProductForm;
