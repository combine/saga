import serve from 'webpack-serve';
import baseConfig from './base';

console.info('Firing up Webpack dev server...\n');

serve({
  config: baseConfig,
  host: process.env.DEV_SERVER_HOSTNAME,
  port: process.env.DEV_SERVER_PORT,
  logLevel: 'debug',
  dev: {
    publicPath: baseConfig.output.publicPath,
    headers: { 'Access-Control-Allow-Origin': '*' },
    stats: {
      colors: true,
      children: false
    }
  }
});
