import serve from 'webpack-serve';
import baseConfig from './base';

const {
  DEV_SERVER_PORT,
  DEV_SERVER_HOSTNAME
} = process.env;

console.info('Firing up Webpack dev server...\n');

serve({
  config: baseConfig,
  host: DEV_SERVER_HOSTNAME,
  port: DEV_SERVER_PORT,
  dev: {
    publicPath: baseConfig.output.publicPath,
    headers: { 'Access-Control-Allow-Origin': '*' },
    stats: {
      colors: true,
      children: false
    }
  }
});
