import React, { Fragment, Component } from 'react';
// import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
import { Header, Menu } from 'semantic-ui-react';
// import { logout } from '@app/actions/auth';

class HeaderView extends Component {
  // logout = () => {
  //   const { dispatch } = this.props;
  //
  //   dispatch(logout());
  // };
  //
  // renderUser = () => {
  //   const { auth } = this.props;
  //
  //   return (
  //     <Fragment>
  //       <Menu.Item>
  //         <b>{auth.user.username}</b>
  //       </Menu.Item>
  //       <Menu.Item as="a" content="Home" href="/" />
  //       <Menu.Item as="a" content="Logout" onClick={this.logout} />
  //     </Fragment>
  //   );
  // };
  //
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
        </Menu>
      </Header>
    );
  }
}

export default withRouter(HeaderView);
