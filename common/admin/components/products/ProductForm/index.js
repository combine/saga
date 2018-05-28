import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Formik, Field } from 'formik';
import { Form } from 'semantic-ui-react';
import { Input, Button } from '@shared/components/form';
import { getValidationErrors } from '@lib/errors';
// import schema from './schema';
import css from './index.scss';

class ProductForm extends Component {
  static propTypes = {
    product: PropTypes.object,
    onSubmit: PropTypes.func.isRequired
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

  renderForm = ({ handleSubmit, isSubmitting, isValid }) => {
    const { product } = this.props;

    return (
      <Form className={css.productForm} onSubmit={handleSubmit} error={true}>
        <Field
          component={Input}
          name="name"
          placeholder="Product Name"
        />
        <Field
          component={Input}
          inputComponent="textarea"
          name="description"
          placeholder="Description"
        />
        <div className={css.actions}>
          <Button
            primary
            type="submit"
            loading={isSubmitting}
            disabled={isSubmitting || !isValid}
          >
            {product ? 'Update Product' : 'Create Product'}
          </Button>
        </div>
      </Form>
    );
  };

  render() {
    const { product } = this.props;

    return (
      <Formik
        initialValues={product}
        onSubmit={this.handleSubmit}
        enableReinitialize={true}
        // validationSchema={schema}
        render={this.renderForm}
      />
    );
  }
}

export default ProductForm;
