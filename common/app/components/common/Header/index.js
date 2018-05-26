import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
import { withApollo } from 'react-apollo';
import { Header, Menu } from 'semantic-ui-react';
import { currentUser } from '@shared/auth';
import localStorage from '@shared/lib/localStorage';
import gql from 'graphql-tag';

const LOGOUT_MUTATION = gql`
  mutation {
    logout
  }
`;

class HeaderView extends Component {
  static propTypes = {
    currentUser: PropTypes.object,
    client: PropTypes.object.isRequired
  }

  logout = () => {
    const { client } = this.props;

    return client
      .mutate({ mutation: LOGOUT_MUTATION })
      .then(() => {
        localStorage.remove('token');
        client.resetStore();
      });
  }

  renderAdmin = () => {
    const { currentUser } = this.props;

    if (currentUser.role === 'admin') {
      return (
        <Menu.Item as="a" content="Admin" href="/admin" />
      );
    }

    return null;
  }

  renderUser = () => {
    const { currentUser } = this.props;

    if (currentUser) {
      return (
        <Fragment>
          <Menu.Item><b>{currentUser.username}</b></Menu.Item>
          {this.renderAdmin()}
          <Menu.Item as="a" content="Logout" onClick={this.logout} />
        </Fragment>
      );
    }

    return (
      <Fragment>
        <Menu.Item to="/login" as={NavLink} content="Login" />
        <Menu.Item to="/signup" as={NavLink} content="Signup" />
      </Fragment>
    );
  }

  render() {
    return (
      <Header>
        <Menu size="massive">
          <Menu.Item to="/" exact as={NavLink} content="Home" />
          <Menu.Item to="/products" exact as={NavLink} content="Products" />
          <Menu.Menu position="right">
            {this.renderUser()}
          </Menu.Menu>
        </Menu>
      </Header>
    );
  }
}

export default currentUser(withApollo(withRouter(HeaderView)));
