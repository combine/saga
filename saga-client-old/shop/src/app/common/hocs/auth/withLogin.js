import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { GET_CURRENT_USER } from './withUser';
import localStorage from '@lib/localStorage';
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
      mutate: PropTypes.func.isRequired
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

  return graphql(LOGIN_MUTATION)(LoginMutation);
};

export default withLogin;
