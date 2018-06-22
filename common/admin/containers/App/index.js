import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import { RouteWithSubRoutes } from '@shared/components/common';
import { Header, SidebarMenu } from '@admin/components/common';
import { hot } from 'react-hot-loader';
import routes from '@admin/routes';
import css from './index.scss';

class App extends Component {
  render() {
    return (
      <Container fluid={false} className={css.appContainer}>
        <Header />
        <div className={css.container}>
          <div className={css.sidebar}>
            <SidebarMenu />
          </div>
          <div className={css.content}>
            <Switch>
              {routes.map(route => (
                <RouteWithSubRoutes key={route.path} {...route} />
              ))}
            </Switch>
          </div>
        </div>
      </Container>
    );
  }
}

export default hot(module)(App);
