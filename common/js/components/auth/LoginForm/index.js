import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import { Link } from 'react-router-dom';
import { Formik, Field } from 'formik';
import { Form } from 'semantic-ui-react';
import { Input, Button } from '@components/form';
import { login } from '@actions/auth';
import transformErrors from '@lib/transformErrors';
import schema from './schema';
import css from './index.scss';

class LoginForm extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };

  handleSubmit = (values, actions) => {
    const { dispatch } = this.props;

    return dispatch(login(values))
      .then(() => {
        dispatch(push('/'));
        actions.setSubmitting(false);
      })
      .catch(err => {
        actions.setErrors(transformErrors(err));
        actions.setSubmitting(false);
      });

  };

  renderForm = ({ handleSubmit, isSubmitting, isValid }) => {
    return (
      <Form className={css.loginForm} onSubmit={handleSubmit} error={true}>
        <Field
          component={Input}
          name="username"
          placeholder="Username"
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
        initialValues={{ username: '', password: '' }}
        onSubmit={this.handleSubmit}
        validationSchema={schema}
        render={this.renderForm}
      />
    );
  }
}

export default LoginForm;
