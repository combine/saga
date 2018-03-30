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
  };

  logout = () => {
    const { dispatch } = this.props;

    dispatch(logout());
  };

  renderUser = () => {
    const { auth } = this.props;

    return (
      <Fragment>
        <Menu.Item>
          <b>{auth.user.username}</b>
        </Menu.Item>
        <Menu.Item as="a" content="Home" href="/" />
        <Menu.Item as="a" content="Logout" onClick={this.logout} />
      </Fragment>
    );
  };

  render() {
    return (
      <Header>
        <Menu size="massive">
          <Menu.Item to="/admin" exact as={NavLink} content="Home" />
          <Menu.Item
            to="/admin/products"
            exact
            as={NavLink}
            content="Products"
          />
          <Menu.Menu position="right">{this.renderUser()}</Menu.Menu>
        </Menu>
      </Header>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default withRouter(connect(mapStateToProps)(HeaderView));
