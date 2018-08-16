// import path from 'path';
// import chokidar from 'chokidar';
import hotClient from 'webpack-hot-client';
import devMiddleware from 'webpack-dev-middleware';
import webpack from 'webpack';
// import config from '../webpack/base.client';

/* This module sets up the development environment for our server.
 * This is and should only be loaded in development ONLY:
 *
 * - Attaches webpack-hot-client and webpack-dev-middleware to express for
 * hot reloading on the client.
 * - Adds webpack-dashboard plugin.
 * - Adds require.cache invalidation for server HMR.
 */

// const startCacheInvalidator = function() {
//   const cwd = process.cwd();
//   const watcher = chokidar.watch([
//     path.join(cwd, 'client', '**/*'),
//     path.join(cwd, 'common', '**/*'),
//     path.join(cwd, 'config', '**/*'),
//     path.join(cwd, 'server', '**/*')
//   ], { persistent: true });
//
//   watcher.on('ready', () => {
//     const watchFiles = watcher.getWatched();
//
//     watcher.on('all', (event, file) => {
//       if (event === 'change') {
//         console.log('File changed, clearing cache:', file);
//
//         // Invalidate manifest
//         const output = process.env.PUBLIC_OUTPUT_PATH || 'dist/public';
//         const manifestPath = path.join(cwd, output, manifestFilename);
//         delete require.cache[manifestPath];
//
//         // Invalidate watched files
//         Object.keys(watchFiles).forEach(dir => {
//           watchFiles[dir].forEach(file => {
//             delete require.cache[`${dir}/${file}`];
//           });
//         });
//       }
//     });
//   });
// };

export default function applyDevTools(server, options = {}) {

  const opts = {
    webpackConfig: null,
    ...options
  };

  const { webpackConfig } = opts;

  if (!webpackConfig) {
    throw new Error('A webpack configuration must be provided');
  }

  const compiler = webpack(webpackConfig);

  // Add a custom require.cache invalidator to hot-reload our server
  // components
  // startCacheInvalidator();

  // Set up hot reloading with WebSockets
  const client = hotClient(compiler, {
    allEntries: true
  });

  // Add dev middleware to our express app once hot client is up
  client.server.on('listening', () => {
    return server.use(devMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
      writeToDisk: true,
      stats: { color: true, children: false }
    }));
  });
}
