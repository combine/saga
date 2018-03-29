import React from 'react';
import { Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import { RouteWithSubRoutes } from '@shared/components/common';
import { Header, Footer } from '@app/components/common';
import { hot } from 'react-hot-loader';
import routes from '@app/routes';

const App = () => {
  return (
    <Container fluid={false}>
      <Header />
      <Switch>
        {routes.map(route => (
          <RouteWithSubRoutes key={route.path} {...route} />
        ))}
      </Switch>
      <Footer />
    </Container>
  );
};

export default hot(module)(App);
