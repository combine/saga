// Only loaded in development. Attaches webpack-hot-client and
// webpack-dev-middleware to our express instance.
import hotClient from 'webpack-hot-client';
import middleware from 'webpack-dev-middleware';
import webpack from 'webpack';
import config from '../webpack/base';


module.exports = (app) => {
  const compiler = webpack(config);
  const client = hotClient(compiler, {
    allEntries: true,
    stats: {
      colors: true,
      children: false
    }
  });

  client.server.on('listening', () => {
    app.use(middleware(compiler, {
      publicPath: config.output.publicPath,
      writeToDisk: true,
      stats: {
        colors: true,
        children: false
      }
    }));
  });
};
