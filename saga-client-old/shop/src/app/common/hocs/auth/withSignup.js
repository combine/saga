import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { GET_CURRENT_USER } from './withUser';
import localStorage from '@lib/localStorage';
import gql from 'graphql-tag';

export const SIGNUP_MUTATION = gql`
  mutation signupMutation(
    $email: String!
    $username: String!
    $password: String!
  ) {
    signup(username: $username, email: $email, password: $password) {
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

const withSignup = function(ComposedComponent) {
  class SignupMutation extends Component {
    static propTypes = {
      mutate: PropTypes.func.isRequired
    };

    executeSignup = values => {
      const { mutate } = this.props;


      return mutate({
        variables: values,
        update: (cache, { data }) => {
          const { signup: { currentUser } } = data;

          cache.writeQuery({
            query: GET_CURRENT_USER,
            data: { currentUser }
          });
        }
      }).then(({ data }) => {
        const { token } = data.signup;

        localStorage.set('token', token);
      });
    }

    render() {
      return <ComposedComponent {...this.props} signup={this.executeSignup} />;
    }
  }

  return graphql(SIGNUP_MUTATION)(SignupMutation);
};

export default withSignup;
