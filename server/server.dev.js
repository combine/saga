import path from 'path';
import chokidar from 'chokidar';
import hotClient from 'webpack-hot-client';
import devMiddleware from 'webpack-dev-middleware';
import webpack from 'webpack';
import DashboardPlugin from 'webpack-dashboard/plugin';
import config from '../webpack/base.client';

/* This module sets up the development environment for our server.
 * This is and should only be loaded in development ONLY:
 *
 * - Attaches webpack-hot-client and webpack-dev-middleware to express for
 * hot reloading on the client.
 * - Adds webpack-dashboard plugin.
 * - Adds require.cache invalidation for server HMR.
 */

const startCacheInvalidator = function() {
  const files = path.join(__dirname, '**/*');
  const watcher = chokidar.watch(files, { persistent: true });

  watcher.on('ready', () => {
    const watchFiles = watcher.getWatched();

    watcher.on('all', (event, file) => {
      if (event === 'change') {
        console.log('File changed, clearing cache:', file);

        Object.keys(watchFiles).forEach(dir => {
          watchFiles[dir].forEach(file => {
            delete require.cache[`${dir}/${file}`];
          });
        });
      }
    });
  });
};

module.exports = app => {
  const compiler = webpack(config);
  const dashboardPlugin = new DashboardPlugin();

  // Add a custom require.cache invalidator to "hot-reload" our server
  // components
  startCacheInvalidator();

  // Add webpack-dashboard plugin
  compiler.apply(dashboardPlugin);

  // Set up hot reloading with WebSockets
  const client = hotClient(compiler, {
    allEntries: true
  });

  // Add dev middleware to our express app once hot client is up
  client.server.on('listening', () => {
    return app.use(
      devMiddleware(compiler, {
        publicPath: config.output.publicPath,
        writeToDisk: true,
        stats: 'none'
      })
    );
  });
};
