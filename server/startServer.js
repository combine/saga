import path from 'path';
import config from '@config';
import Loadable from 'react-loadable';
import chokidar from 'chokidar';
import { getEnv } from '@lib/env';

let env = getEnv('NODE_ENV', 'development');
let server;

if (!config.enableDynamicImports) {
  startServer();
} else {
  // Ensure react-loadable stats file exists before starting the server
  const statsPath = path.join(__dirname, '..', 'react-loadable.json');
  const watcher = chokidar.watch(statsPath, { persistent: true });

  console.info(`Checking/waiting for ${statsPath}...`);

  watcher.on('all', (event, path) => {
    if (event === 'add') {
      if (env === 'production') {
        watcher.close();
      }

      console.info(`Stats file found at ${path}, starting server...`);

      startServer().then(s => server = s);

    } else if (event === 'change') {
      if (env === 'production') {
        watcher.close();
      }

      console.info('Stats file changed, restarting server...');

      if (server) {
        // if the server is already started, restart it.
        server.close(() => {
          startServer().then(s => server = s);
        });
      } else {
        // otherwise, just start the server.
        startServer().then(s => server = s);
      }
    }
  });
}

function startServer() {
  const server = require('./server');
  const port = process.env.PORT || process.env.APPLICATION_PORT || 3000;

  return Loadable.preloadAll().then(() => {
    return server.listen(port, error => {
      if (error) {
        console.error(error);
      } else {
        console.info(`Application server mounted on http://localhost:${port}.`);
      }
    });
  });
}
