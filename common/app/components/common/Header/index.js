import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { Header, Menu } from 'semantic-ui-react';
import { logout } from '@app/actions/auth';

class HeaderView extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  logout = () => {
    const { dispatch } = this.props;

    dispatch(logout());
  }

  renderAdmin = () => {
    const { auth } = this.props;

    if (auth.isAdmin) {
      return (
        <Menu.Item as="a" content="Admin" href="/admin" />
      );
    }

    return null;
  }

  renderUser = () => {
    const { auth } = this.props;

    if (auth.isLoggedIn) {
      return (
        <Fragment>
          <Menu.Item><b>{auth.user.username}</b></Menu.Item>
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

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default withRouter(connect(mapStateToProps)(HeaderView));
