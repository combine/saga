import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import { Link } from 'react-router-dom';
import { Formik, Field } from 'formik';
import { Form, Message } from 'semantic-ui-react';
import { Input, Button } from '@components/form';
import { signup } from '@actions/auth';
import validate from './validate';
import css from './index.scss';

class SignupForm extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };

  state = { error: null };

  handleSubmit = (values, actions) => {
    const { dispatch } = this.props;

    return dispatch(signup(values))
      .then(() => {
        dispatch(push('/'));
        actions.setSubmitting(false);
      })
      .catch(err => {
        this.setState({ error: err.reason });
        actions.setSubmitting(false);
      });
  };

  renderForm = ({ handleSubmit, isSubmitting, isValid }) => {
    const { error } = this.state;

    return (
      <Form className={css.signupForm} onSubmit={handleSubmit} error={!!error}>
        {error && (
          <Message
            error
            header="Submission Error"
            content={error}
          />
        )}
        <Field component={Input} name="name" placeholder="Name" />
        <Field
          component={Input}
          type="email"
          name="email"
          placeholder="Email"
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
            Sign Up
          </Button>
          <p>
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
      </Form>
    );
  };

  render() {
    return (
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        onSubmit={this.handleSubmit}
        validate={validate}
        render={this.renderForm}
      />
    );
  }
}

export default SignupForm;
