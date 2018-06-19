import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Formik, Field } from 'formik';
import { Form } from 'semantic-ui-react';
import { FormActions, Input } from '@shared/components/form';
import css from './index.scss';

export const VariantFormFieldFragment = (props) => {
  const { variant } = props;

  return (
    <Fragment>
      <Field component={Input} name="priceInCents" placeholder="Price" />
      <Field component={Input} name="sku" placeholder="SKU" />
      <Field component={Input} name="barcode" placeholder="Barcode" />
    </Fragment>
  );
};

export default class VariantForm extends Component {
  static propTypes = {
    variant: PropTypes.object
  };

  renderForm = (form) => {
    const { variant } = this.props;
    const { handleSubmit, isValid } = form;

    return (
      <Form
        className={css.productForm}
        onSubmit={handleSubmit}
        error={!isValid}
      >
        <VariantFormFieldFragment />
        <FormActions
          form={form}
          submitText={variant ? 'Update Variant' : 'Create Variant'}
        />
      </Form>
    );
  };

  render() {
    const { variant } = this.props;

    return (
      <Formik
        initialValues={variant}
        enableReinitialize={true}
        render={this.renderForm}
      />
    );
  }
}
