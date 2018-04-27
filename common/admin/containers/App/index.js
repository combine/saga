import React from 'react';
import { Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import { RouteWithSubRoutes } from '@shared/components/common';
import { Header } from '@admin/components/common';
import { hot } from 'react-hot-loader';
import routes from '@admin/routes';
import css from './index.scss';

const App = () => {
  return (
    <Container fluid={true} className={css.appContainer}>
      <Header />
      <div className={css.content}>
        <Switch>
          {routes.map(route => (
            <RouteWithSubRoutes key={route.path} {...route} />
          ))}
        </Switch>
      </div>
    </Container>
  );
};

export default hot(module)(App);
