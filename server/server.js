import path from 'path';
import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import ReactRenderer from './renderer';
import { Model } from 'objection';
import { httpsRedirect } from '$middleware';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import Api from './api';
import Auth from './auth';
import schema from './graphql/schema';
import db from '$db/index';

const env = process.env.NODE_ENV || 'development';
const app = new express();

// Bind all models to Knex
Model.knex(db);

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
  express.static(path.join(__dirname, '../' + process.env.PUBLIC_OUTPUT_PATH)),
  express.static(path.join(__dirname, '../common/images')),
  express.static(path.join(__dirname, '../common/fonts'))
);

// handle browsers requesting favicon
app.use(
  '/favicon.ico',
  express.static(path.join(__dirname, '../common/images/favicon/favicon.ico'))
);

// Mount the REST API
app.use('/api/v1', Api);

// GraphQL Service
app.use('/api/v2', bodyParser.json(), graphqlExpress({ schema }));

// Set up GraphiQL in development environment
if (env === 'development') {
  app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
}

// Auth service
app.use('/auth', Auth);

// Mount the react render handler
app.use('*', ReactRenderer);

module.exports = app;
