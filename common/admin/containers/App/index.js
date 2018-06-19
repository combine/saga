import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import { RouteWithSubRoutes } from '@shared/components/common';
import { Sidebar, Segment, Button } from 'semantic-ui-react';
import { Header, SidebarMenu } from '@admin/components/common';
import { hot } from 'react-hot-loader';
import routes from '@admin/routes';
import css from './index.scss';

class App extends Component {
  state = { sidebar: true };

  toggleSidebar = () => this.setState({ sidebar: !this.state.sidebar })

  render() {
    const { sidebar } = this.state;

    return (
      <Container fluid={true} className={css.appContainer}>
        <Header />
        <Button onClick={this.toggleSidebar}>&raquo;</Button>
        <Sidebar.Pushable as={Segment}>
          <SidebarMenu visible={sidebar} />
          <Sidebar.Pusher>
            <Segment basic className={css.content}>
              <Switch>
                {routes.map(route => (
                  <RouteWithSubRoutes key={route.path} {...route} />
                ))}
              </Switch>
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Container>
    );
  }
}

export default hot(module)(App);
