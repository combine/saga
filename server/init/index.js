/* Initializers
 * A place to put initializer code that needs to be run before anything else.
 * Since some initializer code is sequence-dependent, we need to require each
 * module here manually rather than auto-loading everything in here.j
 */
const env = process.env.NODE_ENV || 'development';

if (env === 'development') {
  // Set up dev compilation tools
  require('babel-polyfill');
  require('babel-register');

  // Add better stack tracing for promises in dev mode
  process.on('unhandledRejection', r => console.log(r));
}

require('./aliases');
require('./environment');
require('./cssModules');
require('./i18n');
require('./requireExtensions');
