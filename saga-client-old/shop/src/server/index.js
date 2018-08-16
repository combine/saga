import path from 'path';
import SagaServer from 'saga-server';
import routes from '@routes';
import App from '@containers/App';

const cwd = process.cwd();
const webpackConfig = require(path.join(cwd, '..', 'webpack', 'base.client'));
const port = process.env.PORT || process.env.APPLICATION_PORT || 3001;
const server = SagaServer({
  devOptions: {
    webpackConfig
  },
  ssrOptions: {
    routes,
    AppComponent: App,
    graphqlUri: process.env.GRAPHQL_BASE_URL
  }
});

server.listen(port, () => {
  console.info(`Client application server mounted on port ${port}!`);
});
