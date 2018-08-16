import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Formik, Field } from 'formik';
import { Form } from 'semantic-ui-react';
import { Input, Button } from '@common/components/form';
import { getValidationErrors } from '@lib/errors';
import schema from './schema';
import css from './index.scss';

class LoginForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired
  };

  handleSubmit = (values, actions) => {
    const { onSubmit } = this.props;

    return onSubmit(values).catch(error => {
      actions.setErrors(getValidationErrors(error, 'login'));
      actions.setSubmitting(false);
    });
  };

  renderForm = ({ handleSubmit, isSubmitting, isValid }) => {
    return (
      <Form className={css.loginForm} onSubmit={handleSubmit} error={true}>
        <Field
          component={Input}
          name="usernameOrEmail"
          placeholder="Username or email"
        />
        <Field
          component={Input}
          type="password"
          name="password"
          placeholder="Password"
        />
        <div className={css.actions}>
          <Button
            primary
            type="submit"
            loading={isSubmitting}
            disabled={isSubmitting || !isValid}
          >
            Log In
          </Button>
          <p>
            Don&apos;t have an account?&nbsp;
            <Link to="/signup">Create an account</Link>
          </p>
        </div>
      </Form>
    );
  };

  render() {
    return (
      <Formik
        initialValues={{ usernameOrEmail: '', password: '' }}
        onSubmit={this.handleSubmit}
        validationSchema={schema}
        render={this.renderForm}
      />
    );
  }
}

export default LoginForm;
