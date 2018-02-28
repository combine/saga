import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Header, Menu } from 'semantic-ui-react';

class HeaderView extends Component {
  render() {
    return (
      <Header>
        <Menu size="massive">
          <Menu.Item to="/" exact as={NavLink} content="Home" />
          <Menu.Item to="/products" exact as={NavLink} content="Products" />
          <Menu.Menu position="right">
            <Menu.Item to="/login" as={NavLink} content="Login" />
            <Menu.Item to="/signup" as={NavLink} content="Signup" />
          </Menu.Menu>
        </Menu>
      </Header>
    );
  }
}

export default HeaderView;
