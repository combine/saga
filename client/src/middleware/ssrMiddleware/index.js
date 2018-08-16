import React from 'react';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { StaticRouter } from 'react-router';
import { renderToString } from 'react-dom/server';
import { getBundles } from 'react-loadable/webpack';
import fetch from 'node-fetch';
import Loadable from 'react-loadable';
import matchRoutes from '../../lib/matchRoutes';
import render from './render';

export default function ssrMiddleware(options = {}) {
  const opts = {
    // An array of react-router routes
    routes: [],

    // Top level react component to render
    AppComponent: null,

    // A layout template to use for rendering. If not provided, the default
    // will be used.
    template: null,

    // Override the default apollo-client options.
    apolloClientOptions: {},

    // Render components server-side or just render the layout.
    ssr: true,

    // If supplied, enables dynamic imports with react-loadable
    reactLoadableStats: null,

    // Asset manifest file from webpack. If supplied, an `assets` object will be
    // supplied to the `template` file when rendering.
    webpackManifest: null,

    // the graphql endpoint to connect to
    graphqlEndpoint: null,

    ...options
  };

  return function handleRender(req, res) {
    const { AppComponent, reactLoadableStats: loadables } = opts;

    let context = {},
      modules = [];

    // Set the content type to HTML since this is an HTML renderer.
    res.contentType('text/html');

    // Check for matched routes against the baseUrl of the request.
    const matches = matchRoutes(req.baseUrl, opts.routes);

    // If there are no matched routes, respond with an error.
    // TODO: Respond with a 404 error/component instead.
    if (!matches.length) {
      return res.status(404).send('Not Found');
    }

    let status = matches.length && matches[0].match.path === '*' ? 404 : 200;
    const [pathname, search] = req.originalUrl.split('?');
    const location = { pathname, search };
    const client = new ApolloClient({
      ssrMode: opts.ssr,
      cache: new InMemoryCache(),
      link: createHttpLink({
        fetch,
        uri: opts.graphqlEndpoint,
        credentials: 'same-origin',
        context: {
          user: req.user
        },
        headers: {
          cookie: req.header('Cookie')
        }
      }),
      ...opts.apolloClientOptions
    });

    // If SSR is disabled, just render the skeleton HTML with the initial state.
    if (!opts.ssr) {
      return res.status(status).send(render(null, null, {}, []));
    }

    const Component = (() => {
      let component = (
        <ApolloProvider client={client}>
          <StaticRouter context={context} location={location}>
            <AppComponent />
          </StaticRouter>
        </ApolloProvider>
      );

      // If react-loadable stats manifest is supplied, then
      if (opts.reactLoadableStats) {
        return (
          <Loadable.Capture report={moduleName => modules.push(moduleName)}>
            {component}
          </Loadable.Capture>
        );
      }

      return component;
    })();

    const renderApp = () => {
      const html = renderToString(Component);
      const state = client.extract();
      const bundles = (loadables && getBundles(loadables, modules)) || [];

      // A 301 redirect was rendered somewhere if context.url exists after
      // rendering has happened.
      if (context.url) {
        return res.redirect(302, context.url);
      }

      const markup = render(html, null, state, bundles);

      return res.status(status).send(markup);
    };

    return getDataFromTree(Component)
      .then(renderApp)
      .catch(renderApp);
  };
}
