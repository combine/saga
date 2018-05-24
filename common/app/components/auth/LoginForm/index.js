import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { Formik, Field } from 'formik';
import { Form } from 'semantic-ui-react';
import { Input, Button } from '@shared/components/form';
// import { login } from '@app/actions/auth';
import transformErrors from '@lib/transformErrors';
import schema from './schema';
import css from './index.scss';

class LoginForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
  };

  handleSubmit = (values, actions) => {
    const { onSubmit } = this.props;

    return onSubmit(values)
      .then(() => {
        history.push('/');
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

export default withRouter(LoginForm);
