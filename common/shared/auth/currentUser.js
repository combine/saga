import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const GET_CURRENT_USER = gql`
  query getCurrentUser{
    currentUser {
      id
      firstName
      lastName
      username
      email
      role
    }
  }
`;

const currentUser = function(ComposedComponent) {
  class CurrentUser extends Component {
    render() {
      return (
        <Query query={GET_CURRENT_USER}>
          {({ data }) => {
            return (
              <ComposedComponent
                currentUser={data.currentUser}
              />
            );
          }}
        </Query>
      );
    }
  }

  return CurrentUser;
};

export default currentUser;
