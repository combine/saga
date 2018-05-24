import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { withApollo } from 'react-apollo';
import { LoginForm } from '@app/components/auth';
import localStorage from '@shared/lib/localStorage';
import gql from 'graphql-tag';
import css from './index.scss';

const LOGIN = gql`
  query loginQuery($usernameOrEmail: String!, $password: String!) {
    login(usernameOrEmail: $usernameOrEmail, password: $password)
  }
`;

class LoginPage extends Component {
  static propTypes = {
    client: PropTypes.object.isRequired
  }

  handleSubmit = (values) => {
    const { client } = this.props;

    return client
      .query({ query: LOGIN, variables: values })
      .then(({ data }) => {
        localStorage.set('token', data.login);
      });
  }

  render() {
    const title = 'Log In';

    // if (auth.isLoggedIn) {
    //   return <Redirect to="/" />;
    // }

    return (
      <div className={css.loginPage}>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <h1>{title}</h1>
        <LoginForm
          onSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

export default withApollo(LoginPage);
