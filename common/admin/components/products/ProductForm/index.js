import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Formik, Field } from 'formik';
import { Input, FormActions, StickyForm } from '@shared/components/form';
import { Segment } from 'semantic-ui-react';
import { VariantCreator, VariantList } from '@admin/components/variants';
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
      variants: []
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

  renderVariantForms = (form) => {
    const { product } = this.props;
    const variants = form.values.variants.filter(v => !v.isMaster);
    let component;

    if (!product.id || !variants.length) {
      component = <VariantCreator form={form} />;
    } else {
      component = <VariantList variants={variants} />;
    }

    return (
      <Segment clearing>
        <h3>Variants</h3>
        {component}
      </Segment>
    );
  }

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
              {this.renderVariantForms(form)}
            </StickyForm>
          );
        }}
      />
    );
  }
}

export default ProductForm;
