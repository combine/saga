import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';

const RouteWithSubRoutes = props => {
  const {
    path,
    computedMatch,
    component: Component,
    routes,
    restProps
  } = props;

  return (
    <Route
      path={path}
      render={props => {
        // pass the sub-routes down to keep nesting
        return (
          <Component
            {...props}
            {...restProps}
            match={computedMatch}
            routes={routes}
          />
        );
      }}
    />
  );
};

RouteWithSubRoutes.propTypes = {
  path: PropTypes.string,
  computedMatch: PropTypes.object,
  component: PropTypes.func,
  routes: PropTypes.array,
  restProps: PropTypes.object
};

export default RouteWithSubRoutes;
