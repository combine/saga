import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { Formik, Field } from 'formik';
import { Input } from '@shared/components/form';
import { Header, Button, Segment, Form, Sticky } from 'semantic-ui-react';
import { VariantCreator, VariantList } from '@admin/components/variants';
import { getValidationErrors } from '@lib/errors';
import omitDeep from '@shared/lib/omitDeep';
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

  constructor(props) {
    super(props);
    this.headerBarRef = createRef();
  }

  handleSubmit = (values, actions) => {
    const { onSubmit } = this.props;

    return onSubmit(omitDeep(values, '__typename'))
      .then(() => {
        actions.setSubmitting(false);
      })
      .catch(err => {
        actions.setErrors(getValidationErrors(err));
        actions.setSubmitting(false);
      });
  };

  renderVariantForms = form => {
    const { product } = this.props;
    const { variants } = form.values;

    if (!product.id || !variants.length) {
      return <VariantCreator form={form} />;
    }

    return <VariantList variants={variants} />;
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
            <Form
              ref={this.headerBarRef}
              onSubmit={form.handleSubmit}
              className={css.productForm}
              error={true}
            >
              <Sticky
                context={this.headerBarRef.current}
                className={css.stickyBar}
              >
                <div className={css.stickyBarInner}>
                  {title && <h1>{title}</h1>}
                  <Button
                    primary
                    type="submit"
                    loading={form.isSubmitting}
                    disabled={!form.isValid || form.isSubmitting}
                    content={product.id ? 'Save' : 'Create'}
                  />
                </div>
              </Sticky>
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
                <h3>Variants</h3>
                {this.renderVariantForms(form)}
              </Segment>
            </Form>
          );
        }}
      />
    );
  }
}

export default ProductForm;
