import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withApollo, graphql } from 'react-apollo';
import { GET_CURRENT_USER } from './withUser';
import localStorage from '@shared/lib/localStorage';
import gql from 'graphql-tag';

export const LOGIN_MUTATION = gql`
  mutation loginMutation($usernameOrEmail: String!, $password: String!) {
    login(usernameOrEmail: $usernameOrEmail, password: $password) {
      token
      currentUser {
        id
        firstName
        lastName
        username
        email
        role
      }
    }
  }
`;

const withLogin = function(ComposedComponent) {
  class LoginMutation extends Component {
    static propTypes = {
      client: PropTypes.object.isRequired,
      mutate: PropTypes.func.isRequired,
      history: PropTypes.object.isRequired
    };

    executeLogin = values => {
      const { mutate } = this.props;

      return mutate({
        variables: values,
        update: (cache, { data }) => {
          const { login: { currentUser } } = data;

          cache.writeQuery({
            query: GET_CURRENT_USER,
            data: { currentUser }
          });
        }
      }).then(({ data }) => {
        const { token } = data.login;

        localStorage.set('token', token);
      });
    };

    render() {
      return <ComposedComponent {...this.props} login={this.executeLogin} />;
    }
  }

  return graphql(LOGIN_MUTATION)(withApollo(withRouter(LoginMutation)));
};

export default withLogin;
