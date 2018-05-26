import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SignupForm, { SIGNUP_MUTATION } from '@app/components/auth/SignupForm';
import { Helmet } from 'react-helmet';
import { Redirect, withRouter } from 'react-router-dom';
import { withApollo } from 'react-apollo';
import currentUser, { GET_CURRENT_USER } from '@shared/auth/currentUser';
import localStorage from '@shared/lib/localStorage';
import css from './index.scss';

class SignupPage extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    client: PropTypes.object.isRequired,
    currentUser: PropTypes.object
  };

  handleSubmit = values => {
    const { history, client } = this.props;

    return client
      .mutate({
        mutation: SIGNUP_MUTATION,
        variables: values,
        update: (cache, { data }) => {
          const { signup: { currentUser } } = data;

          cache.writeQuery({
            query: GET_CURRENT_USER,
            data: { currentUser }
          });
        }
      })
      .then(({ data }) => {
        const { token } = data.signup;

        localStorage.set('token', token);
        history.push('/');
      });
  };
  render() {
    const { currentUser } = this.props;
    const title = 'Sign Up';

    if (currentUser) {
      return <Redirect to="/" />;
    }

    return (
      <div className={css.signupPage}>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <h1>{title}</h1>
        <SignupForm onSubmit={this.handleSubmit} />
      </div>
    );
  }
}

export default currentUser(withApollo(withRouter(SignupPage)));
