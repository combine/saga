import React from 'react';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import { renderToString } from 'react-dom/server';
import { getBundles } from 'react-loadable/webpack';
import { matchRoutes, getStats, createStore } from './helpers';
import { enableDynamicImports, enableSSR } from '@config';
import adminRoutes from '@admin/routes';
import appRoutes from '@app/routes';
import Loadable from 'react-loadable';
import render from './render';

const stats = getStats(enableDynamicImports);

export default function handleRender(req, res) {
  let context = {};
  let modules = [];

  const routes = req.user && req.user.isAdmin() ? [
    ...appRoutes.slice(0, -1),
    ...adminRoutes
  ] : appRoutes;

  // Check for matched routes against the baseUrl of the request.
  const matches = matchRoutes(req.baseUrl, routes);

  // If there are no matched routes, respond with an error.
  // TODO: Respond with a 404 error/component instead.
  if (!matches.length) {
    return res.status(500).send('Server Error');
  }

  const { store, finalState, App, layout } = createStore(matches, req);

  // If SSR is disabled, just render the skeleton HTML with the initial state.
  if (!enableSSR) {
    return res.send(render(null, finalState, []));
  }

  const getComponent = () => {
    let component = (
      <Provider store={store}>
        <StaticRouter context={context} location={req.baseUrl}>
          <App />
        </StaticRouter>
      </Provider>
    );

    if (enableDynamicImports) {
      return (
        <Loadable.Capture report={moduleName => modules.push(moduleName)}>
          {component}
        </Loadable.Capture>
      );
    }

    return component;
  };

  // Retrieve any static fetchData promises from the matched routes and their
  // components and return an array of promises.
  const fetchData = matches.map(match => {
    const { fetchData, ...rest } = match; // eslint-disable-line no-unused-vars

    // return fetch data Promise, excluding unnecessary fetchData method
    return match.fetchData({ store, ...rest });
  });

  // After all the fetchData promises have been resolved, render the page.
  return Promise.all(fetchData).then(() => {
    const state = store.getState();
    const html = renderToString(getComponent());
    const bundles = stats && getBundles(stats, modules) || [];
    const markup = render(html, layout, state, bundles);
    const status = matches.length && matches[0].match.path === '*' ? 404 : 200;

    // A 301 redirect was rendered somewhere if context.url exists after
    // rendering has happened.
    if (context.url) {
      return res.redirect(302, context.url);
    }

    res.contentType('text/html');
    return res.status(status).send(markup);
  });
}
