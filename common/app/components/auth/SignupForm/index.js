import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import { Link } from 'react-router-dom';
import { Formik, Field } from 'formik';
import { Form } from 'semantic-ui-react';
import { Input, Button } from '@shared/components/form';
import { signup } from '@app/actions/auth';
import transformErrors from '@lib/transformErrors';
import userSchema from '@schemas/user';
import css from './index.scss';

class SignupForm extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };

  handleSubmit = (values, actions) => {
    const { dispatch } = this.props;

    return dispatch(signup(values))
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
      <Form className={css.signupForm} onSubmit={handleSubmit}>
        <Field component={Input} name="username" placeholder="Username" />
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
        initialValues={{ username: '', email: '', password: '' }}
        onSubmit={this.handleSubmit}
        validationSchema={userSchema}
        render={this.renderForm}
      />
    );
  }
}

export default SignupForm;
