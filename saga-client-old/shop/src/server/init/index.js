const path = require('path');
const env = process.env.NODE_ENV || 'development';
const packageJson = require(path.join(process.cwd(), '..', 'package.json'));

if (['development', 'test'].includes(env)) {
  // Transpile on the fly in dev/test
  require('babel-polyfill');
  require('babel-register');

  // css modules
  require('css-modules-require-hook')({
    extensions: ['.scss'],
    generateScopedName: packageJson._cssModulesId,
    devMode: true
  });

  // Add better stack tracing for promises in dev mode
  process.on('unhandledRejection', r => console.log(r));
}

/* Initializers
 * A place to put initializer code that needs to be run before anything else.
 * Since some initializer code is sequence-dependent, we need to require each
 * module here manually rather than auto-loading everything in here.j
 */

// Loads module aliases defined in package.json
require('./aliases');

// Load environment variables
require('./environment');

// Add additional require extensions (e.g. html)
require('./requireExtensions');
