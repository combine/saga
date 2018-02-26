import React from 'react';
import { Provider } from 'react-redux';
import { StaticRouter, matchPath } from 'react-router';
import { setMobileDetect, mobileParser } from 'react-responsive-redux';
import { renderToString } from 'react-dom/server';
import { ErrorPage } from '@components/common';
import { getBundles } from 'react-loadable/webpack';
import Loadable from 'react-loadable';
import render from './render';
import routes from '@routes';
import configureStore from '@store';
import App from '@containers/App';
import config from '$config';

let stats = null;

// This is a small 'hack' to tell webpack to avoid resolving the below file
// during compilation, since react-loadable.json may or may not exist.
const requireFunc = typeof __webpack_require__ === 'function'
  ? __non_webpack_require__
  : require;

if (config.enableDynamicImports) {
  stats = requireFunc('../../react-loadable.json');
}

export default function handleRender(req, res) {
  const initialState = {};
  // Create a new Redux store instance
  const store = configureStore(initialState);

  // Server side responsive detection
  const mobileDetect = mobileParser(req);

  // set mobile detection for our responsive store
  store.dispatch(setMobileDetect(mobileDetect));

  // Grab the initial state from our Redux store
  const finalState = store.getState();

  // If SSR is disabled, just render the skeleton HTML.
  if (!config.enableSSR) {
    const markup = render(null, finalState, []);
    return res.send(markup);
  }

  // See react-router's Server Rendering section:
  // https://reacttraining.com/react-router/web/guides/server-rendering
  const matchRoutes = routes => {
    return routes.reduce((matches, route) => {
      const { path } = route;
      const match = matchPath(req.baseUrl, {
        path,
        exact: true,
        strict: false
      });

      if (match) {
        const wc =
          (route.component && route.component.WrappedComponent) ||
          route.component;

        matches.push({
          route,
          match,
          fetchData: (wc && wc.fetchData) || (() => Promise.resolve())
        });
      }

      if (!match && route.routes) {
        // recursively try to match nested routes
        const nested = matchRoutes(route.routes);

        if (nested.length) {
          matches = matches.concat(nested);
        }
      }

      return matches;
    }, []);
  };

  const matches = matchRoutes(routes);

  // No matched route, render a 404 page.
  if (!matches.length) {
    res.contentType('text/html');
    res.status(404).send(render(<ErrorPage code={404} />, finalState));
    return;
  }

  // There's a match, render the component with the matched route, firing off
  // any fetchData methods that are statically defined on the server.
  const fetchData = matches.map(match => {
    const { fetchData, ...rest } = match; // eslint-disable-line no-unused-vars

    // return fetch data Promise, excluding unnecessary fetchData method
    return match.fetchData({ store, ...rest });
  });

  let context = {}, modules = [];

  const getComponent = () => {
    let component = (
      <Provider store={store}>
        <StaticRouter context={context} location={req.baseUrl}>
          <App />
        </StaticRouter>
      </Provider>
    );

    if (config.enableDynamicImports) {
      return (
        <Loadable.Capture report={moduleName => modules.push(moduleName)}>
          {component}
        </Loadable.Capture>
      );
    }

    return component;
  };

  // Execute the render only after all promises have been resolved.
  Promise.all(fetchData).then(() => {
    const state = store.getState();
    const html = renderToString(getComponent());
    const bundles = stats && getBundles(stats, modules) || [];
    const markup = render(html, state, bundles);

    // A 301 redirect was rendered somewhere if context.url exists after
    // rendering has happened.
    if (context.url) {
      return res.redirect(302, context.url);
    }

    return res.status(200).send(markup);
  });
}
