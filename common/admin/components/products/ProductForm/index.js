import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Formik, Field } from 'formik';
import { Input, FormActions, StickyForm } from '@shared/components/form';
import { Segment } from 'semantic-ui-react';
import { VariantEditor } from '@admin/components/variants';
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
    product: {}
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

  renderActions = form => {
    const { product } = this.props;

    return () => (
      <FormActions form={form} submitText={product ? 'Save' : 'Create'} />
    );
  };

  renderForm = form => {
    const { product, title } = this.props;
    const { handleSubmit } = form;

    return (
      <StickyForm
        formProps={{
          onSubmit: handleSubmit,
          error: true
        }}
        className={css.productForm}
        renderActions={this.renderActions(form)}
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
            placeholder="Description"
          />
        </Segment>
        <Segment clearing>
          <VariantEditor product={product} />
        </Segment>
      </StickyForm>
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
