import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

class SidebarMenu extends Component {
  static propTypes = {
    visible: PropTypes.bool
  };

  render() {
    return (
      <Menu vertical>
        <Menu.Item as={NavLink} to="/admin" exact={true} name="home">
          <Icon name="home" />
          Home
        </Menu.Item>
        <Menu.Item as={NavLink} to="/admin/products" name="bag">
          <Icon name="cart" />
          Products
        </Menu.Item>
      </Menu>
    );
  }
}

export default SidebarMenu;
