import React from 'react';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import { SchemaLink } from 'apollo-link-schema';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { StaticRouter } from 'react-router';
import { renderToString } from 'react-dom/server';
import { getBundles } from 'react-loadable/webpack';
import { matchRoutes, safeRequire } from './helpers';
import { enableDynamicImports, enableSSR } from '@config';
import { get } from 'lodash';
import AdminContainer from '@admin/containers/App';
import AppContainer from '@app/containers/App';
import schema from '$graphql/schema';
import adminRoutes from '@admin/routes';
import appRoutes from '@app/routes';
import Loadable from 'react-loadable';
import render from './render';

const stats = enableDynamicImports
  ? safeRequire('../../react-loadable.json')
  : null;

export default function handleRender(req, res) {
  let context = {};
  let modules = [];

  const routes =
    req.user && req.user.isAdmin()
      ? [...appRoutes.slice(0, -1), ...adminRoutes]
      : appRoutes;

  // Check for matched routes against the baseUrl of the request.
  const matches = matchRoutes(req.baseUrl, routes);

  // If there are no matched routes, respond with an error.
  // TODO: Respond with a 404 error/component instead.
  if (!matches.length) {
    return res.status(500).send('Server Error');
  }

  const [pathname, search] = req.originalUrl.split('?');
  const location = { pathname, search };
  const matchPath = get(matches[0], 'route.path');
  const layout = matchPath.match(/\/admin/) ? 'admin' : 'app';
  const App = layout === 'admin' ? AdminContainer : AppContainer;
  const cache = new InMemoryCache();

  const client = new ApolloClient({
    ssrMode: true,
    cache,
    link: new SchemaLink({
      schema,
      context: {
        user: req.user
      }
    })
  });

  // If SSR is disabled, just render the skeleton HTML with the initial state.
  if (!enableSSR) {
    return res.send(render(null, {}, []));
  }

  const Component = (() => {
    let component = (
      <ApolloProvider client={client}>
        <StaticRouter context={context} location={location}>
          <App />
        </StaticRouter>
      </ApolloProvider>
    );

    if (enableDynamicImports) {
      return (
        <Loadable.Capture report={moduleName => modules.push(moduleName)}>
          {component}
        </Loadable.Capture>
      );
    }

    return component;
  })();

  return getDataFromTree(Component).then(() => {
    const html = renderToString(Component);
    const state = client.extract();
    const bundles = (stats && getBundles(stats, modules)) || [];
    const status = matches.length && matches[0].match.path === '*' ? 404 : 200;

    // A 301 redirect was rendered somewhere if context.url exists after
    // rendering has happened.
    if (context.url) {
      return res.redirect(302, context.url);
    }

    res.contentType('text/html');

    return render(html, layout, state, bundles)
      .then(markup => {
        return res.status(status).send(markup);
      })
      .catch(err => {
        console.error('Could not server-render React components:', err);
      });
  });
}
