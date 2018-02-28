import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import { Header, Footer, RouteWithSubRoutes } from '@components/common';
import { hot } from 'react-hot-loader';
import routes from '@routes';

const App = (props) => {
  const { component } = props;

  return (
    <Container fluid={false}>
      <Header />
      {component || (
        <Switch>
          {routes.map(route => (
            <RouteWithSubRoutes key={route.path} {...route} />
          ))}
        </Switch>
      )}
      <Footer />
    </Container>
  );
};

App.propTypes = {
  component: PropTypes.node
};

export default hot(module)(App);
