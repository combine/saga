import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { formatError } from 'apollo-errors';
import schema from './schema';

const env = process.env.NODE_ENV || 'development';
const graphqlMiddleware = express();
const mountPoint = '/api';

// Setup graphql with schema
graphqlMiddleware.use(
  mountPoint,
  bodyParser.json(),
  graphqlExpress((req, res) => {
    return {
      formatError,
      schema,
      context: {
        res,
        user: req.user
      }
    };
  })
);

// Set up GraphiQL in development environment
if (env === 'development') {
  graphqlMiddleware.use(
    '/graphiql',
    graphiqlExpress({
      endpointURL: mountPoint
    })
  );
}

export default graphqlMiddleware;
