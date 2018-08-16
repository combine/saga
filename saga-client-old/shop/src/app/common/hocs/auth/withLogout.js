import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withApollo, graphql } from 'react-apollo';
import localStorage from '@lib/localStorage';
import gql from 'graphql-tag';

const LOGOUT_MUTATION = gql`
  mutation {
    logout
  }
`;

const withLogout = function(ComposedComponent) {
  class LogoutMutation extends Component {
    static propTypes = {
      client: PropTypes.object.isRequired,
      mutate: PropTypes.func.isRequired,
      history: PropTypes.object.isRequired
    };

    executeMutation = () => {
      const { client, mutate } = this.props;

      return mutate().then(() => {
        localStorage.remove('token');
        client.resetStore();
      });
    };

    render() {
      return (
        <ComposedComponent {...this.props} logout={this.executeMutation} />
      );
    }
  }

  return graphql(LOGOUT_MUTATION)(withApollo(withRouter(LogoutMutation)));
};

export default withLogout;
