import hotClient from 'webpack-hot-client';
import devMiddleware from 'webpack-dev-middleware';
import webpack from 'webpack';
import config from '../webpack/base';

/* This module sets up the development environment for our server.
 * This is and should only be loaded in development ONLY:
 *
 * - Attaches webpack-hot-client and webpack-dev-middleware to express for
 * hot reloading on the client.
 */

module.exports = app => {
  const compiler = webpack(config);

  // Set up hot reloading with WebSockets
  const client = hotClient(compiler, {
    allEntries: true,
    stats: {
      colors: true,
      children: false
    }
  });

  // Add dev middleware to our express app once hot client is up
  client.server.on('listening', () => {
    return app.use(
      devMiddleware(compiler, {
        publicPath: config.output.publicPath,
        writeToDisk: true,
        stats: {
          colors: true,
          children: false,
          warnings: false
        }
      })
    );
  });
};
