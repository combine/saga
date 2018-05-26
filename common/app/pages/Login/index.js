import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { withApollo } from 'react-apollo';
import LoginForm, { LOGIN_MUTATION } from '@app/components/auth/LoginForm';
import currentUser, { GET_CURRENT_USER } from '@shared/auth/currentUser';
import { Redirect, withRouter } from 'react-router-dom';
import localStorage from '@shared/lib/localStorage';
import css from './index.scss';

class LoginPage extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    client: PropTypes.object.isRequired,
    currentUser: PropTypes.object
  };

  handleSubmit = values => {
    const { history, client } = this.props;

    return client
      .mutate({
        mutation: LOGIN_MUTATION,
        variables: values,
        update: (cache, { data }) => {
          const { login: { currentUser } } = data;

          cache.writeQuery({
            query: GET_CURRENT_USER,
            data: { currentUser }
          });
        }
      })
      .then(({ data }) => {
        const { token } = data.login;

        localStorage.set('token', token);
        history.push('/');
      });
  };

  render() {
    const { currentUser } = this.props;
    const title = 'Log In';

    if (currentUser) {
      return <Redirect to="/" />;
    }

    return (
      <div className={css.loginPage}>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <h1>{title}</h1>
        <LoginForm onSubmit={this.handleSubmit} />
      </div>
    );
  }
}

export default currentUser(withApollo(withRouter(LoginPage)));
