import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';
import { Header, Menu } from 'semantic-ui-react';
import { withUser, withLogout } from '@shared/hocs/auth';

class HeaderView extends Component {
  static propTypes = {
    currentUser: PropTypes.object,
    logout: PropTypes.func.isRequired
  }

  logout = () => {
    const { logout } = this.props;

    return logout();
  }

  render() {
    const { currentUser: user } = this.props;

    if (!user || user && user.role !== 'admin') {
      return <Redirect to='/' />;
    }

    return (
      <Header>
        <Menu size="massive">
          <Menu.Menu position="right">
            <Menu.Item>
              <b>{user.username}</b>
            </Menu.Item>
            <Menu.Item as="a" content="Home" href="/" />
            <Menu.Item as="a" content="Logout" onClick={this.logout} />
          </Menu.Menu>
        </Menu>
      </Header>
    );
  }
}

export default withUser(withLogout(withRouter(HeaderView)));
