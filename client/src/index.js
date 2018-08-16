import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import ssrMiddleware from './middleware/ssrMiddleware';
import applyDevTools from './lib/devTools';

export default function ClientServer(options = {}) {
  const opts = {
    enableDevTools: false,
    forceSSL: false,
    devOptions: {
      webpackConfig: {}
    },
    ssrOptions: {},
    ...options
  };

  const server = new express();

  // Run with webpack-hot-client and webpack-dev-middleware for hot reloading
  if (opts.enableDevTools) {
    applyDevTools(server, opts.devOptions);
  }

  // Secure with helmet
  server.use(helmet());

  // parse cookies
  server.use(cookieParser());

  // gzip
  server.use(compression());
  //
  // // Add middleware to serve up all static files
  // server.use(
  //   '/assets',
  //   express.static(path.join(cwd, process.env.PUBLIC_OUTPUT_PATH)),
  //   express.static(path.join(cwd, 'common/images')),
  //   express.static(path.join(cwd, 'common/fonts'))
  // );

  // handle browsers requesting favicon
  // server.use(
  //   '/favicon.ico',
  //   express.static(path.join(cwd, 'common/images/favicon/favicon.ico'))
  // );

  // Mount the react render middleware
  server.use('*', ssrMiddleware(opts.ssrOptions));

  return server;
}
