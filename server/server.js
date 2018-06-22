import path from 'path';
import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import { httpsRedirect, authMiddleware, hotRequire } from '$middleware';
import { Model } from 'objection';
import db from '$db/index';

const env = process.env.NODE_ENV || 'development';
const cwd = process.cwd();
const app = new express();

// Bind all Objection.js models to Knex
Model.knex(db);

// Run with webpack-hot-client and webpack-dev-middleware for hot reloading
if (env === 'development') {
  require('./server.dev')(app);
}

// Secure with helmet
app.use(helmet());

// Ensures SSL in used in production.
app.use(httpsRedirect({ enabled: env === 'production' }));

// parse cookies!
app.use(cookieParser());

// gzip
app.use(compression());

// Add middleware to serve up all static files
app.use(
  '/assets',
  express.static(path.join(cwd, process.env.PUBLIC_OUTPUT_PATH)),
  express.static(path.join(cwd, 'common/images')),
  express.static(path.join(cwd, 'common/fonts'))
);

// handle browsers requesting favicon
app.use(
  '/favicon.ico',
  express.static(path.join(cwd, 'common/images/favicon/favicon.ico'))
);

// Mount authentication middleware for JWT
app.use(authMiddleware);

// Mount GraphQL Service
app.use(hotRequire('./graphql'));

// Mount the react render handler
app.use('*', hotRequire('./renderer'));

module.exports = app;
