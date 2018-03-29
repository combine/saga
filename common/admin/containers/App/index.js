import React from 'react';
import { Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import { RouteWithSubRoutes } from '@shared/components/common';
import { Header } from '@admin/components/common';
import { hot } from 'react-hot-loader';
import routes from '@admin/routes';

const App = () => {
  return (
    <Container fluid={true}>
      <Header />
      <Switch>
        {routes.map(route => (
          <RouteWithSubRoutes key={route.path} {...route} />
        ))}
      </Switch>
    </Container>
  );
};

export default hot(module)(App);
