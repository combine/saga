import { matchPath } from 'react-router';

// See react-router's Server Rendering section:
// https://reacttraining.com/react-router/web/guides/server-rendering
export default function matchRoutes(baseUrl, routes) {
  return routes.reduce((matches, route) => {
    const { path } = route;
    const match = matchPath(baseUrl, {
      path,
      exact: true,
      strict: false
    });

    if (match) {
      // Grab any wrapped components
      const wc =
        (route.component && route.component.WrappedComponent) ||
        route.component;

      // Push a new object into the matches array
      matches.push({
        route,
        match,
        // ensure that any static fetchData methods are included,
        // otherwise return an empty resolved promise.
        fetchData: (wc && wc.fetchData) || (() => Promise.resolve())
      });
    }

    if (!match && route.routes) {
      // recursively try to match nested routes
      const nested = matchRoutes(baseUrl, route.routes);

      if (nested.length) {
        matches = matches.concat(nested);
      }
    }

    return matches;
  }, []);
}
