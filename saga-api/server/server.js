import express from 'express';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { Model } from 'objection';
import { ApolloServer } from 'apollo-server-express';
import { formatError } from 'apollo-errors';
import httpsRedirect from '@middleware/httpsRedirect';
import authMiddleware from '@middleware/authMiddleware';
import typeDefs from '@graphql/typeDefs';
import resolvers from '@graphql/resolvers';
import db from '@db/index';

const env = process.env.NODE_ENV || 'development';
const app = new express();

// New GraphQL server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError,
  context: ({ req, res }) => ({
    res,
    user: req.user
  })
});

// Bind all Objection.js models to Knex
Model.knex(db);

// Secure with helmet
app.use(helmet());

// Ensures SSL in used in production.
app.use(httpsRedirect({ enabled: env === 'production' }));

// parse cookies!
app.use(cookieParser());

// Mount authentication middleware for JWT
app.use(authMiddleware);

// Apply app as middleware
server.applyMiddleware({
  app,
  playground: {
    settings: {

    }
  }
});

module.exports = app;
